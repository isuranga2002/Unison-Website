/* =====================================================
   UNISON WEBSITE - COMPLETE JAVASCRIPT (FULLY UPDATED)
   All Interactive Features + Video Support
===================================================== */

// ========== 1. HAMBURGER MENU TOGGLE ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ========== 2. CLOSE MENU WHEN LINK CLICKED ==========
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ========== 3. CLOSE MENU WHEN CLICKING OUTSIDE ==========
document.addEventListener('click', (event) => {
    if (hamburger && navMenu) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ========== 4. NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollPosition = currentScrollPosition;
});

// ========== 5. ACTIVE LINK ON SCROLL ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ========== 6. SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        
        if (href && href !== '#' && href.length > 1) {
            event.preventDefault();
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== 7. SCROLL INDICATOR FUNCTIONALITY ==========
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const heroSection = document.querySelector('.hero-section');
        const nextSection = heroSection.nextElementSibling;
        
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ========== 8. HIDE SCROLL INDICATOR WHEN SCROLLED ==========
window.addEventListener('scroll', () => {
    const scrollIndicatorElement = document.querySelector('.scroll-indicator');
    
    if (scrollIndicatorElement) {
        if (window.pageYOffset > 100) {
            scrollIndicatorElement.style.opacity = '0';
            scrollIndicatorElement.style.visibility = 'hidden';
        } else {
            scrollIndicatorElement.style.opacity = '1';
            scrollIndicatorElement.style.visibility = 'visible';
        }
    }
});

// ========== 9. PARALLAX EFFECT ON HERO ==========
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    const scrollPosition = window.pageYOffset;
    
    if (heroSection && scrollPosition < window.innerHeight) {
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// ========== 10. VIDEO BACKGROUND HANDLING ==========
document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.getElementById('heroVideo');
    const heroImageFallback = document.querySelector('.hero-image-fallback');
    
    if (heroVideo) {
        // Check if video file exists and handle error
        heroVideo.addEventListener('error', () => {
            console.log('Video not found, using image fallback');
            heroVideo.style.display = 'none';
            if (heroImageFallback) {
                heroImageFallback.style.display = 'block';
            }
        });
        
        // Check if video loaded successfully
        heroVideo.addEventListener('loadeddata', () => {
            console.log('✅ Video loaded successfully');
            if (heroImageFallback) {
                heroImageFallback.style.display = 'none';
            }
        });
        
        // Pause video on mobile to save data
        if (window.innerWidth <= 768) {
            heroVideo.pause();
            heroVideo.style.display = 'none';
            if (heroImageFallback) {
                heroImageFallback.style.display = 'block';
            }
        }
    }
});

// ========== 11. HANDLE WINDOW RESIZE FOR VIDEO ==========
window.addEventListener('resize', () => {
    const heroVideo = document.getElementById('heroVideo');
    const heroImageFallback = document.querySelector('.hero-image-fallback');
    
    if (heroVideo && heroImageFallback) {
        if (window.innerWidth <= 768) {
            heroVideo.pause();
            heroVideo.style.display = 'none';
            heroImageFallback.style.display = 'block';
        } else {
            heroVideo.play();
            heroVideo.style.display = 'block';
            heroImageFallback.style.display = 'none';
        }
    }
});

// ========== 12. FADE IN ON SCROLL ANIMATION ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and feature cards
document.querySelectorAll('.service-card, .why-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ========== 13. PREVENT SCROLL JANK ON PAGE LOAD ==========
window.addEventListener('load', () => {
    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }
});

// ========== 14. LOAD ADMIN SETTINGS FROM LOCALSTORAGE ==========
function loadAdminSettings() {
    const settings = {
        phone1: localStorage.getItem('phone1') || '+94 778 222 611',
        phone2: localStorage.getItem('phone2') || '+94 716 444 863',
        email: localStorage.getItem('email') || 'kmkamalranjith@gmail.com',
        whatsapp: localStorage.getItem('whatsapp') || '94716444863',
        address: localStorage.getItem('address') || 'Negombo Road, Kurana, Katunayake, Sri Lanka',
        facebook: localStorage.getItem('facebook') || '#',
        instagram: localStorage.getItem('instagram') || '#',
        mapIframe: localStorage.getItem('mapIframe') || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.0!2d79.8847!3d7.1667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTAnMDAuMCJOIDc5wrA1MycwNS4wIkU!5e0!3m2!1sen!2slk!4v1234567890'
    };
    
    // Update contact information on page
    const phone1Element = document.getElementById('phone1');
    const phone2Element = document.getElementById('phone2');
    const emailElement = document.getElementById('email');
    const whatsappElement = document.getElementById('whatsapp');
    const addressElement = document.getElementById('address');
    const facebookElement = document.getElementById('facebook');
    const instagramElement = document.getElementById('instagram');
    const mapIframeElement = document.getElementById('map-iframe');
    
    if (phone1Element) {
        phone1Element.textContent = settings.phone1;
        phone1Element.href = 'tel:' + settings.phone1.replace(/\s/g, '');
    }
    if (phone2Element) {
        phone2Element.textContent = settings.phone2;
        phone2Element.href = 'tel:' + settings.phone2.replace(/\s/g, '');
    }
    if (emailElement) {
        emailElement.textContent = settings.email;
        emailElement.href = 'mailto:' + settings.email;
    }
    if (whatsappElement) {
        whatsappElement.href = 'https://wa.me/' + settings.whatsapp;
    }
    if (addressElement) {
        addressElement.textContent = settings.address;
    }
    if (facebookElement && settings.facebook !== '#') {
        facebookElement.href = settings.facebook;
    }
    if (instagramElement && settings.instagram !== '#') {
        instagramElement.href = settings.instagram;
    }
    if (mapIframeElement && settings.mapIframe) {
        mapIframeElement.src = settings.mapIframe;
    }
}

