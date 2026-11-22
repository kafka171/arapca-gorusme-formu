import { authStatus, json } from "../_lib/http.js";

const MAX_LIMIT = 1000;

const NOT_CONFIGURED =
  "Sunucuda ADMIN_KEY tanımlı değil. Cloudflare Pages → Settings → Variables and Secrets bölümünden Production ortamına ADMIN_KEY ekleyip yeniden deploy edin.";

function deny(status) {
  if (status === "not_configured") {
    return json({ ok: false, code: "admin_key_missing", error: NOT_CONFIGURED }, 503);
  }
  return json(
    { ok: false, code: "unauthorized", error: "Yetkisiz. Yönetici anahtarı gerekli." },
    401,
  );
}

export async function onRequestGet({ request, env }) {
  const status = authStatus(request, env);
  if (status !== "ok") return deny(status);

  const url = new URL(request.url);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, Number.parseInt(url.searchParams.get("limit") || "500", 10) || 500),
  );
  const offset = Math.max(0, Number.parseInt(url.searchParams.get("offset") || "0", 10) || 0);

  try {
    const [countRow, rows] = await Promise.all([
      env.DB.prepare("SELECT COUNT(*) AS total FROM responses").first(),
      env.DB.prepare("SELECT * FROM responses ORDER BY id DESC LIMIT ? OFFSET ?")
        .bind(limit, offset)
        .all(),
    ]);

    return json({
      ok: true,
      total: countRow?.total ?? 0,
      limit,
      offset,
      rows: rows.results ?? [],
    });
  } catch (err) {
    console.error("responses error", err);
    return json(
      {
        ok: false,
        code: "db_error",
        error:
          "Yanıtlar okunamadı. D1 tablosu oluşturulmuş mu? (şema: schema.console.sql)",
      },
      500,
    );
  }
}

export async function onRequestDelete({ request, env }) {
  const status = authStatus(request, env);
  if (status !== "ok") return deny(status);

  const url = new URL(request.url);
  const id = Number.parseInt(url.searchParams.get("id") || "", 10);
  if (!Number.isInteger(id) || id <= 0) {
    return json({ ok: false, error: "Geçersiz kayıt numarası." }, 400);
  }

  try {
    const result = await env.DB.prepare("DELETE FROM responses WHERE id = ?").bind(id).run();
    return json({ ok: true, deleted: result.meta?.changes ?? 0 });
  } catch (err) {
    console.error("delete error", err);
    return json({ ok: false, error: "Kayıt silinemedi." }, 500);
  }
}
