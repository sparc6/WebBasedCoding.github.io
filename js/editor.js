// Editor Screen JavaScript

// Global Variables
let currentTask = null;
let isDarkTheme = false;
let pyodide = null;
let isPyodideLoaded = false;
let editor = null;
let isFreeMode = false;
let currentFontSize = 14;

// User Progress Data
let userProgress = {
  level: 1,
  points: 0,
  completedTasks: [],
  achievements: [],
};

// Task Data
const tasks = [
  {
    id: 1,
    title: "Merhaba Dünya",
    description: "İlk Python programınızı yazın ve 'Merhaba Dünya' yazdırın.",
    difficulty: 1,
    category: "Temel",
    level: "Temel",
    starterCode: 'print("Merhaba Dünya")',
    expectedOutput: "Merhaba Dünya",
    shortHint: "print() fonksiyonunu kullanın ve tırnak işaretlerini unutmayın.",
    longHint: `# Python'da Metin Yazdırma

Python'da metin yazdırmak için **print()** fonksiyonu kullanılır.

## Temel Kullanım:
\`\`\`python
print("Merhaba Dünya")
\`\`\`

## Önemli Noktalar:
• **Tırnak işaretleri** ("" veya '') kullanılmalı
• **Metin** tırnak içinde yazılmalı
• **print()** fonksiyonu parantez içinde çağrılmalı

## Adım Adım:
1. **print** yazın
2. **Açık parantez** ( yazın
3. **Tırnak** " yazın
4. **Merhaba Dünya** yazın
5. **Kapanış tırnağı** " yazın
6. **Kapanış parantezi** ) yazın

## Örnek Çıktı:
\`\`\`
Merhaba Dünya
\`\`\``,
    points: 10
  },
  {
    id: 2,
    title: "Değişkenler ve Hesaplama",
    description: "İki sayıyı toplayan bir program yazın.",
    difficulty: 1,
    category: "Temel",
    level: "Temel",
    starterCode: "sayi1 = 5\nsayi2 = 3",
    expectedOutput: "8",
    shortHint: "Değişkenleri toplayın ve sonucu print() ile yazdırın.",
    longHint: `# Python'da Değişkenler ve Hesaplama

**Değişkenler** veri saklamak için kullanılır. Python'da değişken tanımlamak çok kolaydır!

## Değişken Tanımlama:
\`\`\`python
sayi1 = 5
sayi2 = 3
\`\`\`

## Hesaplama ve Yazdırma:
\`\`\`python
toplam = sayi1 + sayi2
print(toplam)
\`\`\`

## Adım Adım:
1. **İlk sayıyı** değişkene atayın: \`sayi1 = 5\`
2. **İkinci sayıyı** değişkene atayın: \`sayi2 = 3\`
3. **Toplamı hesaplayın**: \`toplam = sayi1 + sayi2\`
4. **Sonucu yazdırın**: \`print(toplam)\`

## Önemli Noktalar:
• **=** işareti atama operatörüdür
• **+** işareti toplama operatörüdür
• Değişken isimleri **harf** ile başlamalı
• **print()** ile sonucu ekrana yazdırın

## Örnek Çıktı:
\`\`\`
8
\`\`\``,
    points: 15
  },
  {
    id: 3,
    title: "Kullanıcı Girişi",
    description: "Kullanıcıdan isim alıp selamlama yapın.",
    difficulty: 2,
    category: "Temel",
    level: "Temel",
    starterCode: "# input() fonksiyonu ile kullanıcı girişi alın",
    expectedOutput: "Merhaba [İsim]",
    shortHint: "input() fonksiyonunu kullanın ve f-string ile birleştirin.",
    longHint: `# Kullanıcı Girişi

**input()** fonksiyonu kullanıcıdan veri almak için kullanılır. **F-string** ise metinleri birleştirmek için harika bir yöntemdir!

## Kullanıcıdan Veri Alma:
\`\`\`python
isim = input("İsminizi girin: ")
\`\`\`

## F-string ile Birleştirme:
\`\`\`python
print(f"Merhaba {isim}")
\`\`\`

## Adım Adım:
1. **input()** ile kullanıcıdan isim alın
2. **F-string** kullanarak metinleri birleştirin
3. **print()** ile sonucu yazdırın

## F-string Nedir?
• **f** harfi ile başlar
• **{değişken}** şeklinde değişkenleri kullanır
• **Tırnak** içinde yazılır

## Örnek Kullanım:
\`\`\`python
isim = input("İsminizi girin: ")
print(f"Merhaba {isim}")
\`\`\`

## Örnek Çıktı:
\`\`\`
İsminizi girin: Ali
Merhaba Ali
\`\`\``,
    points: 20
  },
  {
    id: 4,
    title: "Koşullu İfadeler",
    description: "Yaş kontrolü yapan bir program yazın.",
    difficulty: 2,
    category: "Orta",
    level: "Orta",
    starterCode: "yas = 18",
    expectedOutput: "Reşit",
    shortHint: "if-else yapısını kullanın ve yaşı kontrol edin.",
    longHint: `# Koşullu İfadeler (if-else)

**Koşullu ifadeler** programın farklı durumlarda farklı davranmasını sağlar. **if-else** yapısı en temel koşullu ifadedir!

## Temel Yapı:
\`\`\`python
if yas >= 18:
    print("Reşit")
else:
    print("Reşit değil")
\`\`\`

## Adım Adım:
1. **Yaş değişkenini** tanımlayın: \`yas = 18\`
2. **if** ile koşulu başlatın: \`if yas >= 18:\`
3. **İki nokta** (:) unutmayın!
4. **Girinti** ile kod bloğunu yazın: \`print("Reşit")\`
5. **else** ile alternatif durumu yazın: \`else:\`
6. **Girinti** ile else bloğunu yazın: \`print("Reşit değil")\`

## Önemli Noktalar:
• **if** ve **else** sonunda **:** (iki nokta) olmalı
• **Girinti** (4 boşluk) çok önemli!
• **>=** "büyük eşit" anlamına gelir
• **print()** fonksiyonları girintili olmalı

## Karşılaştırma Operatörleri:
• **==** eşit mi?
• **!=** eşit değil mi?
• **>** büyük mü?
• **<** küçük mü?
• **>=** büyük eşit mi?
• **<=** küçük eşit mi?

## Örnek Çıktı:
\`\`\`
Reşit
\`\`\``,
    points: 25
  },
  {
    id: 5,
    title: "Döngüler",
    description: "1'den 10'a kadar sayıları yazdırın.",
    difficulty: 2,
    category: "Orta",
    level: "Orta",
    starterCode: "# for döngüsü kullanın",
    expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
    shortHint: "for döngüsü ve range() fonksiyonunu kullanın.",
    longHint: `# Döngüler (for loop)

**Döngüler** aynı işlemi birden fazla kez yapmak için kullanılır. **for** döngüsü en yaygın döngü türüdür!

## Temel Yapı:
\`\`\`python
for i in range(1, 11):
    print(i)
\`\`\`

## Adım Adım:
1. **for** ile döngüyü başlatın
2. **i** değişken adı (istediğiniz olabilir)
3. **in** anahtar kelimesi
4. **range(1, 11)** ile sayı aralığını belirleyin
5. **:** (iki nokta) unutmayın!
6. **Girinti** ile döngü içindeki kodu yazın

## range() Fonksiyonu:
• **range(1, 11)** → 1'den 10'a kadar (11 dahil değil!)
• **range(5)** → 0'dan 4'e kadar
• **range(0, 10, 2)** → 0, 2, 4, 6, 8

## Önemli Noktalar:
• **Girinti** (4 boşluk) çok önemli!
• **range(1, 11)** 1'den 10'a kadar sayar
• **print(i)** her sayıyı ayrı satırda yazdırır
• **i** değişkeni her döngüde farklı değer alır

## Örnek Çıktı:
\`\`\`
1
2
3
4
5
6
7
8
9
10
\`\`\``,
    points: 30
  },
  {
    id: 6,
    title: "Fonksiyonlar",
    description: "İki sayıyı toplayan fonksiyon yazın.",
    difficulty: 3,
    category: "Orta",
    level: "Orta",
    starterCode: "# def ile fonksiyon tanımlayın",
    expectedOutput: "15",
    shortHint: "def ile fonksiyon tanımlayın ve return kullanın.",
    longHint: `# Fonksiyonlar (Functions)

**Fonksiyonlar** kod parçacıklarını tekrar kullanılabilir hale getirir. **def** anahtar kelimesi ile fonksiyon tanımlanır!

## Fonksiyon Tanımlama:
\`\`\`python
def topla(a, b):
    return a + b
\`\`\`

## Fonksiyon Çağırma:
\`\`\`python
sonuc = topla(5, 10)
print(sonuc)
\`\`\`

## Adım Adım:
1. **def** ile fonksiyonu başlatın
2. **topla** fonksiyon adı (istediğiniz olabilir)
3. **(a, b)** parametreler (giriş değerleri)
4. **:** (iki nokta) unutmayın!
5. **Girinti** ile fonksiyon içindeki kodu yazın
6. **return** ile sonucu döndürün

## Önemli Noktalar:
• **def** fonksiyon tanımlama anahtar kelimesi
• **return** fonksiyondan değer döndürür
• **Girinti** (4 boşluk) çok önemli!
• **Parametreler** fonksiyonun giriş değerleridir
• **Fonksiyon çağırma** ile kullanılır

## Fonksiyon Avantajları:
• **Tekrar kullanılabilir** kod
• **Daha temiz** program yapısı
• **Hata ayıklama** kolaylığı
• **Modüler** programlama

## Örnek Çıktı:
\`\`\`
15
\`\`\``,
    points: 35
  },
  {
    id: 7,
    title: "Listeler",
    description: "Meyve listesi oluşturup elemanlarını yazdırın.",
    difficulty: 3,
    category: "İleri",
    level: "İleri",
    starterCode: "# Liste oluşturun ve for döngüsü ile yazdırın",
    expectedOutput: "elma\narmut\nmuz",
    shortHint: "[] ile liste oluşturun ve for döngüsü ile yazdırın.",
    longHint: `# Listeler (Lists)

**Listeler** birden fazla veriyi tek bir değişkende saklamak için kullanılır. **[]** köşeli parantezler ile oluşturulur!

## Liste Oluşturma:
\`\`\`python
meyveler = ["elma", "armut", "muz"]
\`\`\`

## Liste Elemanlarını Yazdırma:
\`\`\`python
for meyve in meyveler:
    print(meyve)
\`\`\`

## Adım Adım:
1. **[]** ile listeyi başlatın
2. **Elemanları** tırnak içinde yazın
3. **Virgül** ile ayırın
4. **]** ile listeyi kapatın
5. **for** döngüsü ile elemanları gezin
6. **print()** ile her elemanı yazdırın

## Liste Özellikleri:
• **Sıralı** veri yapısı
• **Değiştirilebilir** (mutable)
• **Tekrarlanabilir** elemanlar
• **Farklı veri türleri** içerebilir

## Liste İndeksleri:
• **0** ilk eleman
• **1** ikinci eleman
• **-1** son eleman
• **len()** liste uzunluğu

## Örnek Kullanım:
\`\`\`python
meyveler = ["elma", "armut", "muz"]
for meyve in meyveler:
    print(meyve)
\`\`\`

## Örnek Çıktı:
\`\`\`
elma
armut
muz
\`\`\``,
    points: 40
  },
  {
    id: 8,
    title: "Sözlükler",
    description: "Öğrenci bilgilerini sözlükte saklayın.",
    difficulty: 3,
    category: "İleri",
    level: "İleri",
    starterCode: "# Sözlük oluşturun ve elemanları yazdırın",
    expectedOutput: "Ali: 85",
    shortHint: "{} ile sözlük oluşturun ve items() ile yazdırın.",
    longHint: `# Sözlükler (Dictionaries)

**Sözlükler** anahtar-değer çiftleri ile veri saklamak için kullanılır. **{}** süslü parantezler ile oluşturulur!

## Sözlük Oluşturma:
\`\`\`python
ogrenci = {"isim": "Ali", "not": 85}
\`\`\`

## Sözlük Elemanlarını Yazdırma:
\`\`\`python
for anahtar, deger in ogrenci.items():
    print(f"{anahtar}: {deger}")
\`\`\`

## Adım Adım:
1. **{}** ile sözlüğü başlatın
2. **"anahtar": "değer"** formatında yazın
3. **Virgül** ile ayırın
4. **}** ile sözlüğü kapatın
5. **.items()** ile anahtar-değer çiftlerini alın
6. **for** döngüsü ile gezin
7. **f-string** ile yazdırın

## Sözlük Özellikleri:
• **Anahtar-değer** çiftleri
• **Sırasız** veri yapısı
• **Değiştirilebilir** (mutable)
• **Benzersiz** anahtarlar
• **Farklı veri türleri** içerebilir

## Sözlük Metodları:
• **.keys()** anahtarları döndürür
• **.values()** değerleri döndürür
• **.items()** anahtar-değer çiftlerini döndürür
• **len()** sözlük uzunluğu

## Örnek Kullanım:
\`\`\`python
ogrenci = {"isim": "Ali", "not": 85}
for anahtar, deger in ogrenci.items():
    print(f"{anahtar}: {deger}")
\`\`\`

## Örnek Çıktı:
\`\`\`
isim: Ali
not: 85
\`\`\``,
    points: 45
  }
];

