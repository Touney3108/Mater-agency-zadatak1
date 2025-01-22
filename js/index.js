import Glide from '@glidejs/glide';
import offerDestinationsJSON from './offerDestinations.json'
import travelDestinationsJSON from './travelDestinations.json'

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 1,
  autoplay: 3000,
  revind: false,
  
});
const isPortrait = window.matchMedia("(orientation:portrait)").matches;

let glideOffers = new Glide('.glideOffers', {
  type: 'slider',
  startAt: 1,
  perView: isPortrait?1:3,
  bound: true,
  focusAt: isPortrait?0:'center',
  rewind:false,
});

function updateGlideOffersVisibleSlides(){
  const isPortrait = window.matchMedia("(orientation:portrait)").matches;
  glideOffers.destroy();
  glideOffers= new Glide('.glideOffers', {
    type: 'slider',
    startAt: 1,
    perView: isPortrait?1:3,
    bound: true,
    focusAt: isPortrait?0:'center',
    rewind:false,
  });
  glideOffers.mount();
}
window.addEventListener("resize", updateGlideOffersVisibleSlides);



document.addEventListener('DOMContentLoaded', () => {
    //if adding new images just append paths and everything is going to be added dynamicly
    //images already have 20% dark overlay from figma so it's not added in HTML and CSS
  const slideImages = [
      '../assets/images/heroSectionImages/heroImg1.png',
      '../assets/images/heroSectionImages/heroImg2.png',
      '../assets/images/heroSectionImages/heroImg3.png',
  ];
  const glideSlides = document.querySelector('.glide__slides');
  const glideBullets = document.querySelector('.glide__bullets')
  
  slideImages.forEach((image,index) => {
    const slide = document.createElement('li');
    slide.classList.add('glide__slide');
    const img = document.createElement('img');
    img.src = image;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';

    slide.appendChild(img)
    glideSlides.appendChild(slide);

    const bullet = document.createElement('button');
    bullet.classList.add('glide__bullet');
    bullet.setAttribute('data-glide-dir', '=' + index);
    glideBullets.appendChild(bullet)

    const adjustImageForPortrait = () => {
      if (window.innerHeight > window.innerWidth) {
        img.style.objectPosition = 'center';
      } else {
        img.style.objectPosition = 'top';
      }
    };

  window.addEventListener('resize', adjustImageForPortrait);
  
  adjustImageForPortrait();
  });
    
  glide.mount(); 

  //travel offers dynamic loading
  const glideOffersSlides = document.querySelector('.glideOffers__slides');
  const glideOffersBullets = document.querySelector('.glideOffers__bullets')
  
  const offerCardsHTML = offerDestinationsJSON.map(
    destination => `
      <li class="glideOffers__slide">
        <div class="offersCard">
          <div class="offersCardImg">
            <img src="${destination.image}" alt="${destination.name}">
          </div>
          <div class="offersCardContent">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <div class="orderInfo">
              <span class="price">${destination.price}</span>
              <img src="../assets/images/ratingStar.svg" alt="rating">
              <span class="rating">${destination.rating}</span>
            </div>
          </div>
        </div>
      </li>
    `
  ).join('');

  const bulletsHTML = offerDestinationsJSON.map((_, index) => `
  <button 
    class="glide__bullet glideOffers__bullet ${index === 1 ? 'glide__bullet--active' : ''}" 
    data-glide-dir="=${index}">
  </button>
  `).join('');

  glideOffersBullets.innerHTML = bulletsHTML;
  glideOffersSlides.innerHTML = offerCardsHTML;
  
  glideOffers.mount(); 

  //destinations dynamic loading
  const destinationsGrid = document.querySelector(".destinationsGrid");

  const cardsHTML = travelDestinationsJSON.map(destination => `
    <div class="destinationCard">
      <div class="destinationImg">
        <img src="${destination.image}" alt="${destination.name}">
      </div>
      <div class="destinationContent">
        <div class="destinationInfo">
          <span class="price">${destination.price}</span>
          <img src="../assets/images/ratingStar.svg" alt="rating">
          <span>${destination.rating}</span>
        </div>
        <h3>${destination.name}</h3>
        <p>${destination.description}</p>
      </div>
    </div>
  `).join('');

  destinationsGrid.innerHTML = cardsHTML;

  //button animation
  const btns = document.querySelectorAll('.btn');

  btns.forEach(btn => {
    const chars = [...btn.textContent];
    btn.innerHTML = '';
    chars.forEach((char,index) => {
      const span = document.createElement('span');
      if (char === ' ') {
        span.style.width = 'calc(0.5*calc(var(--screenWidth)/120))';
      }
      span.textContent = char;
      
      span.classList.add('letter');
      span.textContent = char;
      span.style.animationDelay = `${index * 0.08}s`;
      btn.appendChild(span);
    });
  });

  //link animation
  const links = document.querySelectorAll('.animatedLink');

  links.forEach(link => {
    const chars = [...link.textContent];
    link.innerHTML = '';
    chars.forEach((char,index) => {
      if (char === ' ') {
        link.appendChild(document.createTextNode(" "));
        return;
      }
      const span = document.createElement('span');
      
      span.classList.add('linkLetter');
      span.textContent = char;
      span.style.animationDelay = `${index * 0.07}s`;
      link.appendChild(span);
    });
  });
  
  //onLoad animacija
  const slideInElements = document.querySelectorAll('.slideIn');

  slideInElements.forEach((element, index) => {
    element.style.animationDelay=`${index * 1}s`;
    element.classList.add('slideIn');
  });


  const menuButton = document.querySelector('.menu');
  const navLinks = document.querySelector('.nav-links');
  const blurOverlay = document.querySelector('.blur-overlay');

  function toggleMenu() {
    menuButton.classList.toggle('opened');
    menuButton.setAttribute('aria-expanded', menuButton.classList.contains('opened'));
    navLinks.classList.toggle('show');
    blurOverlay.classList.toggle('show');

  }

  menuButton.addEventListener('click', toggleMenu);
  //animation delay for hamburger menu
  Array.from(navLinks.children).forEach((li, index) => {
    li.style.transitionDelay=`${index * 0.1+0.7}s`;
  })

  
  
});