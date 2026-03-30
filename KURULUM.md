# 🎮 Kim Milyoner Olmak İster - Kurulum Rehberi

## ⚠️ Önemli Not

Sisteminizde Node.js v22.2.0 yüklü, ancak Vite 8 için v22.12.0+ gerekiyor.

### Çözüm Seçenekleri:

#### Seçenek 1: Node.js Güncelleme (Önerilen)
```bash
# nvm kullanıyorsanız:
nvm install 22.12.0
nvm use 22.12.0

# veya direkt indirin:
# https://nodejs.org/
```

#### Seçenek 2: Vite Versiyonunu Düşürme
```bash
cd milyoner-oyunu
npm install vite@5.4.11 --save-dev
```

## 🚀 Hızlı Başlangıç

```bash
cd milyoner-oyunu
npm install
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresini açın.

## 📝 Soru Ekleme

`src/data/questions.json` dosyasına yeni sorular ekleyin:

```json
{
  "id": 296,
  "level": 1,
  "question": "Sınıfımızın en komik anısı nedir?",
  "options": ["Şık A", "Şık B", "Şık C", "Şık D"],
  "answer": 0,
  "note": "İç şaka açıklaması"
}
```

## 🎵 Ses Dosyaları (Opsiyonel)

`public/sounds/` klasörüne şu dosyaları ekleyin:
- `correct.mp3`
- `wrong.mp3`
- `thinking.mp3`
- `intro.mp3`

## 🎯 Akıllı Tahta Kullanımı

1. Tarayıcıyı tam ekran yapın (F11)
2. Zoom seviyesini %100 yapın
3. Oyunu başlatın

## 🏆 Özellikler

- 295 soru (her seviye için çoklu soru havuzu)
- Rastgele soru seçimi
- 3 joker hakkı
- 30 saniyelik zamanlayıcı
- Para merdiveni
- Baraj soruları (5. ve 10.)
- Liderlik tablosu
- Hexagon buton tasarımı
- Smooth animasyonlar

## 🛠️ Geliştirme

```bash
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Kod kontrolü
```

## 📱 Tarayıcı Desteği

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

İyi oyunlar! 🎉
