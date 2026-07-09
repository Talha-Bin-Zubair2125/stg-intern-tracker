const protect = (req, res, next) => {
  const interneeId = req.signedCookies.interneeId;
    if (!interneeId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.interneeId = interneeId;
    next();
}
module.exports = { protect };