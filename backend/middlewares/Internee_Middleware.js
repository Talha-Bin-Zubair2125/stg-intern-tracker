const interneeProtect = (req, res, next) => {
  const interneeId = req.signedCookies.interneeId;
  console.log("Internee ID from cookies:", interneeId);
  if (!interneeId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.interneeId = interneeId;
  next();
};
module.exports = { interneeProtect };
