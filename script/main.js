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