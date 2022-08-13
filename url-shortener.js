'use strict';

const userUrl = document.querySelector('#url-field');
const urlFormId = document.querySelector('#url-form-id');

const urlShortenerContainer = document.querySelector(
  '.url-shortener__container'
);
const urlShortenedContainer = document.querySelector(
  '.url-shortened__container'
);

const urlShortenedInput = document.querySelector('.url-shortened__form-field');

urlFormId.addEventListener('submit', (e) => {
  e.preventDefault();

  urlShortenerContainer.style.display = 'none';

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      apikey: 'f65bc4687bf1469b81cf2f5b9ab287ac',
    },
    body: `{"destination":"${userUrl.value}","domain":{ "fullName": "rebrand.ly"}}`,
  };

  fetch('https://api.rebrandly.com/v1/links', options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      urlShortenedContainer.style.display = 'block';
      urlShortenedInput.value = data.shortUrl;
    })
    .catch((err) => console.error(err));
});

// copy

const copyBtn = document.querySelector('#url-btn');
const copyAlert = document.querySelector('.copy-alert');

copyBtn.addEventListener('click', () => {
  urlShortenedInput.select();
  document.execCommand('copy');
  copyAlert.classList.add('active');
  setTimeout(() => {
    copyAlert.classList.remove('active');
  }, 2000);
});
