import axios from "axios";
import React, { useEffect, useState } from "react";

const SideBar = () => {
  const [categories, setCategories] = useState([]); // Store categories
  const [error, setError] = useState(null); // Error state
  const domain = `http://localhost:8000`; // Backend API domain

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${domain}/api/category/get`);
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

 
  return (
    <div className="w-64 bg-white text-black shadow-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Categories</h2>

    
      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Render Categories */}
      <ul>
        {categories.length > 0 ? (
          categories.map((Category) => (
            <li
              key={Category.id}
              className="mb-2 hover:bg-gray-300 p-2 rounded cursor-pointer"
            >
              {Category.name}
            </li>
          ))
        ) : (
          <p className="text-gray-400">Loading categories...</p>
        )}
      </ul>
</div>
  );
};

export default SideBar;