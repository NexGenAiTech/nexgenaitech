// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500);
});

// Mobile Sidebar
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
    mobileSidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    mobileSidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when clicking on a link
document.querySelectorAll('.mobile-sidebar a').forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// Contact Dropdown
const contactToggle = document.getElementById('contactToggle');
const contactDropdownMenu = document.getElementById('contactDropdownMenu');

contactToggle.addEventListener('click', () => {
    contactDropdownMenu.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!contactToggle.contains(e.target) && !contactDropdownMenu.contains(e.target)) {
        contactDropdownMenu.classList.remove('active');
    }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact Form Toggle
const showFormBtn = document.getElementById('showFormBtn');
const contactFormContainer = document.getElementById('contactFormContainer');
const quickMessageBtn = document.getElementById('quickMessageBtn');
const sidebarMessageBtn = document.getElementById('sidebarMessageBtn');

function toggleContactForm() {
    contactFormContainer.classList.toggle('active');
    if (contactFormContainer.classList.contains('active')) {
        showFormBtn.innerHTML = '<i class="fas fa-times"></i> Close Form';
        setTimeout(() => {
            contactFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    } else {
        showFormBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
}

showFormBtn.addEventListener('click', toggleContactForm);

// Quick Message Button
quickMessageBtn.addEventListener('click', () => {
    contactDropdownMenu.classList.remove('active');
    toggleContactForm();
});

// Sidebar Message Button
sidebarMessageBtn.addEventListener('click', () => {
    closeSidebar();
    setTimeout(() => {
        toggleContactForm();
    }, 300);
});

// Sidebar Quick Links
document.querySelectorAll('.quick-link-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        if (target) {
            closeSidebar();
            if (target === '#contactFormContainer') {
                contactFormContainer.classList.add('active');
                showFormBtn.innerHTML = '<i class="fas fa-times"></i> Close Form';
                setTimeout(() => {
                    contactFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            } else {
                const targetElement = document.querySelector(target);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');
const successMessage = document.getElementById('successMessage');

const scriptURL = 'https://script.google.com/macros/s/AKfycbxb1RwbEM6Z46wm4LypQd1btaQDoxi35DYb9AOHsV_6f3hWRBHIqi7ybEPffRkvshva3w/exec';

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    submitText.style.display = 'none';
    submitLoader.style.display = 'block';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.8';
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    data.timestamp = new Date().toISOString();
    data.source = 'NexGenAiTech Website';
    data.pageURL = window.location.href;
    
    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        successMessage.style.display = 'block';
        contactForm.reset();
        
        setTimeout(() => {
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
        
        // Auto close form after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            toggleContactForm();
        }, 5000);
        
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again or email us directly at nexgenaitech7@gmail.com');
    } finally {
        submitText.style.display = 'block';
        submitLoader.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
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
    
    // Observe cards for animation
    document.querySelectorAll('.value-card, .service-card, .industry-card, .stack-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
