/**
 * 存在の証明 - Main JavaScript
 * パーティクルシステムと時計
 */

class ExistenceState {
    constructor() {
        this.currentTime = new Date();
        this.particleSystem = null;
        this.canvas = null;
        this.ctx = null;
        
        this.initializeExistence();
    }

    initializeExistence() {
        setTimeout(() => {
            this.initializeParticleSystem();
            this.updateTime();
        }, 100);
    }

    initializeParticleSystem() {
        this.canvas = document.getElementById('existence-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.particleSystem = new ParticleSystem(this.canvas, this.ctx);
        this.particleSystem.start();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    updateTime() {
        const timeElement = document.getElementById('current-time');
        if (!timeElement) return;

        const updateClock = () => {
            this.currentTime = new Date();
            const timeString = this.currentTime.toLocaleTimeString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timeElement.textContent = timeString;
        };

        updateClock();
        setInterval(updateClock, 1000);
    }
}

// パーティクルシステム
class ParticleSystem {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.maxParticles = 50;
        this.animationId = null;
    }

    start() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// パーティクルクラス
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.life = Math.random();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;

        if (this.life <= 0 || 
            this.x < 0 || this.x > this.canvas.width ||
            this.y < 0 || this.y > this.canvas.height) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life * 0.3;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new ExistenceState();
});