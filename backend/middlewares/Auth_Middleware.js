const supervisorProtect = (req, res, next) => {
  const user_Id = req.signedCookies.user_Id;
  console.log("Supervisor ID from cookies:", user_Id);
  try {
    // checking user exists
    if (!user_Id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user_Id = user_Id;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { supervisorProtect };
