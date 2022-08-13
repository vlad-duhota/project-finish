'use strict';

const menuBtn = document.querySelector('.header__menu-btn');
const menu = document.querySelector('.header__menu');
const cloud = document.querySelector('.drop-zone__img');
const dropZoneInput = document.querySelector('.drop-zone__input');
const dropControlsBtn = document.querySelector('.drop-controls__btn');
const dropControlsSelectContainer = document.querySelector(
  '.drop-controls__select-container'
);
const convertedContainer = document.querySelector('.converted-container');
const dropControls = document.querySelector('.drop-controls');

NiceSelect.bind(document.getElementById('toInput'), { searchable: false });

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('header__menu-btn_active');
  menu.classList.toggle('header__menu_active');
});

document.querySelectorAll('.drop-zone__input').forEach((inputElement) => {
  const dropZoneElement = inputElement.closest('.drop-zone');

  dropZoneElement.addEventListener('click', (e) => {
    inputElement.click();
  });

  inputElement.addEventListener('change', (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZoneElement.classList.add('drop-zone--over');
  });

  ['dragleave', 'dragend'].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove('drop-zone--over');
    });
  });

  dropZoneElement.addEventListener('drop', (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove('drop-zone--over');
  });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector('.drop-zone__thumb');

  // First time - remove the prompt
  if (dropZoneElement.querySelector('.drop-zone__prompt')) {
    dropZoneElement.querySelector('.drop-zone__prompt').remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement('div');
    thumbnailElement.classList.add('drop-zone__thumb');
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }

  cloud.style.display = 'none';
  dropControlsBtn.style.display = 'flex';
  dropControlsSelectContainer.style.display = 'flex';
}

const form = document.querySelector('#form');
const toInput = document.querySelector('#toInput');
const input = document.querySelector('.drop-zone__input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const file = input.files[0];
  const format = file.type.slice(6);
  console.log(format);

  const formData = new FormData(e.target);
  dropControls.style.display = 'none';
  loader.style.display = 'block';

  axios(
    `https://v2.convertapi.com/convert/${format}/to/${toInput.value}?Token=D0gzvl0j`,
    {
      method: 'POST',
      data: formData,
    }
  ).then((data) => {
    const imgCode = data.data.Files[0].FileData;
    const img = document.querySelector('#img');
    const link = document.querySelector('#link');
    img.src = `data:image/${toInput.value};base64,` + imgCode;
    link.style.display = 'block';
    img.style.display = 'block';
    link.href = `data:image/${toInput.value};base64,` + imgCode;
    loader.style.display = 'none';
    convertedContainer.style.display = 'block';
  });
});
