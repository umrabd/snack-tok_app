import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import {IoHeart} from 'react-icons/io5';
import { IoHeartOutline } from "react-icons/io5";

// Mock Data for the Feed (Hardcoded content - used as initial state)


const Home = () => {
  const navigate = useNavigate();
  // Using the videoRefs Map to store references to the actual <video> elements
  const videoRefs = useRef(new Map());
  // The state to hold the videos (initialized with mock data)
  const [videos, setVideos] = useState([]);
  const [pausedVideos, setPausedVideos] = useState({});

  // Function to set the video ref dynamically
  const setVideoRef = useCallback((id) => (element) => {
    if (element) {
      videoRefs.current.set(id, element);
    } else {
      videoRefs.current.delete(id);
    }
  }, []);

  // const handleVideoClick = (id) => {
  //   const video = videoRefs.current.get(id);
  //   if (video) {
  //     if (video.paused) {
  //       video.play();
  //       setPausedVideos((prev) => ({ ...prev, [id]: false }));
  //     } else {
  //       video.pause();
  //       setPausedVideos((prev) => ({ ...prev, [id]: true }));
  //     }
  //   }
  // };


  

  // Hardcoded Logout handler
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('fullname');
    navigate('/user/login');
  };

  // 1. Fetch data on mount
  useEffect(() => {
    // Adding an AbortController for cleanup is a good practice with Axios
    const controller = new AbortController();
    
    axios.get('http://localhost:3000/api/food', {withCredentials: true})
      .then(response => {
        // Assuming your API response is reliable and has foodItems array
        if (response.data.foodItems) {
            setVideos(response.data.foodItems);
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          // Request was cancelled, ignore
          return;
        }
        
        console.error("Error fetching food items:", error);
        navigate("/user/login")
        
       
      });
    
    return () => {
        // Cleanup function for Axios: abort the request if the component unmounts
        controller.abort();
    };
  }, []); // Run only once on mount

  // 2. Intersection Observer Logic (The main fix)
  useEffect(() => {
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        
        if (!(video instanceof HTMLVideoElement)) return; 

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          // Play the current video if it's visible (50% or more)
          video.play().catch(error => {
            console.warn("Autoplay prevented:", error.message);
          });
        } else {
          // Pause when the video scrolls out of the threshold
          video.pause();
        }
      });
    }, { threshold: 0.5 });

    // Start observing ALL video elements currently registered in videoRefs
    // We wait until videos are loaded and rendered, then observe them.
    videoRefs.current.forEach(video => {
      observer.observe(video);
    });

    // Cleanup: Unobserve all elements and disconnect the observer when component unmounts
    return () => {
        observer.disconnect();
    };
    
  }, [videos]); // Re-run this effect whenever the 'videos' array changes (e.g., after API fetch)

  const speedTimerRef = useRef(null);
const isSpeeding = useRef(false);

const handlePointerDown = (e, id) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left; // Get click position relative to video
  const width = rect.width;

  // Check if click is on the Right Side (more than 50% width)
  if (x > width / 2) {
    isSpeeding.current = false; // Reset

    // Start timer: If held for 500ms, increase speed
    speedTimerRef.current = setTimeout(() => {
      const video = videoRefs.current.get(id);
      if (video) {
        video.playbackRate = 2.0; // Double speed
        isSpeeding.current = true;
        console.log("2x Speed Active");
      }
    }, 500); // 0.5 seconds is standard for speed-up
  }
};

const handlePointerUp = (id) => {
  // 1. Stop the timer
  if (speedTimerRef.current) clearTimeout(speedTimerRef.current);

  // 2. Reset video speed to normal
  const video = videoRefs.current.get(id);
  if (video && video.playbackRate !== 1.0) {
    video.playbackRate = 1.0;
  }
};

const handleVideoClick = (id) => {
  // If we were just speeding up, don't toggle play/pause
  if (isSpeeding.current) {
    isSpeeding.current = false;
    return;
  }

  // Normal Play/Pause Logic
  const video = videoRefs.current.get(id);
  if (video.paused) {
    video.play();
    setPausedVideos(prev => ({ ...prev, [id]: false }));
  } else {
    video.pause();
    setPausedVideos(prev => ({ ...prev, [id]: true }));
  }
};


  return (
    // 1. Main container: Full viewport height, vertical scrolling, and mandatory snapping
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      
      {/* Map over the state-managed videos */}
      {videos.map((video) => (
        // 2. Individual video slide: Full screen, relative position, and snaps to the top
        <div 
          key={video._id} 

          onPointerDown={(e) => handlePointerDown(e, video._id)}
  onPointerUp={() => handlePointerUp(video._id)}
  onPointerLeave={() => handlePointerUp(video._id)} // Reset if finger slides off
  
  onClick={() => handleVideoClick(video._id)}

          className="h-screen w-screen relative snap-start flex justify-center items-center bg-black"
        >
          
          {/* Video Element: Now using the setVideoRef function to link the DOM element to videoRefs Map */}
          <video 

            ref={setVideoRef(video._id)} 
            data-id={video._id}// <--- CRITICAL: Sets the ref for the observer
            className="w-full h-full object-cover" 
            src={video.video} 
           playsInline
            loop 

            muted 
            
          >
            Your browser does not support the video tag.
          </video>
          {pausedVideos[video._id] && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <FaPlay className="text-white text-6xl opacity-50" />
            </div>
          )}
<div className='absolute bottom-20 right-4 z-20 space-y-4 flex flex-col items-center'>

          <div >
            <IoHeartOutline className="text-white text-3xl" />
          </div>
          <div >
            <FaRegBookmark className="text-white text-2xl" />
          </div>
</div>

            
          
          
          {/* 3. Overlay Content Container */}
          <div className="absolute bottom-0 left-0 w-full p-4 z-10 text-white 
                       bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
            
            {/* User Name */}
            <h2 className="text-lg font-bold mb-1">
              {video.name}
            </h2>
            
            {/* Store Name */}
            <p className="text-sm font-semibold text-gray-200">
              {video.storeName}
            </p>
            
            {/* Truncated Description (Max 2 lines) */}
            <p className="text-white mt-1 mb-3 text-sm line-clamp-2">
              {video.description}
            </p>

            {/* "Visit Store" Button */}
            <Link 
               to = { "/food-partner/" +   video.foodPartner}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 w-30 flex items-center justify-center  self-start"
            >
                Visit Store
            </Link>
            
          </div>
        </div>
      ))}
      
      {/* Optional: Add a placeholder/loading state if videos array is empty */}
      {videos.length === 0 && (
          <div className="h-screen w-screen flex items-center justify-center text-white">
              Loading delicious snacks...
          </div>
      )}
    </div>
  );
};

export default Home;