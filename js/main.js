/**
 * VS Code Style Music Visualizer
 * Interactive web experience with Python code typing animation
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
    lrcParser: null,
    matrixRain: null
};

// ==================== Lyrics Data ====================
// Will be loaded from lyrics.lrc file

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
        terminalContent: document.getElementById('terminal-content'),
        audio: document.getElementById('audio'),
        playbackStatus: document.getElementById('playback-status'),
        playbackTime: document.getElementById('playback-time'),
        lineCol: document.getElementById('line-col'),
        playBtn: document.getElementById('play-btn'),
        stopBtn: document.getElementById('stop-btn'),
        progressBar: document.getElementById('progress-bar'),
        volumeSlider: document.getElementById('volume-slider'),
        volumeIcon: document.getElementById('volume-icon'),
        fullscreenBtn: document.getElementById('fullscreen-btn'),
        themeToggle: document.getElementById('theme-toggle'),
        controlPanel: document.getElementById('control-panel'),
        audioVisualizer: document.getElementById('audio-visualizer'),
        matrixCanvas: document.getElementById('matrix-canvas'),
        particlesCanvas: document.getElementById('particles-canvas'),
        clearTerminal: document.getElementById('clear-terminal'),
        toggleTerminal: document.getElementById('toggle-terminal')
    };
    
    // Initialize audio
    if (elements.audio) {
        elements.audio.volume = state.volume;
        elements.audio.addEventListener('loadedmetadata', onAudioLoaded);
        elements.audio.addEventListener('timeupdate', onTimeUpdate);
        elements.audio.addEventListener('ended', onAudioEnded);
        elements.audio.addEventListener('error', onAudioError);
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Show loading animation
    showLoadingAnimation();
    
    // Initialize visual effects
    initParticles();
    initMatrixRain();
    initAudioVisualizer();
    
    // Load lyrics
    loadLyrics();
}

// ==================== Loading Animation ====================
function showLoadingAnimation() {
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            elements.loadingProgress.style.width = '100%';
            elements.loadingText.textContent = '加载完成！';
            setTimeout(() => {
                state.isInitialized = true;
            }, 500);
        } else {
            elements.loadingProgress.style.width = progress + '%';
            const messages = [
                '正在加载资源...',
                '初始化音频引擎...',
                '准备代码编辑器...',
                '加载主题配置...',
                '即将完成...'
            ];
            const messageIndex = Math.min(Math.floor(progress / 20), messages.length - 1);
            elements.loadingText.textContent = messages[messageIndex];
        }
    }, 200);
}

// ==================== Event Listeners Setup ====================
function setupEventListeners() {
    // Launch screen click to start
    if (elements.launchScreen) {
        elements.launchScreen.addEventListener('click', startExperience);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
    
    // Play button
    if (elements.playBtn) {
        elements.playBtn.addEventListener('click', togglePlay);
    }
    
    // Stop button
    if (elements.stopBtn) {
        elements.stopBtn.addEventListener('click', stopPlayback);
    }
    
    // Progress bar
    if (elements.progressBar) {
        elements.progressBar.addEventListener('input', seekAudio);
    }
    
    // Volume controls
    if (elements.volumeSlider) {
        elements.volumeSlider.addEventListener('input', changeVolume);
    }
    
    if (elements.volumeIcon) {
        elements.volumeIcon.addEventListener('click', toggleMute);
    }
    
    // Fullscreen button
    if (elements.fullscreenBtn) {
        elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
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
    
    // Fullscreen change event
    document.addEventListener('fullscreenchange', onFullscreenChange);
}

// ==================== Load Lyrics ====================
async function loadLyrics() {
    try {
        state.lrcParser = new LRCParser();
        await state.lrcParser.loadFromFile('assets/audio/lyrics.lrc');
        
        const metadata = state.lrcParser.getMetadata();
        console.log('Lyrics loaded:', metadata);
        
        // Display metadata in terminal
        if (metadata.ti) {
            addTerminalLine(`🎵 歌曲: ${metadata.ti}`, 'success');
        }
        if (metadata.ar) {
            addTerminalLine(`🎤 歌手: ${metadata.ar}`, 'output');
        }
    } catch (error) {
        console.error('Failed to load lyrics:', error);
        addTerminalLine('⚠️ 歌词加载失败', 'error');
    }
}

// ==================== Start Experience ====================
function startExperience() {
    if (!state.isInitialized) return;
    
    // Hide launch screen
    elements.launchScreen.classList.add('hidden');
    
    // Show VS Code editor
    elements.vscodeEditor.classList.remove('hidden');
    
    // Show control panel after a delay
    setTimeout(() => {
        if (elements.controlPanel) {
            elements.controlPanel.classList.add('visible');
        }
    }, 1000);
    
    // Start lyrics display
    startLyricsDisplay();
    
    // Try to play audio (may require user interaction)
    setTimeout(() => {
        playAudio();
    }, 2000);
}

// ==================== Lyrics Display ====================
function startLyricsDisplay() {
    // Initialize line numbers
    const allLyrics = state.lrcParser ? state.lrcParser.getAllLyrics() : [];
    
    elements.lineNumbers.innerHTML = '';
    elements.codeContent.innerHTML = '';
    
    // Create empty lines for all lyrics
    for (let i = 1; i <= allLyrics.length; i++) {
        const lineNum = document.createElement('div');
        lineNum.className = 'line-number';
        lineNum.textContent = i;
        elements.lineNumbers.appendChild(lineNum);
    }
    
    // Start displaying lyrics as they appear
    updateLyricsDisplay();
}

function updateLyricsDisplay() {
    if (!state.lrcParser) return;
    
    const currentTime = state.currentTime;
    const current = state.lrcParser.getCurrentLyric(currentTime);
    
    if (!current) return;
    
    // Check if we need to add a new line
    if (current.index !== state.currentLyricIndex) {
        state.currentLyricIndex = current.index;
        
        // Add the new lyric line
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line typing';
        lineDiv.setAttribute('data-index', current.index);
        
        // Style the lyric text
        lineDiv.innerHTML = `<span class="lyric-text">${escapeHtml(current.text)}</span>`;
        
        elements.codeContent.appendChild(lineDiv);
        
        // Update line/column indicator
        updateLineCol(current.index + 1, current.text.length);
        
        // Scroll to bottom
        elements.codeContent.scrollTop = elements.codeContent.scrollHeight;
        
        // Highlight current line
        highlightCurrentLyric(current.index);
    }
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
    if (!elements.audio) return;
    
    const playPromise = elements.audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            state.isPlaying = true;
            updatePlaybackStatus('播放中', '⏸');
            startTerminalOutput();
        }).catch(error => {
            console.log('播放失败，需要用户交互:', error);
            updatePlaybackStatus('点击播放', '▶');
        });
    }
}

function togglePlay() {
    if (!elements.audio) return;
    
    if (state.isPlaying) {
        elements.audio.pause();
        state.isPlaying = false;
        updatePlaybackStatus('已暂停', '▶');
    } else {
        playAudio();
    }
}

function stopPlayback() {
    if (!elements.audio) return;
    
    elements.audio.pause();
    elements.audio.currentTime = 0;
    state.isPlaying = false;
    state.currentTime = 0;
    updatePlaybackStatus('已停止', '▶');
    updateTimeDisplay();
}

function seekAudio(e) {
    if (!elements.audio) return;
    
    const seekTime = (e.target.value / 100) * state.duration;
    elements.audio.currentTime = seekTime;
    state.currentTime = seekTime;
}

function changeVolume(e) {
    if (!elements.audio) return;
    
    const volume = e.target.value / 100;
    elements.audio.volume = volume;
    state.volume = volume;
    
    // Update volume icon
    updateVolumeIcon(volume);
}

function toggleMute() {
    if (!elements.audio) return;
    
    state.isMuted = !state.isMuted;
    elements.audio.muted = state.isMuted;
    
    updateVolumeIcon(state.isMuted ? 0 : state.volume);
}

function updateVolumeIcon(volume) {
    if (!elements.volumeIcon) return;
    
    if (volume === 0 || state.isMuted) {
        elements.volumeIcon.textContent = '🔇';
    } else if (volume < 0.5) {
        elements.volumeIcon.textContent = '🔉';
    } else {
        elements.volumeIcon.textContent = '🔊';
    }
}

// ==================== Audio Event Handlers ====================
function onAudioLoaded() {
    state.duration = elements.audio.duration;
    updateTimeDisplay();
}

function onTimeUpdate() {
    state.currentTime = elements.audio.currentTime;
    
    // Update progress bar
    const progress = (state.currentTime / state.duration) * 100;
    if (elements.progressBar) {
        elements.progressBar.value = progress;
    }
    
    // Update lyrics display
    updateLyricsDisplay();
    
    updateTimeDisplay();
}

function onAudioEnded() {
    state.isPlaying = false;
    updatePlaybackStatus('播放完成', '▶');
}

function onAudioError(e) {
    console.error('音频加载错误:', e);
    updatePlaybackStatus('音频未找到', '▶');
    
    // Show helpful message in terminal
    addTerminalLine('⚠️  未找到音频文件，请将您的音频文件放入 assets/audio/ 目录', 'error');
    addTerminalLine('支持的格式: .wav, .mp3, .ogg', 'output');
}

// ==================== UI Updates ====================
function updatePlaybackStatus(text, icon) {
    if (!elements.playbackStatus) return;
    
    const iconElement = elements.playbackStatus.querySelector('.play-icon');
    const textElement = elements.playbackStatus.querySelector('.status-text');
    
    if (iconElement) iconElement.textContent = icon;
    if (textElement) textElement.textContent = text;
    
    if (elements.playBtn) {
        const playIcon = elements.playBtn.querySelector('.play-icon');
        if (playIcon) playIcon.textContent = icon;
    }
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

// ==================== Fullscreen ====================
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            state.isFullscreen = true;
            if (elements.fullscreenBtn) {
                elements.fullscreenBtn.querySelector('.fullscreen-icon').textContent = '⛶';
            }
        }).catch(err => {
            console.error('无法进入全屏:', err);
        });
    } else {
        document.exitFullscreen().then(() => {
            state.isFullscreen = false;
            if (elements.fullscreenBtn) {
                elements.fullscreenBtn.querySelector('.fullscreen-icon').textContent = '⛶';
            }
        });
    }
}

function onFullscreenChange() {
    state.isFullscreen = !!document.fullscreenElement;
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
    // Space - Play/Pause
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        if (state.isInitialized) {
            if (elements.launchScreen && !elements.launchScreen.classList.contains('hidden')) {
                startExperience();
            } else {
                togglePlay();
            }
        }
    }
    
    // Escape - Stop
    if (e.code === 'Escape') {
        e.preventDefault();
        stopPlayback();
    }
    
    // M - Mute
    if (e.code === 'KeyM' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        toggleMute();
    }
    
    // F11 - Fullscreen (browser default, but we track it)
    if (e.code === 'F11') {
        e.preventDefault();
        toggleFullscreen();
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

// ==================== Matrix Rain Effect ====================
function initMatrixRain() {
    const canvas = elements.matrixCanvas;
    if (!canvas) return;
    
    state.matrixRain = new MatrixRain(canvas);
    
    // Start matrix rain after a delay
    setTimeout(() => {
        if (elements.matrixCanvas) {
            elements.matrixCanvas.classList.add('active');
            state.matrixRain.start();
        }
    }, 3000);
}

// ==================== Audio Visualizer ====================
function initAudioVisualizer() {
    const canvas = elements.audioVisualizer;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 150;
    
    let audioContext, analyser, dataArray, bufferLength;
    
    // Try to initialize Web Audio API
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(elements.audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    } catch (e) {
        console.log('Web Audio API not supported:', e);
        // Fallback to simple wave animation
        drawSimpleWave();
        return;
    }
    
    function draw() {
        requestAnimationFrame(draw);
        
        if (!state.isPlaying) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
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
    
    function drawSimpleWave() {
        let offset = 0;
        
        function animate() {
            requestAnimationFrame(animate);
            
            if (!state.isPlaying) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            
            for (let x = 0; x < canvas.width; x += 5) {
                const y = canvas.height / 2 + Math.sin((x + offset) * 0.02) * 30;
                ctx.lineTo(x, y);
            }
            
            ctx.strokeStyle = 'rgba(0, 122, 204, 0.6)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            offset += 2;
        }
        
        animate();
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
    });
}

// ==================== Initialize on Load ====================
document.addEventListener('DOMContentLoaded', init);
