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
router.get("/:id", multer, getPost);
router.patch("/:id", multer, updatePost);
router.delete("/:id", multer, deletePost);

module.exports = router;