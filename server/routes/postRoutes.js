const express = require("express");
const router = express.Router();
// const postsController = require("../controllers/posts");
const authController = require('../controllers/auth') 
const { ensureAuth } = require("../middleware/auth");
// const multer = require("multer");
// const upload = multer({ dest: "public/uploads/" });
// const { storage } = require("../middleware/multer");

//Post Routes - simplified for now

// router.post("/createPost", upload.single("file"), postsController.createPost);

// router.put("/addArt/:id", upload.single("file"), postsController.addArt);

// router.put("/likePost/:id", postsController.likePost);

// router.put("/followArtist/:id", ensureAuth, postsController.followArtist);

// router.delete("/deletePost/:id", postsController.deletePost);

router.post('/signup', authController.postSignup)

module.exports = router;