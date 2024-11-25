const express = require("express");
const router = express.Router();
const {createCategory, getCategories, updateCategory} = require("../Controller/categoryController");
const { authMiddleware } = require("../middleware/authMiddleWares");
const { authorizeRole } = require("../middleware/authorizationMiddleWare");

router.post("/create", authMiddleware, authorizeRole("admin"), createCategory);
router.get("/get",  getCategories) 
/**
 * @description To update user category
 * @api /api/category/update
 * @access private
 * @type update
 * @return response
 */
router.put("/:id", updateCategory)


module.exports = router;