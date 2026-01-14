import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiHomeLine, RiHomeFill } from "react-icons/ri";
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

const BottomNav = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isSaved = location.pathname === '/saved';

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black h-16 border-t border-gray-800 z-50 flex justify-around items-center pb-2">
      <Link to="/" className="flex flex-col items-center justify-center w-full h-full">
        {isHome ? <RiHomeFill className="text-white text-2xl" /> : <RiHomeLine className="text-gray-400 text-2xl" />}
        <span className={`text-[10px] mt-1 ${isHome ? 'text-white' : 'text-gray-400'}`}>Home</span>
      </Link>
      
      <Link to="/saved" className="flex flex-col items-center justify-center w-full h-full">
        {isSaved ? <FaBookmark className="text-white text-2xl" /> : <FaRegBookmark className="text-gray-400 text-2xl" />}
        <span className={`text-[10px] mt-1 ${isSaved ? 'text-white' : 'text-gray-400'}`}>Saved</span>
      </Link>
    </div>
  );
};

export default BottomNav;