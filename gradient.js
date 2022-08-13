let url = "http://colormind.io/api/";
let data = {
    model: "default",
    input: [[100, 43, 44], "N", "N", "N"]
}

let http = new XMLHttpRequest();
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        palette = JSON.parse(http.responseText).result;
        checkPalette();
        status.textContent = 'Успіх!';
    }
}

// vars
let counter = 5;
const counterElem = document.querySelector('.hero__counter');
const btnDecrease = document.querySelector('.hero__counter-btn_1');
const counterCurrent = document.querySelector('.hero__counter-current');
const btnIncrease = document.querySelector('.hero__counter-btn_2');

let palette = {};

const gradientElem = document.querySelector('.hero__gradient');

const colorInput1 = document.querySelector('.hero__color-input_1');
const colorInput2 = document.querySelector('.hero__color-input_2');

const items = Array.from(document.querySelectorAll('.hero__colors-item'));
let canChangeCount = false;

const repeatBtn = document.querySelector('.hero__repeat-btn');

let colorsArray = [];
let visibleItems = Array.from(document.querySelectorAll('.hero__colors-item'));

const modeBtn1 = document.querySelector('.hero__modes-btn_1');
const modeBtn2 = document.querySelector('.hero__modes-btn_2');

const status = document.querySelector('.hero__status');

const btn = document.querySelector('.hero__open-btn');
const closeBtn = document.querySelector('.pop-up__close-btn');
const popUpElement = document.querySelector('.pop-up');
const popUpTextSpan = document.querySelector('.pop-up__text span');
const popUpColorsList = document.querySelector('.pop-up__colors-list');
const popUpColorsItems = Array.from(document.querySelectorAll('.pop-up__colors-item'));

btnIncrease.addEventListener('click', function () {
    if (canChangeCount) {
        btnDecrease.style.opacity = '1';
        if (!(counter > 4)) {
            counter++;
            const allButtonsNext = document.querySelectorAll('.hero__colors-item-btn_2');
            const allButtonsPrev = document.querySelectorAll('.hero__colors-item-btn_1');
            allButtonsNext.forEach(elem => {
                elem.style.display = 'block';
            });
            allButtonsPrev.forEach(elem => {
                elem.style.left = '0';
                elem.style.transform = 'translateX(0)';
            });
            loadCounter();
        }
    }
});

btnDecrease.addEventListener('click', function () {
    if (canChangeCount) {
        btnIncrease.style.opacity = '1';
        if (!(counter < 3)) {
            counter--;
            loadCounter();
        }
    }
});

function loadCounter() {
    if (counter < 3) {
        btnDecrease.style.opacity = '.35';
    }
    if (counter > 4) {
        btnIncrease.style.opacity = '.35';
    }
    counterCurrent.textContent = counter;
    checkPalette();
    visibleItems = [];
    items.forEach(elem => {
        if (elem.style.display != 'none') {
            visibleItems.push(elem);
        }
    });
    const nextBtn = visibleItems[visibleItems.length - 1].querySelector('.hero__colors-item-btn_2');
    const prevBtn = visibleItems[visibleItems.length - 1].querySelector('.hero__colors-item-btn_1');
    prevBtn.style.left = '50%';
    prevBtn.style.transform = 'translateX(-50%)';
    nextBtn.style.display = 'none';

}

const allButtons = document.querySelectorAll('.hero__colors-item-btn');

