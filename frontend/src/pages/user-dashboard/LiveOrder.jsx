import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LiveOrder.css';

const LiveOrder = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const videoRefs = useRef([]);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Dummy fallback videos from public folder
    const dummyVideos = [
        { _id: 'd1', video: '/videos/vid1.mp4', description: 'Delicious butter chicken with naan', foodPartner: '1' },
        { _id: 'd2', video: '/videos/vid2.mp4', description: 'Crispy paneer tikka served hot', foodPartner: '2' },
        { _id: 'd3', video: '/videos/vid3.mp4', description: 'Aromatic biryani full of flavours', foodPartner: '3' },
        { _id: 'd4', video: '/videos/vid4.mp4', description: 'Fresh garden salad with dressing', foodPartner: '4' },
        { _id: 'd5', video: '/videos/vid5.mp4', description: 'Spicy chilli chicken', foodPartner: '5' },
        { _id: 'd6', video: '/videos/vid6.mp4', description: 'Sweet dessert platter', foodPartner: '6' }
    ];

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get('/api/food');
                if (res.data && Array.isArray(res.data.foodItems) && res.data.foodItems.length > 0) {
                    setVideos(res.data.foodItems);
                } else {
                    setVideos(dummyVideos);
                }
            } catch (err) {
                console.warn('Could not fetch videos, using dummy list', err);
                setVideos(dummyVideos);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    useEffect(() => {
        videoRefs.current = videoRefs.current.slice(0, videos.length);
    }, [videos]);

    useEffect(() => {
        if (!videos || videos.length === 0) return;
        const opts = { root: null, threshold: 0.6 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const v = entry.target;
                if (entry.isIntersecting) {
                    v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
                } else {
                    v.pause();
                }
            });
        }, opts);

        videoRefs.current.forEach(el => { if (el) observer.observe(el); });
        return () => { videoRefs.current.forEach(el => { if (el) { observer.unobserve(el); el.pause(); } }); };
    }, [videos]);

    const handleVisitStore = (id) => navigate(`/food-partner/${id}`);

    return (
        <div className="foodshots-container reels" ref={containerRef}>
            {loading ? (
                <div className="loading-state">Loading food videos...</div>
            ) : (
                videos.map((video, idx) => (
                    <div key={video._id || idx} className="foodshot-card">
                        <div className="video-container">
                            <div className="live-cooking" aria-hidden="true">
                                <div className="live-dot" />
                                <span className="live-text">Live Cooking</span>
                            </div>
                            <video
                                ref={el => videoRefs.current[idx] = el}
                                className="foodshot-video"
                                src={video.video}
                                playsInline
                                loop
                                muted
                                preload="metadata"
                                data-index={idx}
                            />

                            <div className="foodshot-overlay top">
                                <div className="foodshot-content">
                                    <p className="foodshot-description" title={video.description}>{video.description}</p>
                                    <div>
                                    <button className="visit-store-btn" onClick={() => handleVisitStore(video.foodPartner)}>
                                        Visit Store
                                    </button>
                                    <button className="buy-now-btn" onClick={() => handleVisitStore(video.foodPartner)}>
                                        Buy now
                                    </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default LiveOrder;
