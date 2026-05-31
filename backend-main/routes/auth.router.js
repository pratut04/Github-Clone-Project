const express =
  require("express");

const {
  signup,
  login,
  toggleFollow
} = require("../controllers/authController");

const router =
  express.Router();

router.post(
  "/signup",
  signup
);

router.post(
  "/login",
  login
);

router.patch(
  "/follow/:id",
  toggleFollow
);

module.exports =
  router;