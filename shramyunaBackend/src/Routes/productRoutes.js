const express = require("express");
const route = express.Router();
const {
  createProduct,
  searchProducts,
  getProducts,
  updateProduct,
} = require("../Controller/productController");
const {authMiddleware} = require("../middleware/authMiddleWares")
const { authorizeRole } = require("../middleware/authorizationMiddleWare");
const { productImage } = require("../middleware/uploadMiddleWare")

/**
 * description: to create a new product
 * method: POST
 * route: /api/products/create
 * access: private
 * return: response message and the created product
 */

route.post("/", authMiddleware,
   authorizeRole("admin"),
   productImage.single('productImage'), createProduct);

/**
 * description: to get all products
 * method: GET
 * route: /api/products
 * access: public
 * return: response message and the found products
 */





route.get("/", searchProducts);

route.put("/:id" , authMiddleware, updateProduct,   productImage.single('productImage'),)
/**
 * description: to search products
 * method: GET
 * route: /api/products/search
 * access: public
 * return: response message and the found products
 */

route.get("/search", searchProducts);

// to get all products

route.get("/getallproducts",  updateProduct, getProducts);

module.exports = route;