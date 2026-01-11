/**
 * Taste & Craving - Main JavaScript
 * Handles all interactive functionality
 */

// ===================================
// DOM Elements (will be initialized on DOM ready)
// ===================================
let navbar, navbarToggler, navbarNav, navLinks, currentYearSpan;

// Initialize DOM elements
function initDOMElements() {
    navbar = document.getElementById('navbar');
    navbarToggler = document.getElementById('navbarToggler');
    navbarNav = document.getElementById('navbarNav');
    navLinks = document.querySelectorAll('.nav-link');
    currentYearSpan = document.getElementById('currentYear');
}

// ===================================
// Navbar Scroll Effect
// ===================================
function handleNavbarScroll() {
    if (navbar && window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
        navbar.classList.remove('scrolled');
    }
}

// Scroll event listener will be added after DOM is ready

// ===================================
// Mobile Menu Toggle
// ===================================
function toggleMobileMenu() {
    if (!navbarNav || !navbarToggler) return;
    navbarNav.classList.toggle('show');
    
    // Update aria-expanded attribute
    const isExpanded = navbarNav.classList.contains('show');
    navbarToggler.setAttribute('aria-expanded', isExpanded);
}

// Navbar toggler event will be added after DOM is ready
// Note: Bootstrap handles the toggle automatically with data-bs-toggle,
// but we keep our handler for aria-expanded updates

// ===================================
// Smooth Scroll Navigation
// ===================================
function smoothScrollToSection(e) {
    // Check if the link is an anchor link
    const href = this.getAttribute('href');
    
    if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Calculate offset for fixed navbar
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navbarNav && navbarNav.classList.contains('show')) {
                navbarNav.classList.remove('show');
                if (navbarToggler) {
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }
        }
    }
}

// Nav links and brand link events will be added after DOM is ready

// ===================================
// Scroll Animation Trigger
// ===================================
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in-up');
    
    if (animatedElements && animatedElements.length > 0) {
        animatedElements.forEach(element => {
            if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                // Trigger animation when element is 80% visible
                if (elementTop < windowHeight * 0.8) {
                    element.style.opacity = '1';
                }
            }
        });
    }
}

// Scroll animation listener will be added after DOM is ready

// ===================================
// Set Current Year in Footer
// ===================================
function setCurrentYear() {
    if (currentYearSpan) {
        const year = new Date().getFullYear();
        currentYearSpan.textContent = year;
    }
}

// Set year will be called after DOM is ready

// ===================================
// Close Mobile Menu on Outside Click
// ===================================
function handleOutsideClick(e) {
    if (!navbarNav || !navbar || !navbarToggler) return;
    if (navbarNav.classList.contains('show')) {
        // Check if click is outside navbar
        if (!navbar.contains(e.target)) {
            navbarNav.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
    }
}

// Outside click handler will be added after DOM is ready

// ===================================
// Navbar toggler stopPropagation will be added after DOM is ready

// ===================================
// Active Navigation Link Highlight
// ===================================
function updateActiveNavLink() {
    if (!navbar) return;
    const sections = document.querySelectorAll('section[id]');
    if (!sections || sections.length === 0) return;
    
    const navbarHeight = navbar.offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        if (section) {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        }
    });
    
    // Update active class on nav links
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            if (link) {
                link.classList.remove('active');
                
                const href = link.getAttribute('href');
                if (href === `#${currentSection}`) {
                    link.classList.add('active');
                }
            }
        });
    }
}

// Active nav link listener will be added after DOM is ready

// ===================================
// Phone Number Click Analytics (Optional)
// ===================================
function trackPhoneClick(e) {
    // You can add analytics tracking here
    console.log('Phone number clicked:', this.getAttribute('href'));
}

// Phone link tracking will be added after DOM is ready

// ===================================
// Menu button events will be added after DOM is ready

// ===================================
// Lazy Loading Images (Performance)
// ===================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    lazyLoadImages();
}

// ===================================
// Accessibility: Keyboard Navigation
// ===================================
function handleKeyboardNavigation(e) {
    // Close mobile menu on Escape key
    if (!navbarNav || !navbarToggler) return;
    if (e.key === 'Escape' && navbarNav.classList.contains('show')) {
        navbarNav.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarToggler.focus();
    }
}

// Keyboard navigation will be set up after DOM is ready

// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// Performance: Debounce Scroll Events
// ===================================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler will be set up after DOM is ready

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🧇 Welcome to Taste & Craving! 🧇', 'font-size: 20px; font-weight: bold; color: #C17B8D;');
console.log('%cFreshly made with love ❤️', 'font-size: 14px; color: #D4A574;');

// ===================================
// Error Handling
// ===================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Image error handling will be set up in DOMContentLoaded

// ===================================
// Service Worker Registration (Optional - for PWA)
// ===================================
// Uncomment to enable PWA functionality
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
*/

// ===================================
// Initialize All Functions on DOM Ready
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize DOM elements first
        initDOMElements();
        
        // Set up scroll handlers with debounce
        const debouncedScrollHandler = debounce(() => {
            handleNavbarScroll();
            handleScrollAnimations();
            updateActiveNavLink();
        }, 10);
        window.addEventListener('scroll', debouncedScrollHandler);
        
        // Set up navbar toggler (Bootstrap handles toggle, we update aria-expanded)
        if (navbarToggler) {
            navbarToggler.addEventListener('click', (e) => {
                e.stopPropagation();
                // Update aria-expanded after Bootstrap's toggle
                setTimeout(() => {
                    if (navbarNav && navbarToggler) {
                        const isExpanded = navbarNav.classList.contains('show');
                        navbarToggler.setAttribute('aria-expanded', isExpanded);
                    }
                }, 10);
            });
        }
        
        // Set up nav links
        if (navLinks && navLinks.length > 0) {
            navLinks.forEach(link => {
                link.addEventListener('click', smoothScrollToSection);
            });
        }
        
        // Set up brand link
        const brandLink = document.querySelector('.navbar-brand');
        if (brandLink) {
            brandLink.addEventListener('click', smoothScrollToSection);
        }
        
        // Set up menu buttons
        const menuButtons = document.querySelectorAll('a[href="#menu"]');
        if (menuButtons && menuButtons.length > 0) {
            menuButtons.forEach(button => {
                if (button) {
                    button.addEventListener('click', smoothScrollToSection);
                }
            });
        }
        
        // Set up phone link tracking
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        if (phoneLinks && phoneLinks.length > 0) {
            phoneLinks.forEach(link => {
                if (link) {
                    link.addEventListener('click', trackPhoneClick);
                }
            });
        }
        
        // Set up outside click handler
        document.addEventListener('click', handleOutsideClick);
        
        // Set up keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
        
        // Set up image error handling
        const images = document.querySelectorAll('img');
        if (images && images.length > 0) {
            images.forEach(img => {
                if (img) {
                    img.addEventListener('error', function() {
                        console.error('Failed to load image:', this.src);
                        this.style.display = 'none';
                    });
                }
            });
        }
        
        // Initialize functions
        setCurrentYear();
        handleScrollAnimations();
        updateActiveNavLink();
        
        // Add fade-in animation to body
        if (document.body) {
            document.body.style.opacity = '0';
            setTimeout(() => {
                if (document.body) {
                    document.body.style.transition = 'opacity 0.3s ease-in';
                    document.body.style.opacity = '1';
                }
            }, 100);
        }
    } catch (error) {
        console.error('Error during DOMContentLoaded:', error);
        console.error('Error stack:', error.stack);
    }
});
