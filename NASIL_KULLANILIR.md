# 🎮 Kim Milyoner Olmak İster - Kullanım Kılavuzu

## 🚀 Hemen Başla

```bash
cd milyoner-oyunu
npm run dev
```

Tarayıcınızda otomatik olarak açılacak veya `http://localhost:5173` adresine gidin.

## 🎯 Oyun Özellikleri

### 📊 Soru Sistemi
- **295 soru** 15 farklı seviyede
- Her seviye için **çoklu soru havuzu** (rastgele seçim)
- Sorular kolaydan zora doğru sıralanmış

### 🎪 Jokerler
1. **50:50** - İki yanlış şıkkı elenir
2. **👥 Seyirci** - Seyirci oylaması gösterilir
3. **📞 Telefon** - Bir arkadaşınız yardım eder

Her joker oyun boyunca **sadece 1 kez** kullanılabilir!

### 💰 Para Merdiveni
- 15 seviye, 5.000.000 TL'ye kadar
- **Baraj Soruları**: 5. soru (10.000 TL) ve 10. soru (500.000 TL)
- Yanlış cevapta baraj miktarı garantili

### ⏱️ Zamanlayıcı
- **Baraj öncesi (1-10)**: Her soru için 40 saniye
- **Baraj sonrası (11-15)**: Süresiz düşünme hakkı
- Son 10 saniyede kırmızı yanıp söner
- Süre biterse otomatik yanlış sayılır

### 🏆 Liderlik Tablosu
- En iyi 10 skor kaydedilir
- LocalStorage ile tarayıcıda saklanır
- İsim, miktar ve tarih gösterilir

## 🎨 Sınıf İçin Özelleştirme

### Kendi Sorularını Ekle

`src/data/questions.json` dosyasını aç ve yeni sorular ekle:

```json
{
  "id": 296,
  "level": 1,
  "question": "Sınıfımızın en sevdiği ders hangisidir?",
  "options": ["Matematik", "Fizik", "Beden", "Teneffüs"],
  "answer": 3,
  "note": "Herkes teneffüsü sever! 😄"
}
```

**İpuçları:**
- `level`: 1-15 arası zorluk seviyesi
- `answer`: 0-3 arası (0=A, 1=B, 2=C, 3=D)
- `note`: Cevap açıklaması (opsiyonel)

### Soru Kategorileri Önerileri

1. **Sınıf İçi Şakalar** (Seviye 1-3)
   - "Derste en çok uyuyan kim?"
   - "Kantinde en popüler yiyecek?"

2. **Ders Konuları** (Seviye 4-8)
   - O haftaki ders konularından sorular
   - Öğretmen isimlerini şıklara ekle

3. **Okul Bilgisi** (Seviye 9-12)
   - Okul tarihi
   - Müdür isimleri
   - Okul rekorları

4. **Zor Sorular** (Seviye 13-15)
   - Detaylı akademik sorular
   - Popüler kültür

## 🎵 Ses Dosyaları Nasıl Eklenir?

### Adım 1: Sesleri İndir
YouTube'dan şu aramaları yap:
- "Kim Milyoner thinking music"
- "Kim Milyoner correct answer sound"
- "Kim Milyoner wrong answer sound"

### Adım 2: MP3'e Çevir
Online MP3 converter kullan (örn: y2mate.com, ytmp3.cc)

### Adım 3: Dosyaları Kopyala
İndirdiğin dosyaları şu isimlerde `public/sounds/` klasörüne kopyala:
- `thinking.mp3` (40 saniye, loop olarak çalacak)
- `correct.mp3` (doğru cevap sesi)
- `wrong.mp3` (yanlış cevap sesi)

### Ses Sistemi Nasıl Çalışır?

- **Soru başladığında**: `thinking.mp3` otomatik başlar ve loop olarak çalar
- **Müzik sorusu**: YouTube'dan şarkı çalar (30 saniye), sonra thinking başlar
- **Cevap verildiğinde**: Thinking müziği durur
  - Doğru: `correct.mp3` çalar (10 saniye alkış)
  - Yanlış: `wrong.mp3` çalar (3-5 saniye)
- **Sonraki soru**: Thinking müziği tekrar başlar
- **Baraj sonrası (11-15)**: Süre yok ama müzik çalmaya devam eder

## 📺 Akıllı Tahtada Kullanım

1. **Tam Ekran Yap**: F11 tuşuna bas
2. **Zoom Ayarla**: Ctrl + 0 (sıfır) ile %100 yap
3. **Oyunu Başlat**: İsim gir ve başla
4. **Büyük Butonlar**: Dokunmatik ekranda kolay kullanım

## 🎓 Sınıfta Kullanım Senaryoları

### Senaryo 1: Haftalık Quiz
- Her hafta o haftanın konularından 15 soru ekle
- Öğrenciler sırayla yarışsın
- En yüksek skoru alan ödül kazansın

### Senaryo 2: Takım Yarışması
- Sınıfı 4 takıma böl
- Her takım sırayla cevaplasın
- Jokerler takım kararıyla kullanılsın

### Senaryo 3: Ders Tekrarı
- Sınav öncesi konu tekrarı için kullan
- Yanlış cevaplarda açıklama göster
- Öğrenciler not alsın

## 🛠️ Sorun Giderme

### Oyun Açılmıyor
```bash
# Node_modules'ü temizle ve yeniden kur
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Sorular Görünmüyor
- `src/data/questions.json` dosyasının JSON formatında olduğundan emin ol
- Son satırda virgül olmamalı
- Tüm süslü parantezler kapalı olmalı

### Jokerler Çalışmıyor
- Tarayıcı konsolunu aç (F12)
- Hata mesajlarını kontrol et
- Sayfayı yenile (Ctrl + R)

## 📱 Mobil Kullanım

Şu anda masaüstü/akıllı tahta için optimize edilmiş. Mobil için:
- Tarayıcıyı yatay (landscape) moda al
- Zoom seviyesini ayarla
- Tam ekran modunu kullan

## 🎉 İyi Eğlenceler!

Sorularını özelleştir, sınıf arkadaşlarınla yarış ve eğlen! 🚀
