const router = require("express").Router();
const { checkToken } = require("../../auth/token");
const multer = require('../../config/multer');

const {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost
} = require("./post.controller");

router.get("/", multer, getPosts);
router.post("/", multer, createPost);
router.get("/:id", checkToken, getPost);
router.patch("/:id", checkToken, multer, updatePost);
router.delete("/:id", checkToken, multer, deletePost);

module.exports = router;