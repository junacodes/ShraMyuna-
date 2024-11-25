import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    productImage: null, // Initialize as null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      productImage: e.target.files[0], // Set the selected file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("price", formData.price);
    if (formData.productImage) {
      formPayload.append("productImage", formData.productImage);
    }
  
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axios.post(
        "http://localhost:8000/api/product",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include token here
          },
        }
      );
      console.log("Response received:", response.data);
      toast.success("Product added successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        toast.error(`Error: ${error.response.data.message || "Unknown error"}`);
      } else {
        console.error("Request Error:", error.message);
        toast.error("Failed to connect to the server.");
      }
    }
  };
  
  


  return (
    <div className="max-w-md mx-auto p-8 m-6 border border-gray-300 rounded shadow-lg">
      <h2 className="text-center font-bold">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ToastContainer />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            name="productImage"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductComponent;