// Load User Progress from LocalStorage
function loadUserProgress() {
  const saved = localStorage.getItem("pythonEditorProgress");
  if (saved) {
    userProgress = JSON.parse(saved);
  }
}

// Save User Progress to LocalStorage
function saveUserProgress() {
  localStorage.setItem("pythonEditorProgress", JSON.stringify(userProgress));
}

// Get URL Parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Hide Analysis Popup
function hideAnalysisPopup() {
  const popup = document.getElementById('analyzingPopup');
  if (popup) {
    popup.remove();
    console.log("Analiz popup kaldırıldı");
  }
}

// Show Free Mode Analysis Popup
function showFreeModeAnalysisPopup() {
  console.log("showFreeModeAnalysisPopup çağrıldı");
  
  // Use the same popup as task mode
  showAnalysisPopup();
}

// Show Free Mode Error Modal
function showFreeModeErrorModal(errorMessage) {
  console.log("showFreeModeErrorModal çağrıldı, hata:", errorMessage);
  
  const popup = document.createElement('div');
  popup.id = 'failurePopup';
  popup.innerHTML = `
    <div class="failure-background"></div>
    <div class="failure-content">
      <div class="failure-icon">
        <div class="failure-circle">
          <div class="failure-x">✕</div>
        </div>
      </div>
      <h2>❌ Kod Doğru Değil</h2>
      <p>Kodunuzda bir hata var!</p>
      
      <div class="failure-details">
        <div class="error-info">
          <h3>🔍 Hata Detayı:</h3>
          <div class="expected-output">
            <span class="output-text">${errorMessage}</span>
          </div>
          <p class="hint-text">Lütfen kodunuzu kontrol edin ve tekrar deneyin.</p>
        </div>
      </div>
      
      <div class="failure-actions">
        <button class="btn btn-retry" onclick="closeFreeModeFailurePopup()">Tekrar Dene</button>
      </div>
    </div>
  `;
  
  // Add the same styles as task mode
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  `;
  
  // Add CSS styles
  const style = document.createElement('style');
  style.textContent = `
    .failure-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
    }
    
    .failure-content {
      position: relative;
      background: white;
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
      animation: failureSlideIn 0.5s ease;
      z-index: 1;
      overflow: hidden;
    }
    
    .failure-icon {
      margin: 0 auto 1rem;
      width: 60px;
      height: 60px;
    }
    
    .failure-circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: failureShake 0.6s ease;
      box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
      border: 4px solid #fff;
    }
    
    .failure-x {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
      font-weight: 900;
      animation: failurePulse 0.5s ease 0.3s both;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
    
    @keyframes failureShake {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.1) rotate(-5deg); }
      75% { transform: scale(1.1) rotate(5deg); }
    }
    
    @keyframes failurePulse {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes failureSlideIn {
      0% { transform: translateY(-50px) scale(0.8); opacity: 0; }
      100% { transform: translateY(0) scale(1); opacity: 1; }
    }
    
    .failure-content h2 {
      color: #dc3545;
      font-size: 1.8rem;
      margin: 0 0 0.5rem 0;
      font-weight: 700;
    }
    
    .failure-content p {
      color: #666;
      font-size: 1.1rem;
      margin: 0 0 1.5rem 0;
    }
    
    .failure-details {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 1.5rem;
      margin: 1.5rem 0;
      border-left: 4px solid #dc3545;
    }
    
    .error-info h3 {
      color: #dc3545;
      font-size: 1.1rem;
      margin: 0 0 1rem 0;
      font-weight: 600;
    }
    
    .expected-output {
      background: #fff;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem 0;
    }
    
    .output-text {
      font-family: 'Courier New', monospace;
      color: #dc3545;
      font-size: 0.9rem;
      font-weight: 600;
    }
    
    .hint-text {
      color: #6c757d;
      font-size: 0.95rem;
      margin: 1rem 0 0 0;
    }
    
    .failure-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1.5rem;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }
    
    .btn-retry {
      background: linear-gradient(135deg, #dc3545, #c82333);
      color: white;
      box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
    }
    
    .btn-retry:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(popup);
  console.log("Hata modal'ı eklendi");
}

