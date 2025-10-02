# ▶️ Python Kod Editörü - Oyunlaştırma Platformu

Ortaokul ve lise öğrencilerine yönelik, web tabanlı Python kod editörü ve oyunlaştırma platformu. Öğrencilerin programlama becerilerini geliştirirken motivasyonlarını artırmak için tasarlanmıştır.

## ✨ Özellikler

### 🎯 Kod Editörü

- **Syntax Highlighting**: Python kodları için renklendirme
- **Otomatik Tamamlama**: Akıllı kod önerileri
- **Satır Numaraları**: Kolay navigasyon
- **Girinti Düzenleme**: Otomatik girinti desteği
- **Tema Desteği**: Monokai teması ile modern görünüm

### 🎮 Oyunlaştırma Öğeleri

- **Puan Sistemi**: Her görev için puan kazanma
- **Seviye Atlama**: Toplam puana göre seviye artışı
- **Başarı Sistemi**: Özel başarılar ve rozetler
- **İlerleme Haritası**: Görsel ilerleme takibi
- **Konfeti Animasyonu**: Başarı kutlamaları

### 📚 Görev Sistemi

- **Senaryo Tabanlı Görevler**: Gerçek hayat senaryoları
- **Zorluk Seviyeleri**: 1-5 arası zorluk dereceleri
- **Kategori Bazlı**: Temel, Döngüler, Oyunlar, Çizim vb.
- **İpucu Sistemi**: Yardım isteyebilme
- **Otomatik Kaydetme**: Kod değişikliklerini kaydetme

### 🎨 Kullanıcı Arayüzü

- **Modern Tasarım**: Gradient renkler ve animasyonlar
- **Responsive**: Mobil ve masaüstü uyumlu
- **Türkçe Arayüz**: Tam Türkçe dil desteği
- **Klavye Kısayolları**: Hızlı erişim

## 🚀 Kurulum

### Gereksinimler

- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)
- İnternet bağlantısı (CDN kaynakları için)

### Adımlar

1. Projeyi indirin veya klonlayın
2. `index.html` dosyasını web tarayıcısında açın
3. Sol menüden bir görev seçin
4. Kodlamaya başlayın!

### Dosya Yapısı

```
python-editor/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri
├── app.js             # JavaScript uygulaması
└── README.md          # Bu dosya
```

## 🎯 Görev Kategorileri

### 📝 Temel

- Merhaba Dünya
- Değişkenler ve Hesaplama

### 🔄 Döngüler

- Döngü ile Sayılar

### 🎮 Oyunlar

- Tahmin Oyunu

### 🎨 Çizim

- Turtle ile Çizim

### 📊 Veri Yapıları

- Liste İşlemleri

### ⚙️ Fonksiyonlar

- Fonksiyon Yazma

### ❓ Koşullar

- Koşullu İfadeler

## 🎮 Nasıl Kullanılır

### 1. Görev Seçimi

- Sol menüden istediğiniz görevi seçin
- Görev açıklamasını okuyun
- Başlangıç kodunu inceleyin

### 2. Kod Yazma

- CodeMirror editöründe Python kodunuzu yazın
- Syntax highlighting ile hataları görün
- Otomatik tamamlama özelliğini kullanın

### 3. Kod Çalıştırma

- "Çalıştır" butonuna tıklayın
- Sonuçları alt panelde görün
- Hataları düzeltin ve tekrar deneyin

### 4. Görev Tamamlama

- Doğru çıktıyı aldığınızda görev tamamlanır
- Puan kazanın ve seviye atlayın
- Konfeti animasyonu ile kutlama yapın

## ⌨️ Klavye Kısayolları

| Kısayol        | İşlem              |
| -------------- | ------------------ |
| `Ctrl + Enter` | Kodu çalıştır      |
| `Ctrl + R`     | Kodu sıfırla       |
| `Ctrl + H`     | İpucu göster       |
| `Ctrl + Space` | Otomatik tamamlama |
| `Tab`          | Girinti ekle       |

## 🏆 Puan Sistemi

### Puan Kazanma

- **Temel Görevler**: 10-15 puan
- **Orta Görevler**: 20-25 puan
- **Zor Görevler**: 25-30 puan

### Seviye Atlama

- **Seviye 1**: 0-99 puan
- **Seviye 2**: 100-199 puan
- **Seviye 3**: 200-299 puan
- Ve devamı...

## 🎖️ Başarılar

### Mevcut Başarılar

- **İlk Adım**: İlk görevi tamamlama
- **Kod Ustası**: 5 görev tamamlama
- **Puan Avcısı**: 100 puan toplama
- **Hızlı Kodlayıcı**: 3 görevi ilk denemede tamamlama

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler

- **HTML5**: Yapısal markup
- **CSS3**: Modern stillendirme ve animasyonlar
- **Vanilla JavaScript**: Saf JavaScript (framework yok)
- **CodeMirror**: Kod editörü
- **LocalStorage**: Veri saklama

### Desteklenen Python Özellikleri

- Temel Python syntax
- Print fonksiyonları
- Değişken tanımlama
- Döngüler (for, while)
- Koşullu ifadeler (if, elif, else)
- Fonksiyon tanımlama
- Import ifadeleri
- Turtle grafikleri
- Random modülü

## 🎨 Özelleştirme

### Tema Değiştirme

CSS dosyasındaki renk değişkenlerini değiştirerek tema özelleştirebilirsiniz:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --error-color: #dc3545;
}
```

### Yeni Görev Ekleme

`app.js` dosyasındaki `tasks` dizisine yeni görevler ekleyebilirsiniz:

```javascript
{
    id: 9,
    title: "Yeni Görev",
    description: "Görev açıklaması",
    difficulty: 2,
    category: "Yeni Kategori",
    starterCode: "# Başlangıç kodu",
    expectedOutput: "Beklenen çıktı",
    hints: ["İpucu 1", "İpucu 2"],
    points: 20
}
```

## 🐛 Bilinen Sorunlar

- Python kod çalıştırma simülasyonu kullanılmaktadır (gerçek Python backend yok)
- Karmaşık Python kütüphaneleri desteklenmemektedir
- Dosya işlemleri desteklenmemektedir

## 🔮 Gelecek Özellikler

- [ ] Gerçek Python backend entegrasyonu
- [ ] Daha fazla görev ve kategori
- [ ] Çoklu kullanıcı desteği
- [ ] Öğretmen paneli
- [ ] İlerleme raporları
- [ ] Çevrimiçi işbirliği
- [ ] Ses efektleri
- [ ] Daha fazla animasyon

## 📞 Destek

Herhangi bir sorun veya öneriniz için:

- GitHub Issues kullanın
- Proje sayfasında tartışma başlatın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Katkıda Bulunanlar

- Geliştirici: [Adınız]
- Tasarım: Vanilla CSS
- İkonlar: Emoji ve Unicode karakterler

---

**Not**: Bu proje eğitim amaçlı geliştirilmiştir ve gerçek Python kod çalıştırma özelliği bulunmamaktadır. Gerçek Python kodları için Pyodide veya benzeri bir JavaScript Python runtime kullanılması önerilir.
