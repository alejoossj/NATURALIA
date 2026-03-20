/* =============================================
   NATURALIA — JavaScript
   Interactions, scroll effects, animations
   ============================================= */

(function () {
  'use strict';

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Hamburger / Mobile menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-menu .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // ---- Scroll-reveal with IntersectionObserver ----
  const reveals = document.querySelectorAll(
    '.product-feature, .menu-card, .about-image-col, .about-content-col, .location-card, .about-stat-card, .testimonial-card, .faq-item, .events-content'
  );

  reveals.forEach(function (el, i) {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });

  // ---- Smooth active nav link highlight ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.style.color = '';
          });
          const active = document.querySelector(
            '.nav-links .nav-link[href="#' + entry.target.id + '"]'
          );
          if (active) active.style.color = 'var(--horchata-dk)';
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(function (sec) {
    sectionObserver.observe(sec);
  });

  // ---- Parallax on hero images (subtle) ----
  const heroImgs = document.querySelectorAll('.hero-img-card');
  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    heroImgs.forEach(function (img, i) {
      const dir = i % 2 === 0 ? 1 : -1;
      img.style.transform =
        img.classList.contains('hero-img-horchata')
          ? 'rotate(-3deg) translateY(' + (-y * 0.06) + 'px)'
          : 'rotate(3deg) translateY(' + (-30 - y * 0.06) + 'px)';
    });
  }, { passive: true });

  // ---- Gallery parallax ----
  const galleryImg = document.querySelector('.gallery-img');
  if (galleryImg) {
    window.addEventListener('scroll', function () {
      const rect = galleryImg.closest('.gallery').getBoundingClientRect();
      const progress = -rect.top / (window.innerHeight + rect.height);
      galleryImg.style.transform = 'scale(1.05) translateY(' + (progress * 40) + 'px)';
    }, { passive: true });
  }

  // ---- Marquee pause on hover ----
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.parentElement.addEventListener('mouseenter', function () {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.parentElement.addEventListener('mouseleave', function () {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  // ---- Menu card ripple effect ----
  document.querySelectorAll('.menu-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'transform:scale(0)',
        'animation:ripple 0.6s linear',
        'background:rgba(255,255,255,0.15)',
        'width:100px',
        'height:100px',
        'left:' + (e.offsetX - 50) + 'px',
        'top:' + (e.offsetY - 50) + 'px',
        'pointer-events:none',
      ].join(';');
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 700);
    });
  });

  // Inject ripple animation
  const style = document.createElement('style');
  style.textContent = '@keyframes ripple { to { transform:scale(4); opacity:0; } }';
  document.head.appendChild(style);

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other items
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('active');
      });
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  console.log('%cNaturalia 🌺 Website Loaded', 'color:#d4913a; font-size:1.2rem; font-weight:bold;');
})();


/* =============================================
   NATURALIA CHATBOT — "Nati" (Versión Estándar)
   ============================================= */
