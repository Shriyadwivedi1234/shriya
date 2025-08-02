// DOM Elements
let navigation, navLinks, sideNavItems, sections, contactForm;

// Active section tracking
let activeSection = 'home';

// Initialize DOM elements when page loads
function initializeElements() {
    navigation = document.querySelector('.navigation');
    navLinks = document.querySelectorAll('.nav-link');
    sideNavItems = document.querySelectorAll('.side-nav-item');
    sections = document.querySelectorAll('section');
    contactForm = document.getElementById('contactForm');
}

// Scroll event handler
function handleScroll() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (activeSection !== sectionId) {
                activeSection = sectionId;
                updateActiveNavigation();
            }
        }
    });
}

// Update active navigation
function updateActiveNavigation() {
    // Update top navigation
    navLinks.forEach(link => {
        const linkSection = link.getAttribute('data-section');
        if (linkSection === activeSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Update side navigation
    sideNavItems.forEach(item => {
        const itemSection = item.getAttribute('data-section');
        if (itemSection === activeSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize navigation event listeners
function initializeNavigation() {
    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });

    sideNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });
}

// Contact form handler
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            this.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Parallax effect for hero background
function handleParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

// Smooth reveal animations for elements
function revealOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-item, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Add reveal animation styles
const style = document.createElement('style');
style.textContent = `
    .project-card, .skill-item, .contact-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .project-card.revealed, .skill-item.revealed, .contact-item.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card:nth-child(1) { transition-delay: 0.1s; }
    .project-card:nth-child(2) { transition-delay: 0.2s; }
    .project-card:nth-child(3) { transition-delay: 0.3s; }
    
    .skill-item:nth-child(1) { transition-delay: 0.1s; }
    .skill-item:nth-child(2) { transition-delay: 0.2s; }
    .skill-item:nth-child(3) { transition-delay: 0.3s; }
    .skill-item:nth-child(4) { transition-delay: 0.4s; }
    
    .contact-item:nth-child(1) { transition-delay: 0.1s; }
    .contact-item:nth-child(2) { transition-delay: 0.2s; }
    .contact-item:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// Button hover effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Social link hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const nav = document.querySelector('.navigation');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768 && navMenu) {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 8px;
        `;
        
        // Insert before nav-menu
        navMenu.parentNode.insertBefore(mobileMenuBtn, navMenu);
        
        // Toggle menu
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });
    }
}

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block !important;
        }
        
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 16, 63, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 20px;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-menu.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav-link {
            padding: 12px 0;
            text-align: center;
        }
    }
`;
document.head.appendChild(mobileStyles);

// Initialize mobile menu
createMobileMenu();

// Window resize handler
window.addEventListener('resize', () => {
    createMobileMenu();
});

// Event listeners
window.addEventListener('scroll', () => {
    handleScroll();
    handleParallax();
    revealOnScroll();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeElements(); // Initialize elements here
        updateActiveNavigation();
        initializeNavigation(); // Initialize navigation listeners here
        initializeContactForm(); // Initialize contact form handler here
        revealOnScroll();
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyles);

// Utility functions
function debounce(func, wait) {
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

// Optimize scroll performance
const optimizedScrollHandler = debounce(() => {
    handleScroll();
    revealOnScroll();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add smooth scrolling polyfill for older browsers
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const smoothScrollPolyfill = document.createElement('script');
    smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(smoothScrollPolyfill);
}

// Download CV function
function downloadCV() {
    // You can replace this with your actual CV file
    const cvUrl = 'https://drive.google.com/file/d/YOUR_CV_FILE_ID/view?usp=sharing';
    
    // Create a temporary link to download
    const link = document.createElement('a');
    link.href = cvUrl;
    link.target = '_blank';
    link.download = 'YourName_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show notification
    showNotification('CV download started!', 'success');
}

// Make scrollToSection function globally available
window.scrollToSection = scrollToSection;
window.downloadCV = downloadCV; 