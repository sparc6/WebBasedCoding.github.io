// Task Selection Screen JavaScript

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
  } else {
    // Test için geçici veri
    userProgress = {
      level: 1,
      points: 20,
      completedTasks: [1, 2],
      achievements: []
    };
  }
}

// Get URL Parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Get Category Data
function getCategoryData(categoryName) {
  const categories = {
    "Temel": { 
      title: "Python'a İlk Adım", 
      icon: "🚀",
      description: "Print, değişkenler ve temel kavramlarla Python'a giriş yapın.<br>İlk adımlarınızı atın!"
    },
    "Orta": { 
      title: "Orta Seviye Python", 
      icon: "⚡",
      description: "Döngüler, koşullar ve fonksiyonlarla Python'da daha karmaşık programlar yazın."
    },
    "İleri": { 
      title: "İleri Seviye Python", 
      icon: "🎯",
      description: "Listeler, sözlükler ve projelerle Python'da uzmanlaşın. Gerçek uygulamalar geliştirin!"
    }
  };
  return categories[categoryName] || { title: categoryName, icon: "📝", description: "Bu seviyedeki görevleri tamamlayarak Python becerilerinizi geliştirin!" };
}

// Get Task Icon
function getTaskIcon(task) {
  const icons = ["📝", "💻", "🎯", "⚡", "🔧", "🎨", "📊", "🎮"];
  return icons[task.id % icons.length];
}

// Get Short Description
function getShortDescription(task) {
  const descriptions = {
    "Merhaba Dünya": "İlk Python programınızı yazın",
    "Değişkenler ve Hesaplama": "Veri saklama ve kullanma",
    "Kullanıcı Girişi": "Kullanıcıdan veri alma",
    "Koşullu İfadeler": "Karar verme yapıları",
    "Döngüler": "Tekrarlayan işlemler",
    "Fonksiyonlar": "Kod parçacıkları oluşturma",
    "Listeler": "Veri koleksiyonları",
    "Sözlükler": "Anahtar-değer çiftleri"
  };
  return descriptions[task.title] || "Python öğrenme görevi";
}

