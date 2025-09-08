document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // Typing effect
  const typingElement = document.querySelector('.typing');
  if (typingElement) {
    const texts = ["Web Developer", "IT Student", "Tech Enthusiast"];
    let i = 0, j = 0, currentText = "", isDeleting = false;

    function type() {
      currentText = texts[i];
      typingElement.textContent = currentText.substring(0, j);
      if (!isDeleting && j < currentText.length) {
        j++; setTimeout(type, 120);
      } else if (isDeleting && j > 0) {
        j--; setTimeout(type, 80);
      } else {
        if (!isDeleting) { isDeleting = true; setTimeout(type, 1500); }
        else { isDeleting = false; i = (i + 1) % texts.length; setTimeout(type, 300); }
      }
    }
    type();
  }

  // Intersection Observer for animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('skills')) {
          entry.target.querySelectorAll('.bar span').forEach(span => {
            span.style.width = span.getAttribute('style').split(":")[1]; // keep defined %
          });
        }
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.section, .project-card').forEach(el => observer.observe(el));

  // Contact form fallback
  const form = document.getElementById('contact-form');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.elements['name'].value;
      const email = form.elements['email'].value;
      const message = form.elements['message'].value;
      const to = 'ranjithkumarait@gmail.com'; // change
      const subject = `Contact from ${name}`;
      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
    });
  }
});
