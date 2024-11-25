import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  applyDiscount, calculateTotal } from '../Feature/CheckoutSlice';
const ContactUsComponent = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const dispatch = useDispatch();
  const domain = `http://localhost:8000`;
  const imgAddress = (item) => {
    return item.productImage ? `${domain}/${item.productImage}` : item.imgUrl;
  };

  const { items, discount, shipping, total } = useSelector((state) => state.cart);
  
  const [discountCode, setDiscountCode] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  const handleDiscount = () => {
    const discountValue = parseFloat(discountCode);
    if (!isNaN(discountValue) && discountValue >= 0 && discountValue <= 100) {
      dispatch(applyDiscount(discountValue)); // Dispatch the action to apply discount
      alert(`Discount of ${discountValue}% applied!`); // Notify the user
      setDiscountCode(''); // Reset input field after apply
    } else {
      alert('Please enter a valid discount percentage (0-100).');
    }
  };
 

  const handleShipping = (e) => {
    const selectedShipping = e.target.value;
    let cost = 0;

    if (selectedShipping === 'standard') {
      cost = 5;
    } else if (selectedShipping === 'express') {
      cost = 20;
    }
  

    setShippingCost(cost);
    dispatch(setShippingCost(cost));
  };

  useEffect(() => {
    dispatch(calculateTotal()); // Recalculate total whenever items or shipping changes
  }, [items, discount, shipping, dispatch]);

  const [formData, setFormData] = useState({
    email: '',
    country: '',
    state: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  // Fetch countries from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/countries');
        setCountries(response.data); // Assume response is an array of countries
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (formData.country) {
      const fetchStates = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/states/${formData.country}`);
          setStates(response.data); // Set states based on selected country
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      };
      fetchStates();
    } else {
      setStates([]);
    }
  }, [formData.country]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8000/api/contact', formData);
      if (response.status === 200) {
        alert('Form submitted successfully!');
        // Reset form data
        setFormData({
          email: '',
          country: '',
          state: '',
          firstName: '',
          lastName: '',
          phone: '',
          address: '',
          city: '',
          pincode: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBuy = () => {
    alert('Thank you for your purchase! Your order is being processed.');
};

  return (
  <div className='flex'>
  <div className="items-center mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-2xl w-full max-w-4xl rounded-lg m-2">
    <div className="flex justify-between">
      <h2 className="text-lg sm:text-xl font-semibold">Contact</h2>
      <Link to="/login">
        <h2 className="text-lg sm:text-xl font-semibold">Login</h2>
      </Link>
    </div>

    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mt-1 block w-full p-3 border border-solid border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <label className="flex items-center mt-2">
          <input type="checkbox" className="mr-2" />
          Email me with news and offers
        </label>
      </div>

      <div>
        <h2 className="block text-2xl font-medium text-gray-700 mt-4">Delivery</h2>
        <select
          name="country"
          required
          value={formData.country}
          onChange={handleChange}
          className="mt-1 p-3 block w-full border border-solid border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="" disabled>Select your country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="mt-1 p-3 block w-full border border-solid border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="mt-1 p-3 block w-full border border-solid border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="mt-1 block p-3 w-full border border-solid border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <textarea
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="mt-1 p-3 block w-full border border-solid border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows="3"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="mt-1 p-3 block w-full border border-solid border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {formData.country && (
          <div>
            <select
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="mt-1 p-3 block w-full border border-solid border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="" disabled>Select your state</option>
              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <input
            type="text"
            name="pincode"
            required
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pin Code"
            className="mt-1 p-3 block w-full border border-solid border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <textarea
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="mt-1 p-3 block w-full border border-solid border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows="4"
        />
      </div>

      <div>
        <label className="flex items-center mt-2">
          <input type="checkbox" className="mr-2" />
          Save this information for next time
        </label>
        <label className="flex items-center mt-2">
          <input type="checkbox" className="mr-2" />
          Text me with news and offers
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  </div>
    <div className="w-full px-8 pt-6 pb-8 mb-4">
        {/* Item Details */}
        {items.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            <img  src={imgAddress(item)}
              alt={item.alt || "Product Image"} className="w-24 h-24 mr-4" />
            <div>
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
            </div>
            <p className="text-lg font-medium ml-auto">Rs. {item.price}</p>
          </div>
        ))}

        {/* Discount Code Input */}
        <div className="mb-4">
          <label htmlFor="discountCode" className="block text-sm font-medium text-gray-700">Discount Code or Gift Card</label>
          <input 
            type="text" 
            id="discountCode" 
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
          />
          <button onClick={handleDiscount} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Apply</button>
        </div>

        {/* Subtotal and Shipping */}
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Subtotal</p>
            <p className="text-lg font-medium">Rs. {items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Shipping</p>
            <select onChange={handleShipping} className="rounded bg-white border border-gray-300">
              <option value="">Select Shipping</option>
              <option value="standard">Standard - Rs. 5</option>
              <option value="express">Express - Rs. 20</option>
            </select>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between">
          <p className="text-lg font-medium">Total</p>
          <p className="text-lg font-bold">Rs. {total.toFixed(2)}</p>
        </div>
          {/* Buy/Pay Button */}
          <button
                    onClick={handleBuy}
                    className="mt-4 w-full py-2 px-4 bg-amber-700 text-white rounded-md hover:bg-amber-600"
                >
                    Buy / Pay
                </button>
      </div>
    </div>
    
 

  );
};

export default ContactUsComponent;