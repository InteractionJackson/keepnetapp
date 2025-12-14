// Main JavaScript for Keepnet Marketing Site

// Import CSS files
import '../css/main.css';
import '../css/theme.css';

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (mobileMenuBtn && navbarCollapse) {
  mobileMenuBtn.addEventListener('click', function() {
    navbarCollapse.classList.toggle('show');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = mobileMenuBtn.contains(event.target) || navbarCollapse.contains(event.target);
    if (!isClickInside && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

// Accordion functionality
function initAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const target = document.querySelector(this.getAttribute('data-target'));
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other accordions
      accordionButtons.forEach(btn => {
        if (btn !== this) {
          btn.classList.add('collapsed');
          btn.setAttribute('aria-expanded', 'false');
          const otherTarget = document.querySelector(btn.getAttribute('data-target'));
          if (otherTarget) {
            otherTarget.classList.remove('show');
          }
        }
      });
      
      // Toggle current accordion
      if (isExpanded) {
        this.classList.add('collapsed');
        this.setAttribute('aria-expanded', 'false');
        target.classList.remove('show');
      } else {
        this.classList.remove('collapsed');
        this.setAttribute('aria-expanded', 'true');
        target.classList.add('show');
      }
    });
  });
}


// Add animation on scroll (optional enhancement)
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

// Carousel functionality - Simple horizontal scroll
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (!track || !slides.length) return;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    // Calculate offset - each slide is 100% of container width
    const container = track.parentElement;
    const containerWidth = container.offsetWidth;
    const offset = index * containerWidth;
    
    // Move the track
    track.style.transform = `translateX(-${offset}px)`;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    currentSlide = index;
    updateButtons();
  }
  
  function updateButtons() {
    // Disable prev button on first slide
    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
    }
    
    // Disable next button on last slide
    if (nextBtn) {
      nextBtn.disabled = currentSlide === totalSlides - 1;
    }
  }
  
  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }
  
  function prevSlide() {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }
  
  // Arrow button event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });
  
  // Initialize button states
  updateButtons();
  
  // Keyboard navigation
  const showcase = document.querySelector('.how-it-works-showcase');
  document.addEventListener('keydown', (e) => {
    if (!showcase) return;
    
    // Only respond to arrow keys if carousel is in view
    const rect = showcase.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (inView) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Animate elements on scroll
  const animatedElements = document.querySelectorAll('.feature-card, .step-card, .screenshot-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Initialize carousel
  initCarousel();
  
  // Initialize accordion
  initAccordion();
});
