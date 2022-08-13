const list = document.querySelector('.contests__list');
const btn1 = document.querySelector('.contests__btn_1');
const btn2 = document.querySelector('.contests__btn_2');
const loader = document.querySelector('.contests__loader');
let itemsQuantity = 12;
let itemsStart = 0;
let data = [];

fetch('https://kontests.net/api/v1/all')
    .then(res => res.json())
    .then(res => {
        data = res;
        loader.style.display = 'none';
        renderItems();
        list.classList.add('contests__list_active');
    });

btn2.addEventListener('click', function () {
        itemsQuantity += 4;
        itemsStart += 4;
        renderItems();
});
btn1.addEventListener('click', function () {
    itemsQuantity -= 4;
    itemsStart -= 4;
    renderItems();
});

function renderItems() {
    if(itemsQuantity<data.length){
        btn2.style.display = 'block';
        btn1.style.display = 'block';
        list.innerHTML = '';
        for (let i = itemsStart; i < itemsQuantity; i++) {
            const { name, site, url, duration, end_time, start_time } = data[i];
            let durationText = 'duration / 3600';
            if(duration / 3600 < 24){
                durationText = Math.floor(duration / 3600) + ' години';
            } else{
                durationText = Math.floor(duration / 86400) + ' днів';
            }
            const start = new Date(start_time);
            let startMonths = 0;
            if(start.getMonth() < 10){
                startMonths = '0' + start.getMonth();
            } else{
                startMonths = start.getMonth();
            }
            let startDays = 0;
            if(start.getDay() < 10){
                startDays = '0' + start.getDay();
            } else{
                startDays = start.getDay();
            }
            let startMinutes = '';
            if(start.getMinutes>0){
                startMinutes = start.getMinutes;
            } else{
                startMinutes = '00';
            }
            const startDate = startDays + '.' + startMonths + '.' + start.getFullYear() + ' / ' + start.getHours() + ':' + startMinutes;
            const end = new Date(end_time);
            let endMonths = 0;
            if(end.getMonth() < 10){
                endMonths = '0' + end.getMonth();
            } else{
                endMonths = end.getMonth();
            }
            let endDays = 0;
            if(end.getDay() < 10){
                endDays = '0' + end.getDay();
            } else{
                endDays = end.getDay();
            }
            let endMinutes = '';
            if(end.getMinutes>0){
                endMinutes  = end.getMinutes;
            } else{
                endMinutes  = '00';
            }
            const endDate = endDays + '.' + endMonths + '.' + end.getFullYear() + ' / ' + end.getHours() + ':' + endMinutes;
            list.innerHTML += `<li class="contests__item"><h3 class="contests__item-title">${name}</h3><a href="${url}" class="contests__item-site">${site}</a><p class="contests__item-duration">${durationText}</p><div class="contests__item-time"><p class="contests__item-start">Початок - ${startDate}</p><p class="contests__item-end">Кінець - ${endDate}</p></div></li>`
        }
    } else{
        list.innerHTML = '';
        for (let i = itemsStart; i < data.length; i++) {
            const { name, site, url, duration, end_time, start_time } = data[i];
            let durationText = 'duration / 3600';
            if(duration / 3600 < 24){
                durationText = Math.floor(duration / 3600) + ' годин';
            } else{
                durationText = Math.floor(duration / 86400) + ' днів';
            }
            const start = new Date(start_time);
            let startMonths = 0;
            if(start.getMonth() < 10){
                startMonths = '0' + start.getMonth();
            } else{
                startMonths = start.getMonth();
            }
            let startDays = 0;
            if(start.getDay() < 10){
                startDays = '0' + start.getDay();
            } else{
                startDays = start.getDay();
            }
            let startMinutes = '';
            if(start.getMinutes>0){
                startMinutes = start.getMinutes;
            } else{
                startMinutes = '00';
            }
            const startDate = startDays + '.' + startMonths + '.' + start.getFullYear() + ' / ' + start.getHours() + ':' + startMinutes;
            const end = new Date(end_time);
            let endMonths = 0;
            if(end.getMonth() < 10){
                endMonths = '0' + end.getMonth();
            } else{
                endMonths = end.getMonth();
            }
            let endDays = 0;
            if(end.getDay() < 10){
                endDays = '0' + end.getDay();
            } else{
                endDays = end.getDay();
            }
            let endMinutes = '';
            if(end.getMinutes>0){
                endMinutes  = end.getMinutes;
            } else{
                endMinutes  = '00';
            }
            const endDate = endDays + '.' + endMonths + '.' + end.getFullYear() + ' / ' + end.getHours() + ':' + endMinutes;
            list.innerHTML += `<li class="contests__item"><h3 class="contests__item-title">${name}</h3><a href="${url}" class="contests__item-site">${site}</a><p class="contests__item-duration">${durationText}</p><div class="contests__item-time"><p class="contests__item-start">Початок - ${startDate}</p><p class="contests__item-end">Кінець - ${endDate}</p></div></li>`
        }
        btn2.style.display = 'none';
    }
    if(itemsStart===0){
        btn1.style.display = 'none';
    }
}