// Load settings when page loads
document.addEventListener('DOMContentLoaded', loadAdminSettings);

// ========== 15. WHATSAPP FLOAT BUTTON (OPTIONAL) ==========
function createWhatsAppButton() {
    const whatsappFloat = document.createElement('a');
    whatsappFloat.href = 'https://wa.me/94716444863';
    whatsappFloat.target = '_blank';
    whatsappFloat.className = 'whatsapp-float';
    whatsappFloat.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
            <path d="M27.281 4.65C24.318 1.686 20.447 0.104 16.31 0.104C7.646 0.104 0.594 7.156 0.594 15.82c0 2.83 0.737 5.589 2.139 8.03L0.557 31.896l8.229-2.159c2.357 1.286 5.008 1.965 7.717 1.965h.007c8.663 0 15.715-7.053 15.715-15.716 0-4.201-1.633-8.151-4.6-11.118l.656-.678zM16.31 28.855h-.006c-2.397 0-4.745-.645-6.785-1.863l-.486-.289-5.042 1.322 1.346-4.916-.317-.504c-1.337-2.127-2.044-4.586-2.044-7.125 0-7.38 6.004-13.384 13.384-13.384 3.575 0 6.934 1.394 9.462 3.922s3.922 5.887 3.922 9.462c-.001 7.381-6.005 13.385-13.385 13.385l-.049-.02zm7.345-10.018c-.402-.201-2.379-1.174-2.748-1.308-.369-.133-.638-.201-.906.201-.268.402-1.041 1.308-1.276 1.577-.234.268-.469.302-.871.101-.402-.201-1.697-.626-3.233-1.994-1.195-1.065-2.001-2.381-2.236-2.783-.234-.402-.025-.619.176-.819.18-.18.402-.469.603-.703.201-.235.268-.402.402-.67.134-.268.067-.502-.033-.703-.101-.201-.906-2.183-1.241-2.989-.327-.789-.659-.682-.906-.695-.234-.012-.502-.015-.77-.015s-.703.1-1.072.502c-.369.402-1.41 1.379-1.41 3.362s1.443 3.899 1.644 4.168c.201.268 2.83 4.321 6.858 6.059.958.414 1.707.661 2.29.846.962.306 1.837.263 2.529.159.771-.115 2.379-.973 2.714-1.912.335-.939.335-1.744.235-1.912-.101-.168-.369-.268-.771-.469z"/>
        </svg>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #25D366;
            color: white;
            border-radius: 50px;
            text-align: center;
            font-size: 30px;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        .whatsapp-float:hover {
            background-color: #20BA5A;
            transform: scale(1.1);
            box-shadow: 2px 2px 15px rgba(0,0,0,0.4);
        }
        @media (max-width: 768px) {
            .whatsapp-float {
                width: 50px;
                height: 50px;
                bottom: 20px;
                right: 20px;
            }
            .whatsapp-float svg {
                width: 28px;
                height: 28px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(whatsappFloat);
}

// Uncomment the line below to enable floating WhatsApp button
// createWhatsAppButton();

// ========== 16. FORM VALIDATION (IF YOU ADD CONTACT FORM LATER) ==========
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!formData.email || !formData.email.includes('@')) {
        errors.push('Valid email is required');
    }
    
    if (!formData.message || formData.message.trim() === '') {
        errors.push('Message is required');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// ========== 17. LOADING SCREEN (OPTIONAL) ==========
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// ========== 18. BACK TO TOP BUTTON (OPTIONAL) ==========
function createBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.style.display = 'none';
    
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 120px;
            right: 40px;
            width: 50px;
            height: 50px;
            background: #1e3246;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            z-index: 998;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .back-to-top:hover {
            background: #2c5f7c;
            transform: translateY(-5px);
        }
        @media (max-width: 768px) {
            .back-to-top {
                width: 45px;
                height: 45px;
                bottom: 90px;
                right: 20px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Uncomment to enable back to top button
// createBackToTopButton();

// ========== 19. CONSOLE MESSAGES ==========
console.log('%c✅ Unison Website JavaScript Loaded Successfully!', 'color: #25D366; font-size: 16px; font-weight: bold;');
console.log('%c📋 All Features Active:', 'color: #64B5F6; font-size: 14px; font-weight: bold;');
console.log('   ✓ Navigation Menu with Hamburger');
console.log('   ✓ Smooth Scrolling');
console.log('   ✓ Active Link Highlighting');
console.log('   ✓ Video Background Support');
console.log('   ✓ Parallax Effects');
console.log('   ✓ Scroll Animations');
console.log('   ✓ Admin Settings Integration');
console.log('   ✓ Mobile Responsive');
console.log('%c🎨 Design: LoveSriLanka.org Style', 'color: #FFD700; font-size: 12px;');
console.log('%c🌐 Unison - World\'s Trust', 'color: #1e3246; font-size: 14px; font-weight: bold;');

// ========== 20. ERROR HANDLING ==========
window.addEventListener('error', (e) => {
    console.error('⚠️ JavaScript Error:', e.message);
});

// ========== 21. PERFORMANCE MONITORING ==========
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
});