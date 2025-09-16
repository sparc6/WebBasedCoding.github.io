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

// Helper function to calculate total available points
function getTotalAvailablePoints() {
  return tasks.reduce((sum, task) => sum + task.points, 0);
}

// Helper function to calculate total available tasks
function getTotalAvailableTasks() {
  return tasks.length;
}

// Helper function to calculate max possible level
function getMaxPossibleLevel() {
  return Math.floor(getTotalAvailablePoints() / 100) + 1;
}

// Helper function to calculate points needed for next level
function getPointsNeededForNextLevel() {
  const currentLevel = userProgress.level;
  const nextLevel = currentLevel + 1;
  const pointsForNextLevel = (nextLevel - 1) * 100;
  const pointsNeeded = pointsForNextLevel - userProgress.points;
  
  // If already at max level, return 0
  if (nextLevel > getMaxPossibleLevel()) {
    return 0;
  }
  
  return Math.max(0, pointsNeeded);
}

// Python Autocomplete Data
const PYTHON_KEYWORDS = [
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class',
  'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global',
  'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise',
  'return', 'try', 'while', 'with', 'yield'
];

const PYTHON_BUILTINS = [
  'abs', 'all', 'any', 'ascii', 'bin', 'bool', 'breakpoint', 'bytearray', 'bytes',
  'callable', 'chr', 'classmethod', 'compile', 'complex', 'delattr', 'dict', 'dir',
  'divmod', 'enumerate', 'eval', 'exec', 'filter', 'float', 'format', 'frozenset',
  'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'input', 'int',
  'isinstance', 'issubclass', 'iter', 'len', 'list', 'locals', 'map', 'max', 'memoryview',
  'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'range',
  'repr', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod',
  'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip'
];

// Documentation for common Python functions and objects
const PYTHON_DOCS = {
  'print': 'print(*objects, sep=" ", end="\\n", file=sys.stdout, flush=False) - Print objects to the text stream file',
  'range': 'range(stop) or range(start, stop[, step]) - Return an object that produces a sequence of integers',
  'len': 'len(s) - Return the length (the number of items) of an object',
  'sum': 'sum(iterable[, start]) - Sums start and the items of an iterable from left to right',
  'list': 'list([iterable]) - Return a list whose items are the same and in the same order as iterable\'s items',
  'dict': 'dict(**kwarg) or dict(mapping, **kwarg) or dict(iterable, **kwarg) - Create a new dictionary',
  'str': 'str(object=\'\') - Return a str version of object',
  'int': 'int([x]) or int(x, base=10) - Return an integer object constructed from a number or string x',
  'float': 'float([x]) - Return a floating point number constructed from a number or string x',
  'bool': 'bool([x]) - Return a Boolean value, i.e. one of True or False',
  'type': 'type(object) or type(name, bases, dict) - Return the type of an object',
  'isinstance': 'isinstance(object, classinfo) - Return True if the object argument is an instance of the classinfo argument',
  'max': 'max(iterable, *[, key, default]) or max(arg1, arg2, *args[, key]) - Return the largest item in an iterable',
  'min': 'min(iterable, *[, key, default]) or min(arg1, arg2, *args[, key]) - Return the smallest item in an iterable',
  'sorted': 'sorted(iterable, *, key=None, reverse=False) - Return a new sorted list from the items in iterable',
  'reversed': 'reversed(seq) - Return a reverse iterator over the values of the given sequence',
  'enumerate': 'enumerate(iterable, start=0) - Return an enumerate object',
  'zip': 'zip(*iterables) - Make an iterator that aggregates elements from each of the iterables',
  'map': 'map(function, iterable, ...) - Return an iterator that applies function to every item of iterable',
  'filter': 'filter(function, iterable) - Construct an iterator from those elements of iterable for which function returns true',
  'open': 'open(file, mode=\'r\', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None) - Open file and return a corresponding file object',
  'input': 'input([prompt]) - If the prompt argument is present, it is written to standard output without a trailing newline',
  'format': 'format(value[, format_spec]) - Convert a value to a "formatted" representation, as controlled by format_spec',
  'chr': 'chr(i) - Return the string representing a character whose Unicode code point is the integer i',
  'ord': 'ord(c) - Given a string representing one Unicode character, return an integer representing the Unicode code point of that character',
  'hex': 'hex(x) - Convert an integer number to a lowercase hexadecimal string prefixed with "0x"',
  'bin': 'bin(x) - Convert an integer number to a binary string prefixed with "0b"',
  'oct': 'oct(x) - Convert an integer number to an octal string prefixed with "0o"',
  'abs': 'abs(x) - Return the absolute value of a number',
  'round': 'round(number[, ndigits]) - Return number rounded to ndigits precision after the decimal point',
  'pow': 'pow(base, exp[, mod]) - Return base to the power exp; if mod is present, return base to the power exp, modulo mod',
  'divmod': 'divmod(a, b) - Return the pair (a // b, a % b)',
  'hash': 'hash(object) - Return the hash value of the object (if it has one)',
  'id': 'id(object) - Return the "identity" of an object',
  'callable': 'callable(object) - Return True if the object argument appears callable, False if not',
  'getattr': 'getattr(object, name[, default]) - Return the value of the named attribute of object',
  'hasattr': 'hasattr(object, name) - The arguments are an object and a string',
  'setattr': 'setattr(object, name, value) - This is the counterpart of getattr()',
  'delattr': 'delattr(object, name) - This is a relative of setattr()',
  'property': 'property(fget=None, fset=None, fdel=None, doc=None) - Return a property attribute',
  'staticmethod': 'staticmethod(function) - Transform a method into a static method',
  'classmethod': 'classmethod(function) - Transform a method into a class method',
  'super': 'super([type[, object-or-type]]) - Return a proxy object that delegates method calls to a parent or sibling class',
  'issubclass': 'issubclass(class, classinfo) - Return True if class is a subclass (direct, indirect or virtual) of classinfo',
  'compile': 'compile(source, filename, mode, flags=0, dont_inherit=False, optimize=-1) - Compile the source into a code or AST object',
  'eval': 'eval(expression[, globals[, locals]]) - The arguments are a string and optional globals and locals',
  'exec': 'exec(object[, globals[, locals]]) - This function supports dynamic execution of Python code',
  'globals': 'globals() - Return a dictionary representing the current global symbol table',
  'locals': 'locals() - Update and return a dictionary representing the current local symbol table',
  'vars': 'vars([object]) - Return the __dict__ attribute for a module, class, instance, or any other object with a __dict__ attribute',
  'dir': 'dir([object]) - Without arguments, return the list of names in the current local scope',
  'help': 'help([object]) - Invoke the built-in help system',
  'breakpoint': 'breakpoint(*args, **kws) - This function drops you into the debugger at the call site',
  'memoryview': 'memoryview(object) - Return a "memory view" object created from the given argument',
  'bytearray': 'bytearray([source[, encoding[, errors]]]) - Return a new array of bytes',
  'bytes': 'bytes([source[, encoding[, errors]]]) - Return a new "bytes" object',
  'frozenset': 'frozenset([iterable]) - Return a new frozenset object, optionally with elements taken from iterable',
  'set': 'set([iterable]) - Return a new set object, optionally with elements taken from iterable',
  'tuple': 'tuple([iterable]) - Rather than being a function, tuple is actually an immutable sequence type',
  'complex': 'complex([real[, imag]]) - Return a complex number with the value real + imag*1j or convert a string or number to a complex number'
};

