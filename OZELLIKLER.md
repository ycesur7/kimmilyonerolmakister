# 🎮 Kim Milyoner Olmak İster - Özellikler

## ✨ Tamamlanan Özellikler

### 📊 Soru Sistemi
- **503 soru** (15 seviye)
- Her seviyede 28-37 soru (rastgele seçim)
- Kategoriler:
  - 🌍 Genel kültür ve dünya bilgisi
  - 🔢 Matematik (temel işlemlerden ileri matematiğe)
  - 🕌 İslam dini bilgisi
  - 🏛️ Osmanlı tarihi (padişahlar, kurumlar, antlaşmalar)
  - 🎬 Kemal Sunal filmleri
  - 🎵 Türk müziği (Tarkan, Sezen Aksu, Barış Manço, vb.)
  - 🎭 Yeşilçam klasikleri

### 🎵 Müzik Soruları (YENİ!)
- **5 müzik sorusu** farklı seviyelerde
- Oyuncu "Hazırım" der → YouTube'dan şarkı 30 saniye çalar
- Şarkı bitince soru ekranı gelir ve süre başlar
- **Müzikler otomatik çalınır** (YouTube API ile)
- İndirmeye gerek yok!

### 🎪 Joker Sistemi
- **50:50**: İki yanlış şıkkı elenir
- **👥 Seyirci**: Seyirci oylaması (doğru cevaba %60-80 oy)
- **📞 Telefon**: Arkadaş yardımı (%70-90 güven)
- Her joker oyunda 1 kez kullanılabilir

### ⏱️ Zamanlayıcı Sistemi
- **Baraj öncesi (1-10)**: 40 saniye süre
- **Baraj sonrası (11-15)**: Süresiz düşünme
- Son 10 saniyede kırmızı yanıp söner
- Süre biterse otomatik yanlış

### 🎵 Ses Sistemi
- **thinking.mp3**: Soru okunurken loop çalar (40 saniye)
- **correct.mp3**: Doğru cevap alkış sesi (10 saniye)
- **wrong.mp3**: Yanlış cevap dramatik ses (3-5 saniye)
- Müzik soruları YouTube'dan otomatik çalar

### 💰 Para Merdiveni
- 15 seviye: 1.000 TL → 5.000.000 TL
- **Baraj soruları**: 5. soru (10.000 TL) ve 10. soru (500.000 TL)
- Barajlar altın renkli ve kalkan emojili
- Yanlış cevapta baraj miktarı garantili

### 🏆 Liderlik Tablosu
- En iyi 10 skor
- LocalStorage ile saklanır
- İsim, miktar, tarih gösterilir
- Otomatik sıralama (en yüksekten düşüğe)

### 🎨 Tasarım ve Animasyonlar
- **Karanlık tema**: Lacivert, mor, altın gradyanlar
- **Hexagon butonlar**: Altıgen şekilli şıklar
- **Smooth animasyonlar**: Framer Motion ile
  - Giriş ekranı: Zoom ve fade efektleri
  - Sorular: 3D rotasyon ve scale
  - Butonlar: Hover ve tap animasyonları
  - Para merdiveni: Slide ve pulse efektleri
  - Bitiş ekranı: Dramatik giriş animasyonu
- **Arka plan efektleri**: Radial gradient pulse
- **Shimmer efektleri**: Altın parıltılar

### 📱 Akıllı Tahta Uyumluluğu
- 1920x1080 çözünürlük optimizasyonu
- Büyük butonlar (kolay dokunma)
- Yüksek kontrast renkler
- 24px+ font boyutları
- Tam ekran modu

## 🎯 Oyun Akışı

1. **Giriş**: İsim gir → Animasyonlu başlangıç
2. **Oyun**: 
   - Normal soru: Thinking müziği + 40 saniye (baraj öncesi)
   - Müzik sorusu: "Hazırım" → Şarkı çal → Soru + süre
   - Baraj sonrası: Süresiz + thinking müziği
3. **Cevap**: Doğru (alkış 10 sn) / Yanlış (dramatik ses)
4. **Bitiş**: Final para + Liderlik tablosu + Yeniden oyna

## 🚀 Teknik Detaylar

- **React 18** + Hooks (useState, useEffect, useRef)
- **Vite 5** (hızlı build)
- **Tailwind CSS 3** (utility-first styling)
- **Framer Motion** (animasyonlar)
- **YouTube Embed API** (müzik soruları)
- **LocalStorage** (liderlik tablosu)
- **Audio API** (ses efektleri)

## 📈 Performans

- Build boyutu: ~420 KB (gzip: ~130 KB)
- İlk yükleme: < 2 saniye
- Animasyonlar: 60 FPS
- Ses gecikmesi: < 100ms

## 🎓 Eğitim Amaçlı Kullanım

- Sınıf içi quiz yarışmaları
- Ders konusu tekrarı
- Eğlenceli öğrenme
- Takım çalışması
- Bilgi yarışması turnuvaları
