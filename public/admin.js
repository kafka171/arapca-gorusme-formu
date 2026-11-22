const KEY_STORAGE = "arapca-gorusme-admin-key";
const MAX_ROWS = 1000;

const el = {
  login: document.getElementById("login-view"),
  loginForm: document.getElementById("login-form"),
  key: document.getElementById("admin-key"),
  loginError: document.getElementById("login-error"),
  healthBtn: document.getElementById("btn-health"),
  healthOut: document.getElementById("health-out"),
  panel: document.getElementById("panel-view"),
  panelSub: document.getElementById("panel-sub"),
  refresh: document.getElementById("btn-refresh"),
  csv: document.getElementById("btn-csv"),
  search: document.getElementById("search"),
  rows: document.getElementById("rows"),
  empty: document.getElementById("empty"),
  errorView: document.getElementById("admin-error"),
  errorText: document.getElementById("admin-error-text"),
  retry: document.getElementById("btn-retry"),
  dialog: document.getElementById("detail-dialog"),
  detailTitle: document.getElementById("detail-title"),
  detailBody: document.getElementById("detail-body"),
  closeDialog: document.getElementById("btn-close-dialog"),
  closeDialog2: document.getElementById("btn-close-dialog-2"),
};

const state = {
  key: "",
  form: null,
  fields: [],
  rows: [],
  query: "",
};

function show(view) {
  for (const node of [el.login, el.panel, el.errorView]) {
    if (node) node.hidden = node !== view;
  }
}

