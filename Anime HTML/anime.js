// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle menu icon
    const bars = document.querySelectorAll('.bar');
    if (navMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Slider functionality
const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const slides = document.querySelectorAll('.slide');

let currentSlide = 0;
const slideCount = slides.length;

// Set initial position
updateSlider();

// Event listeners for slider buttons
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
});

// Function to update slider position
function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto slide
let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
}, 5000);

// Pause auto slide on hover
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }, 5000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            mobileMenu.click();
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Highlight active menu item based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Add animation to elements when they come into view
    animateOnScroll();
});

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.anime-card, .genre-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity for animation elements
    const animatedElements = document.querySelectorAll('.anime-card, .genre-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger initial animations
    setTimeout(() => {
        animateOnScroll();
    }, 300);
    
    // Add hover effect for anime cards
    const animeCards = document.querySelectorAll('.anime-card');
    animeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.overlay').style.opacity = '0';
        });
    });
});

// Form submission handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (emailInput.value.trim() === '') {
            alert('Please enter your email address');
            return;
        }
        
        // Simulate form submission
        alert(`Thank you for subscribing with: ${emailInput.value}`);
        emailInput.value = '';
    });
}

// Search functionality
const searchBox = document.querySelector('.search-box');
if (searchBox) {
    searchBox.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = searchBox.querySelector('input');
        
        if (searchInput.value.trim() === '') {
            alert('Please enter a search term');
            return;
        }
        
        // Simulate search
        alert(`Searching for: ${searchInput.value}`);
    });
}