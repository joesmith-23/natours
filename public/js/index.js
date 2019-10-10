/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { signup } from './signup';
import { reviewSubmit } from './reviewSubmit';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');
const signupForm = document.querySelector('.signup-info');
const reviewForm = document.getElementById('review-form');
const ratings = document.querySelector('.ratings');
const rating1 = document.getElementById('label-1');
const rating2 = document.getElementById('label-2');
const rating3 = document.getElementById('label-3');
const rating4 = document.getElementById('label-4');
const rating5 = document.getElementById('label-5');
const radio1 = document.getElementById('rating-1');
const radio2 = document.getElementById('rating-2');
const radio3 = document.getElementById('rating-3');
const radio4 = document.getElementById('rating-4');
const radio5 = document.getElementById('rating-5');
const easyBtn = document.getElementById('easy');
const mediumBtn = document.getElementById('medium');
const difficultBtn = document.getElementById('difficult');
const lowPrice = document.getElementById('lowPrice');
const medPrice = document.getElementById('medPrice');
const highPrice = document.getElementById('highPrice');
const shortDur = document.getElementById('shortDur');
const medDur = document.getElementById('medDur');
const longDur = document.getElementById('longDur');

if (shortDur) {
  shortDur.addEventListener('click', () => {
    shortDur.setAttribute('href', '/?duration[lt]=5');
  });
}

if (medDur) {
  medDur.addEventListener('click', () => {
    medDur.setAttribute('href', '/?duration[gte]=5&duration[lt]=10');
  });
}

if (longDur) {
  longDur.addEventListener('click', () => {
    longDur.setAttribute('href', '/?duration[gte]=10');
  });
}

if (lowPrice) {
  lowPrice.addEventListener('click', () => {
    lowPrice.setAttribute('href', '/?price[lt]=500');
  });
}

if (medPrice) {
  medPrice.addEventListener('click', () => {
    medPrice.setAttribute('href', '/?price[gte]=500&price[lt]=1500');
  });
}

if (highPrice) {
  highPrice.addEventListener('click', () => {
    highPrice.setAttribute('href', '/?price[gte]=1500');
  });
}

if (easyBtn) {
  easyBtn.addEventListener('click', () => {
    easyBtn.setAttribute('href', '/?difficulty=easy');
  });
}

if (mediumBtn) {
  mediumBtn.addEventListener('click', () => {
    mediumBtn.setAttribute('href', '/?difficulty=medium');
  });
}

if (difficultBtn) {
  difficultBtn.addEventListener('click', () => {
    difficultBtn.setAttribute('href', '/?difficulty=difficult');
  });
}

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);

    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

// Very rough
function handleCheck(e) {
  if (e.target.id == 'label-1') {
    rating1.classList.add('reviews__star--active');
    rating2.classList.remove('reviews__star--active');
    rating3.classList.remove('reviews__star--active');
    rating4.classList.remove('reviews__star--active');
    rating5.classList.remove('reviews__star--active');
  }
  if (e.target.id == 'label-2') {
    rating1.classList.add('reviews__star--active');
    rating2.classList.add('reviews__star--active');
    rating3.classList.remove('reviews__star--active');
    rating4.classList.remove('reviews__star--active');
    rating5.classList.remove('reviews__star--active');
  }
  if (e.target.id == 'label-3') {
    rating1.classList.add('reviews__star--active');
    rating2.classList.add('reviews__star--active');
    rating3.classList.add('reviews__star--active');
    rating4.classList.remove('reviews__star--active');
    rating5.classList.remove('reviews__star--active');
  }
  if (e.target.id == 'label-4') {
    rating1.classList.add('reviews__star--active');
    rating2.classList.add('reviews__star--active');
    rating3.classList.add('reviews__star--active');
    rating4.classList.add('reviews__star--active');
    rating5.classList.remove('reviews__star--active');
  }
  if (e.target.id == 'label-5') {
    rating1.classList.add('reviews__star--active');
    rating2.classList.add('reviews__star--active');
    rating3.classList.add('reviews__star--active');
    rating4.classList.add('reviews__star--active');
    rating5.classList.add('reviews__star--active');
  }
}

if (ratings) {
  // The radio buttons don't seem to have the 'checked' property - refactor this into CSS somehow
  if (radio1.checked) {
    rating1.classList.add('reviews__star--active');
    rating2.classList.remove('reviews__star--active');
    rating3.classList.remove('reviews__star--active');
    rating4.classList.remove('reviews__star--active');
    rating5.classList.remove('reviews__star--active');
  } else if (radio2.checked) {
    rating1.classList.add('reviews__star--active');
    rating2.classList.add('reviews__star--active');
    rating3.classList.remove('reviews__star--active');
    rating4.classList.remove('reviews__star--active');
    rating5.classList.remove('reviews__star--active');
  } else if (radio3.checked) {
    rating1.classList.add('reviews__star--active');
    rating2.classList.add('reviews__star--active');
    rating3.classList.add('reviews__star--active');
    rating4.classList.remove('reviews__star--active');
    rating5.classList.remove('reviews__star--active');
  } else if (radio4.checked) {
    rating1.classList.add('reviews__star--active');
    rating2.classList.add('reviews__star--active');
    rating3.classList.add('reviews__star--active');
    rating4.classList.add('reviews__star--active');
    rating5.classList.remove('reviews__star--active');
  } else if (radio5.checked) {
    rating1.classList.add('reviews__star--active');
    rating2.classList.add('reviews__star--active');
    rating3.classList.add('reviews__star--active');
    rating4.classList.add('reviews__star--active');
    rating5.classList.add('reviews__star--active');
  } else {
    ratings.addEventListener('mouseover', handleCheck);
  }
}

if (reviewForm) {
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    const rating = document.querySelector('input[type = radio]:checked').value;
    const { tourId } = document.getElementById('submitBtn').dataset;
    reviewSubmit(review, rating, tourId);
  });
}