// Close Free Mode Failure Popup
function closeFreeModeFailurePopup() {
  const popup = document.getElementById('failurePopup');
  if (popup) {
    popup.remove();
  }
}

// Close Failure Modal for Task Mode
function closeFailureModal() {
  const popup = document.getElementById('failurePopup');
  if (popup) {
    popup.remove();
  }
}

// Show Empty Code Modal for Free Mode
function showFreeModeEmptyCodeModal() {
  console.log("showFreeModeEmptyCodeModal çağrıldı");
  
  const popup = document.createElement('div');
  popup.id = 'failurePopup';
  popup.innerHTML = `
    <div class="failure-background"></div>
    <div class="failure-content">
      <div class="failure-icon">
        <div class="failure-circle">
          <div class="failure-x">✕</div>
        </div>
      </div>
      <h2>❌ Kod Yazılmamış</h2>
      <p>Lütfen önce kod yazın!</p>
      
      <div class="failure-details">
        <div class="error-info">
          <h3>💡 Ne Yapmalısınız:</h3>
          <div class="expected-output">
            <span class="output-text">Kodlama alanına Python kodunuzu yazın, sonra "Çalıştır" butonuna tıklayın.</span>
          </div>
        </div>
      </div>
      
      <div class="failure-actions">
        <button class="btn btn-retry" onclick="closeFreeModeFailurePopup()">Tamam</button>
      </div>
    </div>
  `;
  
  // Add the same styles as task mode
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  document.body.appendChild(popup);
  
  // Show popup with animation
  setTimeout(() => {
    popup.style.opacity = '1';
    popup.querySelector('.failure-content').style.transform = 'translateY(0)';
  }, 100);
}

// Show Empty Code Modal for Task Mode
function showEmptyCodeModal() {
  console.log("showEmptyCodeModal çağrıldı");
  
  const popup = document.createElement('div');
  popup.id = 'failurePopup';
  popup.innerHTML = `
    <div class="failure-background"></div>
    <div class="failure-content">
      <div class="failure-icon">
        <div class="failure-circle">
          <div class="failure-x">✕</div>
        </div>
      </div>
      <h2>❌ Kod Alanı Boş</h2>
      <p>Kod alanı boş lütfen öncesinde kod yazın</p>
      
      <div class="failure-details">
        <div class="error-info">
          <h3>💡 Ne Yapmalısınız:</h3>
          <div class="expected-output">
            <span class="output-text">Kodlama alanına Python kodunuzu yazın, sonra "Çalıştır" butonuna tıklayın.</span>
          </div>
        </div>
      </div>
      
      <div class="failure-actions">
        <button class="btn btn-retry" onclick="closeFailurePopup()">Tamam</button>
      </div>
    </div>
  `;
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  document.body.appendChild(popup);
  
  // Show popup with animation
  setTimeout(() => {
    popup.style.opacity = '1';
    popup.querySelector('.failure-content').style.transform = 'translateY(0)';
  }, 100);
}

// Show Free Mode Success Modal
function showFreeModeSuccessModal() {
  console.log("showFreeModeSuccessModal çağrıldı");
  
  const popup = document.createElement('div');
  popup.id = 'successPopup';
  popup.innerHTML = `
    <div class="success-background"></div>
    <div class="confetti-container">
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
    </div>
    <div class="success-content">
      <div class="success-checkmark">
        <div class="checkmark-circle">
          <div class="checkmark"></div>
        </div>
      </div>
      <h2>🎉 Tebrikler!</h2>
      <p>Kodunuz başarıyla çalıştı!</p>
      
      <div class="success-details">
        <div class="task-info">
          <h3>✅ Serbest Mod'da Kod Yazdınız!</h3>
          <div class="points-earned">
            <span class="points-icon">💻</span>
            <span class="points-text">Python kodunuz çalışıyor!</span>
          </div>
          <div class="level-info">
            <span class="level-text">Mod: Serbest</span>
            <span class="total-points">Sınırsız Kod Yazma</span>
          </div>
        </div>
      </div>
      
      <div class="success-actions">
        <button class="btn btn-continue" onclick="closeFreeModeSuccessPopup()">Devam Et</button>
        <button class="btn btn-close" onclick="closeFreeModeSuccessPopup()">Tamam</button>
      </div>
    </div>
  `;
  
  // Add the same styles as task mode
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
    color: white;
    font-family: 'Inter', sans-serif;
    animation: fadeIn 0.3s ease;
  `;
  
  // Add CSS for success animation (same as task mode)
  const style = document.createElement('style');
  style.textContent = `
    .success-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      z-index: 1;
    }
    
    .confetti-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
    }
    
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #ff6b6b;
      animation: confetti-fall 3s linear infinite;
    }
    
    .confetti:nth-child(1) { left: 10%; animation-delay: 0s; background: #ff6b6b; }
    .confetti:nth-child(2) { left: 20%; animation-delay: 0.5s; background: #4ecdc4; }
    .confetti:nth-child(3) { left: 30%; animation-delay: 1s; background: #45b7d1; }
    .confetti:nth-child(4) { left: 40%; animation-delay: 1.5s; background: #96ceb4; }
    .confetti:nth-child(5) { left: 50%; animation-delay: 2s; background: #feca57; }
    .confetti:nth-child(6) { left: 60%; animation-delay: 2.5s; background: #ff9ff3; }
    
    @keyframes confetti-fall {
      0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
    }
    
    .success-checkmark {
      margin: 0 auto 1rem;
      width: 60px;
      height: 60px;
    }
    
    .checkmark-circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: checkmark-bounce 0.6s ease;
      box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
      border: 4px solid #fff;
    }
    
    .checkmark {
      width: 30px;
      height: 30px;
      border: 3px solid white;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      animation: checkmark-draw 0.5s ease 0.3s both;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
    
    @keyframes checkmark-bounce {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    @keyframes checkmark-draw {
      0% { width: 0; height: 0; }
      100% { width: 30px; height: 30px; }
    }
    
    .success-content {
      position: relative;
      background: white;
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
      z-index: 3;
    }
    
    .success-content h2 {
      margin: 0 0 0.3rem 0;
      font-size: 2rem;
      font-weight: 800;
      color: #28a745;
      letter-spacing: 0.5px;
    }
    
    .success-content p {
      margin: 0 0 1.5rem 0;
      font-size: 1.1rem;
      color: #666;
      font-weight: 500;
    }
    
    .success-details {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 1.5rem;
      margin: 1.5rem 0;
      border-left: 4px solid #28a745;
    }
    
    .task-info h3 {
      color: #28a745;
      font-size: 1.2rem;
      margin: 0 0 1rem 0;
      font-weight: 600;
    }
    
    .points-earned {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin: 1rem 0;
    }
    
    .points-icon {
      font-size: 1.2rem;
    }
    
    .points-text {
      color: #28a745;
      font-size: 1rem;
      font-weight: 600;
    }
    
    .level-info {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    
    .level-text, .total-points {
      color: #6c757d;
    }
    
    .success-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1.5rem;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }
    
    .btn-continue {
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
      box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
    }
    
    .btn-continue:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
    }
    
    .btn-close {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    .btn-close:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(popup);
  console.log("Başarılı modal eklendi");
}

// Close Free Mode Success Popup
function closeFreeModeSuccessPopup() {
  const popup = document.getElementById('successPopup');
  if (popup) {
    popup.remove();
  }
}

// Setup Free Mode
function setupFreeMode() {
  // Hide sidebar
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.style.display = 'none';
  }
  
  // Hide editor info panel
  const editorInfoPanel = document.querySelector('.editor-info-panel');
  if (editorInfoPanel) {
    editorInfoPanel.style.display = 'none';
  }
  
  // Update header
  const header = document.querySelector('.header-center');
  if (header) {
    header.innerHTML = `
      <div class="level-info">
        <div class="level-badge">
          <span class="level-icon">💻</span>
          <span class="level-text">Serbest Mod</span>
        </div>
        <div class="points">
          <span class="points-icon">∞</span>
          <span class="points-text">Sınırsız</span>
        </div>
      </div>
    `;
  }
  
  // Update task title
  const taskTitle = document.getElementById('currentTaskTitle');
  if (taskTitle) {
    taskTitle.textContent = 'Serbest Kod Yazma';
  }
  
  // Update task description
  const taskDescription = document.getElementById('taskDescription');
  if (taskDescription) {
    taskDescription.textContent = 'İstediğiniz Python kodunu yazın ve çalıştırın. Görevler ve kısıtlamalar yok!';
  }
  
  // Hide task difficulty and points
  const taskDifficulty = document.getElementById('taskDifficulty');
  const taskPoints = document.getElementById('taskPoints');
  if (taskDifficulty) taskDifficulty.style.display = 'none';
  if (taskPoints) taskPoints.style.display = 'none';
  
  // Hide hint button in free mode
  const hintBtn = document.getElementById('hintBtn');
  if (hintBtn) {
    hintBtn.style.display = 'none';
    console.log("İpucu butonu gizlendi");
  }
  
  // Update back button
  const backBtn = document.getElementById('backToCategoriesBtn');
  if (backBtn) {
    backBtn.textContent = '← Ana Sayfa';
  }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM yüklendi, uygulama başlatılıyor...");
  
  // Check if it's free mode
  const mode = getUrlParameter('mode');
  isFreeMode = mode === 'free';
  console.log("Mode parametresi:", mode);
  console.log("isFreeMode:", isFreeMode);

  if (isFreeMode) {
    console.log("Serbest Mod aktif!");
    setupFreeMode();
  }
  
  try {
    console.log("1. loadUserProgress çağrılıyor...");
    loadUserProgress();
    
    console.log("2. setupEventListeners çağrılıyor...");
    setupEventListeners();
    
    console.log("3. initializeEditor çağrılıyor...");
    initializeEditor();
    
    console.log("4. renderTasks çağrılıyor...");
    renderTasks();
    
    console.log("5. updateUI çağrılıyor...");
    updateUI();
    
    console.log("6. Task yükleme kontrol ediliyor...");
    // Load task from URL parameter
    const taskId = getUrlParameter('task');
    if (taskId) {
      console.log("Task ID bulundu:", taskId);
      const task = tasks.find(t => t.id == taskId);
      if (task) {
        console.log("Task bulundu:", task);
        selectTask(task);
      } else {
        console.error("Task bulunamadı:", taskId);
      }
    } else {
      console.log("Task ID bulunamadı");
    }
    
    // Disable run button initially
    const runBtn = document.getElementById("runBtn");
    if (runBtn) {
      runBtn.textContent = "⏳ Yükleniyor...";
      runBtn.disabled = true;
    }
    
    console.log("6. initializePyodide çağrılıyor...");
    // Initialize Pyodide
    initializePyodide();
    
    
    console.log("Uygulama başarıyla başlatıldı!");
  } catch (error) {
    console.error("Uygulama başlatılırken hata:", error);
    // showAlert(`Uygulama başlatılırken hata oluştu: ${error.message}`);
  }
});

// Setup Event Listeners
function setupEventListeners() {
  // Run button
  document.getElementById("runBtn").addEventListener("click", runCode);
  
  // Reset button
  document.getElementById("resetBtn").addEventListener("click", resetCode);
  
  // Hint button
  document.getElementById("hintBtn").addEventListener("click", showHint);
  
  // Download button
  document.getElementById("downloadBtn").addEventListener("click", downloadCode);
  
  // Clear output button
  document.getElementById("clearOutputBtn").addEventListener("click", clearOutput);
  
  // Font control buttons
  const fontDecreaseBtn = document.getElementById('fontDecreaseBtn');
  const fontIncreaseBtn = document.getElementById('fontIncreaseBtn');
  
  if (fontDecreaseBtn) {
    fontDecreaseBtn.addEventListener('click', decreaseFontSize);
  }
  
  if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener('click', increaseFontSize);
  }
  
  // Alert modal removed
  
  // Back to categories button
  document.getElementById("backToCategoriesBtn").addEventListener("click", () => {
    if (isFreeMode) {
      window.location.href = 'index.html';
    } else {
      // URL'den category parametresini al
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get('category');
      
      if (category) {
        window.location.href = `task-selection.html?category=${category}`;
      } else {
        window.location.href = 'index.html';
      }
    }
  });
  
  // Theme button
  document.getElementById("themeBtn").addEventListener("click", toggleTheme);
  
  // Profile button
  document.getElementById("profileBtn").addEventListener("click", showProfile);
  
  // Help button
  document.getElementById("helpBtn").addEventListener("click", showHelp);
  
  // Initialize hint modal event listeners
  initializeHintModalEventListeners();
}

// Initialize Editor
function initializeEditor() {
  editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
    mode: "python",
    theme: "monokai",
    lineNumbers: true,
    indentUnit: 4,
    indentWithTabs: false,
    lineWrapping: true,
    autofocus: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "F5": runCode,
      "Ctrl-Enter": runCode
    }
  });
  
  // Auto-save code
  editor.on("change", function() {
    if (currentTask) {
      saveCode(currentTask.id, editor.getValue());
    }
  });
  
  // Load saved font size
  loadFontSize();
}

