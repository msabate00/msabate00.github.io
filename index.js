// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

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

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})


particlesJS("particles-js", {
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

// Corrección manual de coordenadas con scroll (opcional pero recomendado)
window.addEventListener('mousemove', function(e) {
  if (window.pJSDom && window.pJSDom[0]) {
    const pJS = window.pJSDom[0].pJS;
    if (pJS.interactivity) {
      pJS.interactivity.mouse.pos_x = e.clientX;
      pJS.interactivity.mouse.pos_y = e.clientY + window.scrollY;
    }
  }
});



