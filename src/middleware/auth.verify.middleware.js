const jwt = require('jsonwebtoken');
const JWT_SECRET = "SecretKey123456789";

module.exports = (req, res, next) => {
  const token = req.headers['token'];
  if (!token) return res.status(401).json({ status: "fail", message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ status: "unauthorized" });

    req.user = { email: decoded.data };
    next();
  });
};
