/**
 * 3DCG Works - Gallery Management
 * ギャラリーの描画と個別ページへの遷移
 */

class CreationGarden {
    constructor() {
        // works-data.js から読み込まれる WORKS_DATA を使用
        this.works = window.WORKS_DATA || [];
        this.initializeGarden();
    }

    initializeGarden() {
        setTimeout(() => {
            this.setupActions();
            this.renderWorks();
        }, 100);
    }

    setupActions() {
        // スクロールトップボタン
        const scrollTopBtn = document.getElementById('scroll-to-top');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // スクロール位置に応じて表示/非表示
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollTopBtn.style.opacity = '1';
                    scrollTopBtn.style.visibility = 'visible';
                } else {
                    scrollTopBtn.style.opacity = '0';
                    scrollTopBtn.style.visibility = 'hidden';
                }
            });
        }
    }

    renderWorks() {
        const universe = document.getElementById('works-universe');
        if (!universe) return;

        universe.innerHTML = '';

        // 年度順（新しい順）でソート
        const sortedWorks = [...this.works].sort((a, b) => b.year - a.year);

        sortedWorks.forEach((work, index) => {
            const workElement = this.createWorkElement(work, index);
            universe.appendChild(workElement);
        });

        // アニメーション
        this.animateWorks();
    }

    createWorkElement(work, index) {
        const element = document.createElement('div');
        element.className = 'work-constellation';
        element.setAttribute('data-work-id', work.id);
        element.style.setProperty('--i', index);

        element.innerHTML = `
            ${work.image ? `
                <div class="work-image">
                    <img src="${work.image}" alt="${work.title}" loading="lazy">
                    <div class="image-overlay">
                        <span class="view-details">詳細を見る</span>
                    </div>
                </div>
            ` : ''}
        `;

        element.addEventListener('click', () => {
            // 個別ページへ遷移
            window.location.href = `work.html?id=${work.id}`;
        });

        return element;
    }

    animateWorks() {
        const works = document.querySelectorAll('.work-constellation');
        works.forEach((work, index) => {
            work.style.opacity = '0';
            work.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                work.style.transition = 'all 0.6s ease';
                work.style.opacity = '1';
                work.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new CreationGarden();
});
