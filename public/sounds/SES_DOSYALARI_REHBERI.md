# 🎵 Ses Dosyaları Rehberi

## Gerekli Dosyalar

Bu klasöre şu 3 dosyayı eklemelisin:

1. **thinking.mp3** (40 saniye) - Soru okunurken çalan müzik
2. **correct.mp3** (10 saniye) - Doğru cevap alkış sesi
3. **wrong.mp3** (3-5 saniye) - Yanlış cevap dramatik sesi

## 📥 Nasıl İndirilir?

### YouTube'dan İndirme

1. YouTube'da ara:
   - "Kim Milyoner thinking music"
   - "Kim Milyoner correct answer"
   - "Kim Milyoner wrong answer"

2. Video URL'sini kopyala

3. Online MP3 converter kullan:
   - y2mate.com
   - ytmp3.cc
   - yt1s.com

4. MP3 olarak indir

5. Dosya isimlerini düzenle:
   - `thinking.mp3`
   - `correct.mp3`
   - `wrong.mp3`

6. Bu klasöre kopyala

### Alternatif: Kendi Seslerini Kullan

Eğer kendi ses dosyalarını kullanmak istersen:
- Thinking müziği: 40 saniye uzunluğunda olmalı (loop çalacak)
- Correct/Wrong: 3-5 saniye kısa efektler

## ✅ Kontrol

Dosyaları ekledikten sonra:

```bash
ls -la public/sounds/
```

Şunları görmelisin:
- thinking.mp3
- correct.mp3
- wrong.mp3

## 🎮 Oyunda Nasıl Çalışır?

1. **Oyun başladığında**: thinking.mp3 otomatik başlar (loop)
2. **Cevap verildiğinde**: 
   - Thinking müziği durur
   - Doğru ise: correct.mp3 çalar
   - Yanlış ise: wrong.mp3 çalar
3. **Sonraki soru**: Thinking müziği tekrar başlar
4. **Baraj sonrası (11-15)**: Süre yok ama müzik devam eder

## ⚠️ Önemli Notlar

- Ses dosyaları olmadan oyun çalışır ama sessiz olur
- Tarayıcı ses izni isteyebilir (izin ver)
- Ses dosyaları MP3 formatında olmalı
- Dosya isimleri tam olarak eşleşmeli (küçük harf)

## 🎬 ATV Formatı

Orijinal ATV programındaki gibi:
- Thinking müziği 40 saniye (baraj öncesi sorular için)
- Baraj sonrası sorularda süre yok, müzik loop devam eder
- Doğru cevap: Alkış ve kutlama sesi
- Yanlış cevap: Dramatik ses efekti
