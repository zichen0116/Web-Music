/**
 * VS Code Style Music Visualizer
 * Mac Desktop Theme with Python Code Animation
 */

// ==================== Global State ====================
const state = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isMuted: false,
    isFullscreen: false,
    isDarkTheme: true,
    currentLyricIndex: -1,
    isInitialized: false,
    isAudioLoaded: false,
    isLyricsLoaded: false,
    lrcParser: null,
    pythonLineIndex: 0,
    terminalOutputShown: false,
    windowOpened: false
};

// ==================== Terminal Output Timeline ====================
const terminalOutputs = [
    { time: 0, text: ">>> 正在播放: 开始懂了 - 孙燕姿", type: "prompt" },
    { time: 2, text: "=" + "=".repeat(48), type: "output" },
    { time: 2.5, text: "🎵 Beginning To Understand", type: "output" },
    { time: 3, text: "=" + "=".repeat(48), type: "output" },
    { time: 4, text: "词：姚若龙", type: "output" },
    { time: 6, text: "曲：李偲菘", type: "success" },
    { time: 7, text: "正在同步歌词...", type: "output" },
    { time: 9, text: "✨ 歌词已加载", type: "success" },
    { time: 12, text: "🎵 开始播放", type: "success" }
];

// ==================== DOM Elements ====================
let elements = {};

// ==================== Initialization ====================
function init() {
    // Get DOM elements
    elements = {
        launchScreen: document.getElementById('launch-screen'),
        vscodeEditor: document.getElementById('vscode-editor'),
        loadingProgress: document.getElementById('loading-progress'),
        loadingText: document.getElementById('loading-text'),
        codeContent: document.getElementById('code-content'),
        lineNumbers: document.getElementById('line-numbers'),
        codeEditor: document.getElementById('code-editor'),
        terminalContent: document.getElementById('terminal-content'),
        audio: document.getElementById('audio'),
        playbackStatus: document.getElementById('playback-status'),
        playbackTime: document.getElementById('playback-time'),
        lineCol: document.getElementById('line-col'),
        playControlBtn: document.getElementById('play-control-btn'),
        themeToggle: document.getElementById('theme-toggle'),
        audioVisualizer: document.getElementById('audio-visualizer'),
        clearTerminal: document.getElementById('clear-terminal'),
        toggleTerminal: document.getElementById('toggle-terminal'),
        // Mac Desktop Elements
        vscodeDockIcon: document.getElementById('vscode-dock-icon'),
        vscodeWindowContainer: document.getElementById('vscode-window-container'),
        vscodeOpeningWindow: document.getElementById('vscode-opening-window'),
        clickHint: document.getElementById('click-hint'),
        macTime: document.getElementById('mac-time')
    };
    
    // Update Mac time
    updateMacTime();
    setInterval(updateMacTime, 1000);
    
    // Initialize audio
    if (elements.audio) {
        elements.audio.volume = state.volume;
        elements.audio.addEventListener('loadedmetadata', onAudioLoaded);
        elements.audio.addEventListener('canplaythrough', onAudioCanPlay);
        elements.audio.addEventListener('timeupdate', onTimeUpdate);
        elements.audio.addEventListener('ended', onAudioEnded);
        elements.audio.addEventListener('error', onAudioError);
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Load lyrics
    loadLyrics();
    
    // Preload audio
    if (elements.audio) {
        elements.audio.load();
    }
}

// ==================== Mac Time Update ====================
function updateMacTime() {
    if (elements.macTime) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        elements.macTime.textContent = `${hours}:${minutes}`;
    }
}

