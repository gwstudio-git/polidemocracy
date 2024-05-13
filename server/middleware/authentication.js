const jwt = require("jsonwebtoken")


const verifyToken = async (req, res, next) => {
  const token = req.cookies.polidemo;
  // console.log("Token from cookies:", token);
  if (!token) {
    return res.status(401).json({ error: "unauth: No token exists" });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRETKEY);
    console.log("Decoded token:", decode);
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.log("Token verification error:", error);
    return res.status(401).json({ error: "unauth: Invalid token" });
  }
};


module.exports = verifyToken;