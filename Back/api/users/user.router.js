const router = require("express").Router();
const limit = require('../../middleware/rateLimit');

const {
    createUser,
    login,
    getUserByUserId,
    getUsers,
    updateUsers,
    deleteUser,
    getProfile
} = require("./user.controller");


router.get("/", getUsers);
router.post("/signup", limit, createUser);
router.get("/:id", getUserByUserId);
router.post("/login", limit, login);
router.get('/profile/:id', getProfile)
router.patch("/profile/:id", updateUsers);
router.delete("/profile/:id", deleteUser);

module.exports = router;