colorInput1.addEventListener('change', function () {
    data.input[0] = [hexToRgb(this.value).r, hexToRgb(this.value).g, hexToRgb(this.value).b];
    http.open("POST", url, true);
    http.send(JSON.stringify(data));
    status.textContent = 'Завантаження...';
    if (!canChangeCount) {
        canChangeCount = true;
        counterElem.style.opacity = '1';
    }
    allButtons.forEach(elem => {
        elem.style.opacity = '1';
    });
    if (repeatBtn.style.opacity != '1') {
        repeatBtn.style.opacity = '1';
    }
    if(btn.style.opacity != '1') {
        btn.style.opacity = '1';
        btn.removeAttribute('disabled');
    }
});
colorInput2.addEventListener('change', function () {
    data.input[1] = [hexToRgb(this.value).r, hexToRgb(this.value).g, hexToRgb(this.value).b];
    http.open("POST", url, true);
    http.send(JSON.stringify(data));
    status.textContent = 'Завантаження...';
    if (!canChangeCount) {
        canChangeCount = true;
        counterElem.style.opacity = '1';
    }
    allButtons.forEach(elem => {
        elem.style.opacity = '1';
    });
    if (repeatBtn.style.opacity != '1') {
        repeatBtn.style.opacity = '1';
    }
    if(btn.style.opacity != '1') {
        btn.style.opacity = '1';
        btn.removeAttribute('disabled');
    }
});

// repeat Btn
repeatBtn.addEventListener('click', function () {
    http.open("POST", url, true);
    http.send(JSON.stringify(data));    
    status.textContent = 'Завантаження...';
});

// modes
modeBtn1.addEventListener('click', function () {
    this.style.opacity = '1';
    modeBtn2.style.opacity = '.5';
    colorInput2.style.display = 'none';
});

modeBtn2.addEventListener('click', function () {
    this.style.opacity = '1';
    modeBtn1.style.opacity = '.5';
    colorInput2.style.display = 'block';
});


// change index
items.forEach(item => {
    const backBtn = item.querySelector('.hero__colors-item-btn_1');
    const forwardBtn = item.querySelector('.hero__colors-item-btn_2');
    const thisIndex = items.indexOf(item);

    backBtn.addEventListener('click', function () {
        const thisColor = item.style.background;
        const previousElem = items[thisIndex - 1];
        const previousElemColor = previousElem.style.background;
        item.style.background = previousElemColor;
        previousElem.style.background = thisColor;
        let gradient = 'linear-gradient(90deg';
        visibleItems.forEach(elem => {
            const color = elem.style.background;
            gradient += ',' + color;
        });
        gradient += ')';
        gradientElem.style.background = gradient;
    });

    forwardBtn.addEventListener('click', function () {
        const thisColor = item.style.background;
        const nextElem = items[thisIndex + 1];
        const nextElemColor = nextElem.style.background;
        item.style.background = nextElemColor;
        nextElem.style.background = thisColor;
        let gradient = 'linear-gradient(90deg';
        visibleItems.forEach(elem => {
            const color = elem.style.background;
            gradient += ',' + color;
        });
        gradient += ')';
        gradientElem.style.background = gradient;
    });

});

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }


function checkPalette() {
    let gradient = 'linear-gradient(90deg';
    items.forEach(elem => {
        elem.style.display = 'none';
    });
    for (let i = 0; i < counter; i++) {
        const color = Object.values(palette)[i];
        items[i].style.display = 'block';
        items[i].style.background = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
        colorsArray.push('rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
        gradient += ',' + 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    }
    gradient += ')';
    gradientElem.style.background = gradient;
}

// pop up
btn.addEventListener('click', () => {
    popUpElement.style.opacity = 1;
    popUpElement.classList.add('pop-up_active');
    popUpTextSpan.textContent = gradientElem.style.background;
    let colors = [];
    visibleItems.forEach(item => {
        colors.push(item.style.background);
    });
    popUpColorsList.innerHTML = '';
    visibleItems.forEach(elem => {
        const colorBlock = colors[visibleItems.indexOf(elem)];
        const colorCode = RGBToHex(colors[visibleItems.indexOf(elem)]);
        popUpColorsList.innerHTML += `<li class="pop-up__colors-item"><div class="pop-up__colors-item__color" style="background: ${colorBlock};"></div><p class="pop-up__colors-item__color-name">${colorCode}</p></li>`;
    });
});
closeBtn.addEventListener('click', () => {
    popUpElement.style.opacity = 0;
    setTimeout(() => {
        popUpElement.classList.remove('pop-up_active');
    }, 300);
});

// header
const menuBtn = document.querySelector('.header__menu-btn');
const menu = document.querySelector('.header__menu');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('header__menu-btn_active');
    menu.classList.toggle('header__menu_active');
});