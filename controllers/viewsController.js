const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. Get tour data from collection
  const tours = await Tour.find();

  // 2. Build template
  // 3. Render that template using tour data from step 1.
  res.status(200).render('overview', {
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1. Get the data, for requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2. Build the template
  // 3. Render the template using data from step 1.
  res.status(200).render('tour', {
    title: tour.name,
    userHasBooked: req.user.userHasBooked,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.signUp = (req, res) => {
  res.status(200).render('signup', {
    title: 'SignUp'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1. Find all bookings for user
  const bookings = await Booking.find({ user: req.user.id });

  const noToursContent = `You haven't booked any tours yet!`;

  // 2. Find tours with the returned Ids
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('account-bookings', {
    title: 'My Tours',
    noToursContent,
    tours
  });
});

// INFORMATIONAL PAGES
exports.about = (req, res) => {
  res.status(200).render('about', {
    title: 'About'
  });
};

exports.contact = (req, res) => {
  res.status(200).render('contact', {
    title: 'Contact'
  });
};

exports.getMyReviews = catchAsync(async (req, res, next) => {
  // 1. Find all reviews for user
  const reviews = await Review.find({ user: req.user.id }).populate({
    path: 'tour',
    select: 'name slug'
  });

  res.status(200).render('account-reviews', {
    title: 'My Reviews',
    reviews
  });
});
