// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add stagger delay for children
      const delay = entry.target.getAttribute('data-delay') || index * 100;
      setTimeout(() => {
        entry.target.classList.add('animate-in');
      }, Number(delay));
    }
  });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
  const animatableElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-scale'
  );
  
  animatableElements.forEach((el) => observer.observe(el));
  
  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Parallax effect for hero image
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      heroImage.style.transform = `translateY(${parallax}px)`;
    });
  }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});