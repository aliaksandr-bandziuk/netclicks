const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const SERVER = 'https://api.themoviedb.org/3/'
const API_KEY = 24%5 + '1fd2e1946a566c33571f4490e0094312' + 24%5;

// Elements

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvShowsList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal'),
    tvShows = document.querySelector('.tv-shows'),
    tvCardImg = document.querySelector('.tv-card__img'),
    modalTitle = document.querySelector('.modal__title'),
    genresList= document.querySelector('.genres-list'),
    rating = document.querySelector('.rating'),
    description = document.querySelector('.description'),
    modalLink = document.querySelector('.modalLink');

const loading = document.createElement('div');
loading.className = 'loading';


class DBService {

    getData = async (url) => {
        const res = await fetch(url);

        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Не удалось получить данные по адресу ${url}`);
        }
    }

    getTestData = () => {
        return this.getData('test.json');
    }

    getTestCard = () => {
        return this.getData('card.json');
    }

    getSearchResult = (query) => {
        return this.getData(`${SERVER}search/tv?api_key=${API_KEY}$query=${query}&language=ru-RU`);
    }
}

const renderCard = (response) => {
    console.log(response.results);
    tvShowsList.textContent = '';

    response.results.forEach(item => {

        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote
        } = item;
        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        const backdropIMG = backdrop ? IMG_URL + backdrop : '';
        const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';
        const card = document.createElement('li');

        card.classList.add('tv-shows__item');
        card.innerHTML = `
        <a href="#" class="tv-card">
            ${voteElem}
            <img class="tv-card__img"
                src="${posterIMG}"
                data-backdrop="${backdropIMG}"
                alt="${title}">
            <h4 class="tv-card__head">${title}</h4>
        </a>
        `;
        loading.remove();
        tvShowsList.append(card);
    });
};

{
    tvShows.append(loading);
    new DBService().getTestData().then(renderCard);
}

// Open and close menu

hamburger.addEventListener('click', (event) => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', (event) => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');

    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

// Open modal window

tvShowsList.addEventListener('click', (event) => {
    event.preventDefault();

    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {

        new DBService().getTestCard()
            .then(response => {
                console.log(data);
                tvCardImg.src = 'IMG_URL + response.poster_path';
                modalTitle.textContent = response.name;
                // genresList.innerHTML = data.genres.reduce((acc, item) => {
                //     return `${acc}<li>${item.name}</li>`
                // }, '')
                genresList.textContent = '';
                // for (const item of data.genres) {
                //     genresList.innerHTML += `<li>${item.name}</li>`;
                // }
                data.genres.forEach(item => {
                    genresList.innerHTML += `<li>${item.name}</li>`;
                })
                rating
                description
                modalLink
            })
            .then(() => {
                document.body.style.overflow = "hidden";
                modal.classList.remove('hide');
            })
    }
});

// Close modal window

modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal') || event.target.closest('.cross')) {
        document.body.style.overflow = "";
        modal.classList.add('hide');
    }
});

// Changing cards images

const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    /* if (card) {
        const img = card.querySelector('.tv-card__img');
        const changeImg = img.dataset.backdrop;

        if (changeImage) {
            img.dataset.backdrop = img.src;
            img.src = changeImg;
        }
    }
    */

    // Метод деструктуризации

    if (card) {
        const img = card.querySelector('.tv-card__img');

        if (img.dataset.backdrop) {
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
    }
};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);