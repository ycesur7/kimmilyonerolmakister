# Kim Milyoner Olmak İster? 🎮

Modern, karanlık temalı ve profesyonel bir "Kim Milyoner Olmak İster?" web uygulaması.

## 🚀 Özellikler

- ✅ 295 adet Türkçe soru (15 seviye × ~20 soru)
- ✅ 3 Joker sistemi (50:50, Seyirci, Telefon)
- ✅ 30 saniyelik zamanlayıcı
- ✅ Para merdiveni takibi
- ✅ Baraj soruları (5. ve 10. sorular)
- ✅ Liderlik tablosu (localStorage)
- ✅ Hexagon (altıgen) buton tasarımı
- ✅ Akıllı tahta uyumlu (1920x1080)
- ✅ Smooth animasyonlar (Framer Motion)
- ✅ Karanlık tema (Lacivert, Mor, Altın)

## 📦 Kurulum

```bash
cd milyoner-oyunu
npm install
npm run dev
```

## 🎯 Oyun Kuralları

1. Oyuncu adını gir ve başla
2. 15 soruyu sırayla cevapla
3. Her soru için 30 saniye süren var
4. 3 joker hakkın var (her biri 1 kez kullanılabilir)
5. 5. ve 10. sorular baraj soruları
6. Yanlış cevapta:
   - 1-5 arası: 0 TL
   - 6-10 arası: 10.000 TL garantili
   - 11-15 arası: 500.000 TL garantili

## 🎨 Özelleştirme

### Soru Ekleme

`src/data/questions.json` dosyasına yeni sorular ekleyebilirsin:

```json
{
  "id": 296,
  "level": 1,
  "question": "Soru metni?",
  "options": ["Şık A", "Şık B", "Şık C", "Şık D"],
  "answer": 0,
  "note": "Açıklama"
}
```

### Ses Dosyaları

`public/sounds/` klasörüne şu dosyaları ekle:
- `correct.mp3` - Doğru cevap sesi
- `wrong.mp3` - Yanlış cevap sesi
- `thinking.mp3` - Düşünme müziği
- `intro.mp3` - Giriş müziği

## 🎓 Teknolojiler

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- LocalStorage API

## 📱 Akıllı Tahta Kullanımı

Uygulama 1920x1080 çözünürlüğe optimize edilmiştir:
- Büyük butonlar (kolay dokunma)
- Yüksek kontrast renkler
- 24px+ font boyutları
- Tam ekran modu destekli

## 🏆 Geliştirme Fikirleri

- [ ] Ses efektleri ekle
- [ ] Multiplayer mod
- [ ] Kategori bazlı sorular
- [ ] Zorluk seçimi
- [ ] Online liderlik tablosu
- [ ] Mobil responsive tasarım

## 📝 Lisans

MIT License - Eğitim amaçlı kullanım için serbesttir.
