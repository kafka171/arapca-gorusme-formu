# Arapça Dersi Ünite/Tema Sonu Görüşme Formu

Google Forms'taki **“Arapça Dersi Öğretim Programı İzleme ve Değerlendirme Çalışmaları Ünite/Tema Sonu Görüşme Formu”** ile aynı soruları içeren, **Cloudflare Pages** üzerinde çalışan ve yanıtları **D1 (SQLite)** veritabanına yazan form uygulaması.

- 16 bölüm, 56 soru — Google Forms'taki sıra ve zorunluluk kurallarıyla birebir.
- Tüm yanıt sütunları **TEXT** (`date`, `time` ve seçenekli sorular dahil).
- Bölüm bölüm ilerleme, taslak kaydetme (localStorage), zorunlu alan doğrulaması.
- `/admin` sayfasında anahtarla korunan yanıt listesi, arama, detay görünümü, silme ve **CSV indirme**.

## Klasör yapısı

```
public/                 Statik ön yüz (Pages)
  index.html            Form
  admin.html            Yönetim paneli (/admin)
  app.js, admin.js      Form ve panel mantığı
  styles.css, admin.css
functions/
  _lib/form.js          TEK KAYNAK: tüm sorular, tipler, zorunluluklar
  _lib/http.js          Yetki ve JSON yardımcıları
  api/form.js           GET  /api/form      → form tanımı
  api/submit.js         POST /api/submit   → yanıt kaydı
  api/responses.js      GET/DELETE /api/responses (yönetici)
  api/export.js         GET  /api/export   → CSV (yönetici)
  _middleware.js        Güvenlik başlıkları (CSP vb.)
schema.sql              D1 tablosu (tüm sorular TEXT)
scripts/gen-schema.mjs  schema.sql'i form.js'ten üretir
```

## Yerel geliştirme

```bash
npm install
npm run db:init:local      # yerel SQLite tablosunu oluşturur
npm run dev                # http://localhost:8788
```

`wrangler pages dev` yerel D1'i `.wrangler/state` altında tutar. `.dev.vars` dosyasındaki
`ADMIN_KEY` ile `/admin` sayfasına giriş yapabilirsiniz.

## Cloudflare'e kurulum

1. **D1 veritabanı oluşturun**

   ```bash
   npx wrangler login
   npx wrangler d1 create gorusme-formu
   ```

   Çıktıdaki `database_id` değerini `wrangler.toml` içine yazın.

2. **Tabloyu oluşturun**

   ```bash
   npm run db:init
   ```

   **Panelden yapacaksanız:** D1 veritabanı → **Console** sekmesinde
   `schema.console.sql` dosyasını kullanın. Bu dosya yorumsuz ve her ifade tek satırdır;
   `schema.sql` içindeki `--` yorumları panel konsolunda "incomplete input" hatasına yol
   açabilir. İki satırı ayrı ayrı çalıştırın:

   1. `CREATE TABLE ...` satırı → **Execute**
   2. `CREATE INDEX ...` satırı → **Execute**

   Tablo zaten oluşmuşsa önce `DROP TABLE IF EXISTS responses;` çalıştırın.

3. **Yönetici anahtarını secret olarak tanımlayın**

   ```bash
   npx wrangler pages secret put ADMIN_KEY --project-name arapca-gorusme-formu
   ```

4. **Yayınlayın**

   ```bash
   npx wrangler pages project create arapca-gorusme-formu
   npm run deploy
   ```

   Alternatif: GitHub deposunu Cloudflare Pages'e bağlayın.
   Build komutu boş, çıktı klasörü `public`, D1 bağlaması `DB` olmalı.

> `wrangler.toml` içindeki `database_id` gerçek kimlikle değiştirilmelidir; aksi halde
> yayın sırasında D1 bağlaması bulunamaz.

## Yönetim paneli

