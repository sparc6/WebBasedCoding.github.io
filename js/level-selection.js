// Level Selection Screen JavaScript

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

Python'da metin yazdırmak için print() fonksiyonu kullanılır.

## Temel Kullanım:
print("Merhaba Dünya")

## Önemli Noktalar:
• Tırnak işaretleri ("" veya '') kullanılmalı
• Metin tırnak içinde yazılmalı
• print() fonksiyonu parantez içinde çağrılmalı`,
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

## Değişken Tanımlama:
sayi1 = 5
sayi2 = 3

## Hesaplama:
toplam = sayi1 + sayi2
print(toplam)`,
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

## input() Fonksiyonu:
isim = input("İsminizi girin: ")

## F-string ile Birleştirme:
print(f"Merhaba {isim}")`,
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
    longHint: `# Koşullu İfadeler

## if-else Yapısı:
if yas >= 18:
    print("Reşit")
else:
    print("Reşit değil")`,
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
    longHint: `# Döngüler

## for Döngüsü:
for i in range(1, 11):
    print(i)

## range() Fonksiyonu:
# range(1, 11) -> 1'den 10'a kadar (11 dahil değil)`,
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
    longHint: `# Fonksiyonlar

## Fonksiyon Tanımlama:
def topla(a, b):
    return a + b

## Fonksiyon Çağırma:
sonuc = topla(5, 10)
print(sonuc)`,
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
    longHint: `# Listeler

## Liste Oluşturma:
meyveler = ["elma", "armut", "muz"]

## Liste Elemanlarını Yazdırma:
for meyve in meyveler:
    print(meyve)`,
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
    longHint: `# Sözlükler

## Sözlük Oluşturma:
ogrenci = {"isim": "Ali", "not": 85}

## Sözlük Elemanlarını Yazdırma:
for anahtar, deger in ogrenci.items():
    print(f"{anahtar}: {deger}")`,
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

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  loadUserProgress();
  renderCategoryCards();
});

// Render Category Cards
function renderCategoryCards() {
  const categoriesGrid = document.getElementById("categoriesGrid");
  if (!categoriesGrid) {
    console.error("categoriesGrid element bulunamadı!");
    return;
  }
  categoriesGrid.innerHTML = "";
  
  const categories = [
    {
      name: "Temel",
      icon: "🚀",
      title: "Python'a İlk Adım",
      description: "Print, değişkenler ve temel kavramlar",
      difficulty: 1,
      level: "Temel",
      color: "#4CAF50",
      tasks: 3
    },
    {
      name: "Orta",
      icon: "⚡",
      title: "Orta Seviye Python",
      description: "Döngüler, koşullar ve fonksiyonlar",
      difficulty: 2,
      level: "Orta",
      color: "#FF9800",
      tasks: 3
    },
    {
      name: "İleri",
      icon: "🎯",
      title: "İleri Seviye Python",
      description: "Listeler, sözlükler ve projeler",
      difficulty: 3,
      level: "İleri",
      color: "#E91E63",
      tasks: 2
    },
    {
      name: "Serbest",
      icon: "💻",
      title: "Serbest Mod",
      description: "İstediğiniz kodu yazın ve çalıştırın",
      difficulty: 0,
      level: "Serbest",
      color: "#9C27B0",
      tasks: 0,
      isFreeMode: true
    }
  ];
  
  categories.forEach((category, index) => {
    const categoryCard = document.createElement("div");
    categoryCard.className = "category-card";
    categoryCard.dataset.category = category.name;
    
    // Calculate progress for this category
    const categoryTasks = tasks.filter(task => task.category === category.name);
    const completedTasks = categoryTasks.filter(task => 
      userProgress.completedTasks.includes(task.id)
    );
    
    const progressPercentage = categoryTasks.length > 0 
      ? (completedTasks.length / categoryTasks.length) * 100 
      : 0;
    
    // Create filled stars based on level
    let difficultyStars = "";
    if (category.name === "Temel") {
      difficultyStars = "★★☆☆☆"; // 2 stars filled
    } else if (category.name === "Orta") {
      difficultyStars = "★★★☆☆"; // 3 stars filled
    } else if (category.name === "İleri") {
      difficultyStars = "★★★★★"; // 5 stars filled
    } else if (category.name === "Serbest") {
      difficultyStars = "∞"; // Infinity symbol for free mode
    }
    
    categoryCard.innerHTML = `
      <div class="category-content">
        <div class="card-top">
          <div class="card-header">
            <span class="category-icon">${category.icon}</span>
            <h3 class="category-title">${category.title}</h3>
            <p class="category-description">${category.description}</p>
          </div>
          
          <div class="card-footer">
            <div class="category-stats">
              <div class="category-difficulty">
                <span class="difficulty-stars">${difficultyStars}</span>
              </div>
              <div class="category-tasks">
                ${category.isFreeMode ? "Sınırsız" : categoryTasks.length + " görev"}
              </div>
            </div>
          </div>
        </div>
        
        <div class="button-container">
          <button class="start-button">
            ${category.isFreeMode ? 'Serbest Mod' : (progressPercentage > 0 ? 'Devam Et' : 'Başla')} →
          </button>
        </div>
      </div>
    `;
    
    // Add animation delay
    categoryCard.style.animationDelay = `${index * 0.1}s`;
    
    categoryCard.addEventListener("click", () => selectCategory(category.name));
    
    categoriesGrid.appendChild(categoryCard);
  });
}

// Select Category
function selectCategory(categoryName) {
  if (categoryName === "Serbest") {
    // Redirect to free mode editor
    window.location.href = "editor.html?mode=free";
  } else {
    // Redirect to task selection page with category parameter
    window.location.href = `task-selection.html?category=${encodeURIComponent(categoryName)}`;
  }
}
