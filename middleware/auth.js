const jwt = require("jsonwebtoken");

// eslint-disable-next-line consistent-return
module.exports = function (req, res, next) {
  const token = req.headers["auth-token"];

  if (!token) return res.status(401).json({ error: "Access Denied, No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("checkToken err", err);
    res.status(400).json({ error: "Invalid Token " });
  }
};
