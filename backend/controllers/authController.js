const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
const authorController = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(req.body.password, salt);

      //create new user

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // generate access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "45s",
      }
    );
  },
  // generate refresh token
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_TOKEN,
      {
        expiresIn: "7d",
      }
    );
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("username not found");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("password incorrect");
      }

      if (validPassword && user) {
        const accessToken = authorController.generateAccessToken(user);
        const refreshToken = authorController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json("You re not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
      res.status(403).json("Refresh Token  is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (error, user) => {
      if (error) {
        console.log(error);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authorController.generateAccessToken(user);
      const newRefreshToken = authorController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.status(200).json({ accessToken: newAccessToken });
    });
  },
  logOutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Log out ");
  },
};

module.exports = authorController;