// ==================== Event Listeners Setup ====================
function setupEventListeners() {
    // VS Code dock icon click
    if (elements.vscodeDockIcon) {
        elements.vscodeDockIcon.addEventListener('click', openVSCodeWindow);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
    
    // Play control button in activity bar
    if (elements.playControlBtn) {
        elements.playControlBtn.addEventListener('click', togglePlay);
    }
    
    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Terminal controls
    if (elements.clearTerminal) {
        elements.clearTerminal.addEventListener('click', clearTerminal);
    }
    
    if (elements.toggleTerminal) {
        elements.toggleTerminal.addEventListener('click', toggleTerminalPanel);
    }
}

// ==================== Load Lyrics ====================
async function loadLyrics() {
    try {
        state.lrcParser = new LRCParser();
        await state.lrcParser.loadFromFile('assets/audio/lyrics.lrc');
        
        const metadata = state.lrcParser.getMetadata();
        console.log('Lyrics loaded:', metadata);
        state.isLyricsLoaded = true;
        
        checkLoadingComplete();
    } catch (error) {
        console.error('Failed to load lyrics:', error);
        state.isLyricsLoaded = true; // Continue anyway
        checkLoadingComplete();
    }
}

// ==================== Audio Loading ====================
function onAudioCanPlay() {
    state.isAudioLoaded = true;
    checkLoadingComplete();
}

function checkLoadingComplete() {
    if (state.isAudioLoaded && state.isLyricsLoaded) {
        state.isInitialized = true;
        console.log('All resources loaded');
    }
}

// ==================== Open VS Code Window Animation ====================
function openVSCodeWindow() {
    if (state.windowOpened) return;
    state.windowOpened = true;
    
    // Hide click hint
    if (elements.clickHint) {
        elements.clickHint.classList.add('hidden');
    }
    
    // Add bounce animation to dock icon
    elements.vscodeDockIcon.classList.add('bouncing');
    elements.vscodeDockIcon.classList.add('active');
    
    // Show window container
    elements.vscodeWindowContainer.classList.add('visible');
    
    // Start opening animation after bounce
    setTimeout(() => {
        elements.vscodeOpeningWindow.classList.add('opening');
        
        // Start loading animation
        startLoadingAnimation();
    }, 300);
}

// ==================== Loading Animation ====================
function startLoadingAnimation() {
    let progress = 0;
    const loadingMessages = [
        '正在初始化...',
        '加载音频资源...',
        '准备代码编辑器...',
        '加载歌词文件...',
        '配置主题...',
        '即将完成...'
    ];
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 12 + 3;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            elements.loadingProgress.style.width = '100%';
            elements.loadingText.textContent = '加载完成！';
            
            // Transition to full screen and then to VS Code
            setTimeout(() => {
                transitionToVSCode();
            }, 500);
        } else {
            elements.loadingProgress.style.width = progress + '%';
            const messageIndex = Math.min(Math.floor(progress / 18), loadingMessages.length - 1);
            elements.loadingText.textContent = loadingMessages[messageIndex];
        }
    }, 150);
}

// ==================== Transition to VS Code ====================
function transitionToVSCode() {
    // Expand window to fullscreen
    elements.vscodeOpeningWindow.classList.add('fullscreen');
    
    setTimeout(() => {
        // Hide launch screen
        elements.launchScreen.style.transition = 'opacity 0.5s ease';
        elements.launchScreen.style.opacity = '0';
        
        setTimeout(() => {
            elements.launchScreen.classList.add('hidden');
            
            // Show VS Code editor
            elements.vscodeEditor.classList.remove('hidden');
            
            // Initialize visual effects
            initAudioVisualizer();
            
            // Start lyrics display
            startLyricsDisplay();
            
            // Auto play audio
            setTimeout(() => {
                console.log('Auto playing audio...');
                playAudio();
            }, 500);
        }, 500);
    }, 400);
}