// Common Python modules and their key attributes
const PYTHON_MODULES = {
  'math': ['pi', 'e', 'sqrt', 'sin', 'cos', 'tan', 'log', 'exp', 'pow', 'floor', 'ceil', 'abs'],
  'random': ['randint', 'choice', 'shuffle', 'random', 'uniform', 'seed'],
  'turtle': ['Turtle', 'Screen', 'done', 'forward', 'backward', 'right', 'left', 'penup', 'pendown'],
  'datetime': ['datetime', 'date', 'time', 'timedelta', 'now', 'today'],
  'os': ['path', 'listdir', 'mkdir', 'remove', 'rename', 'getcwd'],
  'sys': ['argv', 'path', 'version', 'platform', 'exit'],
  'json': ['loads', 'dumps', 'load', 'dump'],
  're': ['search', 'match', 'findall', 'sub', 'compile'],
  'collections': ['Counter', 'defaultdict', 'OrderedDict', 'deque'],
  'itertools': ['count', 'cycle', 'repeat', 'chain', 'combinations', 'permutations']
};

// Pyodide member cache for performance
const pyodideMemberCache = new Map();
const CACHE_TTL = 60000; // 60 seconds

// Extract identifiers from editor buffer
function extractBufferIdentifiers(code) {
  const identifierRegex = /\b[A-Za-z_]\w*\b/g;
  const identifiers = new Map();
  
  let match;
  while ((match = identifierRegex.exec(code)) !== null) {
    const identifier = match[0];
    if (!PYTHON_KEYWORDS.includes(identifier) && !PYTHON_BUILTINS.includes(identifier)) {
      identifiers.set(identifier, (identifiers.get(identifier) || 0) + 1);
    }
  }
  
  return identifiers;
}

// Get Pyodide object members safely
async function getPyodideMembers(objectName) {
  if (!isPyodideLoaded || !pyodide) {
    // Fallback to static module suggestions
    return PYTHON_MODULES[objectName] || [];
  }
  
  // Check cache first
  const cached = pyodideMemberCache.get(objectName);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.members;
  }
  
  try {
    // Safely evaluate dir(objectName) in Pyodide
    const members = await pyodide.runPythonAsync(`
try:
    import sys
    if '${objectName}' in globals():
        result = dir(${objectName})
    elif '${objectName}' in sys.modules:
        result = dir(sys.modules['${objectName}'])
    else:
        result = []
    result
except:
    []
`);
    
    // Cache the result
    pyodideMemberCache.set(objectName, {
      members: members,
      timestamp: Date.now()
    });
    
    return members;
  } catch (error) {
    console.warn(`Failed to get members for ${objectName}:`, error);
    // Fallback to static module suggestions
    return PYTHON_MODULES[objectName] || [];
  }
}

// Get type information for Pyodide objects
async function getPyodideType(objectName) {
  if (!isPyodideLoaded || !pyodide) {
    return '';
  }
  
  try {
    const typeResult = await pyodide.runPythonAsync(`
try:
    import sys
    if '${objectName}' in globals():
        result = type(${objectName}).__name__
    elif '${objectName}' in sys.modules:
        result = type(sys.modules['${objectName}']).__name__
    else:
        result = ''
    result
except:
    ''
`);
    return typeResult || '';
  } catch (error) {
    return '';
  }
}

// Calculate suggestion score for ranking
function calculateSuggestionScore(suggestion, query, bufferFreq = 0, isExactMatch = false) {
  let score = 0;
  
  // Exact prefix match gets highest score
  if (isExactMatch) {
    score += 1000;
  }
  
  // Camel/snake case subword matching
  if (query.length > 1) {
    const queryLower = query.toLowerCase();
    const suggestionLower = suggestion.toLowerCase();
    
    if (suggestionLower.startsWith(queryLower)) {
      score += 500;
    } else if (suggestionLower.includes(queryLower)) {
      score += 200;
    }
  }
  
  // Buffer frequency bonus
  score += bufferFreq * 10;
  
  // Task-related bonus
  if (currentTask && currentTask.title.toLowerCase().includes(suggestion.toLowerCase())) {
    score += 50;
  }
  
  return score;
}