- Adres: `https://<proje>.pages.dev/admin`
- Giriş: `ADMIN_KEY` değeri (yalnızca o sekme için `sessionStorage`'da tutulur).
- **CSV indir** çıktısı `;` ayraçlı, UTF-8 BOM'ludur; Excel'de Türkçe karakterler doğru görünür.
- Giriş ekranındaki **Sunucu durumunu kontrol et** düğmesi `ADMIN_KEY` tanımlı mı, D1 tablosu
  var mı ve yayındaki sürüm hangisi bilgisini gösterir (`/api/health`).

### `/admin` anahtarı kabul etmiyorsa

1. Giriş ekranında **Sunucu durumunu kontrol et**'e basın.
   - `ADMIN_KEY: tanımlı DEĞİL` → Pages → Settings → Variables and Secrets → **Production**
     ortamına `ADMIN_KEY` (Secret) ekleyin ve **Retry deployment** yapın.
   - `D1 tablosu: YOK` → D1 Console'da `schema.console.sql` satırlarını çalıştırın.
   - İkisi de yeşilse anahtar değeri yanlış: secret'ı **Edit** ile yeniden yazın
     (kopyalarken baş/son boşlukları temizleyin; sunucu yine de boşlukları kırpar).
2. Secret **Production** ortamına mı eklendi? Preview'a eklenmişse canlı adreste çalışmaz.
3. Secret eklendikten sonra yeni bir deployment yapıldı mı?
4. Preview adresi (`<hash>.proje.pages.dev`) kullanıyorsanız orada da ayrı secret gerekir.

## Soruları değiştirmek

Tüm sorular `functions/_lib/form.js` içinde tanımlıdır. Her alan:

```js
{ name: "alan_adi", label: "Soru metni", type: "textarea", required: true }
```

- `type`: `radio` | `text` | `textarea` | `date` | `time`
- `radio` alanlarında `options: ["...", "..."]` zorunludur.
- `name` değeri veritabanı sütun adıdır (ASCII, boşluksuz, benzersiz).

Değişiklikten sonra şemayı yeniden üretip uygulayın:

```bash
npm run schema
npm run db:init          # yeni sütunlar için ALTER TABLE gerekebilir
```

`schema.sql` yalnızca `CREATE TABLE IF NOT EXISTS` içerir. Mevcut bir tabloya yeni soru
eklerken sütunu elle ekleyin, örneğin:

```sql
ALTER TABLE responses ADD COLUMN "yeni_soru" TEXT;
```

(Zorunlu bir soru ekliyorsanız sütunu `TEXT NOT NULL DEFAULT ''` olarak ekleyip mevcut
satırları doldurmanız gerekir; D1'de varsayılansız `NOT NULL` sütun eklenemez.)

## Veritabanı

Tablo: `responses`

| Sütun | Tip | Kısıt | Açıklama |
| --- | --- | --- | --- |
| `id` | INTEGER | PK, AUTOINCREMENT | Kayıt numarası |
| `created_at` | DATETIME | `NOT NULL` | ISO-8601 kayıt zamanı |
| `gorusme_tarihi` | DATE | `NOT NULL` | Görüşme tarihi |
| `gorusme_saati` | TIME | `NULL` | Görüşme saati (isteğe bağlı) |
| Diğer zorunlu sorular (14 alan) | TEXT | `NOT NULL` | Formda `*` ile işaretli alanlar; boş değer sunucuda reddedilir |
| Diğer isteğe bağlı sorular (40 alan) | TEXT | `NULL` | Yanıt verilmezse `NULL` yazılır |

SQLite'ta `DATE`, `TIME` ve `DATETIME` sütunları **NUMERIC affinity** kullanır; değerler
`YYYY-MM-DD`, `HH:MM` ve ISO-8601 metni olarak saklanır. API tarafındaki biçim doğrulaması
değişmez.

Zorunlu/isteğe bağlı ayrımı doğrudan `functions/_lib/form.js` içindeki `required: true`
alanlarından üretilir. Hangi sütunun zorunlu olduğu `schema.sql` içinde satır sonu
yorumlarıyla da işaretlidir.

Mevcut bir tabloyu yeni kısıtlarla yeniden oluşturmak için (yerelde):

```bash
npm run db:drop:local
npm run db:init:local
```

> D1'de `ALTER TABLE ... ALTER COLUMN` desteklenmez. Kısıtları değiştirmek için tabloyu
> yeniden oluşturmanız ya da veriyi yeni tabloya taşımanız gerekir.

Yerel SQLite dosyasını indirmek / yedeklemek için:

```bash
npm run db:export        # gorusme-formu.sql
```

## Notlar

- Form gönderiminde sunucu tarafında da doğrulama yapılır (zorunlu alanlar, seçenek listesi,
  tarih/saat biçimi, uzunluk sınırları).
- Yanıtlar üçüncü kişilerle paylaşılmaz; form metninde bu bilgi yer alır.
- CSP, `X-Frame-Options`, `nosniff` gibi güvenlik başlıkları `functions/_middleware.js`
  tarafından eklenir.
