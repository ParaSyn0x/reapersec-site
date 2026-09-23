(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navegacao');
  if (button && nav) {
    document.documentElement.classList.add('js');
    button.hidden = false;
    const setOpen = (open) => {
      button.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      button.querySelector('span').textContent = open ? '−' : '＋';
    };
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        button.focus();
      }
    });
    window.matchMedia('(min-width: 801px)').addEventListener('change', () => setOpen(false));
  }
  const carousel = document.querySelector('.cert-carousel');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('.cert-slide')];
    const controls = carousel.querySelector('.carousel-controls');
    const stage = document.createElement('div');
    stage.className = 'cert-stage';
    carousel.insertBefore(stage, slides[0]);
    slides.forEach((slide) => stage.appendChild(slide));
    let current = 0;
    const show = (index) => {
      const direction = index < current ? -1 : 1;
      stage.style.setProperty('--slide-direction', direction);
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === current);
        slide.setAttribute('aria-hidden', String(i !== current));
        slide.inert = i !== current;
      });
      carousel.querySelector('.cert-position').textContent = `${current + 1} / ${slides.length} · ${slides[current].getAttribute('aria-label')}`;
    };
    controls.hidden = false;
    carousel.querySelector('.cert-prev').addEventListener('click', () => show(current - 1));
    carousel.querySelector('.cert-next').addEventListener('click', () => show(current + 1));
    controls.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        show(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    show(0);
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
