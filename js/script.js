/**
 * Taste & Craving - Main JavaScript
 * Handles all interactive functionality
 */

// ===================================
// DOM Elements
// ===================================
const navbar = document.getElementById('navbar');
const navbarToggler = document.getElementById('navbarToggler');
const navbarNav = document.getElementById('navbarNav');
const navLinks = document.querySelectorAll('.nav-link');
const currentYearSpan = document.getElementById('currentYear');

// ===================================
// Navbar Scroll Effect
// ===================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleNavbarScroll);

// ===================================
// Mobile Menu Toggle
// ===================================
function toggleMobileMenu() {
    navbarNav.classList.toggle('show');
    
    // Update aria-expanded attribute
    const isExpanded = navbarNav.classList.contains('show');
    navbarToggler.setAttribute('aria-expanded', isExpanded);
}

// Add click event to toggler
if (navbarToggler) {
    navbarToggler.addEventListener('click', toggleMobileMenu);
}

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
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navbarNav.classList.contains('show')) {
                navbarNav.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    }
}

// Add click event to all nav links
navLinks.forEach(link => {
    link.addEventListener('click', smoothScrollToSection);
});

// Also handle clicks on brand logo
const brandLink = document.querySelector('.navbar-brand');
if (brandLink) {
    brandLink.addEventListener('click', smoothScrollToSection);
}

// ===================================
// Scroll Animation Trigger
// ===================================
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in-up');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Trigger animation when element is 80% visible
        if (elementTop < windowHeight * 0.8) {
            element.style.opacity = '1';
        }
    });
}

// Add scroll event listener for animations
window.addEventListener('scroll', handleScrollAnimations);

// Trigger on page load
window.addEventListener('load', handleScrollAnimations);

// ===================================
// Set Current Year in Footer
// ===================================
function setCurrentYear() {
    if (currentYearSpan) {
        const year = new Date().getFullYear();
        currentYearSpan.textContent = year;
    }
}

// Set year on page load
setCurrentYear();

// ===================================
// Close Mobile Menu on Outside Click
// ===================================
function handleOutsideClick(e) {
    if (navbarNav.classList.contains('show')) {
        // Check if click is outside navbar
        if (!navbar.contains(e.target)) {
            navbarNav.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
    }
}

// Add click event to document
document.addEventListener('click', handleOutsideClick);

// ===================================
// Prevent Default on Navbar Toggler
// ===================================
if (navbarToggler) {
    navbarToggler.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ===================================
// Active Navigation Link Highlight
// ===================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = navbar.offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active class on nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for active link
window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// Phone Number Click Analytics (Optional)
// ===================================
function trackPhoneClick(e) {
    // You can add analytics tracking here
    console.log('Phone number clicked:', this.getAttribute('href'));
}

// Add click tracking to phone links
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', trackPhoneClick);
});

// ===================================
// Menu Button Scroll to Menu Section
// ===================================
const menuButtons = document.querySelectorAll('a[href="#menu"]');
menuButtons.forEach(button => {
    button.addEventListener('click', smoothScrollToSection);
});

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
    if (e.key === 'Escape' && navbarNav.classList.contains('show')) {
        navbarNav.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarToggler.focus();
    }
}

// Add keyboard event listener
document.addEventListener('keydown', handleKeyboardNavigation);

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

// Apply debounce to scroll handlers
const debouncedScrollHandler = debounce(() => {
    handleNavbarScroll();
    handleScrollAnimations();
    updateActiveNavLink();
}, 10);

// Replace direct scroll listeners with debounced version
window.removeEventListener('scroll', handleNavbarScroll);
window.removeEventListener('scroll', handleScrollAnimations);
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedScrollHandler);

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
    setCurrentYear();
    handleScrollAnimations();
    updateActiveNavLink();
    
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});
