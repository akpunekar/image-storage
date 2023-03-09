const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");
const router = express.Router();

/* Creating a route for the registerUser function and the authUser function. */
router.post("/", registerUser);
router.post("/login", authUser);

module.exports = router;