// ==================== Lyrics Display ====================
// Python syntax patterns for displaying lyrics - More variety
const pythonPatterns = [
    // Pattern 1: print function
    (text, idx) => `<span class="builtin">print</span>(<span class="string">"${escapeHtml(text)}"</span>)`,
    
    // Pattern 2: Variable assignment
    (text, idx) => `<span class="variable">lyric_${idx + 1}</span> <span class="operator">=</span> <span class="string">"${escapeHtml(text)}"</span>`,
    
    // Pattern 3: Function definition
    (text, idx) => `<span class="keyword">def</span> <span class="function">verse_${idx + 1}</span>(): <span class="keyword">return</span> <span class="string">"${escapeHtml(text)}"</span>`,
    
    // Pattern 4: f-string print with emoji
    (text, idx) => `<span class="builtin">print</span>(<span class="string">f"🎵 ${escapeHtml(text)}"</span>)`,
    
    // Pattern 5: List append
    (text, idx) => `<span class="variable">lyrics</span>.<span class="function">append</span>(<span class="string">"${escapeHtml(text)}"</span>)`,
    
    // Pattern 6: Class attribute
    (text, idx) => `<span class="keyword">class</span> <span class="class-name">Verse${idx + 1}</span>: <span class="variable">text</span> <span class="operator">=</span> <span class="string">"${escapeHtml(text)}"</span>`,
    
    // Pattern 7: Comment style
    (text, idx) => `<span class="comment"># 🎶 ${escapeHtml(text)}</span>`,
    
    // Pattern 8: Dictionary assignment
    (text, idx) => `<span class="variable">song</span>[<span class="number">${idx + 1}</span>] <span class="operator">=</span> <span class="string">"${escapeHtml(text)}"</span>`,
    
    // Pattern 9: Lambda expression
    (text, idx) => `<span class="variable">line_${idx + 1}</span> <span class="operator">=</span> <span class="keyword">lambda</span>: <span class="string">"${escapeHtml(text)}"</span>`,
    
    // Pattern 10: Assert statement
    (text, idx) => `<span class="keyword">assert</span> <span class="variable">emotion</span>.<span class="function">feel</span>(<span class="string">"${escapeHtml(text)}"</span>)`,
    
    // Pattern 11: Async function
    (text, idx) => `<span class="keyword">async def</span> <span class="function">sing_${idx + 1}</span>(): <span class="keyword">yield</span> <span class="string">"${escapeHtml(text)}"</span>`,
    
    // Pattern 12: Try statement with lyric
    (text, idx) => `<span class="keyword">try</span>: <span class="variable">heart</span>.<span class="function">parse</span>(<span class="string">"${escapeHtml(text)}"</span>)`,
    
    // Pattern 13: While loop expression
    (text, idx) => `<span class="keyword">while</span> <span class="builtin">True</span>: <span class="builtin">print</span>(<span class="string">"${escapeHtml(text)}"</span>)`,
    
    // Pattern 14: If statement
    (text, idx) => `<span class="keyword">if</span> <span class="variable">feeling</span>: <span class="variable">memory</span> <span class="operator">=</span> <span class="string">"${escapeHtml(text)}"</span>`,
    
    // Pattern 15: Decorator with function
    (text, idx) => `<span class="decorator">@emotion</span>\n    <span class="keyword">def</span> <span class="function">feel_${idx + 1}</span>(): <span class="keyword">return</span> <span class="string">"${escapeHtml(text)}"</span>`,
];

