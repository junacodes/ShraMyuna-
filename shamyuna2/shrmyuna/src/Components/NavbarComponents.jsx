import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import { CiLogout, CiMenuFries } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './Feature/auth/AuthSlice';
import { toggleNavbar } from './Feature/NavSlice'; // Import toggleNavbar action

import '../Components/nav.css';

const NavbarComponents = () => {
  
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const isOpen = useSelector((state) => state.navbar.isOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleToggleMenu = () => {
    dispatch(toggleNavbar()); // Dispatch the toggle action
  };

  return (
    <div>
      
    <nav className="bg-white p-5 shadow-md sticky top-0 w-[100%] shadow-pink-500">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="logo text-2xl font-bold flex items-center">
            Shra<h1 className="text-pink-700">MY</h1>una
          </span>
        </div>

        <div className="hidden md:flex gap-10 font-sans">
          <Link to="/" className="py-2 px-4 text-black font-semibold hover:text-pink-700 transition duration-300 rounded-md hover:bg-gray-100">Home</Link>
          <Link to="/contact" className="py-2 px-4 text-black font-semibold hover:text-pink-700 transition duration-300 rounded-md hover:bg-gray-100">Contact Us</Link>
          {authState.isAuthenticated ? (
            <>
            
              <Link to="/profile" className="py-4 px-2 text-gray-500 font-semibold hover:text-pink-700 transition duration-300">Profile</Link>
              <Link to="/gallery" className="py-2 px-4 text-black font-semibold hover:text-pink-700 transition duration-300 rounded-md hover:bg-gray-100">Gallery</Link>
              <Link to="/sale" className="py-2 px-4 text-black font-semibold hover:text-pink-700 transition duration-300 rounded-md hover:bg-gray-100">Sale</Link>
              <Link to="/product" className="py-4 px-2 text-gray-500 font-semibold hover:text-pink-700 transition duration-300">Product</Link>
              {authState.userRole === "admin" && (
                <Link to="/addproduct" className="py-4 px-2 text-gray-500 font-semibold hover:text-pink-700 transition duration-300">Add Product</Link>
              )}
      <button onClick={handleLogout} className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">Log Out</button>
            </>
          ) : null}
          
        </div>

        <div className="flex justify-center gap-8 m-3">
          <Link to="/login" className="text-xl hover:text-pink-700 transition duration-300"><FaRegUser /></Link>
          <Link to="/" className="text-xl hover:text-pink-700 transition duration-300"><IoSearch /></Link>
          <Link to="/cart" className="text-xl hover:text-pink-700 transition duration-300"><IoCartOutline /></Link>
          <Link to="/logout" className="text-xl hover:text-pink-700 transition duration-300"><CiLogout /></Link>
        </div>

        <div className="md:hidden">
          <button onClick={handleToggleMenu} className="text-black focus:outline-none">
            <CiMenuFries className="text-2xl" />
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white border-t border-gray-300`}>
        <ul>
          <li><Link to="/" className="block text-sm px-4 py-2 text-black hover:bg-blue-500 transition duration-300">Home</Link></li>
          <li><Link to="/sale" className="block text-sm px-4 py-2 text-black hover:bg-blue-500 transition duration-300">Sale</Link></li>
          <li><Link to="/gallery" className="block text-sm px-4 py-2 text-black hover:bg-blue-500 transition duration-300">Gallery</Link></li>
          <li><Link to="/contact" className="block text-sm px-4 py-2 text-black hover:bg-blue-500 transition duration-300">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default NavbarComponents;
