// Global Variables
let editor;
let currentTask = null;
let isDarkTheme = false;
let pyodide = null; // Pyodide instance
let isPyodideLoaded = false; // Pyodide yükleme durumu
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
    starterCode:
      '# İlk Python programınızı buraya yazın\nprint("Merhaba Dünya")',
    expectedOutput: "Merhaba Dünya",
    hints: ["print() fonksiyonunu kullanın", "Tırnak işaretlerini unutmayın"],
    points: 10,
    solution: 'print("Merhaba Dünya")',
  },
  {
    id: 2,
    title: "Değişkenler ve Hesaplama",
    description: "İki sayıyı toplayan bir program yazın.",
    difficulty: 1,
    category: "Temel",
    starterCode:
      "# İki sayıyı toplayan program\nsayi1 = 5\nsayi2 = 3\n# Toplamı hesaplayın ve yazdırın",
    expectedOutput: "8",
    hints: [
      "Toplama için + operatörünü kullanın",
      "Sonucu print() ile yazdırın",
    ],
    points: 15,
    solution: "sayi1 = 5\nsayi2 = 3\ntoplam = sayi1 + sayi2\nprint(toplam)",
  },
  {
    id: 3,
    title: "Döngü ile Sayılar",
    description: "1'den 5'e kadar olan sayıları yazdırın.",
    difficulty: 2,
    category: "Döngüler",
    starterCode:
      "# 1'den 5'e kadar sayıları yazdırın\nfor i in range(1, 6):\n    print(i)",
    expectedOutput: "1\n2\n3\n4\n5",
    hints: ["for döngüsü kullanın", "range() fonksiyonunu kullanın"],
    points: 20,
    solution: "for i in range(1, 6):\n    print(i)",
  },
  {
    id: 4,
    title: "Tahmin Oyunu",
    description:
      "1-10 arası rastgele bir sayı üretin ve kullanıcıdan tahmin etmesini isteyin.",
    difficulty: 3,
    category: "Oyunlar",
    starterCode:
      'import random\n\n# Rastgele sayı üretin\nsayi = random.randint(1, 10)\nprint(f"1-10 arası bir sayı tahmin edin: {sayi}")',
    expectedOutput: /1-10 arası bir sayı tahmin edin: \d+/,
    hints: ["random.randint() kullanın", "f-string ile formatlama yapın"],
    points: 25,
    solution:
      'import random\nsayi = random.randint(1, 10)\nprint(f"1-10 arası bir sayı tahmin edin: {sayi}")',
  },
  {
    id: 5,
    title: "Turtle ile Çizim",
    description: "Turtle kullanarak bir kare çizin.",
    difficulty: 2,
    category: "Çizim",
    starterCode:
      "import turtle\n\n# Turtle nesnesini oluşturun\nt = turtle.Turtle()\n\n# Kare çizin\nfor i in range(4):\n    t.forward(100)\n    t.right(90)\n\nturtle.done()",
    expectedOutput: "Kare çizildi",
    hints: [
      "turtle.Turtle() ile nesne oluşturun",
      "forward() ve right() metodlarını kullanın",
    ],
    points: 30,
    solution:
      "import turtle\nt = turtle.Turtle()\nfor i in range(4):\n    t.forward(100)\n    t.right(90)\nturtle.done()",
  },
  {
    id: 6,
    title: "Liste İşlemleri",
    description: "Bir liste oluşturun ve elemanlarını toplayın.",
    difficulty: 2,
    category: "Veri Yapıları",
    starterCode:
      '# Sayılar listesi oluşturun\nsayilar = [1, 2, 3, 4, 5]\n\n# Toplamı hesaplayın\ntoplam = sum(sayilar)\nprint(f"Toplam: {toplam}")',
    expectedOutput: "Toplam: 15",
    hints: ["sum() fonksiyonunu kullanın", "f-string ile formatlama yapın"],
    points: 20,
    solution:
      'sayilar = [1, 2, 3, 4, 5]\ntoplam = sum(sayilar)\nprint(f"Toplam: {toplam}")',
  },
  {
    id: 7,
    title: "Fonksiyon Yazma",
    description: "İki sayıyı çarpan bir fonksiyon yazın.",
    difficulty: 3,
    category: "Fonksiyonlar",
    starterCode:
      'def carp(a, b):\n    return a * b\n\n# Fonksiyonu test edin\nsonuc = carp(4, 5)\nprint(f"4 x 5 = {sonuc}")',
    expectedOutput: "4 x 5 = 20",
    hints: ["def ile fonksiyon tanımlayın", "return ile sonucu döndürün"],
    points: 25,
    solution:
      'def carp(a, b):\n    return a * b\nsonuc = carp(4, 5)\nprint(f"4 x 5 = {sonuc}")',
  },
  {
    id: 8,
    title: "Koşullu İfadeler",
    description:
      "Bir sayının pozitif, negatif veya sıfır olduğunu kontrol edin.",
    difficulty: 2,
    category: "Koşullar",
    starterCode:
      'sayi = 7\n\nif sayi > 0:\n    print("Pozitif")\nelif sayi < 0:\n    print("Negatif")\nelse:\n    print("Sıfır")',
    expectedOutput: "Pozitif",
    hints: ["if, elif, else kullanın", "Karşılaştırma operatörlerini kullanın"],
    points: 20,
    solution:
      'sayi = 7\nif sayi > 0:\n    print("Pozitif")\nelif sayi < 0:\n    print("Negatif")\nelse:\n    print("Sıfır")',
  },
  {
    id: 9,
    title: "Matematik İşlemleri",
    description: "Karmaşık matematik işlemleri yapın.",
    difficulty: 2,
    category: "Temel",
    starterCode:
      "import math\n\n# Pi sayısını kullanarak daire alanı hesaplayın\nr = 5\nalan = math.pi * r ** 2\nprint(f'Yarıçapı {r} olan dairenin alanı: {alan:.2f}')",
    expectedOutput: /Yarıçapı 5 olan dairenin alanı: 78\.54/,
    hints: ["math.pi kullanın", "** operatörü ile üs alın"],
    points: 25,
    solution:
      "import math\nr = 5\nalan = math.pi * r ** 2\nprint(f'Yarıçapı {r} olan dairenin alanı: {alan:.2f}')",
  },
  {
    id: 10,
    title: "String İşlemleri",
    description: "String metodlarını kullanarak metin işlemleri yapın.",
    difficulty: 2,
    category: "Temel",
    starterCode:
      'metin = "Python Programlama Dili"\n\n# Metni büyük harfe çevirin\nbuyuk = metin.upper()\nprint(buyuk)\n\n# Kelime sayısını bulun\nkelime_sayisi = len(metin.split())\nprint(f"Kelime sayısı: {kelime_sayisi}")',
    expectedOutput: "PYTHON PROGRAMLAMA DİLİ\nKelime sayısı: 3",
    hints: ["upper() metodunu kullanın", "split() ile kelimeleri ayırın"],
    points: 20,
    solution:
      'metin = "Python Programlama Dili"\nbuyuk = metin.upper()\nprint(buyuk)\nkelime_sayisi = len(metin.split())\nprint(f"Kelime sayısı: {kelime_sayisi}")',
  },
];