// Render Tasks
function renderTasks() {
  // Skip rendering tasks in free mode
  if (isFreeMode) {
    return;
  }
  
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  
  // Get task ID from URL parameter
  const urlTaskId = getUrlParameter('task');
  
  if (urlTaskId) {
    // Show only the selected task
    const task = tasks.find(t => t.id == urlTaskId);
    if (task) {
      const taskItem = document.createElement("div");
      taskItem.className = "task-item active";
      taskItem.dataset.taskId = task.id;
      
      const isCompleted = userProgress.completedTasks.includes(task.id);
      if (isCompleted) {
        taskItem.classList.add("completed");
      }
      
      taskItem.innerHTML = `
        <div class="task-icon">${getTaskIcon(task)}</div>
        <div class="task-content">
          <h4>${task.title}</h4>
          <p>${task.description}</p>
          <div class="task-meta">
            <span class="task-difficulty">${getDifficultyStars(task.difficulty)}</span>
            <span class="task-points">${task.points} puan</span>
          </div>
        </div>
      `;
      
      taskItem.addEventListener("click", () => selectTask(task));
      taskList.appendChild(taskItem);
    }
  } else {
    // If no task ID in URL, show all tasks (fallback)
    tasks.forEach(task => {
      const taskItem = document.createElement("div");
      taskItem.className = "task-item";
      taskItem.dataset.taskId = task.id;
      
      if (currentTask && currentTask.id === task.id) {
        taskItem.classList.add("active");
      }
      
      const isCompleted = userProgress.completedTasks.includes(task.id);
      if (isCompleted) {
        taskItem.classList.add("completed");
      }
      
      taskItem.innerHTML = `
        <div class="task-icon">${getTaskIcon(task)}</div>
        <div class="task-content">
          <h4>${task.title}</h4>
          <p>${task.description}</p>
          <div class="task-meta">
            <span class="task-difficulty">${getDifficultyStars(task.difficulty)}</span>
            <span class="task-points">${task.points} puan</span>
          </div>
        </div>
      `;
      
      taskItem.addEventListener("click", () => selectTask(task));
      taskList.appendChild(taskItem);
    });
  }
}

// Get Task Icon
function getTaskIcon(task) {
  const icons = ["📝", "💻", "🎯", "⚡", "🔧", "🎨", "📊", "🎮"];
  return icons[task.id % icons.length];
}

// Get Difficulty Stars
function getDifficultyStars(difficulty) {
  return "⭐".repeat(difficulty) + "☆".repeat(5 - difficulty);
}

// Select Task
function selectTask(task) {
  console.log("selectTask çağrıldı, task:", task);
  
  try {
    currentTask = task;
    console.log("currentTask set edildi");
    
    // Update active task in sidebar
    console.log("Sidebar güncelleniyor...");
    document.querySelectorAll(".task-item").forEach((item) => {
      item.classList.remove("active");
    });
    const activeTaskElement = document.querySelector(`[data-task-id="${task.id}"]`);
    if (activeTaskElement) {
      activeTaskElement.classList.add("active");
      console.log("Active task element bulundu ve güncellendi");
    } else {
      console.log("Active task element bulunamadı");
    }
    
    // Load saved code or use starter code
    console.log("Kod yükleniyor...");
    const savedCode = loadSavedCode(task.id);
    console.log("Saved code:", savedCode);
    console.log("Starter code:", task.starterCode);
    
    if (editor) {
      console.log("Editor mevcut, kod set ediliyor...");
      editor.setValue(savedCode || task.starterCode);
    } else {
      console.log("Editor henüz hazır değil, 100ms bekleniyor...");
      // Editor henüz hazır değilse, biraz bekle
      setTimeout(() => {
        if (editor) {
          console.log("Editor hazır, kod set ediliyor...");
          editor.setValue(savedCode || task.starterCode);
        } else {
          console.log("Editor hala hazır değil!");
        }
      }, 100);
    }
    
    // Update task title and description
    console.log("Task title güncelleniyor...");
    const titleElement = document.getElementById("currentTaskTitle");
    const descriptionElement = document.getElementById("currentTaskDescription");
    
    if (titleElement) {
      titleElement.textContent = task.title;
      console.log("Task title güncellendi:", task.title);
    } else {
      console.log("Task title element bulunamadı!");
    }
    
    if (descriptionElement) {
      descriptionElement.textContent = task.description;
      console.log("Task description güncellendi:", task.description);
    } else {
      console.log("Task description element bulunamadı!");
    }
    
    // Clear output
    console.log("Output temizleniyor...");
    clearOutput();
    
    console.log("selectTask başarıyla tamamlandı");
  } catch (error) {
    console.error("Görev seçilirken hata:", error);
    // showAlert(`Görev seçilirken hata: ${error.message}`);
  }
}

