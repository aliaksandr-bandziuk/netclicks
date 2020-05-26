'use strict';

const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = '1fd2e1946a566c33571f4490e0094312';

// меню
const leftMenu = document.querySelector('.left-menu'),
   hamburger = document.querySelector('.hamburger'),
   tvShowList = document.querySelector('.tv-shows__list'),
   modal = document.querySelector('.modal');

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
      hamburger.classList.remove('open');
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

//открытие модального окна
tvShowList.addEventListener('click', event => {
   event.preventDefault();
   const target = event.target,
      card = target.closest('.tv-card');

   if (card) {
      document.body.style.overflow = 'hidden';
      modal.classList.remove('hide');
   }
});

// закрытие модального окна
modal.addEventListener('click', event => {
   
   if (event.target.closest('.cross') || 
       event.target.classList.contains('modal')) {
      document.body.style.overflow = '';
      modal.classList.add('hide');
   }
});

// меняем картинку при наведении
const changeImage = event => {
   const card = event.target.closest('.tv-shows__item');

   if (card) {
      const img = card.querySelector('.tv-card__img');
      
      if (img.dataset.backdrop) {
         [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]
      }
   }
};
tvShowList.addEventListener('mouseover', changeImage);
tvShowList.addEventListener('mouseout', changeImage);

// другой вариант смены картинки
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


const DBService = class {
   getData = async (url) => {
      const res = await fetch(url);
      if (res.ok) {
         return res.json();
      } else {
         throw new Error(`Не удалось получить данные по адресу ${url}`)
      }
   }

   getTestData = () => {
      return this.getData('test.json');
   }
};

const renderCard = response => {
   console.log(response);
   tvShowList.textContent = '';

   response.results.forEach(item => {

      cosnt {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote
         } = item;

      const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
      const backdropIMG = ''; //
      const voteElement = '';

      const card = document.createElement('li');
      card.className ='tv-shows__item';
      card.innerHTML = `
            <a href="#" class="tv-card">
                  <span class="tv-card__vote">${vote}</span>
                  <img class="tv-card__img"
                     src="${posterIMG}"
                     data-backdrop="${IMG_URL + poster}"
                     alt="${title}">
                  <h4 class="tv-card__head">${title}</h4>
            </a>
      `;
      tvShowList.append(card);
   });
}

new DBService().getTestData().then(renderCard);