// Achievements Data
const achievements = [
  {
    id: 1,
    title: "İlk Adım",
    description: "İlk görevi tamamladınız!",
    icon: "🎯",
    condition: () => userProgress.completedTasks.length >= 1,
  },
  {
    id: 2,
    title: "Kod Ustası",
    description: "5 görev tamamladınız!",
    icon: "🏆",
    condition: () => userProgress.completedTasks.length >= 5,
  },
  {
    id: 3,
    title: "Puan Avcısı",
    description: "100 puan topladınız!",
    icon: "⭐",
    condition: () => userProgress.points >= 100,
  },
  {
    id: 4,
    title: "Hızlı Kodlayıcı",
    description: "3 görevi ilk denemede tamamladınız!",
    icon: "⚡",
    condition: () => userProgress.firstTryCompletions >= 3,
  },
];

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  initializeEditor();
  loadUserProgress();
  renderTasks();
  renderProgressMap();
  setupEventListeners();
  updateUI();
  initializePyodide(); // Pyodide'i başlat
});

// Initialize Pyodide
async function initializePyodide() {
  try {
    showOutput("info", "🐍 Python runtime yükleniyor...");

    // Pyodide'i yükle
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
    });

    // Gerekli paketleri yükle
    await pyodide.loadPackage(["numpy", "matplotlib", "pandas"]);

    isPyodideLoaded = true;
    showOutput(
      "success",
      "✅ Python runtime başarıyla yüklendi! Gerçek Python kodları çalıştırabilirsiniz."
    );

    // UI'ı güncelle
    updateUI();
  } catch (error) {
    console.error("Pyodide yükleme hatası:", error);
    showOutput(
      "error",
      "❌ Python runtime yüklenemedi. Simülasyon modunda çalışıyoruz."
    );
    isPyodideLoaded = false;
  }
}

