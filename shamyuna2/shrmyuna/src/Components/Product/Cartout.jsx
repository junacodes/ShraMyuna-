import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../Feature/CheckoutSlice';
import { useNavigate } from 'react-router-dom';

const domain = `http://localhost:8000`;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add some items to proceed to checkout.");
      return;
    }
    navigate("/contact");
  
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const imgAddress = (item) => {
    return item.productImage
      ? `${domain}/${item.productImage}`
      : item.imgUrl 
  };

  return (
    <div className="container bg-gray-50 rounded-2xl shadow-2xl mx-auto px-4 py-8 m-3">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => navigate("/sale")}
          >
           sale
          </button>
        </div>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex flex-col md:flex-row items-center mb-6">
                <div className="w-full md:w-1/4">
                  <img
                    src={imgAddress(item)}
                    alt={item.alt || "Product Image"}
                    className="w-full rounded-md"
                  />
                </div>
                <div className="w-full md:w-3/4 pl-0 md:pl-4 mt-4 md:mt-0">
                  <h2 className="text-lg md:text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600 text-sm md:text-base">Size: {item.size}</p>

                  <div className="flex items-center mt-2">
                    <button
                      className={`${
                        item.quantity === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      } font-bold py-1 px-3 md:py-2 md:px-4 rounded mr-2`}
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="text-gray-700 font-bold mr-2">{item.quantity}</span>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 md:py-2 md:px-4 rounded"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p className="text-gray-700 font-bold mt-2">Rs. {item.price}</p>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8">
            <p className="text-gray-700 font-bold mb-4 md:mb-0">Subtotal: Rs. {subtotal}</p>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;