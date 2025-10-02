// Editor Screen JavaScript

// Global Variables
let currentTask = null;
let isDarkTheme = false;
let pyodide = null;
let isPyodideLoaded = false;
let editor = null;

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

// Get URL Parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  loadUserProgress();
  setupEventListeners();
  initializeEditor();
  renderTasks();
  updateUI();
  initializePyodide();
  
  // Load task from URL parameter
  const taskId = getUrlParameter('task');
  if (taskId) {
    const task = tasks.find(t => t.id == taskId);
    if (task) {
      selectTask(task);
    }
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
  
  // Back to categories button
  document.getElementById("backToCategoriesBtn").addEventListener("click", () => {
    window.location.href = 'index.html';
  });
  
  // Theme button
  document.getElementById("themeBtn").addEventListener("click", toggleTheme);
  
  // Profile button
  document.getElementById("profileBtn").addEventListener("click", showProfile);
  
  // Help button
  document.getElementById("helpBtn").addEventListener("click", showHelp);
  
  // Alert modal
  document.getElementById("closeAlertModal").addEventListener("click", closeAlert);
  document.getElementById("alertOkBtn").addEventListener("click", closeAlert);
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
}

// Render Tasks
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  
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
  currentTask = task;
  
  // Update active task in sidebar
  document.querySelectorAll(".task-item").forEach((item) => {
    item.classList.remove("active");
  });
  document.querySelector(`[data-task-id="${task.id}"]`).classList.add("active");
  
  // Load saved code or use starter code
  const savedCode = loadSavedCode(task.id);
  editor.setValue(savedCode || task.starterCode);
  
  // Update task title
  document.getElementById("currentTaskTitle").textContent = task.title;
  
  // Clear output
  clearOutput();
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
  if (!currentTask) {
    showAlert("Lütfen önce bir görev seçin!");
    return;
  }
  
  const code = editor.getValue();
  if (!code.trim()) {
    showAlert("Lütfen kod yazın!");
    return;
  }
  
  try {
    if (isPyodideLoaded) {
      await runWithPyodide(code);
    } else {
      runWithSimulation(code);
    }
  } catch (error) {
    showAlert(`Hata: ${error.message}`);
  }
}

// Run with Pyodide
async function runWithPyodide(code) {
  const output = pyodide.runPython(code);
  showOutput(output.toString());
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
  } catch (error) {
    showOutput(`Hata: ${error.message}`);
  }
}

// Show Output
function showOutput(content) {
  const outputContent = document.getElementById("outputContent");
  outputContent.innerHTML = `<pre>${content}</pre>`;
  
  // Check if task is completed
  if (currentTask && content.includes(currentTask.expectedOutput)) {
    completeTask(currentTask);
  }
}

// Show Alert
function showAlert(message) {
  document.getElementById("alertMessage").textContent = message;
  document.getElementById("alertModal").style.display = "flex";
}

// Close Alert
function closeAlert() {
  document.getElementById("alertModal").style.display = "none";
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
  if (currentTask) {
    showAlert(currentTask.longHint);
  }
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
    
    showAlert(`🎉 Tebrikler! "${task.title}" görevini tamamladınız! +${task.points} puan`);
  }
}

// Update UI
function updateUI() {
  // Update level
  document.querySelector(".level-text").textContent = `Seviye ${userProgress.level}`;
  
  // Update points
  document.querySelector(".points-text").textContent = `${userProgress.points} Puan`;
  
  // Update progress
  const progressFill = document.querySelector(".progress-fill");
  const progressPercentage = (userProgress.points % 100);
  progressFill.style.width = `${progressPercentage}%`;
  
  // Update next level info
  const nextLevelPoints = 100 - (userProgress.points % 100);
  document.getElementById("nextLevelInfo").textContent = `Sonraki seviye için: ${nextLevelPoints} puan`;
}

// Initialize Pyodide
async function initializePyodide() {
  try {
    pyodide = await loadPyodide();
    isPyodideLoaded = true;
    console.log("Pyodide yüklendi!");
  } catch (error) {
    console.log("Pyodide yüklenemedi, simülasyon modu kullanılacak:", error);
    isPyodideLoaded = false;
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