function getKey() {
  try {
    return sessionStorage.getItem(KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

function setKey(key) {
  try {
    if (key) sessionStorage.setItem(KEY_STORAGE, key);
    else sessionStorage.removeItem(KEY_STORAGE);
  } catch {
    /* yoksay */
  }
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      accept: "application/json",
      "x-admin-key": state.key,
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const err = new Error(data?.error || `HTTP ${response.status}`);
    err.status = response.status;
    err.code = response.status;
    throw err;
  }
  return data;
}

async function checkHealth() {
  el.healthBtn.disabled = true;
  try {
    const response = await fetch("/api/health", { headers: { accept: "application/json" } });
    const h = await response.json();

    const lines = [];
    lines.push(
      h.adminKeyConfigured
        ? "ADMIN_KEY: tanımlı"
        : "ADMIN_KEY: tanımlı DEĞİL (Production ortamına ekleyin)",
    );
    if (!h.dbBound) lines.push("D1: bağlı değil");
    else if (h.tableExists) lines.push("D1 tablosu: hazır");
    else if (h.dbOk) lines.push("D1 tablosu: YOK (schema.console.sql çalıştırın)");
    else lines.push("D1: bağlantı hatası");
    if (h.commit) lines.push(`Sürüm: ${h.commit}`);

    el.healthOut.textContent = lines.join("\n");
    el.healthOut.hidden = false;
    return h;
  } catch {
    el.healthOut.textContent = "Sunucu durumu alınamadı.";
    el.healthOut.hidden = false;
    return null;
  } finally {
    el.healthBtn.disabled = false;
  }
}

async function login(key) {
  state.key = key;
  el.loginError.hidden = true;

  try {
    const [formData, list] = await Promise.all([
      api("/api/form"),
      api(`/api/responses?limit=${MAX_ROWS}`),
    ]);

    state.form = formData.form;
    state.fields = state.form.sections.flatMap((s) => s.fields);
    state.rows = list.rows || [];

    setKey(key);
    show(el.panel);
    renderRows();
  } catch (err) {
    const status = err.status || err.code;

    if (status === 401 || status === 503 || status === 500) {
      setKey("");
      state.key = "";
      show(el.login);
      el.loginError.textContent =
        status === 401
          ? "Anahtar kabul edilmedi. Sunucu durumunu kontrol edin."
          : err.message || "Sunucu yapılandırma hatası.";
      el.loginError.hidden = false;

      const health = await checkHealth();
      if (status === 401 && health && health.adminKeyConfigured === false) {
        el.loginError.textContent =
          "Sunucuda ADMIN_KEY tanımlı değil. Cloudflare → Settings → Variables and Secrets (Production) ekleyip yeniden deploy edin.";
      }

      el.key.focus();
      el.key.select();
      return;
    }

    el.errorText.textContent = "Yanıtlar yüklenemedi. Lütfen tekrar deneyin.";
    show(el.errorView);
    console.error(err);
  }
}

function formatDate(iso) {
  if (!iso) return "—";
  const date = new Date(iso.includes("T") ? iso : `${iso.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function filteredRows() {
  const q = state.query.trim().toLocaleLowerCase("tr");
  if (!q) return state.rows;
  return state.rows.filter((row) =>
    state.fields.some((f) => String(row[f.name] ?? "").toLocaleLowerCase("tr").includes(q)),
  );
}

function renderRows() {
  const rows = filteredRows();
  el.rows.replaceChildren();

  el.panelSub.textContent = state.query
    ? `${rows.length} / ${state.rows.length} yanıt gösteriliyor`
    : `${state.rows.length} yanıt`;

  el.empty.hidden = rows.length > 0;
  el.empty.textContent = state.rows.length === 0 ? "Henüz yanıt yok." : "Aramayla eşleşen yanıt yok.";

  for (const row of rows) {
    const tr = document.createElement("tr");

    const cells = [
      row.id,
      formatDate(row.created_at),
      row.ders_adi,
      row.unite,
      row.okul_adi,
      row.ogretmen_kodu,
    ];

    cells.forEach((value, index) => {
      const td = document.createElement("td");
      td.textContent = value === "" || value === null || value === undefined ? "—" : String(value);
      if (index === 0) td.className = "num";
      tr.append(td);
    });

    const actions = document.createElement("td");
    actions.className = "row-actions";

    const detail = document.createElement("button");
    detail.type = "button";
    detail.className = "link-btn";
    detail.textContent = "Detay";
    detail.addEventListener("click", () => openDetail(row));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "link-btn danger";
    remove.textContent = "Sil";
    remove.addEventListener("click", () => removeRow(row));

    actions.append(detail, remove);
    tr.append(actions);
    el.rows.append(tr);
  }
}

function openDetail(row) {
  el.detailTitle.textContent = `Yanıt #${row.id}`;
  el.detailBody.replaceChildren();

  const meta = document.createElement("p");
  meta.className = "detail-meta";
  meta.textContent = `Kayıt: ${formatDate(row.created_at)}`;
  el.detailBody.append(meta);

  for (const section of state.form.sections) {
    const block = document.createElement("section");
    block.className = "detail-section";

    const h3 = document.createElement("h3");
    h3.textContent = section.title;
    block.append(h3);

    for (const field of section.fields) {
      const item = document.createElement("div");
      item.className = "detail-item";

      const label = document.createElement("div");
      label.className = "detail-label";
      label.textContent = field.label;

      const value = document.createElement("div");
      value.className = "detail-value";
      const text = String(row[field.name] ?? "").trim();
      value.textContent = text || "—";
      if (!text) value.classList.add("muted");

      item.append(label, value);
      block.append(item);
    }

    el.detailBody.append(block);
  }

  if (typeof el.dialog.showModal === "function") {
    el.dialog.showModal();
  } else {
    el.dialog.setAttribute("open", "");
  }
}

function closeDetail() {
  if (typeof el.dialog.close === "function") el.dialog.close();
  else el.dialog.removeAttribute("open");
}

async function removeRow(row) {
  const label = [row.okul_adi, row.ogretmen_kodu].filter(Boolean).join(" · ");
  const ok = window.confirm(
    `#${row.id} numaralı yanıt silinsin mi?${label ? `\n\n${label}` : ""}\n\nBu işlem geri alınamaz.`,
  );
  if (!ok) return;

  try {
    await api(`/api/responses?id=${row.id}`, { method: "DELETE" });
    state.rows = state.rows.filter((r) => r.id !== row.id);
    renderRows();
  } catch (err) {
    window.alert(err.message || "Kayıt silinemedi.");
  }
}

async function downloadCsv() {
  el.csv.disabled = true;
  const old = el.csv.textContent;
  el.csv.textContent = "Hazırlanıyor…";

  try {
    const response = await fetch("/api/export", { headers: { "x-admin-key": state.key } });
    if (!response.ok) throw new Error("CSV oluşturulamadı.");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gorusme-formu-yanitlari-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  } catch (err) {
    window.alert(err.message || "CSV indirilemedi.");
  } finally {
    el.csv.disabled = false;
    el.csv.textContent = old;
  }
}

el.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const key = el.key.value.trim();
  if (!key) {
    el.loginError.textContent = "Lütfen yönetici anahtarını girin.";
    el.loginError.hidden = false;
    return;
  }
  login(key);
});

el.refresh.addEventListener("click", () => login(state.key));

el.healthBtn.addEventListener("click", checkHealth);

el.csv.addEventListener("click", downloadCsv);

el.search.addEventListener("input", () => {
  state.query = el.search.value;
  renderRows();
});

el.retry.addEventListener("click", () => {
  if (state.key) login(state.key);
  else show(el.login);
});

el.closeDialog.addEventListener("click", closeDetail);
el.closeDialog2.addEventListener("click", closeDetail);

el.dialog.addEventListener("click", (event) => {
  if (event.target === el.dialog) closeDetail();
});

const savedKey = getKey();
if (savedKey) {
  login(savedKey);
} else {
  show(el.login);
  el.key.focus();
}