// Get Task Points
function getTaskPoints(task) {
  return task.points || 10;
}

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  loadUserProgress();
  
  const categoryName = getUrlParameter('category');
  if (categoryName) {
    renderZigzagPath(categoryName);
    updateCategoryTitle(categoryName);
  } else {
    // Redirect to home if no category
    window.location.href = 'index.html';
  }
  
  // Back button event listener
  document.getElementById('backToCategoriesBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});

// Update Category Title
function updateCategoryTitle(categoryName) {
  const categoryData = getCategoryData(categoryName);
  document.getElementById('categoryTitle').textContent = categoryData.title;
  document.getElementById('categoryDescription').innerHTML = categoryData.description;
}

// Render Zigzag Path
function renderZigzagPath(categoryName) {
  const zigzagContainer = document.getElementById("zigzagContainer");
  zigzagContainer.innerHTML = "";
  
  // Get tasks for this level (Temel, Orta, İleri) - reverse order so first task is at bottom
  const categoryTasks = tasks.filter(task => task.level === categoryName).reverse();
  
  if (categoryTasks.length === 0) {
    zigzagContainer.innerHTML = "<p>Bu kategoride henüz görev bulunmuyor.</p>";
    return;
  }
  
  // Create curved path layout
  const nodeSpacing = 180;
  const curveIntensity = 150;
  
  // Create SVG for connections
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.zIndex = "1";
  
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let pathData = "";
  
  // Store node positions for curved path
  const nodePositions = [];
  
  // Create nodes in curved path pattern (from bottom to top)
  categoryTasks.forEach((task, index) => {
    const node = document.createElement("div");
    node.className = "zigzag-node";
    node.dataset.taskId = task.id;
    
    // Calculate position in curved path
    const totalWidth = zigzagContainer.offsetWidth || 800;
    const centerX = totalWidth / 2;
    const verticalSpacing = nodeSpacing;
    
    // Create a more dramatic zigzag pattern with curves
    const progress = index / (categoryTasks.length - 1);
    
    // Create a more complex wave pattern - multiple sine waves for more curves
    const wave1 = Math.sin(progress * Math.PI * 3) * curveIntensity;
    const wave2 = Math.sin(progress * Math.PI * 1.5) * (curveIntensity * 0.6);
    const wave3 = Math.sin(progress * Math.PI * 0.8) * (curveIntensity * 0.3);
    
    const curveOffset = wave1 + wave2 + wave3;
    
    // Add some randomness for more natural look
    const randomOffset = (Math.sin(index * 2.3) * 20);
    
    const x = centerX + curveOffset + randomOffset;
    const y = 50 + (index * verticalSpacing);
    
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    
    // Store center position for path
    nodePositions.push({ x: x + 30, y: y + 30 });
    
    // Check if task is completed
    const isCompleted = userProgress.completedTasks.includes(task.id);
    if (isCompleted) {
      node.classList.add("completed");
    }
    
    // Create node content
    const shortDescription = getShortDescription(task);
    const points = getTaskPoints(task);
    
    node.innerHTML = `
      <div class="node-circle ${isCompleted ? 'completed' : ''}">
        <span class="node-icon">${getTaskIcon(task)}</span>
        ${isCompleted ? '<div class="completion-checkmark">✓</div>' : ''}
      </div>
      <div class="node-content">
        <div class="node-title">${task.title}</div>
        <div class="node-description">${shortDescription}</div>
        <div class="node-points">⭐${points} Puan</div>
        ${isCompleted ? `
          <div class="completion-info">
            <div class="earned-points">🎉 +${points} Puan Kazandınız!</div>
            <div class="total-points">💎 Toplam: ${userProgress.points} Puan</div>
          </div>
        ` : `
          <div class="pending-info">
            <div class="pending-points">🚀 ${points} Puan Kazanacaksınız</div>
            <div class="motivation-text">Hemen başlayın!</div>
          </div>
        `}
      </div>
    `;
    
    // Add click event
    node.addEventListener("click", () => {
      selectTask(task.id);
    });
    
    zigzagContainer.appendChild(node);
  });
  
  // Create smooth curved path connecting all nodes (from top to bottom)
  if (nodePositions.length > 1) {
    pathData = `M ${nodePositions[0].x} ${nodePositions[0].y}`;
    
    for (let i = 1; i < nodePositions.length; i++) {
      const prev = nodePositions[i - 1];
      const current = nodePositions[i];
      
      // Calculate control points for more dramatic curves
      const midX = (prev.x + current.x) / 2;
      const midY = (prev.y + current.y) / 2;
      
      // Create more dramatic control points
      const controlPoint1X = prev.x + (current.x - prev.x) * 0.2;
      const controlPoint1Y = prev.y + (current.y - prev.y) * 0.2 + Math.sin(i * 0.5) * 30;
      const controlPoint2X = prev.x + (current.x - prev.x) * 0.8;
      const controlPoint2Y = prev.y + (current.y - prev.y) * 0.8 + Math.cos(i * 0.7) * 25;
      
      // Use cubic bezier curves for smooth path
      pathData += ` C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${current.x} ${current.y}`;
    }
  }
  
  // Set path attributes
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "#ffd700");
  path.setAttribute("stroke-width", "6");
  path.setAttribute("fill", "none");
  path.setAttribute("class", "zigzag-connector");
  
  svg.appendChild(path);
  zigzagContainer.appendChild(svg);
}

// Select Task
function selectTask(taskId) {
  // Get current category from URL
  const categoryName = getUrlParameter('category');
  // Redirect to editor page with both task and category parameters
  window.location.href = `editor.html?task=${taskId}&category=${encodeURIComponent(categoryName)}`;
}
