import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaRegBookmark, FaBookmark, FaRegComment } from 'react-icons/fa';
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import BottomNav from '../../components/BottomNav';
const Home = () => {
  const navigate = useNavigate();
  const videoRefs = useRef(new Map());
  const [videos, setVideos] = useState([]);
  const [pausedVideos, setPausedVideos] = useState({});

  const setVideoRef = useCallback((id) => (element) => {
    if (element) videoRefs.current.set(id, element);
    else videoRefs.current.delete(id);
  }, []);

  // Fetch Logic (Kept exactly as yours)
  useEffect(() => {
    const controller = new AbortController();
    axios.get('http://localhost:3000/api/food', { withCredentials: true })
      .then(response => {
        console.log('GET /api/food response:', response.data); // <-- log payload
        if (response.data.foodItems) setVideos(response.data.foodItems);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        if (!axios.isCancel(error)) navigate('/user/login');
      });
    return () => controller.abort();
  }, [navigate]);

  // Observer Logic (improved: guard play/pause, wait for metadata, ignore AbortError)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (!(video instanceof HTMLVideoElement)) return;

        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        const hasSrc = !!(video.currentSrc || video.src || video.querySelector('source')?.src);

        if (!hasSrc) {
          // nothing to do if no source
          video.pause();
          setPausedVideos(prev => ({ ...prev, [video.dataset.id]: true }));
          return;
        }

        if (isVisible) {
          // only attempt play if currently paused
          if (video.paused) {
            const p = video.play();
            if (p && typeof p.catch === 'function') {
              p.catch(err => {
                // ignore AbortError caused by an immediate pause; log others
                if (err && err.name === 'AbortError') return;
                console.warn('Video play() failed:', err);
              });
            }
            setPausedVideos(prev => ({ ...prev, [video.dataset.id]: false }));
          }
        } else {
          // only pause if it's currently playing
          if (!video.paused) {
            try { video.pause(); } catch (_) {}
            setPausedVideos(prev => ({ ...prev, [video.dataset.id]: true }));
          }
        }
      });
    }, { threshold: 0.5 });

    // observe only videos that have a src and are in the DOM
    videoRefs.current.forEach((v) => {
      if (!(v instanceof HTMLVideoElement)) return;
      const src = v.currentSrc || v.src || v.querySelector('source')?.src;
      if (src) {
        if (v.readyState >= 2) observer.observe(v);
        else {
          const onLoaded = () => {
            observer.observe(v);
            v.removeEventListener('loadedmetadata', onLoaded);
          };
          v.addEventListener('loadedmetadata', onLoaded);
          // ensure browser starts loading metadata
          try { v.load(); } catch (_) {}
        }
      } else {
        // no src yet: log for debugging
        // console.warn('Video element has no src, skipping observe', v.dataset.id);
      }
    });

    return () => observer.disconnect();
  }, [videos]);

  const handleVideoClick = (id) => {
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
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {videos.map((video) => {
        const src = video.videoUrl || video.video || video.url || '';
        return (
          <div key={video._id} className="h-screen w-screen relative snap-start flex justify-center items-center bg-black">
            <video
              ref={setVideoRef(video._id)}
              data-id={video._id}
              className="w-full h-full object-cover"
              playsInline
              loop
              muted
              preload="metadata"
              onError={(e) => {
                console.error('Video element error, src=', src, e);
              }}
              onLoadedMetadata={() => {
                // helpful for debugging: when metadata loads, log src and readyState
                const el = videoRefs.current.get(video._id);
                if (el) console.log('loaded metadata for', video._id, 'src=', el.currentSrc || el.src, 'readyState=', el.readyState);
              }}
              // add controls only for debugging; remove later if you want autoplay-only
              controls
            >
              {src ? (
                <source src={src} />
              ) : null}
              Your browser does not support the video tag.
            </video>

            {/* show small overlay if src is missing or invalid */}
            {!src && (
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black/60">
                No video source
              </div>
            )}

            {pausedVideos[video._id] && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <FaPlay className="text-white/50 text-6xl" />
              </div>
            )}

            {/* Right Action Sidebar */}
            <div className='absolute bottom-32 right-4 z-20 flex flex-col items-center space-y-6'>
              <div className="flex flex-col items-center">
                <IoHeartOutline className="text-white text-4xl drop-shadow-lg" />
                <span className="text-white text-xs mt-1">Like</span>
              </div>
              <div className="flex flex-col items-center">
                <FaRegBookmark  className="text-white text-3xl drop-shadow-lg" />
                <span className="text-white text-xs mt-1">Save</span>
              </div>
              <div className="flex flex-col items-center">
                <FaRegComment className="text-white text-3xl drop-shadow-lg" />
                <span className="text-white text-xs mt-1">12</span>
              </div>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-10 text-white bg-gradient-to-t from-black/90 to-transparent">
              <div className="mb-16"> {/* Spacer for BottomNav */}
                <h2 className="text-xl font-bold">@{video.name}</h2>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2 max-w-[280px]">
                  {video.description}
                </p>
                <Link 
                  to={"/food-partner/" + video.foodPartner}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full inline-block transition"
                >
                  Visit Store
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      <BottomNav />
    </div>
  );
};

export default Home;