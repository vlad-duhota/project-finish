const form = document.querySelector('#form');
const input = document.querySelector('#searchInput');
const heroList = document.querySelector('.hero__list');
const loader = document.querySelector('.loader');
const status = document.querySelector('.status');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchText = input.value;
    this.style.display = 'none';
    loader.style.display = 'block';
    status.textContent = '';
    fetch(`https://hn.algolia.com/api/v1/search?query=${searchText}`)
        .then(res => res.json())
        .then(data => {
            heroList.innerHTML = '';
            if(data.hits.length > 0){
            data.hits.forEach(elem => {
                const { author, url, title, created_at} = elem;
                const date = new Date(created_at);
                let months = 0;
                if(date.getMonth() < 10){
                    months = '0' + date.getMonth();
                } else{
                    months = date.getMonth();
                }
                const parsedDate = date.getDate() + '.' + months + '.' + date.getFullYear();
                heroList.innerHTML += ` 
                <li class="hero__item">
                    <a href="${url}" target="blank" class="hero__item-link">
                        <p class="hero__item-author">${author} - ${parsedDate}</p>
                        <h3 class="hero__item-title">${title}</h3>
                    </a>
                </li>
                `;
            });
        } else{
            status.textContent = 'Результатів не знайдено';
        }

        })
        .catch(e => {
            status.textContent = 'Помилка, перезавантжате сторінку і спробуйте ще раз';
        })
        .finally(() => {
            loader.style.display = 'none';
            heroList.classList.add('hero__list_active');
            this.style.display = 'flex';
        });
});

// header
const menuBtn = document.querySelector('.header__menu-btn');
const menu = document.querySelector('.header__menu');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('header__menu-btn_active');
    menu.classList.toggle('header__menu_active');
});
