const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

// Initialize Express app
const app = express();
dotenv.config();

// Set the port from environment or default to 8000
const port = process.env.PORT || 8000;

// Database connection (ensure you have the correct setup)
const connectDB = require("./src/config/config");
connectDB(); // Connect to the database

// Middleware setup


// Enable CORS for cross-origin requests
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(bodyParser.json()); // Parse JSON payloads
app.use('/uploads', express.static(__dirname + '/uploads')); // Serve static files from the 'uploads' folder

// Route imports
const userRoute = require("./src/Routes/userRoutes");
const profileRoute = require("./src/Routes/profileRoutes");
const categoryRoute = require("./src/Routes/categoryRoutes");
const productRoute = require("./src/Routes/productRoutes");
const contactRoute = require("./src/Routes/contactUsRoutes")
const countryRoutes = require('./src/Routes/countryRoutes');
const forgetpassRoute = require('./src/Routes/forgetPassRoutes')
// const applyDiscountRoutes = require("./src/Routes/discountRoutes")
// Route handling
app.use('/api/user', userRoute); // User-related routes
app.use('/api/profile', profileRoute); // Profile-related routes
app.use('/api/category', categoryRoute); // Category-related routes
app.use('/api/product', productRoute); // Product-related routes
app.use('/api', contactRoute)
app.use('/api', countryRoutes);
app.use('/api/auth', forgetpassRoute);
// app.use('/api/discount', applyDiscountRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});