// Main autocomplete function
async function providePythonHints(cm, options) {
  try {
    const cursor = cm.getCursor();
    const line = cursor.line;
    const ch = cursor.ch;
  
  // Get current line content
  const lineContent = cm.getLine(line);
  const beforeCursor = lineContent.substring(0, ch);
  
  // Check if we're in a member access context (e.g., "object.")
  const memberAccessMatch = beforeCursor.match(/([A-Za-z_][\w\.]*)\.$/);
  let suggestions = [];
  let fromPos = { line, ch: ch - 1 };
  let toPos = { line, ch };
  
  if (memberAccessMatch) {
    // Member access context - get object members
    const objectName = memberAccessMatch[1];
    const members = await getPyodideMembers(objectName);
    
    suggestions = members.map(member => ({
      text: member,
      displayText: member,
      className: 'cm-hint-member',
      description: async () => {
        // Try to get type info from Pyodide first
        if (isPyodideLoaded && pyodide) {
          const typeInfo = await getPyodideType(`${objectName}.${member}`);
          if (typeInfo) return `Type: ${typeInfo}`;
        }
        
        // Fallback to static descriptions for common modules
        if (PYTHON_MODULES[objectName]) {
          if (objectName === 'math') {
            if (member === 'pi') return 'Mathematical constant π (3.14159...)';
            if (member === 'e') return 'Mathematical constant e (2.71828...)';
            if (['sin', 'cos', 'tan'].includes(member)) return `Trigonometric function: ${member}(x)`;
            if (['sqrt', 'log', 'exp'].includes(member)) return `Mathematical function: ${member}(x)`;
          }
          if (objectName === 'random') {
            if (member === 'randint') return 'random.randint(a, b) - Return random integer N such that a <= N <= b';
            if (member === 'choice') return 'random.choice(seq) - Return a random element from the non-empty sequence seq';
            if (member === 'shuffle') return 'random.shuffle(x) - Shuffle the sequence x in place';
          }
          if (objectName === 'turtle') {
            if (member === 'Turtle') return 'turtle.Turtle() - Create and return a new turtle object';
            if (member === 'forward') return 'turtle.forward(distance) - Move the turtle forward by the specified distance';
            if (member === 'right') return 'turtle.right(angle) - Turn turtle right by angle units';
          }
        }
        
        return `Member of ${objectName}`;
      }
    }));
    
    fromPos = { line, ch: ch - 1 };
    toPos = { line, ch };
  } else {
    // Regular identifier context
    const wordMatch = beforeCursor.match(/([A-Za-z_]\w*)$/);
    if (wordMatch) {
      const query = wordMatch[1];
      fromPos = { line, ch: ch - query.length };
      toPos = { line, ch };
      
      // Get buffer identifiers
      const bufferIdentifiers = extractBufferIdentifiers(cm.getValue());
      
      // Combine all suggestions
      const allSuggestions = [
        ...PYTHON_KEYWORDS.map(keyword => ({ 
          text: keyword, 
          displayText: keyword, 
          className: 'cm-hint-keyword',
          description: () => `Python keyword: ${keyword}`
        })),
        ...PYTHON_BUILTINS.map(builtin => ({ 
          text: builtin, 
          displayText: builtin, 
          className: 'cm-hint-builtin',
          description: () => PYTHON_DOCS[builtin] || `Built-in function: ${builtin}`
        })),
        ...Array.from(bufferIdentifiers.keys()).map(identifier => ({ 
          text: identifier, 
          displayText: identifier, 
          className: 'cm-hint-identifier',
          frequency: bufferIdentifiers.get(identifier),
          description: () => `Variable/function (used ${bufferIdentifiers.get(identifier)} times)`
        }))
      ];
      
      // Filter and score suggestions
      suggestions = allSuggestions
        .filter(suggestion => suggestion.text.toLowerCase().includes(query.toLowerCase()))
        .map(suggestion => ({
          ...suggestion,
          score: calculateSuggestionScore(
            suggestion.text, 
            query, 
            suggestion.frequency || 0,
            suggestion.text.toLowerCase().startsWith(query.toLowerCase())
          )
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 50); // Limit to top 50
    }
  }
  
  // Create enhanced hint objects with proper rendering
  const enhancedSuggestions = suggestions.map(suggestion => {
    const hint = {
      text: suggestion.text,
      displayText: suggestion.displayText || suggestion.text,
      className: suggestion.className,
      render: function(element, self, data) {
        // Create main text element
        const textSpan = document.createElement('span');
        textSpan.textContent = suggestion.text;
        textSpan.className = suggestion.className || '';
        element.appendChild(textSpan);
        
        // Add description if available
        if (suggestion.description) {
          const descSpan = document.createElement('span');
          descSpan.className = 'CodeMirror-hint-description';
          
          // Handle async descriptions
          if (typeof suggestion.description === 'function') {
            const desc = suggestion.description();
            if (desc instanceof Promise) {
              descSpan.textContent = 'Loading...';
              desc.then(result => {
                if (result) descSpan.textContent = result;
              }).catch(() => {
                descSpan.textContent = '';
              });
            } else {
              descSpan.textContent = desc;
            }
          } else {
            descSpan.textContent = suggestion.description;
          }
          
          element.appendChild(descSpan);
        }
        
        // Add frequency indicator for buffer identifiers
        if (suggestion.frequency) {
          const freqSpan = document.createElement('span');
          freqSpan.className = 'hint-frequency';
          freqSpan.textContent = suggestion.frequency;
          element.appendChild(freqSpan);
        }
      }
    };
    
    return hint;
  });
  
    return {
      list: enhancedSuggestions,
      from: fromPos,
      to: toPos
    };
  } catch (error) {
    console.error('Autocomplete error:', error);
    return handleAutocompleteError(error, 'main function');
  }
}

// Debounced autocomplete trigger
let autocompleteTimeout = null;
function triggerAutocomplete(cm, delay = 120) {
  if (autocompleteTimeout) {
    clearTimeout(autocompleteTimeout);
  }
  
  autocompleteTimeout = setTimeout(() => {
    CodeMirror.showHint(cm, providePythonHints, {
      completeSingle: false,
      closeOnUnfocus: true,
      hint: providePythonHints
    });
  }, delay);
}

// Clear Pyodide member cache
function clearPyodideCache() {
  pyodideMemberCache.clear();
  console.log('Pyodide member cache cleared');
}

// Enhanced error handling for autocomplete
function handleAutocompleteError(error, context) {
  console.warn(`Autocomplete error in ${context}:`, error);
  // Return empty suggestions on error
  return {
    list: [],
    from: { line: 0, ch: 0 },
    to: { line: 0, ch: 0 }
  };
}

// Show autocomplete status and debug info
function showAutocompleteStatus() {
  const status = {
    pyodideLoaded: isPyodideLoaded,
    cacheSize: pyodideMemberCache.size,
    cacheKeys: Array.from(pyodideMemberCache.keys()),
    currentTask: currentTask ? currentTask.title : 'None',
    editorActive: !!editor,
    theme: isDarkTheme ? 'dark' : 'light'
  };
  
  console.log('=== Autocomplete Status ===');
  console.log(status);
  console.log('===========================');
  
  // Show in output panel
  showOutput('info', `🔍 Autocomplete Status:\n🐍 Pyodide: ${status.pyodideLoaded ? 'Loaded' : 'Not loaded'}\n📦 Cache: ${status.cacheSize} items\n🎯 Task: ${status.currentTask}\n🎨 Theme: ${status.theme}`);
}

// Manual autocomplete trigger for testing
function manualAutocomplete() {
  if (!editor) {
    showOutput('error', '❌ Editor not initialized');
    return;
  }
  
  const cursor = editor.getCursor();
  const line = editor.getLine(cursor.line);
  const beforeCursor = line.substring(0, cursor.ch);
  
  console.log('Manual autocomplete triggered');
  console.log('Cursor position:', cursor);
  console.log('Line content:', line);
  console.log('Before cursor:', beforeCursor);
  
  // Trigger autocomplete
  CodeMirror.showHint(editor, providePythonHints, {
    completeSingle: false,
    closeOnUnfocus: true
  });
}

// Test GIF animations manually
function testGifAnimations() {
  showOutput('info', '🧪 Testing GIF animations...');
  
  // Test success animation
  setTimeout(() => {
    showGifAnimation('success', 2000);
    showOutput('info', '✅ Success GIF shown');
  }, 500);
  
  // Test warning animation
  setTimeout(() => {
    showGifAnimation('warning', 2000);
    showOutput('info', '⚠️ Warning GIF shown');
  }, 3000);
  
  // Test error animation
  setTimeout(() => {
    showGifAnimation('error', 2000);
    showOutput('info', '❌ Error GIF shown');
  }, 5500);
}

// Task Data
const tasks = [
  {
    id: 1,
    title: "Merhaba Dünya",
    description: "İlk Python programınızı yazın ve 'Merhaba Dünya' yazdırın.",
    difficulty: 1,
    category: "Temel",
    starterCode:
      'print("Merhaba Dünya")',
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
      "sayi1 = 5\nsayi2 = 3",
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
      "for i in range(1, 6):\n    print(i)",
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
      'import random\n\nsayi = random.randint(1, 10)\nprint(f"1-10 arası bir sayı tahmin edin: {sayi}")',
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
      "import turtle\n\nt = turtle.Turtle()\n\nfor i in range(4):\n    t.forward(100)\n    t.right(90)\n\nturtle.done()",
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
      'sayilar = [1, 2, 3, 4, 5]\n\ntoplam = sum(sayilar)\nprint(f"Toplam: {toplam}")',
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
      'def carp(a, b):\n    return a * b\n\nsonuc = carp(4, 5)\nprint(f"4 x 5 = {sonuc}")',
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
      "import math\n\nr = 5\nalan = math.pi * r ** 2\nprint(f'Yarıçapı {r} olan dairenin alanı: {alan:.2f}')",
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
      'metin = "Python Programlama Dili"\n\nbuyuk = metin.upper()\nprint(buyuk)\n\nkelime_sayisi = len(metin.split())\nprint(f"Kelime sayısı: {kelime_sayisi}")',
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
    target: 1,
    type: "tasks"
  },
  {
    id: 2,
    title: "Kod Ustası",
    description: "5 görev tamamladınız!",
    icon: "🏆",
    condition: () => userProgress.completedTasks.length >= 5,
    target: 5,
    type: "tasks"
  },
  {
    id: 3,
    title: "Puan Avcısı",
    description: "100 puan topladınız!",
    icon: "⭐",
    condition: () => userProgress.points >= 100,
    target: 100,
    type: "points"
  },
  {
    id: 4,
    title: "Hızlı Kodlayıcı",
    description: "3 görevi ilk denemede tamamladınız!",
    icon: "⚡",
    condition: () => userProgress.firstTryCompletions >= 3,
    target: 3,
    type: "firstTry"
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
  
  // Ensure editor shows "bir görev seçin" when no task is selected
  if (!currentTask) {
    resetEditorToNoTask();
  }
});

// Initialize Pyodide
async function initializePyodide() {
  try {
    showOutput("info", "🐍 Python runtime yükleniyor...");

    // Clear any existing cache
    clearPyodideCache();

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
      "Ctrl-Space": function(cm) {
        CodeMirror.showHint(cm, providePythonHints, {
          completeSingle: false,
          closeOnUnfocus: true
        });
      },
      Tab: function (cm) {
        if (cm.somethingSelected()) {
          cm.indentSelection("add");
        } else {
          cm.replaceSelection("    ", "end");
        }
      },
    },
  });

  // Set up automatic autocomplete triggers
  editor.on('inputRead', function(cm, change) {
    if (change.text && change.text.length > 0) {
      const lastChar = change.text[0];
      
      // Trigger on dot (member access)
      if (lastChar === '.') {
        triggerAutocomplete(cm, 50); // Faster trigger for dots
      }
      // Trigger after typing 2+ characters
      else if (lastChar.length >= 1) {
        const cursor = cm.getCursor();
        const lineContent = cm.getLine(cursor.line);
        const beforeCursor = lineContent.substring(0, cursor.ch);
        const wordMatch = beforeCursor.match(/([A-Za-z_]\w*)$/);
        
        if (wordMatch && wordMatch[1].length >= 2) {
          triggerAutocomplete(cm, 120);
        }
      }
    }
  });

  // Set initial content to show "# Bir görev seçin" when no task is selected
  editor.setValue("# Bir görev seçin");
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

    // Add star icon for first 3 tasks
    const starIcon = task.id <= 3 ? "⭐ " : "";

    taskElement.innerHTML = `
            <div class="task-title">${starIcon}${task.title}</div>
            <div class="task-description">${task.description}</div>
            <div class="task-meta">
            <div class="task-difficulty">${difficultyDots}</div>
                <div class="task-points">🏆 ${task.points} Puan</div>
            </div>
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
                <small>${completedTasks.length}/${categoryTasks.length} tamamlandı</small>
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

  // No warning here - we'll show it after checking the output

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

    // Complete loading progress and hide loading panel
    completeLoadingProgress();
    hideLoadingPanel();

    // Görev tamamlama kontrolü
    if (checkTaskCompletion(output, currentTask)) {
      completeTask(currentTask);
      // Show success GIF
      showGifAnimation("success", 2000);
    } else {
      // Show warning if task is not completed and output doesn't match requirements
      if (!userProgress.completedTasks.includes(currentTask.id)) {
        showOutput("warning", "⚠️ Bu görev henüz tamamlanmamış! Kodunuz çalıştı ama görev gereksinimlerini karşılamıyor. Lütfen görevi tekrar gözden geçirin.");
        // Show warning GIF
        showGifAnimation("warning", 2000);
      }
    }

    showOutput(
      "success",
      `✅ Gerçek Python kodu çalıştırıldı!\n\n📤 Çıktı:\n${output}`,
      true
    );
  } catch (error) {
    // Complete loading progress and hide loading panel on error
    completeLoadingProgress();
    hideLoadingPanel();
    showOutput("error", `❌ Python hatası:\n${error.message}`, true);
    // Show error GIF
    showGifAnimation("error", 2000);
  }
}

// Simülasyon modu (eski sistem)
function runSimulatedPython(code) {
  setTimeout(() => {
    try {
      const result = simulatePythonExecution(code);

      if (result.success) {
        // Complete loading progress and hide loading panel
        completeLoadingProgress();
        hideLoadingPanel();
        
        if (checkTaskCompletion(code, currentTask)) {
          completeTask(currentTask);
          // Show success GIF
          showGifAnimation("success", 2000);
        } else {
          // Show warning if task is not completed and output doesn't match requirements
          if (!userProgress.completedTasks.includes(currentTask.id)) {
            showOutput("warning", "⚠️ Bu görev henüz tamamlanmamış! Kodunuz çalıştı ama görev gereksinimlerini karşılamıyor. Lütfen görevi tekrar gözden geçirin.");
            // Show warning GIF
            showGifAnimation("warning", 2000);
          }
        }
        
        showOutput(
          "success",
          `✅ Kod simülasyonu çalıştırıldı!\n\n📤 Çıktı:\n${result.output}`,
          true
        );
      } else {
         // Complete loading progress and hide loading panel on error
         completeLoadingProgress();
        hideLoadingPanel();
        showOutput("error", `❌ Hata oluştu:\n${result.error}`, true);
         // Show error GIF
         showGifAnimation("error", 2000);
      }
    } catch (error) {
       // Complete loading progress and hide loading panel on error
       completeLoadingProgress();
      hideLoadingPanel();
      showOutput("error", `❌ Beklenmeyen hata:\n${error.message}`, true);
       // Show error GIF
       showGifAnimation("error", 2000);
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
  
  // Show success GIF (this will be shown after the loading panel hides)
  setTimeout(() => {
    showGifAnimation("success", 2000);
  }, 500);

  // Show completion message
  setTimeout(() => {
    // Calculate total available points for completion message
    const totalAvailablePoints = getTotalAvailablePoints();
    showOutput(
      "success",
      `🎉 Tebrikler! Görev tamamlandı!\n🏆 ${task.points} puan kazandınız!\n⭐ Toplam puanınız: ${userProgress.points}/${totalAvailablePoints}`
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
    // Show "bir görev seçin" message when no task is selected
    const hintContent = document.getElementById("hintContent");
    hintContent.innerHTML = `
      <h4>💡 İpucu</h4>
      <p><strong>İpucu:</strong> bir görev seçin</p>
    `;
    
    // Show hint modal
    const hintModal = document.getElementById("hintModal");
    hintModal.classList.add("show");
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
  const progressFill = loadingPanel.querySelector(".loading-progress .progress-fill");
  
  loadingPanel.classList.add("show");
  
  // Store the start time to ensure minimum display duration
  loadingPanel.dataset.startTime = Date.now();
  
  // Reset progress bar to 0%
  progressFill.style.width = "0%";
  progressFill.style.animation = "none";
  
  // Start progress bar animation after a small delay to ensure smooth animation
  setTimeout(() => {
    progressFill.style.animation = "loadingProgress 1s ease-in-out forwards";
  }, 100);
  
  // Set a timeout to hide loading panel after 30 seconds (safety measure)
  setTimeout(() => {
    if (loadingPanel.classList.contains("show")) {
      completeLoadingProgress();
      hideLoadingPanel();
      showOutput("warning", "⚠️ Kod çalıştırma zaman aşımına uğradı. Lütfen tekrar deneyin.");
    }
  }, 30000);
}

// Complete Loading Progress
function completeLoadingProgress() {
  const loadingPanel = document.getElementById("loadingPanel");
  const progressFill = loadingPanel.querySelector(".loading-progress .progress-fill");
  
  // Ensure progress bar is at 100%
  progressFill.style.animation = "none";
  progressFill.style.width = "100%";
}

// Show GIF Animation
function showGifAnimation(type, duration = 2000) {
  const gifContainer = document.getElementById("gifContainer");
  const gifAnimation = document.getElementById("gifAnimation");
  
  // Clear any existing classes
  gifAnimation.className = "gif-animation";
  
  // Add the appropriate type class
  gifAnimation.classList.add(type);
  
  // Show the animation
  gifAnimation.classList.add("show");
  
  // Hide after specified duration
  setTimeout(() => {
    gifAnimation.classList.remove("show");
  }, duration);
}

// Hide GIF Animation
function hideGifAnimation() {
  const gifAnimation = document.getElementById("gifAnimation");
  gifAnimation.classList.remove("show");
}

// Hide Loading Panel
function hideLoadingPanel() {
  const loadingPanel = document.getElementById("loadingPanel");
  const startTime = parseInt(loadingPanel.dataset.startTime) || 0;
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const minimumDisplayTime = 1000; // 1 second in milliseconds
  
  // Check if progress bar has completed (width should be 100%)
  const progressFill = loadingPanel.querySelector(".loading-progress .progress-fill");
  const progressCompleted = progressFill.style.width === "100%" || 
                           getComputedStyle(progressFill).width === "100%";
  
  if (elapsedTime < minimumDisplayTime || !progressCompleted) {
    // If less than 1 second has passed or progress bar hasn't completed, wait
    const remainingTime = Math.max(minimumDisplayTime - elapsedTime, 0);
    setTimeout(() => {
      hideLoadingPanel();
    }, remainingTime);
  } else {
    // If 1 second or more has passed and progress bar is complete, hide immediately
    loadingPanel.classList.remove("show");
  }
}

// Show Output
function showOutput(type, message, showStatusLabel = false) {
  const outputContent = document.getElementById("outputContent");
  const outputDiv = document.createElement("div");
  outputDiv.className = `output-${type}`;
  
  // Add status label if requested
  if (showStatusLabel) {
    const statusLabel = document.createElement("div");
    statusLabel.className = "output-status-label";
    
    if (type === "success") {
      statusLabel.textContent = "✓ Doğru";
      statusLabel.classList.add("status-correct");
    } else if (type === "error") {
      statusLabel.textContent = "✗ Yanlış";
      statusLabel.classList.add("status-wrong");
    }
    
    outputDiv.appendChild(statusLabel);
  }
  
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  outputDiv.appendChild(messageDiv);

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
  const levelText = levelBadge.querySelector('.level-text');
  if (levelText) levelText.textContent = `Seviye ${userProgress.level}`;
  levelBadge.classList.add("bounce");

  setTimeout(() => {
    levelBadge.classList.remove("bounce");
  }, 1000);

  // Calculate max possible level for level up message
  const totalAvailablePoints = getTotalAvailablePoints();
  const maxPossibleLevel = getMaxPossibleLevel();

  showOutput(
    "success",
    `🎉 Seviye atladınız! Yeni seviyeniz: ${userProgress.level}/${maxPossibleLevel}`
  );
  
  // Update next level info immediately
  const nextLevelInfo = document.getElementById("nextLevelInfo");
  if (nextLevelInfo) {
    const pointsNeeded = getPointsNeededForNextLevel();
    if (pointsNeeded > 0) {
      nextLevelInfo.textContent = `Sonraki seviye için: ${pointsNeeded} puan`;
    } else {
      nextLevelInfo.textContent = "Maksimum seviyeye ulaştınız! 🎉";
    }
  }
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

  // Calculate totals using helper functions
  const totalAvailablePoints = getTotalAvailablePoints();
  const totalAvailableTasks = getTotalAvailableTasks();
  const maxPossibleLevel = getMaxPossibleLevel();

  if (levelBadge) {
    const levelText = levelBadge.querySelector('.level-text');
    if (levelText) levelText.textContent = `Seviye ${userProgress.level}`;
  }
  if (progressFill) {
    // Calculate progress as percentage of total available points
    const progress = (userProgress.points / totalAvailablePoints) * 100;
    progressFill.style.width = `${Math.min(progress, 100)}%`;
  }
  if (pointsSpan) {
    const pointsText = pointsSpan.querySelector('.points-text');
    if (pointsText) {
      pointsText.textContent = `${userProgress.points} Puan`;
    }
  }
  
  // Update next level info
  const nextLevelInfo = document.getElementById("nextLevelInfo");
  if (nextLevelInfo) {
    const pointsNeeded = getPointsNeededForNextLevel();
    if (pointsNeeded > 0) {
      nextLevelInfo.textContent = `Sonraki seviye için: ${pointsNeeded} puan`;
      nextLevelInfo.style.display = "inline";
    } else {
      nextLevelInfo.textContent = "Maksimum seviyeye ulaştınız! 🎉";
      nextLevelInfo.style.display = "inline";
    }
  }
  
  if (totalPoints) {
    totalPoints.textContent = `${userProgress.points}/${totalAvailablePoints}`;
    totalPoints.title = `${userProgress.points} puan kazandınız, ${totalAvailablePoints} puan mevcut`;
  }
  if (completedTasks) {
    completedTasks.textContent = `${userProgress.completedTasks.length}/${totalAvailableTasks}`;
    completedTasks.title = `${userProgress.completedTasks.length} görev tamamladınız, ${totalAvailableTasks} görev mevcut`;
  }
  if (currentLevel) {
    currentLevel.textContent = `${userProgress.level}/${maxPossibleLevel}`;
    currentLevel.title = `Seviye ${userProgress.level}, maksimum seviye ${maxPossibleLevel}`;
  }

  // Update overall progress bars
  const pointsProgressFill = document.getElementById("pointsProgressFill");
  const pointsProgressText = document.getElementById("pointsProgressText");
  const tasksProgressFill = document.getElementById("tasksProgressFill");
  const tasksProgressText = document.getElementById("tasksProgressText");

  if (pointsProgressFill && pointsProgressText) {
    const pointsProgress = (userProgress.points / totalAvailablePoints) * 100;
    pointsProgressFill.style.width = `${Math.min(pointsProgress, 100)}%`;
    pointsProgressText.textContent = `${Math.round(pointsProgress)}%`;
  }

  if (tasksProgressFill && tasksProgressText) {
    const tasksProgress = (userProgress.completedTasks.length / totalAvailableTasks) * 100;
    tasksProgressFill.style.width = `${Math.min(tasksProgress, 100)}%`;
    tasksProgressText.textContent = `${Math.round(tasksProgress)}%`;
  }

  // Pyodide durumunu göster
  const runBtn = document.getElementById("runBtn");
  if (runBtn) {
    if (isPyodideLoaded) {
      runBtn.innerHTML = "🐍 Çalıştır";
      runBtn.title = "Gerçek Python runtime ile çalıştır";
    } else {
      runBtn.innerHTML = "🐍 Çalıştır";
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

    // Calculate progress for each achievement
    let progressText = "";
    let currentValue = 0;
    
    if (achievement.type === "tasks") {
      currentValue = userProgress.completedTasks.length;
      progressText = `(${currentValue}/${achievement.target})`;
    } else if (achievement.type === "points") {
      currentValue = userProgress.points;
      progressText = `(${currentValue}/${achievement.target})`;
    } else if (achievement.type === "firstTry") {
      currentValue = userProgress.firstTryCompletions || 0;
      progressText = `(${currentValue}/${achievement.target})`;
    }

    // Calculate progress percentage
    const progressPercentage = Math.min((currentValue / achievement.target) * 100, 100);

    achievementElement.innerHTML = `
            <span class="achievement-icon">${achievement.icon}</span>
            <div class="achievement-info">
                <h5>${achievement.title}</h5>
                <p>${achievement.description} ${progressText}</p>
                <div class="achievement-progress">
                    <div class="achievement-progress-bar" style="width: ${progressPercentage}%"></div>
                </div>
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
  
  // Test autocomplete shortcut: Ctrl+Shift+A
  if (e.ctrlKey && e.shiftKey && e.key === "A") {
    e.preventDefault();
    if (editor) {
      console.log('Testing autocomplete...');
      CodeMirror.showHint(editor, providePythonHints, {
        completeSingle: false,
        closeOnUnfocus: true
      });
    }
  }
  
  // Show autocomplete status: Ctrl+Shift+S
  if (e.ctrlKey && e.shiftKey && e.key === "S") {
    e.preventDefault();
    showAutocompleteStatus();
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

  // Show task description
  const taskDescriptionDisplay = document.getElementById("taskDescriptionDisplay");
  const taskDescriptionText = document.getElementById("taskDescriptionText");
  taskDescriptionText.textContent = task.description;
  taskDescriptionDisplay.style.display = "block";

  // Clear output
  clearOutput();

  // Show welcome message - removed

  // Update pinned hint if it exists
  updatePinnedHint(task);
}

// Function to reset editor when no task is selected
function resetEditorToNoTask() {
  currentTask = null;
  
  // Update active task in sidebar
  document.querySelectorAll(".task-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Update task title
  document.getElementById("currentTaskTitle").textContent = "Görev Seçin";

  // Hide task description
  const taskDescriptionDisplay = document.getElementById("taskDescriptionDisplay");
  taskDescriptionDisplay.style.display = "none";

  // Set editor content to "# Bir görev seçin"
  editor.setValue("# Bir görev seçin");

  // Clear output
  clearOutput();
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