function startLyricsDisplay() {
    // Initialize code content with Python header
    if (!elements.lineNumbers || !elements.codeContent) return;
    
    elements.lineNumbers.innerHTML = '';
    elements.codeContent.innerHTML = '';
    
    // Add Python file header comments
    const headerLines = [
        '<span class="comment"># -*- coding: utf-8 -*-</span>',
        '<span class="comment">"""</span>',
        '<span class="comment">🎵 开始懂了 - 孙燕姿</span>',
        '<span class="comment">Beginning To Understand</span>',
        '<span class="comment">词：姚若龙 | 曲：李偲菘</span>',
        '<span class="comment">"""</span>',
        '',
        '<span class="keyword">from</span> <span class="variable">music</span> <span class="keyword">import</span> <span class="class-name">Song</span>, <span class="class-name">Emotion</span>',
        '<span class="keyword">from</span> <span class="variable">heart</span> <span class="keyword">import</span> <span class="class-name">Memory</span>, <span class="class-name">Feeling</span>',
        '<span class="keyword">import</span> <span class="variable">asyncio</span>',
        '',
        '<span class="variable">lyrics</span> <span class="operator">=</span> []',
        '<span class="variable">song</span> <span class="operator">=</span> {}',
        '<span class="variable">emotion</span> <span class="operator">=</span> <span class="class-name">Emotion</span>()',
        '',
        '<span class="decorator">@Emotion.feel</span>',
        '<span class="keyword">def</span> <span class="function">play_song</span>():',
        '<span class="comment">    """开始播放音乐，感受每一句歌词..."""</span>',
        ''
    ];
    
    headerLines.forEach((content, idx) => {
        const lineNum = document.createElement('div');
        lineNum.className = 'line-number';
        lineNum.textContent = idx + 1;
        elements.lineNumbers.appendChild(lineNum);
        
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line header-line';
        lineDiv.innerHTML = content || '&nbsp;';
        elements.codeContent.appendChild(lineDiv);
    });
    
    state.pythonLineIndex = headerLines.length;
}

function updateLyricsDisplay() {
    if (!state.lrcParser || !elements.codeContent) return;
    
    const currentTime = state.currentTime;
    const current = state.lrcParser.getCurrentLyric(currentTime);
    
    if (!current) return;
    
    // Check if we need to add a new line
    if (current.index !== state.currentLyricIndex) {
        state.currentLyricIndex = current.index;
        
        // Choose a Python pattern based on the lyric index for variety
        const patternIndex = current.index % pythonPatterns.length;
        const pythonCode = pythonPatterns[patternIndex](current.text, current.index);
        
        // Add indent (4 spaces) to simulate being inside the function
        const indent = '    ';
        
        // Create line number
        state.pythonLineIndex++;
        const lineNum = document.createElement('div');
        lineNum.className = 'line-number';
        lineNum.textContent = state.pythonLineIndex;
        elements.lineNumbers.appendChild(lineNum);
        
        // Add the new lyric line as Python code
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line typing';
        lineDiv.setAttribute('data-index', current.index);
        lineDiv.innerHTML = `<span class="indent">${indent}</span>${pythonCode}`;
        
        elements.codeContent.appendChild(lineDiv);
        
        // Update line/column indicator
        updateLineCol(state.pythonLineIndex, current.text.length + 20);
        
        // Smooth scroll to the new line
        smoothScrollToBottom();
        
        // Highlight current line
        highlightCurrentLyric(current.index);
    }
}

// Smooth scroll function
function smoothScrollToBottom() {
    if (!elements.codeEditor) return;
    
    const codeEditor = elements.codeEditor;
    const targetScroll = codeEditor.scrollHeight - codeEditor.clientHeight;
    
    // Use smooth scrolling
    codeEditor.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
    });
}

