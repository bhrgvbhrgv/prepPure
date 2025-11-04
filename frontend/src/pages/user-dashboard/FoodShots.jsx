import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import './FoodShots.css';

const FoodShots = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Fetch videos without requiring login
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food');
        if (response.data.foodItems) setVideos(response.data.foodItems);
        else setError('No videos available at the moment.');
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Unable to load food shots.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Ensure refs length
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos]);

  // Auto-play/pause using IntersectionObserver while snapping
  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0.6 };
    const playVideo = async (video) => {
      try {
        if (video.readyState >= 2) await video.play();
        else video.addEventListener('loadeddata', () => video.play(), { once: true });
      } catch (err) {
        console.warn('Playback issue:', err);
        if (err.name === 'NotAllowedError') {
          video.muted = true;
          try { await video.play(); } catch (e) { console.error(e); }
        }
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          playVideo(video);
          setCurrentVideoIndex(parseInt(video.dataset.index));
        } else {
          if (!video.paused) video.pause();
        }
      });
    }, options);

    videoRefs.current.forEach((v) => { if (v) observer.observe(v); });
    return () => { videoRefs.current.forEach((v) => { if (v) { observer.unobserve(v); v.pause(); } }); };
  }, [videos]);

  const handleVisitStore = (foodPartnerId) => navigate(`/food-partner/${foodPartnerId}`);

  return (
    <div className="foodshots-container reels" ref={containerRef}>
      {loading ? (
        <div className="loading-state">Loading food videos...</div>
      ) : error ? (
        <div className="error-state">{error}</div>
      ) : videos.length === 0 ? (
        <div className="empty-state">No videos available yet</div>
      ) : (
        videos.map((video, index) => (
          <div key={video._id} className="foodshot-card">
            <div className="video-container">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="foodshot-video"
                src={video.video}
                loop
                muted
                playsInline
                data-index={index}
                // autoplay will be handled by IntersectionObserver for reliability
              />

              {/* Top overlay: description + visit button */}
              <div className="foodshot-overlay top">
                <div className="foodshot-content">
                  <p className="foodshot-description" title={video.description}>{video.description}</p>
                  <button className="visit-store-btn" onClick={() => handleVisitStore(video.foodPartner)}>
                    Visit Restaurant
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FoodShots;
