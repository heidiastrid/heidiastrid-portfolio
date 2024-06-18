
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

// nav
const r = document.querySelector(':root')
const nav = document.querySelector('nav')
const navElem = document.querySelectorAll('.links > a')
const left = document.querySelector('.left')
const right = document.querySelector('.right')
const selected = document.querySelector('.selected')
const accent = document.querySelector('.accent')
const transitionTiming = getComputedStyle(document.documentElement).getPropertyValue('--transition-timing');

//Set basline properties
r.style.setProperty('--pill-radius', `${nav.offsetHeight*2}px`)
r.style.setProperty('--border-radius', `${accent.offsetHeight/2}px`)

navElem.forEach(link => {
    link.addEventListener('mouseover', () => {
        left.style.transitionTimingFunction = transitionTiming
        right.style.transitionTimingFunction = transitionTiming
        let posLeft = link.offsetLeft
        let posRight = (right.offsetLeft + right.offsetWidth) - (link.offsetLeft + link.offsetWidth)
        left.style.width = Math.abs(posLeft) + 'px'
        if (posRight < 2) {
            right.style.width = '0px'
        } else {
            right.style.width = Math.abs(posRight) + 'px'
        }
        
        selected.style.left = posLeft + 'px'
        selected.style.right = posRight + 'px'
    })
})

//Reset navbar to default positions
nav.addEventListener('mouseout', ()=> {
    left.style.width = '100%'
    right.style.width = '100%'
    left.style.transitionTimingFunction = 'ease'
    right.style.transitionTimingFunction = 'ease'
})

//Show active link in Nav Bar
navElem.forEach(link => {
    link.addEventListener('click', () => {
        navElem.forEach(elem => {
            elem.classList.remove('active')
        })
        link.classList.add('active')
    })
})
        // JavaScript for the starry background effect
        const stars = 400;
        const container = document.getElementById("starry-background");

        for (let i = 0; i < stars; i++) {
            const star = document.createElement("div");
            star.className = "star";
            const xy = getRandomPosition();
            star.style.top = xy[0] + "px";
            star.style.left = xy[1] + "px";
            star.style.animationDuration = 5 + Math.random() * 10 + "s";
            star.style.animationDelay = Math.random() * 2 + "s";
            container.appendChild(star);
        }

        function getRandomPosition() {
            const y = window.innerHeight;
            const x = window.innerWidth;
            const randomY = Math.floor(Math.random() * y);
            const randomX = Math.floor(Math.random() * x);
            return [randomY, randomX];
        }
        document.addEventListener("DOMContentLoaded", function () {
          const hamburgerMenu = document.querySelector(".hamburger-menu");
          const mobileMenu = document.querySelector(".mobile-menu");
      
          // Function to toggle the mobile menu
          function toggleMobileMenu() {
              mobileMenu.classList.toggle("active");
          }
      
          // Event listener for the hamburger button click
          hamburgerMenu.addEventListener("click", toggleMobileMenu);
      });
      