module.exports = fn => {
  // Has to return an anonymous function for express to work with it
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
