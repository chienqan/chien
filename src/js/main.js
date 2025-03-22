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

// Update clock with GMT+7 time
function updateClock() {
    // Get current UTC time
    const now = new Date();
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    
    // Add 7 hours to get GMT+7
    const gmtPlus7 = new Date(utcTime.getTime() + (7 * 60 * 60 * 1000));
    
    // Get hours and minutes
    const hours = gmtPlus7.getHours().toString().padStart(2, '0');
    const minutes = gmtPlus7.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes} (UTC +07:00)`;
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Set initial time to 13:00
document.addEventListener('DOMContentLoaded', () => {
    const timeElement = document.getElementById('current-time');
    
    // Start updating the clock after 1 second
    setTimeout(() => {
        updateClock();
        setInterval(updateClock, 60000);
    }, 1000);
}); 