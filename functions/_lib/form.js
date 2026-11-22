// Tek kaynak: form tanimi. Hem API (dogrulama) hem on yuz (render) bunu kullanir.
// Tum yanit alanlari D1/SQLite'ta TEXT olarak saklanir.

export const form = {
  title:
    "Arapça Dersi Öğretim Programı İzleme ve Değerlendirme Çalışmaları Ünite/Tema Sonu Görüşme Formu",
  description:
    "Değerli Öğretmenimiz,\n\n" +
    "Bu görüşme, Türkiye Yüzyılı Maarif Modeli (TYMM) Öğretim Programları İzleme ve Değerlendirme Çalışmaları kapsamında Arapça Dersi Öğretim Programı'nın sahadaki uygulanabilirliğini ve geliştirilmesi gereken yönleri hakkında görüşlerinizi almak amacıyla düzenlenmiştir. Değerli görüşleriniz, programın gelecekteki uygulamalarının geliştirilmesine önemli katkılar sağlayacaktır. Paylaşacağınız yanıtlar, eğitim sürecinin daha etkili ve verimli bir şekilde yürütülmesine ışık tutacaktır.\n\n" +
    "Görüşme kapsamında vereceğiniz cevapların üçüncü kişilerle paylaşılmayacağını belirtir, değerli katkılarınız için şimdiden teşekkür ederiz.",
  sections: [
    {
      id: "genel",
      title: "Genel Bilgiler",
      fields: [
        {
          name: "ders_adi",
          label: "Ders Adı:",
          type: "radio",
          required: true,
          options: ["Arapça 6", "Arapça 10"],
        },
        {
          name: "unite",
          label: "Ünite:",
          type: "radio",
          required: true,
          options: ["1. Ünite", "2. Ünite", "3. Ünite", "4. Ünite"],
        },
        { name: "okul_adi", label: "Okul Adı:", type: "text", required: true },
        { name: "gorusme_tarihi", label: "Görüşme Tarihi:", type: "date", required: true },
        { name: "gorusme_saati", label: "Görüşme Tarihi ve Saati:", type: "time", required: false },
        {
          name: "saha_arastirmacisi",
          label: "Saha Araştırmacısı:",
          type: "text",
          required: true,
        },
        {
          name: "ogretmen_kodu",
          label: "Öğretmen (Kod yazılacaktır.)",
          type: "text",
          required: true,
        },
      ],
    },
    {
      id: "zaman_yonetimi",
      title: "1. ZAMAN YÖNETİMİ",
      fields: [
        {
          name: "sure_ders_saati",
          label: "Ünite/tema için ayrılan süre: ……………… ders saati",
          type: "text",
          required: true,
        },
        {
          name: "sure_yeterli",
          label:
            "Öğretim programında ünite için verilen yukarıdaki toplam ders süresini yeterli buldunuz mu? Detaylandırınız.",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      id: "kavramsal_beceriler",
      title: "2. KAVRAMSAL BECERİLER",
      fields: [
        {
          name: "kavramsal_beceriler",
          label: "Kavramsal beceriler: ……………………………………………………….",
          type: "textarea",
          required: false,
        },
        {
          name: "kavramsal_beceriler_gorus",
          label:
            "Öğretim programında ünite için verilen yukarıdaki kavramsal becerilerin ders sürecinde kazanılmasına dair görüş ve değerlendirmeleriniz nedir? Bu becerilerin kazanımında öğrencilerin zorlandıkları veya başarılı oldukları bileşenleri açıklar mısınız? (Yoksa geçebilirsiniz.)",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "alan_becerileri",
      title: "3. ALAN BECERİLERİ",
      description: "Alan becerileri: (YDAB1. YDAB2. YDAB3. YDAB4. YDDB)",
      fields: [
        {
          name: "alan_becerileri_gorus",
          label:
            "Öğretim programında ünite için verilen yukarıdaki alan becerilerinin ders sürecinde kazanılmasına dair görüş ve değerlendirmeleriniz nedir? Bu becerilerin kazanımında öğrencilerin zorlandıkları veya başarılı oldukları bileşenleri açıklar mısınız?",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "egilimler",
      title: "4. EĞİLİMLER",
      fields: [
        {
          name: "egilimler",
          label: "Eğilimler: ………………………………………………………………….",
          type: "textarea",
          required: false,
        },
        {
          name: "egilimler_gorus",
          label:
            "Öğretim programında yer verilen yukarıdaki eğilimlerin öğrencilerde ortaya çıkması veya geliştirilmesi konusunda ne düşünüyorsunuz? Bu konudaki deneyimlerinizi paylaşabilir misiniz?",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "programlar_arasi",
      title: "5. PROGRAMLAR ARASI BİLEŞENLER",
      fields: [
        {
          name: "sosyal_duygusal",
          label: "Sosyal-Duygusal Öğrenme Becerileri: ………………………………………",
          type: "textarea",
          required: false,
        },
        {
          name: "sosyal_duygusal_gorus",
          label:
            "Öğretim programında yer alan yukarıdaki sosyal-duygusal öğrenme becerilerinin ders sürecinde kazanılmasına dair gözlem, deneyim ve değerlendirmeleriniz nedir?",
          type: "textarea",
          required: false,
        },
        {
          name: "degerler",
          label: "Değerler: ………………………………………………………………….",
          type: "textarea",
          required: false,
        },
        {
          name: "degerler_gorus",
          label:
            "Öğretim programında yer verilen yukarıdaki değerlerin öğrencilerin tutum ve davranışlarına yansımalarına dair gözlem ve deneyimlerinizi paylaşabilir misiniz?",
          type: "textarea",
          required: false,
        },
        {
          name: "okuryazarlik",
          label: "Okuryazarlık becerileri: ……………………………………………………",
          type: "textarea",
          required: false,
        },
        {
          name: "okuryazarlik_gorus",
          label:
            "Öğretim programında yer alan yukarıdaki okuryazarlık becerilerinin ders sürecinde kazanılmasına dair gözlem, deneyim ve değerlendirmeleriniz nedir?",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "disiplinler_arasi",
      title: "6. DİSİPLİNLER ARASI VE BECERİLER ARASI İLİŞKİLER",
      fields: [
        {
          name: "iliskilendirilen_disiplinler",
          label: "İlişkilendirilen disiplinler: …………………………………………………",
          type: "textarea",
          required: false,
        },
        {
          name: "disiplinler_arasi_gorus",
          label:
            "Öğretim programı kapsamında verilen disiplinler arası ilişkiyi öğrenme-öğretme yaşantıları sürecinde kurabildiniz mi? Bu ilişkileri nasıl somutlaştırdınız?",
          type: "textarea",
          required: false,
        },
        {
          name: "beceriler_arasi_iliskiler",
          label: "Beceriler arası ilişkiler: ……………………………………………………",
          type: "textarea",
          required: false,
        },
        {
          name: "beceriler_arasi_gorus",
          label:
            "Öğretim programında ünite ile ilişkilendirilen yukarıdaki becerilerin, beceriler arası ilişkiler çerçevesinde gerçekleşme seviyesi yeterli midir? Bu husustaki görüş ve değerlendirmelerinizi paylaşabilir misiniz?",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "ogrenme_ciktilari_1",
      title: "7. ÖĞRENME ÇIKTILARI",
      description:
        "A.    DİNLEME/İZLEME- ANLAMLANDIRMA\nB.    OKUMA-ANLAMLANDIRMA\nC.    DİL BİLGİSİ SEÇME-KULLANMA",
      fields: [
        {
          name: "ogrenme_cikti_a",
          label:
            "A.    DİNLEME/İZLEME- ANLAMLANDIRMA\nYukarıda yer verilen Alan Becerilerine ait öğrenme çıktılarını uygulanabilir buluyor musunuz? Bu çıktı ve süreç bileşenlerine dair karşılaştığınız kolaylıklar, güçlükler veya sınırlılıklar nelerdir?",
          type: "textarea",
          required: true,
        },
        {
          name: "ogrenme_cikti_b",
          label:
            "B.    OKUMA-ANLAMLANDIRMA\nYukarıda yer verilen Alan Becerilerine ait öğrenme çıktılarını uygulanabilir buluyor musunuz? Bu çıktı ve süreç bileşenlerine dair karşılaştığınız kolaylıklar, güçlükler veya sınırlılıklar nelerdir?",
          type: "textarea",
          required: false,
        },
        {
          name: "ogrenme_cikti_c",
          label:
            "C.    DİL BİLGİSİ SEÇME-KULLANMA\nYukarıda yer verilen Alan Becerilerine ait öğrenme çıktılarını uygulanabilir buluyor musunuz? Bu çıktı ve süreç bileşenlerine dair karşılaştığınız kolaylıklar, güçlükler veya sınırlılıklar nelerdir?",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "ogrenme_ciktilari_2",
      title: "8. ÖĞRENME ÇIKTILARI",
      description:
        "D.    SÖZCÜK SEÇME KULLANMA\nE.    SESLETİM SEÇME-KULLAMA\nF.     KONUŞMA-ANLATMA\nG.    YAZMA-ANLATMA",
      fields: [
        {
          name: "ogrenme_cikti_d",
          label:
            "D.    SÖZCÜK SEÇME KULLANMA\nYukarıda yer verilen Alan Becerilerine ait öğrenme çıktılarını uygulanabilir buluyor musunuz? Bu çıktı ve süreç bileşenlerine dair karşılaştığınız kolaylıklar, güçlükler veya sınırlılıklar nelerdir?",
          type: "textarea",
          required: false,
        },
        {
          name: "ogrenme_cikti_e",
          label:
            "E.    SESLETİM SEÇME-KULLAMA (Yoksa Geçiniz)\nYukarıda yer verilen Alan Becerilerine ait öğrenme çıktılarını uygulanabilir buluyor musunuz? Bu çıktı ve süreç bileşenlerine dair karşılaştığınız kolaylıklar, güçlükler veya sınırlılıklar nelerdir?",
          type: "textarea",
          required: false,
        },
        {
          name: "ogrenme_cikti_f",
          label:
            "F.     KONUŞMA-ANLATMA\nYukarıda yer verilen Alan Becerilerine ait öğrenme çıktılarını uygulanabilir buluyor musunuz? Bu çıktı ve süreç bileşenlerine dair karşılaştığınız kolaylıklar, güçlükler veya sınırlılıklar nelerdir?",
          type: "textarea",
          required: false,
        },
        {
          name: "ogrenme_cikti_g",
          label:
            "G.    YAZMA-ANLATMA\nYukarıda yer verilen Alan Becerilerine ait öğrenme çıktılarını uygulanabilir buluyor musunuz? Bu çıktı ve süreç bileşenlerine dair karşılaştığınız kolaylıklar, güçlükler veya sınırlılıklar nelerdir?",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "icerik_cercevesi",
      title: "9. İÇERİK ÇERÇEVESİ",
      fields: [
        {
          name: "icerik_cercevesi",
          label: "İçerik çerçevesi: ……………………………………………………………",
          type: "textarea",
          required: true,
        },
        {
          name: "icerik_cercevesi_gorus",
          label:
            "Öğretim programında yer alan içerik çerçevesinin uygulanabilirliğine dair görüş ve değerlendirmeleriniz nedir?",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "ogrenme_kanitlari",
      title: "10. ÖĞRENME KANITLARI (ÖLÇME VE DEĞERLENDİRME)",
      description:
        "(Arapça dersinde öğrenme kanıtlarının toplanması; yazılı sınavlar, uygulamalı sınavlar (dinleme ve konuşma) ile süreç odaklı performans değerlendirmelerini kapsamaktadır.)",
      fields: [
        {
          name: "ogrenme_kanitlari",
          label: "Öğrenme Kanıtları............................",
          type: "textarea",
          required: false,
        },
        {
          name: "yazili_sinav",
          label:
            "Yazılı Sınav Uygulamaları (Okuma, Yazma, Dil Bilgisi ve Sözcük Seçimi):\nÖğretim programında önerilen açık uçlu sorular, boşluk doldurma, eşleştirme veya kelime ilişkilendirme gibi araçların yazılı sınavlarda uygulanabilirliği hakkındaki deneyimlerinizi paylaşabilir misiniz? Karşılaştığınız kolaylıklar, güçlükler veya sınırlılıklar nelerdir?",
          type: "textarea",
          required: false,
        },
        {
          name: "uygulama_sinavlari",
          label:
            "Uygulama Sınavları (Dinleme ve Konuşma Sınavları):\nAyrı oturum/aşama olarak gerçekleştirilen Dinleme/İzleme ve Konuşma uygulamalı sınavlarında ne tür deneyimler yaşadınız? Süre, sınıf mevcudu, teknik/fiziki altyapı veya materyal açısından karşılaşılan güçlükler nelerdir?",
          type: "textarea",
          required: true,
        },
        {
          name: "performans_gorevleri",
          label: "Performans Görevleri..........................",
          type: "textarea",
          required: false,
        },
        {
          name: "performans_gorevleri_gorus",
          label:
            "Ünitelerde önerilen performans görevlerinin (afiş, poster, sunum, video vb.) ve biçimlendirici değerlendirme araçlarının (kontrol listesi, öz/akran değerlendirme vb.) uygulanabilirliği ne düzeydedir?",
          type: "textarea",
          required: false,
        },
        {
          name: "farkli_olcme_araci",
          label:
            "Programda önerilen ölçme ve değerlendirme araçlarından farklı olarak kullandığınız bir ölçme ve değerlendirme aracı varsa belirtiniz.",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "ogrenme_ogretme",
      title: "11. ÖĞRENME-ÖĞRETME YAŞANTILARI",
      description:
        "(Temel Kabuller, Ön Değerlendirme, Köprü Kurma, Öğrenme-Öğretme Uygulamaları)",
      fields: [
        {
          name: "temel_kabuller",
          label: "Temel Kabuller, Ön Değerlendirme...........................",
          type: "textarea",
          required: false,
        },
        {
          name: "temel_kabuller_gorus",
          label:
            "Temel kabuller-Ön değerlendirme:\nÖnceki öğrenme-öğretme süreçlerinde edinilen bilgi ve becerilerin (temel kabuller) öğrencilerde mevcut olup olmadığını ön değerlendirme yaparak belirleyebildiniz mi? Ön değerlendirme sürecini nasıl uyguladınız?",
          type: "textarea",
          required: false,
        },
        {
          name: "kopru_kurma",
          label: "Köprü kurma..................................",
          type: "textarea",
          required: true,
        },
        {
          name: "kopru_kurma_gorus",
          label:
            "Köprü kurma:\nÖğretim programında verilen köprü kurma sürecini nasıl gerçekleştirdiniz?",
          type: "textarea",
          required: false,
        },
        {
          name: "ogrenme_ogretme_uygulamalari",
          label:
            "Öğrenme-Öğretme Uygulamaları:\n(ARP.6.1.1. Dinleme/İzleme-Anlamlandırma, ARP.6.1.2. Okuma-Anlamlandırma, ARP.6.1.3. Dil Bilgisi Seçme-Kullanma, ARP.6.1.4. Sözcük Seçme-Kullanma, ARP.6.1.5. Sesletim Seçme-Kullanma, ARP.6.1.6. Konuşma-Anlatma, ARP.6.1.7. Yazma-Anlatma;\nARP.10.1.1. Dinleme/İzleme-Anlamlandırma, ARP.10.1.2. Okuma-Anlamlandırma, ARP.10.1.3. Dil Bilgisi Seçme-Kullanma, ARP.10.1.4. Sözcük Seçme-Kullanma, ARP.10.1.5. Konuşma-Anlatma, ARP.10.1.6. Yazma-Anlatma):\n\nÖğretim programında verilen öğrenme-öğretme uygulamalarını nasıl gerçekleştirdiniz? Öğrenme-öğretme uygulamaları kapsamında hangi öğrenme yaklaşımlarını (yöntem ve tekniklerini) kullandınız?",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      id: "farklilastirma",
      title: "12. FARKLILAŞTIRMA",
      description: "(Zenginleştirme ve Destekleme)",
      fields: [
        {
          name: "zenginlestirme",
          label: "Zenginleştirme: ………………………………………………………….",
          type: "textarea",
          required: false,
        },
        {
          name: "zenginlestirme_gorus",
          label:
            "Zenginleştirme:\nÖğretim programında zenginleştirme bölümünde yer alan öneri niteliğindeki etkinlikleri uygulanabilir buldunuz mu? Uyguladığınız zenginleştirme etkinlikleri nelerdir?",
          type: "textarea",
          required: false,
        },
        {
          name: "destekleme",
          label: "Destekleme: ………………………………………………………….",
          type: "textarea",
          required: false,
        },
        {
          name: "destekleme_gorus",
          label:
            "Destekleme:\nÖğretim programında destekleme bölümünde yer alan öneri niteliğindeki etkinlikleri uygulanabilir buldunuz mu? Uyguladığınız destekleme etkinlikleri nelerdir?",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "okul_temelli",
      title: "13. OKUL TEMELLİ PLANLAMA",
      fields: [
        {
          name: "okul_temelli_katki",
          label:
            "Okul temelli planlamanın öğretim sürecine katkısını nasıl değerlendiriyorsunuz?",
          type: "textarea",
          required: false,
        },
        {
          name: "okul_temelli_calismalar",
          label:
            "Okul temelli planlama kapsamında ne tür çalışmalar gerçekleştirdiniz? Bu çalışmaların uygulanmasında yaşadığınız deneyimleri paylaşabilir misiniz?",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      id: "destek_kaynak",
      title: "14. DESTEK VE KAYNAK",
      fields: [
        {
          name: "ders_kitabi",
          label:
            "Ders kitabını kullanılan dil ve görseller bakımından nasıl değerlendiriyorsunuz?",
          type: "textarea",
          required: false,
        },
        {
          name: "e_icerik",
          label:
            "Ders kitabında verilen e-içerik (video, animasyon, ölçme-değerlendirme) uygulamalarını kullandınız mı? Kullandığınız e-içerik uygulamaları nelerdir?",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "fiziki_kosullar",
      title: "15. FİZİKİ KOŞULLAR VE DONANIM",
      fields: [
        {
          name: "fiziki_kosullar",
          label:
            "Okulun fiziki koşul ve donanımının (sınıf ortamı, atölye, mescit, teknolojik donanım ve altyapı vb.) programın uygulanması açısından yeterliliği hakkında ne düşünüyorsunuz?",
          type: "textarea",
          required: false,
        },
        {
          name: "ogrenme_ortamlari",
          label:
            "Programın uygulanması için hangi öğrenme ortamlarına ihtiyaç duydunuz? Deneyimleriniz nedir?",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "ogretmen_yansitmalari",
      title: "16. ÖĞRETMEN YANSITMALARI",
      fields: [
        {
          name: "ogretmen_yansitmalari",
          label:
            "Öğretim programında yer alan öğretmen yansıtmalarını gerçekleştiriyor musunuz? Bu uygulamaya sahada ihtiyaç olduğunu düşünüyor musunuz?",
          type: "textarea",
          required: false,
        },
        {
          name: "gorus_oneriler",
          label:
            "Bu uygulamayı kullanırken karşılaştığınız güçlükler oluyor mu? Söz konusu uygulamanın geliştirilmesine yönelik teklif ve önerileriniz var mı?",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};

/** Tum soru alanlari (sirayla, duz liste). */
export const fields = form.sections.flatMap((s) => s.fields);

/** DB sutun adlari: id, created_at + soru alanlari (hepsi TEXT). */
export const answerColumns = fields.map((f) => f.name);

export const MAX_TEXT = 500;
export const MAX_TEXTAREA = 30000;
