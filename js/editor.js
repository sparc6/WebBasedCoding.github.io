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
  console.log("DOM yüklendi, uygulama başlatılıyor...");
  
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
    
    // Disable run button initially
    const runBtn = document.getElementById("runBtn");
    if (runBtn) {
      runBtn.textContent = "⏳ Yükleniyor...";
      runBtn.disabled = true;
    }
    
    console.log("6. initializePyodide çağrılıyor...");
    // Initialize Pyodide
    initializePyodide();
    
    // Load task from URL parameter
    const taskId = getUrlParameter('task');
    console.log("Task ID:", taskId);
    if (taskId) {
      const task = tasks.find(t => t.id == taskId);
      console.log("Bulunan task:", task);
      if (task) {
        console.log("7. selectTask çağrılıyor...");
        selectTask(task);
      } else {
        console.log("Task bulunamadı!");
        showAlert("Görev bulunamadı!");
      }
    }
    
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
  
  // Alert modal removed
  
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
    
    // Update task title
    console.log("Task title güncelleniyor...");
    const titleElement = document.getElementById("currentTaskTitle");
    if (titleElement) {
      titleElement.textContent = task.title;
      console.log("Task title güncellendi:", task.title);
    } else {
      console.log("Task title element bulunamadı!");
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
    if (!currentTask) {
      console.log("currentTask yok!");
      showAlert("Lütfen önce bir görev seçin!");
      return;
    }
    
    console.log("currentTask:", currentTask);
    
    const code = editor.getValue();
    console.log("Editor kodu:", code);
    
    if (!code.trim()) {
      console.log("Kod boş!");
      showAlert("Lütfen kod yazın!");
      return;
    }
    
    console.log("isPyodideLoaded:", isPyodideLoaded);
    
    // Show loading message
    showOutput("🔄 Kod çalıştırılıyor...");
    
    // Show analysis popup
    showAnalysisPopup();
    
    if (isPyodideLoaded) {
      console.log("Pyodide ile çalıştırılıyor...");
      await runWithPyodide(code);
    } else {
      console.log("Simülasyon ile çalıştırılıyor...");
      runWithSimulation(code);
    }
    
    // Check if task is completed
    setTimeout(() => {
      checkTaskCompletion(code);
    }, 500);
    
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
      showOutput(output);
    } else if (result !== undefined && result !== null) {
      showOutput(result.toString());
    } else {
      showOutput("✅ Kod başarıyla çalıştırıldı!\n\nNot: Bu kod herhangi bir çıktı üretmedi. Eğer sonucu görmek istiyorsanız, print() fonksiyonu kullanın.");
    }
  } catch (error) {
    showOutput(`Hata: ${error.message}`);
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
  if (currentTask) {
    console.log("İpucu içeriği:", currentTask.longHint);
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
    
    // showAlert(`🎉 Tebrikler! "${task.title}" görevini tamamladınız! +${task.points} puan`);
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
  
  const output = document.getElementById("outputContent").textContent.trim();
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
  window.location.href = 'task-selection.html?category=' + currentTask.level.toLowerCase();
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
  console.log("İpucu:", currentTask.longHint);
}