// Initialize CodeMirror Editor
function initializeEditor() {
  const textarea = document.getElementById("codeEditor");

  editor = CodeMirror.fromTextArea(textarea, {
    mode: "python",
    theme: isDarkTheme ? "monokai" : "default",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      Tab: function (cm) {
        if (cm.somethingSelected()) {
          cm.indentSelection("add");
        } else {
          cm.replaceSelection("    ", "end");
        }
      },
    },
  });

  // Set initial content
  editor.setValue("# Python kodunuzu buraya yazın\nprint('Merhaba Dünya')");
}

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

// Render Tasks in Sidebar
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = `task-item ${
      userProgress.completedTasks.includes(task.id) ? "completed" : ""
    }`;
    taskElement.dataset.taskId = task.id;

    const difficultyDots =
      "●".repeat(task.difficulty) + "○".repeat(5 - task.difficulty);

    taskElement.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="task-description">${task.description}</div>
            <div class="task-difficulty">${difficultyDots}</div>
        `;

    taskElement.addEventListener("click", () => selectTask(task));
    taskList.appendChild(taskElement);
  });
}

// Render Progress Map
function renderProgressMap() {
  const progressMap = document.getElementById("progressMap");
  progressMap.innerHTML = "";

  const categories = [...new Set(tasks.map((task) => task.category))];

  categories.forEach((category) => {
    const categoryTasks = tasks.filter((task) => task.category === category);
    const completedTasks = categoryTasks.filter((task) =>
      userProgress.completedTasks.includes(task.id)
    );

    const progressNode = document.createElement("div");
    progressNode.className = `progress-node ${
      completedTasks.length === categoryTasks.length ? "completed" : ""
    }`;

    progressNode.innerHTML = `
            <span>${getCategoryIcon(category)}</span>
            <div>
                <div>${category}</div>
                <small>${completedTasks.length}/${
      categoryTasks.length
    } tamamlandı</small>
            </div>
        `;

    progressMap.appendChild(progressNode);
  });
}

// Get Category Icon
function getCategoryIcon(category) {
  const icons = {
    Temel: "📝",
    Döngüler: "🔄",
    Oyunlar: "🎮",
    Çizim: "🎨",
    "Veri Yapıları": "📊",
    Fonksiyonlar: "⚙️",
    Koşullar: "❓",
  };
  return icons[category] || "📚";
}



// Setup Event Listeners
function setupEventListeners() {
  // Theme toggle button
  document.getElementById("themeBtn").addEventListener("click", toggleTheme);

  // Run button
  document.getElementById("runBtn").addEventListener("click", runCode);

  // Reset button
  document.getElementById("resetBtn").addEventListener("click", resetCode);

  // Hint button
  document.getElementById("hintBtn").addEventListener("click", showHint);

  // Clear output button
  document
    .getElementById("clearOutputBtn")
    .addEventListener("click", clearOutput);

  // Modal buttons
  document
    .getElementById("profileBtn")
    .addEventListener("click", () => showModal("profileModal"));
  document
    .getElementById("helpBtn")
    .addEventListener("click", () => showModal("helpModal"));

  // Close modal buttons
  document
    .getElementById("closeProfileModal")
    .addEventListener("click", () => hideModal("profileModal"));
  document
    .getElementById("closeHelpModal")
    .addEventListener("click", () => hideModal("helpModal"));

  // Hint modal buttons
  document
    .getElementById("holdHintBtn")
    .addEventListener("click", holdHint);
  
  // Set initial title for hold button
  document.getElementById("holdHintBtn").title = "İpucu penceresini sabitle";
  
  // Close hint modal button
  document
    .getElementById("closeHintModal")
    .addEventListener("click", () => hideModal("hintModal"));

  // Close modal on outside click
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        // Don't close if it's a held hint modal
        if (modal.id === "hintModal" && modal.classList.contains("held")) {
          return;
        }
        modal.classList.remove("show");
      }
    });
  });
}

// Run Python Code
function runCode() {
  if (!currentTask) {
    showOutput("error", "❌ Lütfen önce bir görev seçin!");
    return;
  }

  const code = editor.getValue();
  
  // Show loading panel
  showLoadingPanel();
  
  // Clear previous output
  clearOutput();

  // Pyodide yüklüyse gerçek Python çalıştır, değilse simülasyon kullan
  if (isPyodideLoaded && pyodide) {
    runRealPython(code);
  } else {
    runSimulatedPython(code);
  }
}

// Gerçek Python çalıştırma (Pyodide ile)
async function runRealPython(code) {
  try {
    // Çıktıyı yakalamak için stdout'u yönlendir
    pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
`);

    // Kodu çalıştır
    await pyodide.runPythonAsync(code);

    // Çıktıyı al
    const output = pyodide.runPython("sys.stdout.getvalue()");

    // stdout'u geri yükle
    pyodide.runPython("sys.stdout = sys.__stdout__");

    // Hide loading panel
    hideLoadingPanel();

    showOutput(
      "success",
      `✅ Gerçek Python kodu çalıştırıldı!\n\n📤 Çıktı:\n${output}`
    );

    // Görev tamamlama kontrolü
    if (checkTaskCompletion(output, currentTask)) {
      completeTask(currentTask);
    }
  } catch (error) {
    // Hide loading panel on error
    hideLoadingPanel();
    showOutput("error", `❌ Python hatası:\n${error.message}`);
  }
}

