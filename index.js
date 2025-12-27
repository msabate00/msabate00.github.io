// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

if (hamMenuBtn && smallMenu && headerHamMenuBtn && headerHamMenuCloseBtn) {
  hamMenuBtn.addEventListener('click', () => {
    if (smallMenu.classList.contains('header__sm-menu--active')) {
      smallMenu.classList.remove('header__sm-menu--active')
    } else {
      smallMenu.classList.add('header__sm-menu--active')
    }
    if (headerHamMenuBtn.classList.contains('d-none')) {
      headerHamMenuBtn.classList.remove('d-none')
      headerHamMenuCloseBtn.classList.add('d-none')
    } else {
      headerHamMenuBtn.classList.add('d-none')
      headerHamMenuCloseBtn.classList.remove('d-none')
    }
  })
}

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    if (!smallMenu || !headerHamMenuBtn || !headerHamMenuCloseBtn) return
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

if (headerLogoConatiner) {
  headerLogoConatiner.addEventListener('click', () => {
    location.href = 'index.html'
  })
}

const particlesTarget = document.getElementById('particles-js')
const canInitParticles = particlesTarget && typeof window.particlesJS === 'function'

if (canInitParticles) particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 290,
      "density": {
        "enable": true,
        "value_area": 2000
      }
    },
    "color": {
      "value": "#404040"
    },
    "shape": {
      "type": "triangle",
      "stroke": {
        "width": 0,
        "color": "#404040"
      }
    },
    "opacity": {
      "value": 0.2,
      "random": false
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#8a8a8a",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": true
    }
  },
  "interactivity": {
    "detect_on": "window", // ¡Clave para corregir el scroll!
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse",
        "parallax": { // Añade esto para mejor precisión
          "enable": true,
          "force": 60,
          "smooth": 10
        }
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "repulse": {
        "distance": 100,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});

// Corrección manual de coordenadas con scroll (solo si particles está activo)
if (canInitParticles) {
  window.addEventListener('mousemove', function(e) {
    if (window.pJSDom && window.pJSDom[0]) {
      const pJS = window.pJSDom[0].pJS;
      if (pJS.interactivity) {
        pJS.interactivity.mouse.pos_x = e.clientX;
        pJS.interactivity.mouse.pos_y = e.clientY + window.scrollY;
      }
    }
  });
}


// --- Projects access gate ---
const PROJECTS_COOKIE = 'projects_access';
const PROJECTS_KEY = 'aitramkg';

function setCookie(name, value, maxAgeSeconds) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
}

function getCookie(name) {
  const row = document.cookie.split('; ').find(r => r.startsWith(name + '='));
  return row ? decodeURIComponent(row.split('=').slice(1).join('=')) : null;
}

const moreProjectsLink = document.querySelector('.project-more');
if (moreProjectsLink) {
  moreProjectsLink.addEventListener('click', (e) => {
    
    if (getCookie(PROJECTS_COOKIE) === '1') return;

    e.preventDefault();

    const entered = prompt('Enter the password to view the projects:');
    if (entered === null) return;

    if (entered === PROJECTS_KEY) {
      setCookie(PROJECTS_COOKIE, '1', 60 * 60 * 24);
      const href = moreProjectsLink.getAttribute('href') || './projects.html';
      const target = moreProjectsLink.getAttribute('target');

      if (target === '_blank') window.open(href, '_blank');
      else window.location.href = href;
    } else {
      alert('Incorrect key.');
    }
  });
}



