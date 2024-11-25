import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponents";
import axios from "axios";
const domain = `http://localhost:8000`;

const ProductComponent = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${domain}/api/product`);
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {products.length === 0 ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <CardComponent key={products.id} product={products} />
        
      )}
    </>
  );
};

export default ProductComponent;