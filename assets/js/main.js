// Main JavaScript for Keepnet Marketing Site

// Initialize Bootstrap components
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

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
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    }
  });
});

// Form submission handler with validation
const betaForm = document.getElementById('beta-signup-form');
if (betaForm) {
  betaForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Bootstrap validation
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
  alert.className = `alert alert-${type === 'success' ? 'success' : 'danger'} form-alert mt-3`;
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

// Observe feature cards and step cards
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.feature-card, .step-card, .screenshot-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

