import React from 'react';
import img1 from "../image/img.jpg";
import img2 from "../image/img2.jpg";
import img3 from "../image/im3.jpg";
import img4 from "../image/img4.jpg";
import img5 from "../image/im5.jpg";
import img6 from "../image/img6.jpg";
import img7 from "../image/img7.jpg";
import im8 from "../image/im8.jpg";
import img9 from "../image/img9.webp";
import img10 from "../image/img10.jpg";
import "./gallery.css";

const GalleryComponents = () => {
  const data = [
    { id: 1, imgSrc: img1 },
    { id: 2, imgSrc: img2 },
    { id: 3, imgSrc: img3 },
    { id: 4, imgSrc: img4 },
    { id: 5, imgSrc: img5 },
    { id: 6, imgSrc: img6 },
    { id: 7, imgSrc: img7 },
    { id: 8, imgSrc: im8 },
    { id: 9, imgSrc: img9 },
    { id: 10, imgSrc: img10 },
  ];

  return (
    <div className="p-2 m-1 bg-gray-50">
      <h1 className="text-center m-3 text-2xl font-bold flex justify-center items-center">
        Shra<span className="text-pink-700">MY</span>una Gallery
      </h1>
      
      <div className="gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="max-w-sm h-full  rounded-3xl  shadow-lg   hover:shadow-2xl"
          >
            <img src={item.imgSrc} alt={`Gallery Image ${item.id}`} className="w-full h-full rounded-2xl object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryComponents;