import { React } from 'react';
import { FaFacebookF, FaInstagram, FaTwitch, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomeComponents = () => {

  return (
    <div>
    <div>
         <div className="hero relative">
        <Link to="/">
          <div className="para absolute m-32">
            <p className="explore font-bold text-2xl md:text-3xl lg:text-4xl">Let's Explore</p>
            <p className="explore text-red-700 font-bold text-xl md:text-2xl lg:text-3xl">DESIGNER</p>
            <p className="explore font-bold text-2xl md:text-3xl lg:text-4xl">CLOTHES</p>
            <button className="text-white m-3 bg-red-700 rounded-[9px] px-4 py-2 border border-solid border-pink-700 hover:bg-red-600">
              Shop Now
            </button>
          </div>
        </Link>
      </div >
     
       </div>

    </div>
  );
};


      
     


export default HomeComponents;