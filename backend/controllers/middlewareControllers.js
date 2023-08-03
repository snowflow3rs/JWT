const jwt = require("jsonwebtoken");
const middleControllers = {
  verfiyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (err) {
          return res.status(403).json("Token is invalid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated");
    }
  },
  verfiyTokenAndAdminAuth: (req, res, next) => {
    middleControllers.verfiyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("You are not allowed");
      }
    });
  },
};

module.exports = middleControllers;