// Simülasyon modu (eski sistem)
function runSimulatedPython(code) {
  setTimeout(() => {
    try {
      const result = simulatePythonExecution(code);

      if (result.success) {
        // Hide loading panel
        hideLoadingPanel();
        
        showOutput(
          "success",
          `✅ Kod simülasyonu çalıştırıldı!\n\n📤 Çıktı:\n${result.output}`
        );

        if (checkTaskCompletion(code, currentTask)) {
          completeTask(currentTask);
        }
      } else {
        // Hide loading panel on error
        hideLoadingPanel();
        showOutput("error", `❌ Hata oluştu:\n${result.error}`);
      }
    } catch (error) {
      // Hide loading panel on error
      hideLoadingPanel();
      showOutput("error", `❌ Beklenmeyen hata:\n${error.message}`);
    }
  }, 1000);
}

// Simulate Python Execution
function simulatePythonExecution(code) {
  // This is a simplified simulation - in a real app, you'd use a Python backend
  const lines = code.split("\n");
  let output = "";
  let error = null;

  try {
    // Basic Python syntax checking and output simulation
    for (let line of lines) {
      line = line.trim();

      if (line.startsWith("print(") && line.endsWith(")")) {
        const content = line.slice(6, -1);
        output += content.replace(/['"]/g, "") + "\n";
      } else if (line.includes("import")) {
        // Handle imports
        continue;
      } else if (line.includes("=")) {
        // Handle variable assignments
        continue;
      } else if (
        line.startsWith("for ") ||
        line.startsWith("if ") ||
        line.startsWith("def ")
      ) {
        // Handle control structures
        continue;
      } else if (line.includes("turtle")) {
        output += "Kare çizildi\n";
      } else if (line.includes("random")) {
        const match = line.match(/randint\((\d+),\s*(\d+)\)/);
        if (match) {
          const min = parseInt(match[1]);
          const max = parseInt(match[2]);
          const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
          output += `1-10 arası bir sayı tahmin edin: ${randomNum}\n`;
        }
      }
    }

    return { success: true, output: output.trim() };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Check Task Completion
function checkTaskCompletion(output, task) {
  // Gerçek Python çıktısı ile karşılaştır
  if (task.expectedOutput instanceof RegExp) {
    return task.expectedOutput.test(output);
  } else {
    return output.includes(task.expectedOutput);
  }
}

// Complete Task
function completeTask(task) {
  if (userProgress.completedTasks.includes(task.id)) {
    return; // Already completed
  }

  // Add to completed tasks
  userProgress.completedTasks.push(task.id);

  // Add points
  userProgress.points += task.points;

  // Check for level up
  const newLevel = Math.floor(userProgress.points / 100) + 1;
  if (newLevel > userProgress.level) {
    userProgress.level = newLevel;
    showLevelUpAnimation();
  }

  // Save progress
  saveUserProgress();

  // Update UI
  updateUI();
  renderTasks();
  renderProgressMap();

  // Show success animation
  showSuccessAnimation();

  // Show completion message
  setTimeout(() => {
    showOutput(
      "success",
      `🎉 Tebrikler! Görev tamamlandı!\n🏆 ${task.points} puan kazandınız!\n⭐ Toplam puanınız: ${userProgress.points}`
    );
  }, 1000);
}

// Reset Code
function resetCode() {
  if (currentTask) {
    editor.setValue(currentTask.starterCode);
    clearOutput();
    showOutput("info", "🔄 Kod sıfırlandı. Başlangıç koduna döndünüz.");
  }
}

// Show Hint
function showHint() {
  if (!currentTask) {
    // Don't show output message, just return silently
    return;
  }

  // Add animation to hint button
  const hintBtn = document.getElementById("hintBtn");
  hintBtn.classList.add("hint-active");
  setTimeout(() => hintBtn.classList.remove("hint-active"), 600);

  const hints = currentTask.hints;
  const randomHint = hints[Math.floor(Math.random() * hints.length)];
  
  // Populate hint content
  const hintContent = document.getElementById("hintContent");
  hintContent.innerHTML = `
    <h4>💡 ${currentTask.title} İpucu</h4>
    <p><strong>İpucu:</strong> ${randomHint}</p>
  `;
  
  // Show hint modal
  const hintModal = document.getElementById("hintModal");
  hintModal.classList.add("show");
}

// Update Pinned Hint
function updatePinnedHint(task) {
  const hintModal = document.getElementById("hintModal");
  
  console.log("updatePinnedHint called for task:", task.title);
  console.log("Hint modal held status:", hintModal.classList.contains("held"));
  
  // Check if hint modal is pinned
  if (hintModal.classList.contains("held")) {
    console.log("Updating pinned hint content...");
    
    const hints = task.hints;
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    
    // Update hint content with new task information
    const hintContent = document.getElementById("hintContent");
    hintContent.innerHTML = `
      <h4>💡 ${task.title} İpucu</h4>
      <p><strong>İpucu:</strong> ${randomHint}</p>
    `;
    
    // Add a subtle animation to show the hint was updated
    hintContent.style.animation = "hintUpdate 0.5s ease";
    setTimeout(() => {
      hintContent.style.animation = "";
    }, 500);
    
    // Show a brief update notification
    showHintUpdateNotification();
    
    console.log("Hint updated successfully");
  } else {
    console.log("Hint modal is not pinned, no update needed");
  }
}

// Show Hint Update Notification
function showHintUpdateNotification() {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "hint-update-notification";
  notification.innerHTML = "🔄 İpucu güncellendi";
  
  // Add to the pinned hint modal
  const hintModal = document.getElementById("hintModal");
  const modalContent = hintModal.querySelector(".modal-content");
  
  // Position the notification at the top of the modal
  modalContent.appendChild(notification);
  
  // Remove notification after 2 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 2000);
}

// Debug function to check hint modal state
function debugHintState() {
  const hintModal = document.getElementById("hintModal");
  const holdBtn = document.getElementById("holdHintBtn");
  
  console.log("=== Hint Modal Debug Info ===");
  console.log("Modal element:", hintModal);
  console.log("Modal classes:", hintModal.className);
  console.log("Is held:", hintModal.classList.contains("held"));
  console.log("Is visible:", hintModal.classList.contains("show"));
  console.log("Hold button text:", holdBtn.textContent);
  console.log("Current task:", currentTask ? currentTask.title : "None");
  console.log("=============================");
}

// Hold Hint Function
function holdHint() {
  const holdBtn = document.getElementById("holdHintBtn");
  const hintModal = document.getElementById("hintModal");
  
  console.log("holdHint called, current state:", holdBtn.textContent);
  
  if (holdBtn.textContent === "📌 Sabitle") {
    // Pin the hint window
    holdBtn.textContent = "🔓 Bırak";
    holdBtn.classList.add("btn-warning");
    holdBtn.classList.remove("btn-secondary");
    hintModal.classList.add("held");
    
    console.log("Hint pinned, held class added:", hintModal.classList.contains("held"));
    
    // Add a visual indicator that it's pinned
    holdBtn.title = "İpucu penceresi sabitlendi";
    
    // Enable dragging for pinned modal
    enableDragging(hintModal);
  } else {
    // Unpin the hint window
    holdBtn.textContent = "📌 Sabitle";
    holdBtn.classList.remove("btn-warning");
    holdBtn.classList.add("btn-secondary");
    hintModal.classList.remove("held");
    
    console.log("Hint unpinned, held class removed:", hintModal.classList.contains("held"));
    
    // Remove the visual indicator
    holdBtn.title = "İpucu penceresini sabitle";
    
    // Disable dragging
    disableDragging(hintModal);
  }
}

// Enable dragging for modal
function enableDragging(modal) {
  const modalContent = modal.querySelector('.modal-content');
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  function dragStart(e) {
    if (e.target.closest('.close-btn') || e.target.closest('#holdHintBtn')) {
      return; // Don't start dragging if clicking on buttons
    }
    
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    
    if (e.target === modalContent || e.target.closest('.modal-header')) {
      isDragging = true;
    }
  }

  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      
      xOffset = currentX;
      yOffset = currentY;
      
      setTranslate(currentX, currentY, modalContent);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
  }

  // Remove any existing event listeners
  modalContent.removeEventListener('mousedown', dragStart);
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', dragEnd);

  // Add new event listeners
  modalContent.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
}

// Disable dragging for modal
function disableDragging(modal) {
  const modalContent = modal.querySelector('.modal-content');
  
  // Remove event listeners
  modalContent.removeEventListener('mousedown', null);
  document.removeEventListener('mousemove', null);
  document.removeEventListener('mouseup', null);
  
  // Reset transform
  modalContent.style.transform = 'none';
}

// Show Loading Panel
function showLoadingPanel() {
  const loadingPanel = document.getElementById("loadingPanel");
  loadingPanel.classList.add("show");
  
  // Store the start time to ensure minimum display duration
  loadingPanel.dataset.startTime = Date.now();
  
  // Set a timeout to hide loading panel after 30 seconds (safety measure)
  setTimeout(() => {
    if (loadingPanel.classList.contains("show")) {
      hideLoadingPanel();
      showOutput("warning", "⚠️ Kod çalıştırma zaman aşımına uğradı. Lütfen tekrar deneyin.");
    }
  }, 30000);
}

// Hide Loading Panel
function hideLoadingPanel() {
  const loadingPanel = document.getElementById("loadingPanel");
  const startTime = parseInt(loadingPanel.dataset.startTime) || 0;
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const minimumDisplayTime = 500; // 0.5 seconds in milliseconds
  
  if (elapsedTime < minimumDisplayTime) {
    // If less than 0.5 seconds has passed, wait for the remaining time
    const remainingTime = minimumDisplayTime - elapsedTime;
    setTimeout(() => {
      loadingPanel.classList.remove("show");
    }, remainingTime);
  } else {
    // If 0.5 seconds or more has passed, hide immediately
    loadingPanel.classList.remove("show");
  }
}

// Show Output
function showOutput(type, message) {
  const outputContent = document.getElementById("outputContent");
  const outputDiv = document.createElement("div");
  outputDiv.className = `output-${type}`;
  outputDiv.textContent = message;

  outputContent.appendChild(outputDiv);
  outputContent.scrollTop = outputContent.scrollHeight;
}

// Clear Output
function clearOutput() {
  const outputContent = document.getElementById("outputContent");
  outputContent.innerHTML = `
        <!-- Output will be displayed here -->
    `;
}

// Show Success Animation
function showSuccessAnimation() {
  createConfetti();

  // Add success class to run button
  const runBtn = document.getElementById("runBtn");
  runBtn.classList.add("success-animation");
  setTimeout(() => runBtn.classList.remove("success-animation"), 500);
}

// Create Confetti Animation
function createConfetti() {
  const confettiContainer = document.getElementById("confettiContainer");
  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#feca57",
    "#ff9ff3",
  ];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 3 + "s";
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";

    confettiContainer.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Show Level Up Animation
function showLevelUpAnimation() {
  const levelBadge = document.querySelector(".level-badge");
  levelBadge.textContent = `Seviye ${userProgress.level}`;
  levelBadge.classList.add("bounce");

  setTimeout(() => {
    levelBadge.classList.remove("bounce");
  }, 1000);

  showOutput(
    "success",
    `🎉 Seviye atladınız! Yeni seviyeniz: ${userProgress.level}`
  );
}

// Update UI
function updateUI() {
  // Update level and points
  const levelBadge = document.querySelector(".level-badge");
  const progressFill = document.querySelector(".progress-fill");
  const pointsSpan = document.querySelector(".points");
  const totalPoints = document.getElementById("totalPoints");
  const completedTasks = document.getElementById("completedTasks");
  const currentLevel = document.getElementById("currentLevel");

  if (levelBadge) levelBadge.textContent = `Seviye ${userProgress.level}`;
  if (progressFill) {
    const progress = ((userProgress.points % 100) / 100) * 100;
    progressFill.style.width = `${progress}%`;
  }
  if (pointsSpan) pointsSpan.textContent = `${userProgress.points} Puan`;
  if (totalPoints) totalPoints.textContent = userProgress.points;
  if (completedTasks)
    completedTasks.textContent = userProgress.completedTasks.length;
  if (currentLevel) currentLevel.textContent = userProgress.level;

  // Pyodide durumunu göster
  const runBtn = document.getElementById("runBtn");
  if (runBtn) {
    if (isPyodideLoaded) {
      runBtn.innerHTML = "🐍 Çalıştır (Gerçek Python)";
      runBtn.title = "Gerçek Python runtime ile çalıştır";
    } else {
      runBtn.innerHTML = "🔄 Çalıştır (Simülasyon)";
      runBtn.title = "Simülasyon modunda çalıştır";
    }
  }

  // Update achievements
  updateAchievements();
}

// Update Achievements
function updateAchievements() {
  const achievementList = document.getElementById("achievementList");
  achievementList.innerHTML = "";

  achievements.forEach((achievement) => {
    const isUnlocked = achievement.condition();
    const achievementElement = document.createElement("div");
    achievementElement.className = `achievement-item ${
      isUnlocked ? "unlocked" : ""
    }`;

    achievementElement.innerHTML = `
            <span class="achievement-icon">${achievement.icon}</span>
            <div class="achievement-info">
                <h5>${achievement.title}</h5>
                <p>${achievement.description}</p>
            </div>
        `;

    achievementList.appendChild(achievementElement);
  });
}

// Show Modal
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("show");
}

// Hide Modal
function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("show");
}

// Keyboard Shortcuts
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        runCode();
        break;
      case "r":
        e.preventDefault();
        resetCode();
        break;
      case "h":
        e.preventDefault();
        showHint();
        break;
    }
  }
  
  // Debug shortcut: Ctrl+Shift+D
  if (e.ctrlKey && e.shiftKey && e.key === "D") {
    e.preventDefault();
    debugHintState();
  }
});