(function () {
  'use strict';

  // ── KB local de respuestas ──────────────────────────────────────────────────
  var KB_NATURALIA = [
    { keys: ['horchata'], answer: '🥛 Nuestra Horchata Artesanal se prepara cada mañana con arroz remojado, canela fresca, leche entera y vainilla natural. Todo molido y colado a mano, sin aditivos.' },
    { keys: ['jamaica'], answer: '🌺 Nuestra Jamaica Natural: flor de Jamaica hervida lentamente con azúcar morena artesanal. Antioxidante, floral, 100% vegana y natural.' },
    { keys: ['precio', 'costo', 'cuánto', 'cuanto', 'quetzal'], answer: '💰 Próximamente estaremos definiendo nuestros precios. Por favor contáctanos por WhatsApp para más información y estaremos encantados de atenderte.' },
    { keys: ['dónde', 'donde', 'ubicación', 'mixco'], answer: '📍 Estamos en Mixco, Guatemala. Atendemos de Lunes a Domingo de 8:00 a 19:00 hrs.' },
    { keys: ['historia', 'naturalia', 'quiénes', 'quienes', 'nació'], answer: '🌿 Naturalia es un emprendimiento guatemalteco fundado en 2026 en Mixco. Nacimos del amor por las bebidas artesanales tradicionales, sin conservadores y con ingredientes locales de la mejor calidad.' },
    { keys: ['ingrediente', 'natural', 'artesanal', 'conservador', 'químico'], answer: '🌿 Solo usamos ingredientes naturales de primera calidad. Sin conservadores, sin colorantes ni saborizantes artificiales. Preparados a mano diariamente.' },
    { keys: ['contacto', 'whatsapp', 'instagram', 'email'], answer: '📱 Contáctanos:\n💬 WhatsApp: [Click aquí](https://wa.me/50212345678)\n📧 hola@naturalia.gt\n📸 @naturalia_gt' },
    { keys: ['hola', 'buenos', 'buenas', 'hey', 'saludos'], answer: '¡Hola! 🌺 Soy Nati, tu asistente de Naturalia. ¿En qué puedo ayudarte hoy?' },
    { keys: ['gracias', 'buena onda', 'nítido', 'nitido'], answer: '🌿 ¡Con mucho gusto! En Naturalia cada bebida se hace con amor artesanal. ¡Te esperamos pronto! 😊' },
    { keys: ['evento', 'boda', 'fiesta', 'corporativo', 'reunión', 'cotizar'], answer: '🎉 ¡Nos encantaría estar en tu evento! Ofrecemos estaciones de bebidas artesanales para bodas, convivios y reuniones. Por favor contáctanos por WhatsApp para enviarte una cotización personalizada.' },
    { keys: ['envío', 'domicilio', 'delivery', 'llevar', 'pedido'], answer: '🛵 Contamos con servicio a domicilio en Mixco y zonas seleccionadas de la Ciudad de Guatemala. Pide tus bebidas favoritas por WhatsApp.' },
    { keys: ['duración', 'tiempo', 'vence', 'echa a perder', 'refrigeración'], answer: '⌛ Al ser naturales y sin conservadores, nuestras bebidas duran de 48 a 72 horas bien refrigeradas. Recomendamos disfrutarlas bien frías.' },
    { keys: ['lácteo', 'leche', 'vegano', 'viva', 'sin leche'], answer: '🌺 Nuestra Jamaica es 100% vegana y libre de lácteos. La Horchata clásica contiene leche entera, pero para eventos podemos preparar versiones especiales sin lácteos.' },
    { keys: ['casa', 'preparar', 'hacer', 'kit', 'diy', 'concentrado', 'paquete', 'polvo', 'polvos', 'extracto'], answer: '🏡 ¡Lleva el sabor a tu cocina! Vendemos **Naturalia en Casa**:\n🥛 **Horchata en Polvo:** Lista para mezclar con agua o leche.\n🌺 **Extracto de Jamaica:** Extracto natural con azúcar morena.\n¡Ideales para disfrutar el sabor artesanal en segundos! Contáctanos por WhatsApp para pedidos.' },
  ];

  function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f¿?¡!.,;:]/g, '').trim();
  }

  function getResponse(text) {
    var q = normalize(text);
    var best = null, score = 0;
    KB_NATURALIA.forEach(function (e) {
      e.keys.forEach(function (k) {
        if (q.includes(normalize(k))) {
          var s = k.length;
          if (s > score) { score = s; best = e.answer; }
        }
      });
    });
    return best || '🌿 Perdona, no entendí del todo tu pregunta. Pero si necesitas ayuda inmediata sobre pedidos, precios o eventos, puedes contactarnos directamente por WhatsApp o Instagram @naturalia_gt y te atendemos de inmediato. ¡Gracias por tu interés!';
  }

  // ── DOM refs ─────────────────────────────────────────────────────────────────
  var fab      = document.getElementById('chat-fab');
  var panel    = document.getElementById('chat-panel');
  var messages = document.getElementById('chat-messages');
  var inputEl  = document.getElementById('chat-input');
  var sendBtn  = document.getElementById('chat-send');
  var badge    = document.getElementById('chat-badge');
  var chips    = document.querySelectorAll('.chat-chip');

  // ── Toggle panel ─────────────────────────────────────────────────────────────
  fab.addEventListener('click', function () {
    fab.classList.toggle('open');
    panel.classList.toggle('open');
    badge.classList.add('hidden');
    if (panel.classList.contains('open')) {
      inputEl.focus();
      scrollBottom();
    }
  });

  // ── Helpers UI ───────────────────────────────────────────────────────────────
  function scrollBottom() { messages.scrollTop = messages.scrollHeight; }

  function appendMsg(text, role) {
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg chat-msg--' + role;
    var av = document.createElement('div');
    av.className = 'chat-msg-avatar';
    av.textContent = role === 'bot' ? '🌿' : '👤';
    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:var(--horchata-lt);text-decoration:underline">$1</a>');
    wrap.appendChild(av);
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    scrollBottom();
    return bubble;
  }

  function showTyping() {
    var wrap = document.createElement('div');
    wrap.className = 'chat-typing'; wrap.id = 'chat-typing-ind';
    var av = document.createElement('div');
    av.className = 'chat-msg-avatar'; av.textContent = '🌿';
    var bub = document.createElement('div');
    bub.className = 'typing-bubble';
    bub.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    wrap.appendChild(av); wrap.appendChild(bub);
    messages.appendChild(wrap); scrollBottom();
  }
  function hideTyping() { var el = document.getElementById('chat-typing-ind'); if (el) el.remove(); }

  // ── Core send ────────────────────────────────────────────────────────────────
  function send(text) {
    text = text.trim();
    if (!text) return;

    appendMsg(text, 'user');
    inputEl.value = '';
    
    // Simular tiempo de respuesta
    showTyping();
    setTimeout(function() {
      hideTyping();
      var reply = getResponse(text);
      appendMsg(reply, 'bot');
    }, 600);
  }

  // ── Event listeners ──────────────────────────────────────────────────────────
  sendBtn.addEventListener('click', function () { send(inputEl.value); });
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(inputEl.value); }
  });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var q = chip.getAttribute('data-q');
      if (!panel.classList.contains('open')) {
        fab.classList.add('open');
        panel.classList.add('open');
        badge.classList.add('hidden');
      }
      send(q);
    });
  });

  // ── Welcome ──────────────────────────────────────────────────────────────────
  setTimeout(function () {
    appendMsg(
      '¡Hola! 🌺 Soy **Nati**, tu asistente de Naturalia.\n\n' +
      'Estoy aquí para ayudarte con información sobre nuestras bebidas artesanales, precios, ubicación y eventos. ¿Qué te gustaría saber hoy?',
      'bot'
    );
  }, 700);

  console.log('%cNati Assistant 🌿 Local-version — Ready', 'color:#c0102b; font-size:1rem; font-weight:bold;');
})();

