/**
 * Enhanced Matrix Rain Effect
 * Modified to use Chinese characters, English letters, and binary digits
 */

class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.characters = '';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.animationId = null;
        this.isActive = false;
        
        // Character sets with more Chinese characters for atmosphere
        this.chineseChars = '梦爱心情懂开始想念思念缘分时光岁月温柔美好遇见离别回忆永远瞬间感动幸福寂寞孤独坚强勇敢希望明天未来过去现在诗意浪漫真实虚幻';
        this.englishChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        this.binaryChars = '01';
        
        // Mix all character sets
        this.characters = this.chineseChars + this.englishChars + this.binaryChars;
        
        this.init();
        this.setupResize();
    }

    init() {
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    setupResize() {
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    draw() {
        // Fade effect - creates the trailing effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set font and color for characters
        this.ctx.font = this.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            // Choose a random character from the character set
            const charType = Math.random();
            let char;
            
            // Weight the character selection:
            // 40% Chinese characters
            // 30% English letters
            // 30% Binary digits
            if (charType < 0.4) {
                char = this.chineseChars[Math.floor(Math.random() * this.chineseChars.length)];
            } else if (charType < 0.7) {
                char = this.englishChars[Math.floor(Math.random() * this.englishChars.length)];
            } else {
                char = this.binaryChars[Math.floor(Math.random() * this.binaryChars.length)];
            }
            
            // Color variation for more atmosphere
            // Brighter green at the head of the drop
            const brightness = Math.random();
            if (brightness > 0.95) {
                this.ctx.fillStyle = '#ffffff'; // White for highlight
            } else if (brightness > 0.85) {
                this.ctx.fillStyle = '#9ff'; // Bright cyan
            } else {
                this.ctx.fillStyle = '#0f0'; // Classic green
            }
            
            // Draw the character
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            // Reset the drop to top randomly or when it reaches bottom
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            // Move the drop down
            this.drops[i]++;
        }
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        
        const animate = () => {
            if (!this.isActive) return;
            
            this.draw();
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    setOpacity(opacity) {
        this.canvas.style.opacity = opacity;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
