import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BottomNav from '../../components/BottomNav';

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/food/save', { withCredentials: true })
      .then(res => setSavedVideos(res.data.foodItems || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="p-4 border-b border-white/10 sticky top-0 bg-black z-10">
        <h1 className="text-xl font-bold text-center">Saved Videos</h1>
      </div>

      {/* Grid Layout: 3 columns */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {savedVideos.map((video) => (
          <div key={video._id} className="relative aspect-[9/16] bg-gray-900 overflow-hidden">
            <video 
              src={video.video} 
              className="w-full h-full object-cover"
              muted
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
            />
          </div>
        ))}
      </div>

      {savedVideos.length === 0 && (
        <div className="flex justify-center mt-20 text-gray-500">
          No saved items yet.
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Saved;