const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(viewsController.alerts);

router.get(
  '/',
  // bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);
router.get(
  '/tour/:slug',
  authController.isLoggedIn,
  authController.hasUserBookedTour,
  viewsController.getTour
);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.signUp);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.get('/my-reviews', authController.protect, viewsController.getMyReviews);
router.get(
  '/successful-booking',
  authController.protect,
  bookingController.createBookingCheckout,
  viewsController.successfulBooking
);

// Informational pages
router.get('/about', viewsController.about);
router.get('/contact', viewsController.contact);

module.exports = router;
