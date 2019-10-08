const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  // Allows nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = (req, res, next) => {
  if (req.user.userHasBooked === true) {
    factory.createOne(Review);
  } else
    return next(
      new AppError(
        'You need to have bought and been on the tour to review it',
        401
      )
    );
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
