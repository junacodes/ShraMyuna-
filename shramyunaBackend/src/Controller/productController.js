const Product  = require("../Models/productModels")
// controller to create a new product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      productImage,
      price,
      
    } = req.body;
    // console.log(req.body);
    // if (!name || !category) {
    //   return res
    //     .status(400)
    //     .json({ message: "Name and category are required" });
    // }

    // const categoryExists = await Category.findById(category);
    // if (!categoryExists) {
    //   return res.status(400).json({ message: "Category does not exist" });
    // }
    const productData = {
      name,
      price,
      
    };
    if (req.file) {
      productData.productImage = `uploads/products/${req.file.filename}`;
    } 
    const newProduct = new Product({
      ...productData,
    });
    
    const productResponse = await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product created", product: productResponse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


// controller for searching products
// Search and sort products (Public)
const searchProducts = async (req, res) => {
  const { search, sort } = req.query;
  let query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  let products = await Product.find(query);

  if (sort) {
    const sortOrder = sort === "asc" ? 1 : -1;
    products = products.sort((a, b) => (a.price - b.price) * sortOrder);
  }

  res.status(200).json({ msg: "Products found", products });
};

//   controller to get all products

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({ message: "Products found", products });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}


  const updateProduct = async (req, res) => {
    try {
        // Extract product ID from the request parameters
        const productId = req.params.id;

        // Extract the data to update from the request body
        const { name, category, price, description, productImage } = req.body;

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, category, price, description, productImage},
            { new: true, runValidators: true } // Options: return the updated document & run validation
        );

        // If no product is found, return a 404 response
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Respond with the updated product
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        // Handle errors and send a response
        console.error(error);
        res.status(500).json({ message: 'Server error, could not update product', error: error.message })
      }
    };

module.exports = { createProduct, searchProducts, getProducts,updateProduct };