function highlightCurrentLyric(index) {
    // Remove previous highlights
    const allLines = elements.codeContent.querySelectorAll('.code-line');
    allLines.forEach(line => line.classList.remove('active'));
    
    // Highlight current line
    const currentLine = elements.codeContent.querySelector(`[data-index="${index}"]`);
    if (currentLine) {
        currentLine.classList.add('active');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== Terminal Output Animation ====================
function startTerminalOutput() {
    // 防止重复执行
    if (state.terminalOutputShown) return;
    state.terminalOutputShown = true;
    
    terminalOutputs.forEach(output => {
        setTimeout(() => {
            addTerminalLine(output.text, output.type);
        }, output.time * 1000);
    });
}

function addTerminalLine(text, type = 'output') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    const prompt = document.createElement('span');
    if (type === 'prompt') {
        prompt.className = 'terminal-prompt';
        prompt.textContent = '';
        line.appendChild(prompt);
        
        const output = document.createElement('span');
        output.className = 'terminal-output';
        output.textContent = text;
        line.appendChild(output);
    } else {
        const output = document.createElement('span');
        output.className = `terminal-${type}`;
        output.textContent = text;
        line.appendChild(output);
    }
    
    elements.terminalContent.appendChild(line);
    elements.terminalContent.scrollTop = elements.terminalContent.scrollHeight;
}

// ==================== Audio Controls ====================
function playAudio() {
    if (!elements.audio) {
        console.error('Audio element not found');
        return;
    }
    
    console.log('Attempting to play audio...');
    console.log('Audio src:', elements.audio.src);
    console.log('Audio readyState:', elements.audio.readyState);
    
    // Resume audio context if it's suspended
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('Audio context resumed');
        });
    }
    
    const playPromise = elements.audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Audio playing successfully');
            state.isPlaying = true;
            updatePlaybackStatus('播放中', '⏸');
            updatePlayButtonState(true);
            startTerminalOutput();
        }).catch(error => {
            console.error('播放失败:', error);
            addTerminalLine('⚠️ 音频播放失败，请点击播放按钮重试', 'error');
            updatePlaybackStatus('点击播放', '▶');
            updatePlayButtonState(false);
        });
    }
}

function togglePlay() {
    if (!elements.audio) return;
    
    if (state.isPlaying) {
        elements.audio.pause();
        state.isPlaying = false;
        updatePlaybackStatus('已暂停', '▶');
        updatePlayButtonState(false);
    } else {
        playAudio();
    }
}

function updatePlayButtonState(isPlaying) {
    if (!elements.playControlBtn) return;
    
    const svg = elements.playControlBtn.querySelector('.play-icon-svg');
    if (!svg) return;
    
    if (isPlaying) {
        // Switch to pause icon
        elements.playControlBtn.classList.add('playing');
        svg.innerHTML = '<path class="pause-path" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />';
    } else {
        // Switch to play icon
        elements.playControlBtn.classList.remove('playing');
        svg.innerHTML = '<path class="play-path" d="M8 5v14l11-7z" />';
    }
}

// ==================== Audio Event Handlers ====================
function onAudioLoaded() {
    state.duration = elements.audio.duration;
    console.log('Audio loaded, duration:', state.duration);
    updateTimeDisplay();
    addTerminalLine('✅ 音频文件加载完成', 'success');
}

function onTimeUpdate() {
    state.currentTime = elements.audio.currentTime;
    
    // Update lyrics display
    updateLyricsDisplay();
    
    updateTimeDisplay();
}

function onAudioEnded() {
    state.isPlaying = false;
    updatePlaybackStatus('播放完成', '▶');
    updatePlayButtonState(false);
    addTerminalLine('🎵 播放结束', 'success');
}

function onAudioError(e) {
    console.error('音频加载错误:', e);
    console.error('Audio error details:', elements.audio.error);
    updatePlaybackStatus('音频加载失败', '▶');
    
    // Show helpful message in terminal
    addTerminalLine('❌ 音频文件加载失败', 'error');
    if (elements.audio.error) {
        addTerminalLine(`错误代码: ${elements.audio.error.code}`, 'error');
        switch(elements.audio.error.code) {
            case 1:
                addTerminalLine('错误: 音频加载被中止', 'error');
                break;
            case 2:
                addTerminalLine('错误: 网络错误，无法加载音频', 'error');
                break;
            case 3:
                addTerminalLine('错误: 音频解码失败', 'error');
                break;
            case 4:
                addTerminalLine('错误: 不支持的音频格式或文件未找到', 'error');
                break;
        }
    }
    addTerminalLine('💡 请确保 music.mp3 文件存在于 assets/audio/ 目录', 'output');
}

// ==================== UI Updates ====================
function updatePlaybackStatus(text, icon) {
    if (!elements.playbackStatus) return;
    
    const iconElement = elements.playbackStatus.querySelector('.play-icon');
    const textElement = elements.playbackStatus.querySelector('.status-text');
    
    if (iconElement) iconElement.textContent = icon;
    if (textElement) textElement.textContent = text;
}

