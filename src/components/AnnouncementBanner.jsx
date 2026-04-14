import React, { useState, useEffect } from "react";

const AnnouncementBanner = ({ onVisibilityChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "FREE RETURNS AND EXCHANGES.",
    "EXTRA 5% OFF AND FREE SHIPPING ON ALL ONLINE PAYMENTS*",
    "⚡️ 1-DAY EXPRESS DELIVERY IN BANGALORE, DELHI NCR & KOLKATA! *TnC Applied",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isVisible);
    }
  }, [isVisible, onVisibilityChange]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUpOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-15px); }
        }
        .animate-msg-in {
          animation: fadeUpIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .message-container {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div
        className={`fixed top-0 left-0 w-full h-10 bg-white text-black z-[110] flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out px-4 pointer-events-none sm:pointer-events-auto
          ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        `}
      >
        <div className="max-w-7xl w-full h-full">
          <div className="message-container">
            {/* 
              Using 'key' on the element forces React to treat it as a new element on each index change,
              triggering our CSS animation cleanly.
            */}
            <p 
              key={currentMessageIndex}
              className="animate-msg-in text-[10px] md:text-xs font-black tracking-tight text-center leading-tight uppercase"
            >
              {messages[currentMessageIndex]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementBanner;
