const router = require("express").Router();
const { checkToken } = require("../../auth/token");
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
router.post("/signup", createUser);
router.get("/:id", getUserByUserId);
router.post("/login", login);
router.get('/profile/:id', getProfile)
router.patch("/profile/:id", updateUsers);
router.delete("/:id", deleteUser);

module.exports = router;