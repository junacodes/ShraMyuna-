const express = require("express");
const { updateProfile, getProfile, deleteProfile, createProfile } = require("../Controller/profileController");
const{authMiddleware} = require("../middleware/authMiddleWares");

const { profileImage} = require("../middleware/uploadMiddleWare");

const router = express.Router();



router.post("/create", authMiddleware, profileImage.single('profilePic' ) , createProfile);
/**
 * @description To update user profiles
 * @api /api/profile/update
 * @access private
 * @type put
 * @return response
 */



// get profile
/**
 * @description To update user profiles
 * @api /api/profile/get
 * @access private
 * @type get
 * @return response
 */

router.get("/get", authMiddleware, getProfile)


router.put("/update", authMiddleware, profileImage.single('profilePic'), updateProfile)

module.exports = router;