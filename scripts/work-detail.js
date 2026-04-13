/**
 * 3DCG Works - Work Detail
 * 個別作品ページのロジック
 */

class WorkDetail {
    constructor() {
        this.works = window.WORKS_DATA || [];
        // 年度順（新しい順）でソートしておく
        this.sortedWorks = [...this.works].sort((a, b) => b.year - a.year);
        
        this.currentId = this.getIdFromUrl();
        this.currentIndex = this.sortedWorks.findIndex(w => w.id === this.currentId);
        
        this.initialize();
    }

    getIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    initialize() {
        if (this.currentIndex === -1) {
            this.renderError();
            return;
        }

        this.renderDetail();
        this.setupNavigation();
        this.setupKeyboard();
    }

    renderDetail() {
        const work = this.sortedWorks[this.currentIndex];
        const contentArea = document.getElementById('detail-content-area');
        
        if (!contentArea) return;

        document.title = `${work.title} - Furuya Takumi`;

        // アンビエント背景の更新
        let ambientBg = document.getElementById('ambient-background');
        if (!ambientBg) {
            ambientBg = document.createElement('div');
            ambientBg.id = 'ambient-background';
            ambientBg.className = 'ambient-background';
            document.body.prepend(ambientBg);
        }
        if (work.image) {
            ambientBg.style.backgroundImage = `url(${work.image})`;
            ambientBg.style.opacity = '1';
        } else {
            ambientBg.style.opacity = '0';
        }

        contentArea.innerHTML = `
            <div class="detail-layout">
                ${work.image ? `
                    <div class="detail-image-wrapper">
                        <div class="detail-image">
                            <img src="${work.image}" alt="${work.title}">
                        </div>
                    </div>
                ` : ''}
                
                <div class="detail-info-wrapper">
                    <div class="detail-info">
                        <div class="info-header">
                            <h1 class="info-title">${work.title}</h1>
                            <div class="info-year">製作: ${work.year}年</div>
                        </div>
                        
                        <div class="info-description">
                            <p>${work.description}</p>
                        </div>
                        
                        <div class="info-meta">
                            ${work.technologies.map(tech => 
                                `<span class="meta-tag">${tech}</span>`
                            ).join('')}
                        </div>
                        
                        ${work.url ? `
                            <div class="info-actions">
                                <a href="${work.url}" target="_blank" rel="noopener noreferrer" class="action-link">
                                    <span class="action-link-icon">↗</span>
                                    <span>作品を詳しく見る</span>
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="detail-counter">${this.currentIndex + 1} / ${this.sortedWorks.length}</div>
        `;
    }

    renderError() {
        const contentArea = document.getElementById('detail-content-area');
        if (!contentArea) return;

        contentArea.innerHTML = `
            <div class="error-container">
                <h2>作品が見つかりません</h2>
                <p>指定されたIDの作品は存在しないか、削除されました。</p>
                <a href="index.html" class="action-link">ギャラリーに戻る</a>
            </div>
        `;
        
        // ナビゲーションを隠す
        document.getElementById('nav-prev').style.display = 'none';
        document.getElementById('nav-next').style.display = 'none';
    }

    setupNavigation() {
        const prevBtn = document.getElementById('nav-prev');
        const nextBtn = document.getElementById('nav-next');

        if (this.currentIndex > 0) {
            prevBtn.style.display = 'flex';
            prevBtn.addEventListener('click', () => {
                const prevId = this.sortedWorks[this.currentIndex - 1].id;
                window.location.href = `work.html?id=${prevId}`;
            });
        } else {
            prevBtn.style.display = 'none';
        }

        if (this.currentIndex < this.sortedWorks.length - 1) {
            nextBtn.style.display = 'flex';
            nextBtn.addEventListener('click', () => {
                const nextId = this.sortedWorks[this.currentIndex + 1].id;
                window.location.href = `work.html?id=${nextId}`;
            });
        } else {
            nextBtn.style.display = 'none';
        }
    }

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                window.location.href = 'index.html';
            } else if (e.key === 'ArrowLeft' && this.currentIndex > 0) {
                const prevId = this.sortedWorks[this.currentIndex - 1].id;
                window.location.href = `work.html?id=${prevId}`;
            } else if (e.key === 'ArrowRight' && this.currentIndex < this.sortedWorks.length - 1) {
                const nextId = this.sortedWorks[this.currentIndex + 1].id;
                window.location.href = `work.html?id=${nextId}`;
            }
        });
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new WorkDetail();
});
