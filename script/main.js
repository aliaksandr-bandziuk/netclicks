'use strict';

// меню
const leftMenu = document.querySelector('.left-menu'),
   hamburger = document.querySelector('.hamburger');

// открытие-закрытие меню
hamburger.addEventListener('click', () => {
   leftMenu.classList.toggle('openMenu');
   hamburger.classList.toggle('open');
});

document.addEventListener('click', (event) => {
   const target = event.target;
   console.log(event);
   if (!target.closest('.left-menu')) {
      leftMenu.classList.remove('openMenu');
      hamburger.classList.remove('openMenu');
   }
});

leftMenu.addEventListener('click', (event) => {
   const target = event.target;
   const dropdown = target.closest('.dropdown');

   // открываем дропдаун в разделе "Рейтинг" и "Новые эпизоды"
   if (dropdown) {
      dropdown.classList.toggle('active');
      leftMenu.classList.add('openMenu');
      hamburger.classList.add('openMenu');
   }
});

// const filmPictures = () => {
//    const tvShows = document.querySelector('.tv-shows');
//    let newImage = '';

//    tvShows.addEventListener('mouseover', event => {
//       console.log(event);
//       if (event.target.matches('.tv-card__img')) {
//          newImage = event.target.getAttribute('src');
//          event.target.setAttribute('src', event.target.dataset.img);
//          console.log(event);
//       }
//    });

//    tvShows.addEventListener('mouseout', event => {
//       if (event.target.matches('.tv-card__img')) {
//          event.target.setAttribute('src', newImage);
//       }
//    });
// };
// filmPictures();