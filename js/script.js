/* =============================================
   CAMERON'S SPARKLY BIRTHDAY GIFT GUIDE JS
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // SMOOTH SCROLLING & NAVIGATION
    // ====================================
    
    const navLinks = document.querySelectorAll('.floating-nav a');
    const sections = document.querySelectorAll('.guide-section');
    const progressBar = document.querySelector('.progress-bar');
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ====================================
    // SCROLL PROGRESS & ACTIVE NAVIGATION
    // ====================================
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.floating-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // ====================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ====================================
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('in-view');
                
                // Special animations for different sections
                if (entry.target.classList.contains('cover-section')) {
                    animateCoverSection(entry.target);
                }
                
                if (entry.target.classList.contains('color-section')) {
                    animateColorSwatches(entry.target);
                }
                
                if (entry.target.classList.contains('clothing-section') || 
                    entry.target.classList.contains('activities-section')) {
                    animateGiftCards(entry.target);
                }
                
                if (entry.target.classList.contains('extras-section')) {
                    animateBirthdayMessage(entry.target);
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all sections
    sections.forEach(section => {
        animationObserver.observe(section);
    });
    
    // ====================================
    // SECTION-SPECIFIC ANIMATIONS
    // ====================================
    
    function animateCoverSection(section) {
        const decorations = section.querySelectorAll('.decoration');
        decorations.forEach((decoration, index) => {
            setTimeout(() => {
                decoration.style.animation = `float 4s ease-in-out infinite, 
                                           fadeInScale 0.8s ease-out forwards`;
                decoration.style.animationDelay = `${index * 0.2}s, 0s`;
            }, index * 200);
        });
    }
    
    function animateColorSwatches(section) {
        const swatches = section.querySelectorAll('.color-swatch');
        swatches.forEach((swatch, index) => {
            setTimeout(() => {
                swatch.style.animation = 'slideInFromLeft 0.6s ease-out forwards';
                swatch.style.opacity = '0';
                swatch.style.transform = 'translateX(-30px)';
                
                setTimeout(() => {
                    swatch.style.opacity = '1';
                    swatch.style.transform = 'translateX(0)';
                }, 50);
            }, index * 100);
        });
    }
    
    function animateGiftCards(section) {
        const giftCards = section.querySelectorAll('.gift-card');
        giftCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) translateY(20px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                }, 50);
            }, index * 150);
        });
    }
    
    function animateBirthdayMessage(section) {
        const messageCard = section.querySelector('.message-card');
        const icons = section.querySelectorAll('.birthday-icons i');
        
        setTimeout(() => {
            messageCard.style.animation = 'magicalGlow 1.5s ease-out forwards';
            
            icons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.animation = `bounce 1s ease-in-out infinite, 
                                          sparkleAppear 0.5s ease-out forwards`;
                    icon.style.animationDelay = `${index * 0.1}s, 0s`;
                }, index * 100);
            });
        }, 300);
    }
    
    // ====================================
    // MAGICAL SPARKLE EFFECTS
    // ====================================
    
    function createMagicalSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'magical-sparkle';
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #FFD700, #FF69B4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: magicalSparkleFloat 2s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
    
    // Add sparkles on gift card hover
    document.querySelectorAll('.gift-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const offsetX = (Math.random() - 0.5) * 100;
                    const offsetY = (Math.random() - 0.5) * 100;
                    createMagicalSparkle(centerX + offsetX, centerY + offsetY);
                }, i * 100);
            }
        });
    });
    
    // ====================================
    // COLOR SWATCH INTERACTIONS
    // ====================================
    
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: 50%;
                top: 50%;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show color name in a toast
            showColorToast(this.querySelector('.color-name').textContent);
        });
    });
    
    function showColorToast(colorName) {
        const toast = document.createElement('div');
        toast.textContent = `You selected: ${colorName}! 💕`;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF69B4, #9932CC);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out forwards, 
                      slideOutRight 0.5s ease-out 2.5s forwards;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    // ====================================
    // GIFT CARD INTERACTIONS
    // ====================================
    
    document.querySelectorAll('.gift-card').forEach(card => {
        card.addEventListener('click', function() {
            const giftName = this.querySelector('h3').textContent;
            showGiftModal(giftName, this);
        });
    });
    
    function showGiftModal(giftName, cardElement) {
        const modal = document.createElement('div');
        modal.className = 'gift-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>✨ ${giftName} ✨</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>This would be a perfect gift for Cameron! 💕</p>
                    <div class="modal-sparkles">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-heart"></i>
                        <i class="fas fa-gift"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p>Remember to check the age recommendations and Cameron's current interests!</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn primary">Add to Wishlist 📝</button>
                    <button class="modal-btn secondary">Share Idea 💌</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        // Modal button actions
        modal.querySelector('.primary').addEventListener('click', () => {
            showColorToast(`${giftName} added to wishlist! 🎉`);
            modal.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.querySelector('.secondary').addEventListener('click', () => {
            showColorToast(`Gift idea shared! 💌`);
            modal.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => modal.remove(), 300);
        });
    }
    
    // ====================================
    // SCROLL EVENT LISTENERS
    // ====================================
    
    let ticking = false;
    
    function updateOnScroll() {
        updateScrollProgress();
        updateActiveNavigation();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // ====================================
    // KEYBOARD NAVIGATION
    // ====================================
    
    document.addEventListener('keydown', function(e) {
        const currentActive = document.querySelector('.floating-nav a.active');
        let currentIndex = Array.from(navLinks).indexOf(currentActive);
        
        if (e.key === 'ArrowDown' && currentIndex < navLinks.length - 1) {
            e.preventDefault();
            navLinks[currentIndex + 1].click();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            navLinks[currentIndex - 1].click();
        }
    });
    
    // ====================================
    // INITIALIZE ON LOAD
    // ====================================
    
    // Set initial active navigation
    updateActiveNavigation();
    
    // Add loading animation to sparkles
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach((sparkle, index) => {
        sparkle.style.animationDelay = `${index * 0.5}s`;
    });
    
    console.log('🎂 Cameron\'s Sparkly Birthday Gift Guide loaded! ✨');
});

// ====================================
// CSS ANIMATIONS (Added via JS)
// ====================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes popIn {
        0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
        }
        70% {
            transform: scale(1.05) translateY(-5px);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    @keyframes magicalGlow {
        0% {
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        50% {
            box-shadow: 0 20px 60px rgba(255, 105, 180, 0.3);
        }
        100% {
            box-shadow: 0 15px 50px rgba(153, 50, 204, 0.2);
        }
    }
    
    @keyframes sparkleAppear {
        from {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(360deg);
        }
    }
    
    @keyframes magicalSparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    /* Modal Styles */
    .modal-content {
        background: white;
        border-radius: 25px;
        padding: 0;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
        background: linear-gradient(135deg, #FF69B4, #9932CC);
        color: white;
        padding: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h2 {
        margin: 0;
        font-family: 'Fredoka One', cursive;
        font-size: 1.5rem;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    }
    
    .modal-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .modal-body {
        padding: 30px;
        text-align: center;
    }
    
    .modal-body p {
        margin: 0 0 20px 0;
        color: #666;
        line-height: 1.6;
    }
    
    .modal-sparkles {
        margin: 25px 0;
        display: flex;
        justify-content: center;
        gap: 15px;
    }
    
    .modal-sparkles i {
        font-size: 1.5rem;
        color: #FF69B4;
        animation: bounce 1s ease-in-out infinite;
    }
    
    .modal-sparkles i:nth-child(2) { animation-delay: 0.2s; color: #9932CC; }
    .modal-sparkles i:nth-child(3) { animation-delay: 0.4s; color: #FFD700; }
    .modal-sparkles i:nth-child(4) { animation-delay: 0.6s; color: #E6E6FA; }
    
    .modal-footer {
        padding: 0 30px 30px 30px;
        display: flex;
        gap: 15px;
        justify-content: center;
    }
    
    .modal-btn {
        padding: 12px 25px;
        border: none;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }
    
    .modal-btn.primary {
        background: linear-gradient(135deg, #FF69B4, #9932CC);
        color: white;
        box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
    }
    
    .modal-btn.secondary {
        background: #E6E6FA;
        color: #9932CC;
        border: 2px solid #C8A2C8;
    }
    
    .modal-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
    }
    
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 20px;
        }
        
        .modal-footer {
            flex-direction: column;
        }
        
        .modal-btn {
            width: 100%;
        }
    }
`;

document.head.appendChild(style);