// Load Saved Code
function loadSavedCode(taskId) {
  const savedCode = localStorage.getItem(`task_${taskId}_code`);
  if (savedCode) {
    return savedCode;
  }
  return null;
}

// Save Code
function saveCode(taskId, code) {
  localStorage.setItem(`task_${taskId}_code`, code);
}

// Run Code
async function runCode() {
  console.log("runCode çağrıldı");
  
  try {
    if (!isFreeMode && !currentTask) {
      console.log("currentTask yok!");
      showAlert("Lütfen önce bir görev seçin!");
      return;
    }
    
    if (isFreeMode && !currentTask) {
      console.log("Serbest mod - currentTask kontrolü atlandı");
    }
    
    console.log("currentTask:", currentTask);
    
    const code = editor.getValue();
    console.log("Editor kodu:", code);
    
    if (!code.trim()) {
      console.log("Kod boş!");
      
      // Show analysis popup first
      if (isFreeMode) {
        showFreeModeAnalysisPopup();
      } else {
        showAnalysisPopup();
      }
      
      // After 1.5 seconds, show empty code error modal
      setTimeout(() => {
        if (isFreeMode) {
          showFreeModeEmptyCodeModal();
        } else {
          showEmptyCodeModal();
        }
      }, 1500);
      
      return;
    }
    
    console.log("isPyodideLoaded:", isPyodideLoaded);
    
    // Show loading message
    showOutput("🔄 Kod çalıştırılıyor...");
    
    // Show analysis popup for both modes
    console.log("Analiz popup gösteriliyor");
    showAnalysisPopup();
    
    if (isPyodideLoaded) {
      console.log("Pyodide ile çalıştırılıyor...");
      await runWithPyodide(code);
    } else {
      console.log("Simülasyon ile çalıştırılıyor...");
      runWithSimulation(code);
    }
    
    // Check if task is completed after analysis popup
    setTimeout(() => {
      checkTaskCompletion(code);
    }, 3000);
    
    console.log("runCode başarıyla tamamlandı");
  } catch (error) {
    console.error("Kod çalıştırılırken hata:", error);
    showOutput(`Hata: ${error.message}`);
  }
}

// Run with Pyodide
async function runWithPyodide(code) {
  try {
    // Check if pyodide is available
    if (typeof pyodide === 'undefined' || !pyodide) {
      showOutput("⚠️ Pyodide henüz yüklenmedi. Lütfen birkaç saniye bekleyin ve tekrar deneyin.");
      return;
    }
    
    // Capture stdout
    pyodide.runPython(`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = captured_output = StringIO()
`);
    
    // Run the user code
    const result = pyodide.runPython(code);
    
    // Get the captured output
    const output = pyodide.runPython("captured_output.getvalue()");
    
    // Restore stdout
    pyodide.runPython("sys.stdout = old_stdout");
    
    // Show output or result
    if (output && output.trim()) {
      if (isFreeMode) {
        showOutput(output);
        // Show success modal for free mode after analysis popup
        setTimeout(() => {
          hideAnalysisPopup();
          showFreeModeSuccessModal();
        }, 3000);
      } else {
        showOutput(output);
        // Hide analysis popup after 3 seconds
        setTimeout(() => {
          hideAnalysisPopup();
        }, 3000);
      }
    } else if (result !== undefined && result !== null) {
      if (isFreeMode) {
        showOutput(result.toString());
        // Show success modal for free mode after analysis popup
        setTimeout(() => {
          hideAnalysisPopup();
          showFreeModeSuccessModal();
        }, 3000);
      } else {
        showOutput(result.toString());
        // Hide analysis popup after 3 seconds
        setTimeout(() => {
          hideAnalysisPopup();
        }, 3000);
      }
    } else {
      if (isFreeMode) {
        showOutput("✅ Kod başarıyla çalıştırıldı!\n\nNot: Bu kod herhangi bir çıktı üretmedi. Eğer sonucu görmek istiyorsanız, print() fonksiyonu kullanın.");
        // Show success modal for free mode after analysis popup
        setTimeout(() => {
          hideAnalysisPopup();
          showFreeModeSuccessModal();
        }, 3000);
      } else {
        showOutput("✅ Kod başarıyla çalıştırıldı!\n\nNot: Bu kod herhangi bir çıktı üretmedi. Eğer sonucu görmek istiyorsanız, print() fonksiyonu kullanın.");
        // Hide analysis popup after 3 seconds
        setTimeout(() => {
          hideAnalysisPopup();
        }, 3000);
      }
    }
  } catch (error) {
    if (isFreeMode) {
      // Show error modal for free mode after analysis popup
      setTimeout(() => {
        hideAnalysisPopup();
        showFreeModeErrorModal(error.message);
      }, 3000);
    } else {
      showOutput(`Hata: ${error.message}`);
      // Hide analysis popup after 3 seconds
      setTimeout(() => {
        hideAnalysisPopup();
      }, 3000);
    }
  }
}

// Run with Simulation
function runWithSimulation(code) {
  // Simple simulation for basic Python constructs
  let output = "";
  
  try {
    // Basic print simulation
    const printMatches = code.match(/print\s*\(\s*["']([^"']*)["']\s*\)/g);
    if (printMatches) {
      printMatches.forEach(match => {
        const text = match.match(/print\s*\(\s*["']([^"']*)["']\s*\)/)[1];
        output += text + "\n";
      });
    }
    
    // Variable assignment simulation
    const varMatches = code.match(/(\w+)\s*=\s*(\d+)/g);
    if (varMatches) {
      const vars = {};
      varMatches.forEach(match => {
        const [, name, value] = match.match(/(\w+)\s*=\s*(\d+)/);
        vars[name] = parseInt(value);
      });
      
      // Simple arithmetic simulation
      const addMatches = code.match(/(\w+)\s*\+\s*(\w+)/g);
      if (addMatches) {
        addMatches.forEach(match => {
          const [, var1, var2] = match.match(/(\w+)\s*\+\s*(\w+)/);
          if (vars[var1] && vars[var2]) {
            output += (vars[var1] + vars[var2]) + "\n";
          }
        });
      }
    }
    
    if (output) {
      showOutput(output);
    } else {
      showOutput("Kod çalıştırıldı (simülasyon modu)");
    }
    
    // Hide analysis popup after 3 seconds
    setTimeout(() => {
      hideAnalysisPopup();
    }, 3000);
  } catch (error) {
    if (isFreeMode) {
      // Show error modal for free mode after analysis popup
      setTimeout(() => {
        hideAnalysisPopup();
        showFreeModeErrorModal(error.message);
      }, 3000);
    } else {
      showOutput(`Hata: ${error.message}`);
      // Hide analysis popup after 3 seconds
      setTimeout(() => {
        hideAnalysisPopup();
      }, 3000);
    }
  }
}

// Show Output
function showOutput(content) {
  const outputContent = document.getElementById("outputContent");
  
  // Format the output with modern styling
  const formattedContent = formatOutput(content);
  outputContent.innerHTML = formattedContent;
  
  // Check if task is completed
  if (currentTask && content.includes(currentTask.expectedOutput)) {
    completeTask(currentTask);
  }
}

// Format Output with Modern Styling
function formatOutput(content) {
  if (!content || content.trim() === '') {
    return '<div class="empty-output">Çıktı yok</div>';
  }
  
  // Check if it's a loading message
  if (content.includes('🔄 Kod çalıştırılıyor...')) {
    return '<div class="output-header">Çıktı</div><div class="output-line output-info">🔄 Kod çalıştırılıyor...</div>';
  }
  
  // Check if it's an error message
  if (content.includes('Hata:') || content.includes('Error') || content.includes('Exception')) {
    return '<div class="output-header">Çıktı</div><div class="output-line output-error">❌ Hatalı kod</div>';
  }
  
  // Add output header
  let formatted = '<div class="output-header">Çıktı</div>';
  
  // Split content into lines
  const lines = content.split('\n');
  
  lines.forEach(line => {
    if (line.trim() === '') {
      formatted += '<div class="output-line"></div>';
      return;
    }
    
    // Determine line type and apply appropriate styling
    let lineClass = 'output-line';
    let formattedLine = line;
    
    // Check for different types of output
    if (line.includes('✅') || line.includes('başarıyla') || line.includes('success')) {
      lineClass += ' output-success';
    } else if (line.includes('❌') || line.includes('Hata') || line.includes('Error') || line.includes('Exception')) {
      lineClass += ' output-error';
    } else if (line.includes('⚠️') || line.includes('Uyarı') || line.includes('Warning')) {
      lineClass += ' output-warning';
    } else if (line.includes('🔄') || line.includes('çalıştırılıyor') || line.includes('loading')) {
      lineClass += ' output-info';
    }
    
    // Apply syntax highlighting
    formattedLine = applySyntaxHighlighting(formattedLine);
    
    formatted += `<div class="${lineClass}">${formattedLine}</div>`;
  });
  
  return formatted;
}

