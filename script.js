/**
 * NATALIA RODAS | WEDDING PLANNER
 * Presentation Slide-Deck Script (7 Diapositivas Puras):
 * - Slide Observer & Pagination Sync (01 / 07 counter)
 * - Scroll Reveal Animations (Entradas dinámicas de elementos al scrolear)
 * - Fullscreen Background Photo Carousel in Hero
 * - Filmstrip Horizontal Gallery Controls & Lightbox
 * - Testimonial Carousel
 * - Custom Cursor & Preloader Curtain
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
   * 1. ANIMACIÓN DE ENTRADA (INTRO CURTAIN REVEAL)
   * -------------------------------------------------- */
  const introCurtain = document.getElementById('introCurtain');

  if (introCurtain) {
    document.body.classList.add('curtain-locked');

    setTimeout(() => {
      introCurtain.classList.add('reveal-open');

      setTimeout(() => {
        document.body.classList.remove('curtain-locked');
      }, 1100);
    }, 500);
  }

  /* --------------------------------------------------
   * 2. SCROLL REVEAL OBSERVER (EFECTOS SPECTACULARES AL SCROLEAR)
   * -------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------
   * 3. PPT SLIDE OBSERVER & PAGINACIÓN (01 / 07)
   * -------------------------------------------------- */
  const slides = document.querySelectorAll('.ppt-slide');
  const dots = document.querySelectorAll('.ppt-dot');
  const pptCurrentNum = document.getElementById('pptCurrentNum');
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  let currentSlideIndex = 0;

  const updateSlideProgress = (index) => {
    currentSlideIndex = index;

    if (pptCurrentNum) {
      pptCurrentNum.textContent = String(index + 1).padStart(2, '0');
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };

  const updateProgressBar = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  };

  window.addEventListener('scroll', updateProgressBar);
  updateProgressBar();

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slideIndex = Array.from(slides).indexOf(entry.target);
        if (slideIndex !== -1) {
          updateSlideProgress(slideIndex);
        }
      }
    });
  }, {
    threshold: 0.3
  });

  slides.forEach(slide => slideObserver.observe(slide));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetSlide = document.querySelector(targetId);
      if (targetSlide) {
        targetSlide.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#slide-')) {
        e.preventDefault();
        const targetSlide = document.querySelector(targetId);
        if (targetSlide) {
          targetSlide.scrollIntoView({ behavior: 'smooth' });
          const navLinks = document.getElementById('navLinks');
          if (navLinks) navLinks.classList.remove('active');
        }
      }
    });
  });

  /* --------------------------------------------------
   * 4. HERO FULLSCREEN BACKGROUND CAROUSEL
   * -------------------------------------------------- */
  const bgPhotos = document.querySelectorAll('.bg-photo');
  let currentBgIndex = 0;

  if (bgPhotos.length > 1) {
    setInterval(() => {
      bgPhotos[currentBgIndex].classList.remove('active');
      currentBgIndex = (currentBgIndex + 1) % bgPhotos.length;
      bgPhotos[currentBgIndex].classList.add('active');
    }, 4500);
  }

  /* --------------------------------------------------
   * 5. GALERÍA FILMSTRIP CONTROLES & LIGHTBOX
   * -------------------------------------------------- */
  const filmTrack = document.getElementById('filmstripTrack');
  const filmCards = document.querySelectorAll('.filmstrip-card');
  const filmPrev = document.getElementById('filmPrev');
  const filmNext = document.getElementById('filmNext');

  if (filmTrack) {
    if (filmNext) {
      filmNext.addEventListener('click', () => {
        filmTrack.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }

    if (filmPrev) {
      filmPrev.addEventListener('click', () => {
        filmTrack.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }

    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');

    filmCards.forEach(card => {
      card.addEventListener('click', () => {
        const src = card.getAttribute('data-src');
        const caption = card.getAttribute('data-caption');
        if (lightboxImg && lightboxModal) {
          lightboxImg.src = src;
          lightboxCaption.textContent = caption || '';
          lightboxModal.classList.add('active');
        }
      });
    });

    const closeLightbox = () => {
      if (lightboxModal) lightboxModal.classList.remove('active');
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  }

  /* --------------------------------------------------
   * 6. TESTIMONIALS SLIDE ROTATION
   * -------------------------------------------------- */
  const testimonials = [
    { text: '"Natalia hizo que la planificación de nuestra boda fuera una experiencia impecable y sin estrés. El día del evento todo fluyó con una precisión perfecta."', author: 'Camila & Mateo — Boda en Chiclayo' },
    { text: '"Desde la primera reunión con proveedores hasta el último detalle decorativo, el gusto exquisito de Natalia se notó en cada rincón. Todos nuestros invitados quedaron deslumbrados."', author: 'Valeria & Sebastián — Boda en Lambayeque' },
    { text: '"Superó todas nuestras expectativas. Su serenidad y enorme capacidad de resolución nos dieron total tranquilidad para enfocarnos únicamente en disfrutar."', author: 'Lucía & Rodrigo — Boda en Pimentel' }
  ];

  let currentTIndex = 0;
  const pptQuoteText = document.getElementById('pptQuoteText');
  const pptQuoteAuthor = document.getElementById('pptQuoteAuthor');
  const tPrev = document.getElementById('tPrev');
  const tNext = document.getElementById('tNext');

  const updateTestimonial = (index) => {
    if (pptQuoteText && pptQuoteAuthor) {
      pptQuoteText.style.opacity = '0';
      setTimeout(() => {
        pptQuoteText.textContent = testimonials[index].text;
        pptQuoteAuthor.textContent = testimonials[index].author;
        pptQuoteText.style.opacity = '1';
      }, 150);
    }
  };

  if (tNext) {
    tNext.addEventListener('click', () => {
      currentTIndex = (currentTIndex + 1) % testimonials.length;
      updateTestimonial(currentTIndex);
    });
  }

  if (tPrev) {
    tPrev.addEventListener('click', () => {
      currentTIndex = (currentTIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTIndex);
    });
  }

  /* --------------------------------------------------
   * 7. CURSOR CUSTOM & MENÚ MÓVIL
   * -------------------------------------------------- */
  const customCursor = document.getElementById('customCursor');
  const customCursorFollower = document.getElementById('customCursorFollower');
  let mouseX = 0, mouseY = 0;

  if (customCursor && customCursorFollower && window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      customCursorFollower.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });
  }

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

});
