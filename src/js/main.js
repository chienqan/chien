class SmoothScroll {
    constructor(selector, options = {}) {
        this.options = {
            speed: options.speed || 800,
            easing: options.easing || 'easeInOutCubic',
            offset: options.offset || 0,
            header: options.header || null
        };
        
        this.links = document.querySelectorAll(selector);
        this.header = this.options.header ? document.querySelector(this.options.header) : null;
        this.headerHeight = this.header ? this.header.offsetHeight : 0;
        
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    this.scrollTo(target);
                }
            });
        });
    }

    scrollTo(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - this.headerHeight;
        const duration = this.options.speed;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Custom easing function for better performance
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const run = startPosition + (distance * easeOutCubic);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }
}

// Initialize smooth scroll when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const scroll = new SmoothScroll('a[href^="#"]', {
        speed: 800,
        offset: 80,
        header: '.navbar'
    });
});