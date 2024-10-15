const error = (err, req, res, next) => {
  console.log(err.message);
  res.status(err.statusCode || 500).json({ msg: err.message });
};

module.exports = error;
