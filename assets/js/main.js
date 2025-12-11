// Main JavaScript for Keepnet Marketing Site

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

// Form submission handler with validation
const betaForm = document.getElementById('beta-signup-form');
if (betaForm) {
  betaForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validation
    if (!this.checkValidity()) {
      e.stopPropagation();
      this.classList.add('was-validated');
      return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(this);
    
    try {
      // TODO: Replace with actual Formspree endpoint when ready
      // const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
      // const response = await fetch(formspreeEndpoint, {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Accept': 'application/json'
      //   }
      // });
      
      // For now, simulate submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      showFormMessage('success', '🎉 Thank you! We\'ll be in touch soon about the beta.');
      this.reset();
      this.classList.remove('was-validated');
    } catch (error) {
      showFormMessage('error', '⚠️ Something went wrong. Please try again or email us at beta@keepnetapp.com');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
  
  // Real-time validation
  const inputs = betaForm.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (betaForm.classList.contains('was-validated')) {
        this.classList.add('was-validated');
      }
    });
  });
}

function showFormMessage(type, message) {
  const existingAlert = document.querySelector('.form-alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  const alert = document.createElement('div');
  alert.className = `form-alert mt-4 p-4 rounded-lg ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`;
  alert.textContent = message;
  
  const form = document.getElementById('beta-signup-form');
  form.parentNode.insertBefore(alert, form.nextSibling);
  
  setTimeout(() => {
    alert.remove();
  }, 5000);
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
    
    // Calculate slide width including gap
    const slideWidth = slides[0].offsetWidth;
    const gap = 16; // 16px gap between slides
    const offset = index * (slideWidth + gap);
    
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
