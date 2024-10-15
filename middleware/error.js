const error = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({ msg: err.message });
};

module.exports = error;
