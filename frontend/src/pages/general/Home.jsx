import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Mock Data for the Feed (Hardcoded content - used as initial state)
const mockVideos = [
  {
    id: 1,
    videoUrl: 'https://ik.imagekit.io/johnran12/b0b228d6-3a27-400d-b539-7030f25119dc_bYOdRNhG8',
    storeName: 'The Spice House',
    description: 'The viral chicken tikka masala recipe that everyone is talking about! Order ingredients now for 1-day delivery.',
    userName: '@ChefUmer',
  },
  {
    id: 2,
    videoUrl: 'https://ik.imagekit.io/johnran12/b0b228d6-3a27-400d-b539-7030f25119dc_bYOdRNhG8',
    storeName: 'Sweet Tooth Bakery',
    description: 'These molten chocolate lava cakes are the ultimate comfort food. Click the button to get 50% off your first order!',
    userName: '@BakerAlex',
  },
  {
    id: 3,
    videoUrl: 'https://ik.imagekit.io/johnran12/b0b228d6-3a27-400d-b539-7030f25119dc_bYOdRNhG8',
    storeName: 'Quick Bites Diner',
    description: 'The easiest way to make gourmet burgers at home using our pre-made kits. Super fast and absolutely delicious!',
    userName: '@FoodieJane',
  },
];

const Home = () => {
  const navigate = useNavigate();
  // Using the videoRefs Map to store references to the actual <video> elements
  const videoRefs = useRef(new Map());
  // The state to hold the videos (initialized with mock data)
  const [videos, setVideos] = useState(mockVideos);

  // Function to set the video ref dynamically
  const setVideoRef = useCallback((id) => (element) => {
    if (element) {
      videoRefs.current.set(id, element);
    } else {
      videoRefs.current.delete(id);
    }
  }, []);

  // Handler for the "Visit Store" button
  const handleVisitStore = (storeName) => {
    console.log(`Navigating to store: ${storeName}`);
  };

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
    
    axios.get('http://localhost:3000/api/food')
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


  return (
    // 1. Main container: Full viewport height, vertical scrolling, and mandatory snapping
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      
      {/* Map over the state-managed videos */}
      {videos.map((video) => (
        // 2. Individual video slide: Full screen, relative position, and snaps to the top
        <div 
          key={video.id} 
          className="h-screen w-screen relative snap-start flex justify-center items-center bg-black"
        >
          
          {/* Video Element: Now using the setVideoRef function to link the DOM element to videoRefs Map */}
          <video 
            ref={setVideoRef(video.id)} // <--- CRITICAL: Sets the ref for the observer
            className="w-full h-full object-cover" 
            src={video.videoUrl} 
            loop 
            muted 
            // Removed autoPlay here. IntersectionObserver handles it.
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          
          {/* 3. Overlay Content Container */}
          <div className="absolute bottom-0 left-0 w-full p-4 z-10 text-white 
                       bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
            
            {/* User Name */}
            <h2 className="text-lg font-bold mb-1">
              {video.userName}
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
            <button 
                onClick={() => handleVisitStore(video.storeName)} 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 w-36 self-start"
            >
                Visit Store
            </button>
            
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