// Auto-save code changes
editor.on("change", function () {
  if (currentTask) {
    // Save current code to localStorage
    localStorage.setItem(`task_${currentTask.id}_code`, editor.getValue());
  }
});

// Load saved code when selecting task
function loadSavedCode(taskId) {
  const savedCode = localStorage.getItem(`task_${taskId}_code`);
  if (savedCode) {
    return savedCode;
  }
  return null;
}

// Enhanced task selection with saved code
function selectTask(task) {
  console.log("selectTask called for:", task.title);
  
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

  // Show welcome message
  showOutput(
    "info",
    `🎯 Görev: ${task.title}\n📝 ${task.description}\n🏆 Puan: ${task.points}`
  );

  // Update pinned hint if it exists
  updatePinnedHint(task);
}

// Theme Toggle Function
function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  const body = document.body;
  const themeBtn = document.getElementById("themeBtn");

  if (isDarkTheme) {
    body.classList.add("dark-theme");
    themeBtn.textContent = "☀️";
    themeBtn.title = "Açık temaya geç";
  } else {
    body.classList.remove("dark-theme");
    themeBtn.textContent = "🌙";
    themeBtn.title = "Koyu temaya geç";
  }

  // Save theme preference to localStorage
  localStorage.setItem("darkTheme", isDarkTheme);

  // Update CodeMirror theme if editor exists
  if (editor) {
    if (isDarkTheme) {
      editor.setOption("theme", "monokai");
    } else {
      editor.setOption("theme", "default");
    }
  }
}

// Load theme preference on startup
function loadThemePreference() {
  const savedTheme = localStorage.getItem("darkTheme");
  if (savedTheme === "true") {
    isDarkTheme = true;
    document.body.classList.add("dark-theme");
    document.getElementById("themeBtn").textContent = "☀️";
    document.getElementById("themeBtn").title = "Açık temaya geç";
  } else {
    document.getElementById("themeBtn").title = "Koyu temaya geç";
  }
}

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", function () {
  loadThemePreference();
});
