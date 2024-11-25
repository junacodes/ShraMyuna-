import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiStar } from "react-icons/ci";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../Feature/CheckoutSlice";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import SideBar from "./SideBar";

const CardComponent = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function

  const domain = `http://localhost:8000`;

  const imgAddress = (item) => {
    return item.productImage ? `${domain}/${item.productImage}` : item.imgUrl;
  }; 
 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${domain}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewText) {
      try {
        const response = await axios.post(`${domain}/reviews`, {
          review: reviewText,
        });
        setReviews([...reviews, response.data]);
        setReviewText("");
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  // Handle Add to Cart and navigate to cart
  const handleAddToCart = (item) => {
    dispatch(addItem(item)); // Add item to cart
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <div className="flex">
   <SideBar />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      {product.map((item) => (
        <div
          key={item.id}
          className="w-full h-[50vh] sm:h-[70vh] lg:h-[100vh] overflow-hidden shadow-lg rounded-lg"
        >
          <img
            src={imgAddress(item)}
            alt={item.alt || "Product Image"}
            className="w-full h-[60%] object-cover rounded-t-lg"
          />
          <div className="px-4 py-2 text-center">
            <h1 className="font-bold text-lg sm:text-xl lg:text-2xl">{item.name}</h1>
            <p className="m-2 text-sm sm:text-base">Rs. {item.price}</p>
          </div>
          <div className="flex justify-center mt-4">
          <button
  onClick={() => handleAddToCart(item)}
  className="bg-amber-700 hover:bg-amber-600 text-white text-sm rounded w-[100%] h-[100%] sm:w-auto p-4 m-4"
>
  Add to Cart
</button>
          </div>
        </div>
      ))}
    </div>
  
    <div className="flex flex-col items-center p-6 sm:p-8 lg:p-12">
      <h2 className="font-bold text-lg sm:text-xl lg:text-2xl mb-4">
        Customer Reviews
      </h2>
      <form onSubmit={handleReviewSubmit} className="w-full max-w-md mb-6">
        <div className="flex justify-center items-center mb-4">
          <CiStar className="text-pink-600 text-2xl" />
          <CiStar className="text-pink-600 text-2xl" />
          <CiStar className="text-pink-600 text-2xl" />
          <CiStar className="text-pink-600 text-2xl" />
        </div>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Write your review here..."
        />
        <button type="submit" className="bg-amber-800 hover:bg-amber-700 text-white w-full p-2 rounded">
          Submit Review
        </button>
      </form>
  
      <div className="w-full max-w-md">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b p-3 mb-2">
              <p>{review}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  </div>
  </div>
  );
};

export default CardComponent;
