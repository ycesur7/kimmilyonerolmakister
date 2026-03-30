# Kim Milyoner Olmak İster? 🎮

Modern, karanlık temalı ve profesyonel bir "Kim Milyoner Olmak İster?" web uygulaması.

## 🚀 Özellikler

- ✅ **498 adet soru** (15 seviye × 28-37 soru)
- ✅ Çeşitli kategoriler: Genel kültür, Matematik, Osmanlı tarihi, İslam, Kemal Sunal filmleri, Türk müziği
- ✅ 3 Joker sistemi (50:50, Seyirci, Telefon)
- ✅ **Baraj öncesi (1-10)**: 40 saniye süre
- ✅ **Baraj sonrası (11-15)**: Süresiz
- ✅ Para merdiveni takibi
- ✅ Baraj soruları (5. ve 10. sorular)
- ✅ Liderlik tablosu (localStorage)
- ✅ Hexagon (altıgen) buton tasarımı
- ✅ Akıllı tahta uyumlu (1920x1080)
- ✅ **Ses sistemi**: Thinking müziği loop, doğru/yanlış sesleri
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
3. **Baraj öncesi (1-10)**: Her soru için 40 saniye
4. **Baraj sonrası (11-15)**: Süresiz düşünme hakkı
5. 3 joker hakkın var (her biri 1 kez kullanılabilir)
6. 5. ve 10. sorular baraj soruları
7. Yanlış cevapta:
   - 1-5 arası: 0 TL
   - 6-10 arası: 10.000 TL garantili
   - 11-15 arası: 500.000 TL garantili

## 🎵 Ses Sistemi

Oyun ATV'deki "Kim Milyoner Olmak İster?" programından esinlenmiştir:

- **thinking.mp3**: Soru okunurken sürekli loop olarak çalar (40 saniye)
- **correct.mp3**: Doğru cevap verildiğinde çalar
- **wrong.mp3**: Yanlış cevap verildiğinde çalar

Ses dosyalarını `public/sounds/` klasörüne ekleyin. YouTube'dan "Kim Milyoner thinking music" aratarak bulabilirsiniz.

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