function updateTimeDisplay() {
    if (!elements.playbackTime) return;
    
    const current = formatTime(state.currentTime);
    const total = formatTime(state.duration);
    
    elements.playbackTime.textContent = `${current} / ${total}`;
}

function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '00:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateLineCol(line, col) {
    if (elements.lineCol) {
        elements.lineCol.textContent = `Ln ${line}, Col ${col}`;
    }
}

// ==================== Theme Toggle ====================
function toggleTheme() {
    state.isDarkTheme = !state.isDarkTheme;
    
    if (state.isDarkTheme) {
        document.body.classList.remove('light-theme');
        if (elements.themeToggle) elements.themeToggle.textContent = '🌙';
    } else {
        document.body.classList.add('light-theme');
        if (elements.themeToggle) elements.themeToggle.textContent = '☀️';
    }
}

// ==================== Terminal Controls ====================
function clearTerminal() {
    if (elements.terminalContent) {
        elements.terminalContent.innerHTML = `
            <div class="terminal-line">
                <span class="terminal-prompt">Python 3.11.0 (main) [GCC 11.2.0] on linux</span>
            </div>
            <div class="terminal-line">
                <span class="terminal-prompt">Type "help", "copyright", "credits" or "license" for more information.</span>
            </div>
            <div class="terminal-line">
                <span class="terminal-prompt">&gt;&gt;&gt;</span>
                <span class="terminal-cursor">|</span>
            </div>
        `;
    }
}

function toggleTerminalPanel() {
    const terminal = document.querySelector('.terminal-panel');
    if (terminal) {
        const currentHeight = terminal.style.height;
        terminal.style.height = currentHeight === '0px' ? '200px' : '0px';
    }
}

// ==================== Keyboard Shortcuts ====================
function handleKeyPress(e) {
    // Space - Play/Pause or Open VS Code
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        if (elements.launchScreen && !elements.launchScreen.classList.contains('hidden')) {
            // If on launch screen, open VS Code
            if (!state.windowOpened) {
                openVSCodeWindow();
            }
        } else if (state.isPlaying !== undefined) {
            togglePlay();
        }
    }
    
    // Arrow Left - Rewind 5 seconds
    if (e.code === 'ArrowLeft' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        if (elements.audio) {
            elements.audio.currentTime = Math.max(0, elements.audio.currentTime - 5);
        }
    }
    
    // Arrow Right - Forward 5 seconds
    if (e.code === 'ArrowRight' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        if (elements.audio) {
            elements.audio.currentTime = Math.min(state.duration, elements.audio.currentTime + 5);
        }
    }
}

// ==================== Particle Effects ====================
function initParticles() {
    const canvas = elements.particlesCanvas;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 122, 204, ${this.alpha})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 122, 204, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== Audio Visualizer ====================
let audioContext = null;
let analyser = null;
let dataArray = null;
let bufferLength = 0;

function initAudioVisualizer() {
    const canvas = elements.audioVisualizer;
    if (!canvas) {
        console.log('Canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 150;
    
    // Only initialize Web Audio API once
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaElementSource(elements.audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            analyser.fftSize = 256;
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            
            console.log('Audio visualizer initialized successfully');
        } catch (e) {
            console.error('Web Audio API initialization failed:', e);
            return;
        }
    }
    
    function draw() {
        requestAnimationFrame(draw);
        
        if (!analyser || !dataArray) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Only draw if playing
        if (!state.isPlaying) return;
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
            
            const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
            gradient.addColorStop(0, 'rgba(0, 122, 204, 0.8)');
            gradient.addColorStop(1, 'rgba(0, 212, 255, 0.8)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
    }
    
    draw();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
    });
}

// ==================== Initialize on Load ====================
document.addEventListener('DOMContentLoaded', init);
