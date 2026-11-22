-- Cloudflare D1 (SQLite) semasi.
-- Uretim: node scripts/gen-schema.mjs (kaynak: functions/_lib/form.js)
--
-- Soru alanlari: metin/secenek sorulari TEXT, tarih sorulari DATE, saat sorulari TIME.
-- NOT NULL : formda zorunlu (*) alanlar - deger NULL olamaz (bosluk denetimi sunucuda).
-- NULL     : formda istege bagli alanlar - yanit verilmezse NULL yazilir.
-- Zorunlu: 15 / 56 alan

CREATE TABLE IF NOT EXISTS responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- Kayit zamani (ISO-8601)
  created_at DATETIME NOT NULL DEFAULT (datetime('now')),
  "ders_adi" TEXT NOT NULL,  -- zorunlu
  "unite" TEXT NOT NULL,  -- zorunlu
  "okul_adi" TEXT NOT NULL,  -- zorunlu
  "gorusme_tarihi" DATE NOT NULL,  -- zorunlu
  "gorusme_saati" TIME,  -- istege bagli
  "saha_arastirmacisi" TEXT NOT NULL,  -- zorunlu
  "ogretmen_kodu" TEXT NOT NULL,  -- zorunlu
  "sure_ders_saati" TEXT NOT NULL,  -- zorunlu
  "sure_yeterli" TEXT NOT NULL,  -- zorunlu
  "kavramsal_beceriler" TEXT,  -- istege bagli
  "kavramsal_beceriler_gorus" TEXT,  -- istege bagli
  "alan_becerileri_gorus" TEXT,  -- istege bagli
  "egilimler" TEXT,  -- istege bagli
  "egilimler_gorus" TEXT,  -- istege bagli
  "sosyal_duygusal" TEXT,  -- istege bagli
  "sosyal_duygusal_gorus" TEXT,  -- istege bagli
  "degerler" TEXT,  -- istege bagli
  "degerler_gorus" TEXT,  -- istege bagli
  "okuryazarlik" TEXT,  -- istege bagli
  "okuryazarlik_gorus" TEXT,  -- istege bagli
  "iliskilendirilen_disiplinler" TEXT,  -- istege bagli
  "disiplinler_arasi_gorus" TEXT,  -- istege bagli
  "beceriler_arasi_iliskiler" TEXT,  -- istege bagli
  "beceriler_arasi_gorus" TEXT,  -- istege bagli
  "ogrenme_cikti_a" TEXT NOT NULL,  -- zorunlu
  "ogrenme_cikti_b" TEXT,  -- istege bagli
  "ogrenme_cikti_c" TEXT,  -- istege bagli
  "ogrenme_cikti_d" TEXT,  -- istege bagli
  "ogrenme_cikti_e" TEXT,  -- istege bagli
  "ogrenme_cikti_f" TEXT,  -- istege bagli
  "ogrenme_cikti_g" TEXT,  -- istege bagli
  "icerik_cercevesi" TEXT NOT NULL,  -- zorunlu
  "icerik_cercevesi_gorus" TEXT,  -- istege bagli
  "ogrenme_kanitlari" TEXT,  -- istege bagli
  "yazili_sinav" TEXT,  -- istege bagli
  "uygulama_sinavlari" TEXT NOT NULL,  -- zorunlu
  "performans_gorevleri" TEXT,  -- istege bagli
  "performans_gorevleri_gorus" TEXT,  -- istege bagli
  "farkli_olcme_araci" TEXT,  -- istege bagli
  "temel_kabuller" TEXT,  -- istege bagli
  "temel_kabuller_gorus" TEXT,  -- istege bagli
  "kopru_kurma" TEXT NOT NULL,  -- zorunlu
  "kopru_kurma_gorus" TEXT,  -- istege bagli
  "ogrenme_ogretme_uygulamalari" TEXT NOT NULL,  -- zorunlu
  "zenginlestirme" TEXT,  -- istege bagli
  "zenginlestirme_gorus" TEXT,  -- istege bagli
  "destekleme" TEXT,  -- istege bagli
  "destekleme_gorus" TEXT,  -- istege bagli
  "okul_temelli_katki" TEXT,  -- istege bagli
  "okul_temelli_calismalar" TEXT NOT NULL,  -- zorunlu
  "ders_kitabi" TEXT,  -- istege bagli
  "e_icerik" TEXT,  -- istege bagli
  "fiziki_kosullar" TEXT,  -- istege bagli
  "ogrenme_ortamlari" TEXT,  -- istege bagli
  "ogretmen_yansitmalari" TEXT,  -- istege bagli
  "gorus_oneriler" TEXT NOT NULL  -- zorunlu
);

CREATE INDEX IF NOT EXISTS idx_responses_created_at ON responses (created_at);