// Apply Syntax Highlighting
function applySyntaxHighlighting(line) {
  // String highlighting
  line = line.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
  line = line.replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>');
  
  // Number highlighting
  line = line.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
  
  // Boolean highlighting
  line = line.replace(/\b(True|False|None)\b/g, '<span class="boolean">$1</span>');
  
  // Error highlighting
  if (line.includes('Error') || line.includes('Exception') || line.includes('Traceback')) {
    line = line.replace(/(Error|Exception|Traceback)/g, '<span class="error">$1</span>');
  }
  
  // Success highlighting
  if (line.includes('✅') || line.includes('başarıyla')) {
    line = line.replace(/(✅|başarıyla)/g, '<span class="success">$1</span>');
  }
  
  return line;
}

// Show Alert (removed - using console.log instead)
function showAlert(message) {
  console.log("Alert:", message);
}

// Close Alert (removed)
function closeAlert() {
  // No longer needed
}

// Clear Output
function clearOutput() {
  document.getElementById("outputContent").innerHTML = "";
}

// Reset Code
function resetCode() {
  if (currentTask) {
    editor.setValue(currentTask.starterCode);
  }
}

// Show Hint
function showHint() {
  console.log("İpucu butonuna tıklandı");
  showHintModal();
}

// Download Code
function downloadCode() {
  if (!currentTask) {
    showAlert("Lütfen önce bir görev seçin!");
    return;
  }
  
  const code = editor.getValue();
  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${currentTask.title}.py`;
  a.click();
  URL.revokeObjectURL(url);
}

// Complete Task
function completeTask(task) {
  if (!userProgress.completedTasks.includes(task.id)) {
    userProgress.completedTasks.push(task.id);
    userProgress.points += task.points;
    
    // Check for level up
    const newLevel = Math.floor(userProgress.points / 100) + 1;
    if (newLevel > userProgress.level) {
      userProgress.level = newLevel;
      showAlert(`🎉 Seviye atladınız! Yeni seviye: ${newLevel}`);
    }
    
    saveUserProgress();
    updateUI();
    renderTasks();
    
    // showAlert(`🎉 Tebrikler! "${task.title}" görevini tamamladınız! +${task.points} puan`);
  }
}

// Update UI
function updateUI() {
  // Skip UI update in free mode
  if (isFreeMode) {
    console.log("Serbest mod - UI güncellemesi atlandı");
    return;
  }
  
  // Update level
  const levelText = document.querySelector(".level-text");
  if (levelText) {
    levelText.textContent = `Seviye ${userProgress.level}`;
  }
  
  // Update points
  const pointsText = document.querySelector(".points-text");
  if (pointsText) {
    pointsText.textContent = `${userProgress.points} Puan`;
  }
  
  // Update progress
  const progressFill = document.querySelector(".progress-fill");
  if (progressFill) {
    const progressPercentage = (userProgress.points % 100);
    progressFill.style.width = `${progressPercentage}%`;
  }
  
  // Update next level info
  const nextLevelInfo = document.getElementById("nextLevelInfo");
  if (nextLevelInfo) {
    const nextLevelPoints = 100 - (userProgress.points % 100);
    nextLevelInfo.textContent = `Sonraki seviye için: ${nextLevelPoints} puan`;
  }
}

// Initialize Pyodide
async function initializePyodide() {
  try {
    console.log("Pyodide yükleniyor...");
    pyodide = await loadPyodide();
    isPyodideLoaded = true;
    console.log("Pyodide yüklendi!");
    
    // Update UI to show Pyodide is ready
    const runBtn = document.getElementById("runBtn");
    if (runBtn) {
      runBtn.textContent = "▶️ Çalıştır";
      runBtn.disabled = false;
    }
  } catch (error) {
    console.log("Pyodide yüklenemedi, simülasyon modu kullanılacak:", error);
    isPyodideLoaded = false;
    
    // Update UI to show simulation mode
    const runBtn = document.getElementById("runBtn");
    if (runBtn) {
      runBtn.textContent = "▶️ Çalıştır (Simülasyon)";
      runBtn.disabled = false;
    }
  }
}

// Toggle Theme
function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle("dark-theme", isDarkTheme);
  
  if (editor) {
    editor.setOption("theme", isDarkTheme ? "default" : "monokai");
  }
}

// Show Profile
function showProfile() {
  showAlert(`Profil Bilgileri:\nSeviye: ${userProgress.level}\nPuan: ${userProgress.points}\nTamamlanan Görevler: ${userProgress.completedTasks.length}`);
}

// Show Help
function showHelp() {
  showAlert("Yardım:\n• F5 veya Ctrl+Enter: Kodu çalıştır\n• Ctrl+Space: Otomatik tamamlama\n• 💡: İpucu göster\n• 🔄: Kodu sıfırla");
}

// Show Hint Popup
function showHintPopup(hintText) {
  const popup = document.createElement('div');
  popup.id = 'hintPopup';
  popup.innerHTML = `
    <div class="hint-background"></div>
    <div class="hint-content">
      <div class="hint-header">
        <h3>💡 İpucu</h3>
        <button class="hint-close" onclick="closeHintPopup()">&times;</button>
      </div>
      <div class="hint-body">
        <div class="hint-text">${hintText.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="hint-footer">
        <button class="btn btn-primary" onclick="closeHintPopup()">Tamam</button>
      </div>
    </div>
  `;
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10002;
    color: white;
    font-family: 'Inter', sans-serif;
    animation: fadeIn 0.3s ease;
  `;
  
  // Add CSS for hint popup
  const style = document.createElement('style');
  style.textContent = `
    .hint-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: -1;
    }
    
    .hint-content {
      background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }
    
    .hint-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .hint-header h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
    }
    
    .hint-close {
      background: none;
      border: none;
      font-size: 2rem;
      color: #666;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .hint-close:hover {
      background: rgba(255, 255, 255, 0.2);
      color: #333;
    }
    
    .hint-body {
      padding: 1.5rem 2rem;
      max-height: 50vh;
      overflow-y: auto;
    }
    
    .hint-text {
      color: #333;
      line-height: 1.6;
      font-size: 1rem;
    }
    
    .hint-text h1, .hint-text h2, .hint-text h3 {
      color: #2c3e50;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
    
    .hint-text h1:first-child, .hint-text h2:first-child, .hint-text h3:first-child {
      margin-top: 0;
    }
    
    .hint-text code {
      background: rgba(0, 0, 0, 0.1);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
    }
    
    .hint-text ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }
    
    .hint-text li {
      margin: 0.3rem 0;
    }
    
    .hint-footer {
      padding: 1rem 2rem 1.5rem;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .btn {
      padding: 0.8rem 2rem;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(popup);
  
  // Store style reference for cleanup
  popup.styleRef = style;
}

// Close Hint Popup
function closeHintPopup() {
  const popup = document.getElementById('hintPopup');
  if (popup) {
    popup.parentNode.removeChild(popup);
    // Remove style element
    if (popup.styleRef && popup.styleRef.parentNode) {
      popup.styleRef.parentNode.removeChild(popup.styleRef);
    }
  }
}

// Show Analysis Popup
function showAnalysisPopup() {
  const popup = document.createElement('div');
  popup.id = 'analysisPopup';
  popup.innerHTML = `
    <div class="analysis-background"></div>
    <div class="analysis-content">
      <div class="analysis-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <h3>🔍 Kod Analiz Ediliyor...</h3>
      <p>Kodunuz kontrol ediliyor, lütfen bekleyin...</p>
      <div class="progress-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    color: white;
    font-family: 'Inter', sans-serif;
    animation: fadeIn 0.3s ease;
  `;
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .analysis-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: -1;
    }
    
    .analysis-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 3rem 2rem;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 400px;
      width: 90%;
      position: relative;
      z-index: 1;
    }
    
    .analysis-spinner {
      position: relative;
      width: 60px;
      height: 60px;
      margin: 0 auto 1.5rem;
    }
    
    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top: 3px solid #fff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    .spinner-ring:nth-child(2) {
      width: 80%;
      height: 80%;
      top: 10%;
      left: 10%;
      animation-delay: -0.3s;
      border-top-color: #ffd700;
    }
    
    .spinner-ring:nth-child(3) {
      width: 60%;
      height: 60%;
      top: 20%;
      left: 20%;
      animation-delay: -0.6s;
      border-top-color: #ff6b6b;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .analysis-content h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .analysis-content p {
      margin: 0 0 1.5rem 0;
      opacity: 0.9;
      font-size: 1rem;
    }
    
    .progress-dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .progress-dots span {
      width: 8px;
      height: 8px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      animation: pulse 1.5s ease-in-out infinite;
    }
    
    .progress-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .progress-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(popup);
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
    // Remove style element
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
    // Ensure body blur is removed
    document.body.style.filter = 'none';
    document.body.style.transition = 'none';
  }, 3000);
}

// Check Task Completion
function checkTaskCompletion(code) {
  if (!currentTask) return;
  
  // Hide analysis popup first
  hideAnalysisPopup();
  
  // Get only the actual output content (skip the "Çıktı" header)
  const outputElement = document.getElementById("outputContent");
  const outputText = outputElement.textContent;
  
  // Remove "Çıktı" header from the beginning
  const output = outputText.replace(/^Çıktı\s*/, '').trim();
  const expectedOutput = currentTask.expectedOutput.trim();
  
  // Check for exact match
  const isCorrect = output === expectedOutput;
  
  console.log("Çıktı kontrolü:");
  console.log("Beklenen:", `"${expectedOutput}"`);
  console.log("Gerçek:", `"${output}"`);
  console.log("Eşleşiyor mu:", isCorrect);
  
  if (isCorrect) {
    showSuccessAnimation();
    completeTask(currentTask);
  } else {
    showFailureMessage();
  }
}

// Show Success Animation
function showSuccessAnimation() {
  const popup = document.createElement('div');
  popup.id = 'successPopup';
  popup.innerHTML = `
    <div class="success-background"></div>
    <div class="success-content">
      <div class="confetti-container">
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
      </div>
      <div class="success-checkmark">
        <div class="checkmark-circle">
          <div class="checkmark"></div>
        </div>
      </div>
      <h2>🎉 Tebrikler!</h2>
      <p>Kodunuz doğru çalışıyor!</p>
      
      <div class="success-details">
        <div class="task-info">
          <h3>✅ "${currentTask.title}" Görevini Tamamladınız!</h3>
          <div class="points-earned">
            <span class="points-icon">⭐</span>
            <span class="points-text">+${currentTask.points} Puan Kazandınız!</span>
          </div>
          <div class="level-info">
            <span class="level-text">Seviye: ${userProgress.level}</span>
            <span class="total-points">Toplam Puan: ${userProgress.points}</span>
          </div>
        </div>
      </div>
      
      <div class="success-actions">
        <button class="btn btn-continue" onclick="goToTaskSelection()">Devam Et</button>
        <button class="btn btn-close" onclick="closeSuccessPopup()">Tamam</button>
      </div>
    </div>
  `;
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
    color: white;
    font-family: 'Inter', sans-serif;
    animation: fadeIn 0.3s ease;
  `;
  
  // Add CSS for success animation
  const style = document.createElement('style');
  style.textContent = `
    .success-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: -1;
    }
    
    .success-content {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      padding: 1.5rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 420px;
      width: 85%;
      max-height: 85vh;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }
    
    .confetti-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #ffd700;
      animation: confetti-fall 3s linear infinite;
    }
    
    .confetti:nth-child(1) { left: 10%; animation-delay: 0s; background: #ff6b6b; }
    .confetti:nth-child(2) { left: 20%; animation-delay: 0.5s; background: #4ecdc4; }
    .confetti:nth-child(3) { left: 30%; animation-delay: 1s; background: #45b7d1; }
    .confetti:nth-child(4) { left: 40%; animation-delay: 1.5s; background: #96ceb4; }
    .confetti:nth-child(5) { left: 50%; animation-delay: 2s; background: #feca57; }
    .confetti:nth-child(6) { left: 60%; animation-delay: 2.5s; background: #ff9ff3; }
    
    @keyframes confetti-fall {
      0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
    }
    
    .success-checkmark {
      margin: 0 auto 1rem;
      width: 60px;
      height: 60px;
    }
    
    .checkmark-circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: checkmark-bounce 0.6s ease;
      box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
      border: 4px solid #fff;
    }
    
    .checkmark {
      width: 30px;
      height: 30px;
      border: 3px solid white;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      animation: checkmark-draw 0.5s ease 0.3s both;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
    
    @keyframes checkmark-bounce {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    @keyframes checkmark-draw {
      0% { width: 0; height: 0; }
      100% { width: 30px; height: 30px; }
    }
    
    .success-content h2 {
      margin: 0 0 0.3rem 0;
      font-size: 2rem;
      font-weight: 800;
      color: #fff;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
      letter-spacing: 0.5px;
    }
    
    .success-content p {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .success-stars {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .success-stars span {
      font-size: 1.5rem;
      animation: star-twinkle 1s ease-in-out infinite;
    }
    
    .success-stars span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .success-stars span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes star-twinkle {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.3); opacity: 1; }
    }
    
    .success-details {
      margin: 1rem 0;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .task-info h3 {
      margin: 0 0 0.8rem 0;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
      letter-spacing: 0.3px;
    }
    
    .points-earned {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      margin: 1rem 0;
      padding: 1rem;
      background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
      border-radius: 12px;
      border: 2px solid #fff;
      box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
    }
    
    .points-icon {
      font-size: 1.5rem;
      animation: star-twinkle 1s ease-in-out infinite;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
    
    .points-text {
      font-size: 1.2rem;
      font-weight: 800;
      color: #2c3e50;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      letter-spacing: 0.3px;
    }
    
    .level-info {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      gap: 0.8rem;
    }
    
    .level-text, .total-points {
      padding: 0.6rem 1rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 10px;
      border: 2px solid #fff;
      font-size: 0.9rem;
      font-weight: 600;
      color: #2c3e50;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
      flex: 1;
      text-align: center;
    }
    
    .success-actions {
      display: flex;
      gap: 0.8rem;
      justify-content: center;
      margin-top: 1rem;
    }
    
    .btn-continue {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      color: white;
      border: none;
      padding: 0.6rem 1.5rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 3px 12px rgba(40, 167, 69, 0.3);
    }
    
    .btn-continue:hover {
      transform: translateY(-1px);
      box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
    }
    
    .btn-close {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.6rem 1.5rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-close:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(popup);
  
  // Store style reference for cleanup
  popup.styleRef = style;
}

// Close Success Popup
function closeSuccessPopup() {
  const popup = document.getElementById('successPopup');
  if (popup) {
    popup.parentNode.removeChild(popup);
    // Remove style element
    if (popup.styleRef && popup.styleRef.parentNode) {
      popup.styleRef.parentNode.removeChild(popup.styleRef);
    }
  }
}

// Go to Task Selection
function goToTaskSelection() {
  closeSuccessPopup();
  // Get category from URL parameter or use currentTask.category
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || currentTask.category;
  window.location.href = 'task-selection.html?category=' + encodeURIComponent(category);
}

// Show Failure Message
function showFailureMessage() {
  const popup = document.createElement('div');
  popup.id = 'failurePopup';
  popup.innerHTML = `
    <div class="failure-background"></div>
    <div class="failure-content">
      <div class="failure-icon">
        <div class="failure-circle">
          <div class="failure-x">✕</div>
        </div>
      </div>
      <h2>❌ Kod Doğru Değil</h2>
      <p>Kodunuzda bir hata var!</p>
      
      <div class="failure-details">
        <div class="error-info">
          <h3>🔍 Beklenen Çıktı:</h3>
          <div class="expected-output">
            <span class="output-text">"${currentTask.expectedOutput}"</span>
          </div>
          <p class="hint-text">Lütfen kodunuzu kontrol edin ve tekrar deneyin.</p>
        </div>
      </div>
      
      <div class="failure-actions">
        <button class="btn btn-retry" onclick="closeFailurePopup()">Tekrar Dene</button>
        <button class="btn btn-hint" onclick="showHintAndClose()">İpucu Al</button>
      </div>
    </div>
  `;
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
    color: white;
    font-family: 'Inter', sans-serif;
    animation: fadeIn 0.3s ease;
  `;
  
  // Add CSS for failure animation
  const style = document.createElement('style');
  style.textContent = `
    .failure-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: -1;
    }
    
    .failure-content {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      padding: 1.5rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 420px;
      width: 85%;
      max-height: 85vh;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }
    
    .failure-icon {
      margin: 0 auto 1rem;
      width: 60px;
      height: 60px;
    }
    
    .failure-circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: failureShake 0.6s ease;
      box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
      border: 4px solid #fff;
    }
    
    .failure-x {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
      font-weight: 900;
      animation: failurePulse 0.5s ease 0.3s both;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
    
    @keyframes failureShake {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.1) rotate(-5deg); }
      75% { transform: scale(1.1) rotate(5deg); }
    }
    
    @keyframes failurePulse {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    .failure-content h2 {
      margin: 0 0 0.3rem 0;
      font-size: 2rem;
      font-weight: 800;
      color: #fff;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
      letter-spacing: 0.5px;
    }
    
    .failure-content p {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .failure-details {
      margin: 1rem 0;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .error-info h3 {
      margin: 0 0 1rem 0;
      font-size: 1.4rem;
      font-weight: 700;
      color: #fff;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.6);
      letter-spacing: 0.5px;
    }
    
    .expected-output {
      margin: 1rem 0;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 10px;
      border: 2px solid #fff;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .output-text {
      font-size: 1.2rem;
      font-weight: 700;
      color: #dc3545;
      font-family: 'Courier New', monospace;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .hint-text {
      margin: 1rem 0 0 0;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    
    .failure-actions {
      display: flex;
      gap: 0.8rem;
      justify-content: center;
      margin-top: 1rem;
    }
    
    .btn-retry {
      background: linear-gradient(135deg, #ffc107 0%, #ff8c00 100%);
      color: #2c3e50;
      border: none;
      padding: 0.6rem 1.5rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 3px 12px rgba(255, 193, 7, 0.3);
    }
    
    .btn-retry:hover {
      transform: translateY(-1px);
      box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
    }
    
    .btn-hint {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.6rem 1.5rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-hint:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(popup);
  
  // Store style reference for cleanup
  popup.styleRef = style;
}

// Close Failure Popup
function closeFailurePopup() {
  const popup = document.getElementById('failurePopup');
  if (popup) {
    popup.parentNode.removeChild(popup);
    // Remove style element
    if (popup.styleRef && popup.styleRef.parentNode) {
      popup.styleRef.parentNode.removeChild(popup.styleRef);
    }
  }
}

// Show Hint and Close
function showHintAndClose() {
  closeFailurePopup();
  showHintModal();
}

// ========================================
// HINT MODAL FUNCTIONS
// ========================================

// Show Hint Modal
function showHintModal() {
  if (!currentTask) {
    console.error("No current task available for hints");
    return;
  }

  const modal = document.getElementById('hintModal');
  if (!modal) {
    console.error("Hint modal not found");
    return;
  }

  // Load hint content
  loadHintContent();

  // Show modal
  modal.style.display = 'block';
  modal.classList.add('show');

  // Initialize drag functionality
  initializeHintModalDrag();

  // Initialize tab switching
  initializeHintModalTabs();

  // Initialize pin functionality
  initializeHintModalPin();
}

// Load Hint Content
function loadHintContent() {
  console.log("loadHintContent çağrıldı");
  console.log("currentTask:", currentTask);
  
  const shortHintText = document.getElementById('shortHintText');
  const longHintText = document.getElementById('longHintText');

  if (shortHintText) {
    // Statik kısa ipucu verisi
    shortHintText.innerHTML = `
      <p><strong>💡 Hızlı İpucu:</strong></p>
      <p>Bu görevde <code>input()</code> fonksiyonunu kullanarak kullanıcıdan veri almanız gerekiyor.</p>
      <p><strong>Adımlar:</strong></p>
      <ul>
        <li>1. <code>input("İsminizi girin: ")</code> ile isim alın</li>
        <li>2. <code>f"Merhaba {isim}"</code> ile birleştirin</li>
        <li>3. <code>print()</code> ile yazdırın</li>
      </ul>
      <p><em>💡 F-string kullanmayı unutmayın!</em></p>
    `;
  }

  if (longHintText && currentTask) {
    console.log("Long hint:", currentTask.longHint);
    longHintText.innerHTML = formatHintText(currentTask.longHint);
  }
}

// Format Hint Text (convert markdown-like syntax to HTML)
function formatHintText(text) {
  if (!text) return '';

  console.log("formatHintText input:", text);

  // Simple formatting - just convert line breaks to <br> and wrap in <p>
  let formatted = text
    .replace(/\n/g, '<br>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/g, '$1')
    .replace(/<p>(<ul>.*<\/ul>)<\/p>/gs, '$1')
    .replace(/<p>(<pre>.*<\/pre>)<\/p>/gs, '$1');

  console.log("formatHintText output:", formatted);
  return formatted;
}

// Initialize Hint Modal Drag
function initializeHintModalDrag() {
  const modal = document.getElementById('hintModal');
  const header = document.getElementById('hintModalHeader');
  
  if (!modal || !header) return;

  // Remove existing listeners to prevent duplicates
  header.removeEventListener('mousedown', modal.dragStart);
  document.removeEventListener('mousemove', modal.drag);
  document.removeEventListener('mouseup', modal.dragEnd);

  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  // Store functions on modal for cleanup
  modal.dragStart = function(e) {
    if (modal.classList.contains('pinned')) return;
    
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === header || header.contains(e.target)) {
      isDragging = true;
      header.style.cursor = 'grabbing';
      e.preventDefault();
    }
  };

  modal.drag = function(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      modal.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
  };

  modal.dragEnd = function(e) {
    if (isDragging) {
      initialX = currentX;
      initialY = currentY;
      isDragging = false;
      header.style.cursor = 'move';
    }
  };

  header.addEventListener('mousedown', modal.dragStart);
  document.addEventListener('mousemove', modal.drag);
  document.addEventListener('mouseup', modal.dragEnd);
}

// Initialize Hint Modal Tabs
function initializeHintModalTabs() {
  const shortTab = document.getElementById('shortHintTab');
  const longTab = document.getElementById('longHintTab');
  const shortContent = document.getElementById('shortHintContent');
  const longContent = document.getElementById('longHintContent');

  if (!shortTab || !longTab || !shortContent || !longContent) return;

  shortTab.addEventListener('click', () => {
    // Update tab states
    shortTab.classList.add('active');
    longTab.classList.remove('active');
    
    // Update content states
    shortContent.classList.add('active');
    longContent.classList.remove('active');
  });

  longTab.addEventListener('click', () => {
    // Update tab states
    longTab.classList.add('active');
    shortTab.classList.remove('active');
    
    // Update content states
    longContent.classList.add('active');
    shortContent.classList.remove('active');
  });
}

// Initialize Hint Modal Pin
function initializeHintModalPin() {
  const pinBtn = document.getElementById('hintPinBtn');
  const modal = document.getElementById('hintModal');

  if (!pinBtn || !modal) return;

  pinBtn.addEventListener('click', () => {
    modal.classList.toggle('pinned');
    pinBtn.classList.toggle('pinned');
    
    if (modal.classList.contains('pinned')) {
      // Pin to top-right corner
      modal.style.position = 'fixed';
      modal.style.top = '20px';
      modal.style.right = '20px';
      modal.style.left = 'auto';
      modal.style.transform = 'none';
      pinBtn.title = 'Çöz';
      pinBtn.textContent = '📌';
    } else {
      // Reset to center
      modal.style.position = 'fixed';
      modal.style.top = '50%';
      modal.style.left = '50%';
      modal.style.right = 'auto';
      modal.style.transform = 'translate(-50%, -50%)';
      pinBtn.title = 'Sabitle';
      pinBtn.textContent = '📌';
    }
  });
}

// Close Hint Modal
function closeHintModal() {
  const modal = document.getElementById('hintModal');
  if (modal) {
    modal.classList.remove('show');
    // Delay hiding to allow animation to complete
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
    
    // Reset position if not pinned
    if (!modal.classList.contains('pinned')) {
      modal.style.transform = 'translate(-50%, -50%)';
    }
  }
}

// Initialize Hint Modal Event Listeners
function initializeHintModalEventListeners() {
  const closeBtn = document.getElementById('hintCloseBtn');
  const modal = document.getElementById('hintModal');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeHintModal);
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeHintModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeHintModal();
    }
  });
}

// Font Control Functions
function decreaseFontSize() {
  if (currentFontSize > 10) {
    currentFontSize -= 2;
    updateFontSize();
    saveFontSize();
  }
}

function increaseFontSize() {
  if (currentFontSize < 24) {
    currentFontSize += 2;
    updateFontSize();
    saveFontSize();
  }
}

function updateFontSize() {
  // Update editor font size using CSS
  if (editor) {
    const editorElement = editor.getWrapperElement();
    if (editorElement) {
      editorElement.style.fontSize = currentFontSize + 'px';
    }
  }
  
  // Update display
  const fontSizeDisplay = document.getElementById('fontSizeDisplay');
  if (fontSizeDisplay) {
    fontSizeDisplay.textContent = currentFontSize + 'px';
  }
}

function saveFontSize() {
  localStorage.setItem('editorFontSize', currentFontSize.toString());
}

function loadFontSize() {
  const savedFontSize = localStorage.getItem('editorFontSize');
  if (savedFontSize) {
    currentFontSize = parseInt(savedFontSize);
    updateFontSize();
  }
}
