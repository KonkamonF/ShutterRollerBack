const pageNotFound = (req, res, next) => {
  res.status(404).json({ msg: "PAGE NOT FOUND" });
};

module.exports = pageNotFound;
