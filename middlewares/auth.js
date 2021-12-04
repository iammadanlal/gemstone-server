const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ err: true, msg: "A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.JWT_TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ err: true, msg: "Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;