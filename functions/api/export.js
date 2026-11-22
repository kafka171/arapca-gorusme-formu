import { fields } from "../_lib/form.js";
import { authStatus } from "../_lib/http.js";

const oneLine = (text) => String(text ?? "").replace(/\s*\n\s*/g, " ").trim();

function csvCell(value) {
  const s = String(value ?? "");
  if (/[",;\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function onRequestGet({ request, env }) {
  const status = authStatus(request, env);
  if (status !== "ok") {
    const message =
      status === "not_configured"
        ? "Sunucuda ADMIN_KEY tanımlı değil. Cloudflare Pages → Settings → Variables and Secrets bölümünden Production ortamına ADMIN_KEY ekleyip yeniden deploy edin."
        : "Yetkisiz. Yönetici anahtarı gerekli.";
    return new Response(message, {
      status: status === "not_configured" ? 503 : 401,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  let rows;
  try {
    const result = await env.DB.prepare("SELECT * FROM responses ORDER BY id ASC").all();
    rows = result.results ?? [];
  } catch (err) {
    console.error("export error", err);
    return new Response("Yanıtlar okunamadı.", {
      status: 500,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const headers = ["No", "Kayıt Zamanı", ...fields.map((f) => oneLine(f.label))];
  const lines = [headers.map(csvCell).join(";")];

  for (const row of rows) {
    lines.push(
      [row.id, row.created_at, ...fields.map((f) => row[f.name] ?? "")]
        .map(csvCell)
        .join(";"),
    );
  }

  // Excel'in Turkce karakterleri dogru acmasi icin BOM + CRLF.
  const csv = "\uFEFF" + lines.join("\r\n") + "\r\n";
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="gorusme-formu-yanitlari-${stamp}.csv"`,
      "cache-control": "no-store",
    },
  });
}
