const router = require("express").Router();
const auth = require("../../auth/token");
const multer = require('../../config/multer');

const {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost
} = require("./post.controller");

router.get("/", getPosts);
router.post("/", multer, createPost);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;