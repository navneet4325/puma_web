import React, { useEffect, useRef, useState, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import images from assets
import img1 from "../assets/puma-gallery/img1.png";
import img2 from "../assets/puma-gallery/img2.png";
import img3 from "../assets/puma-gallery/img3.png";
import img4 from "../assets/puma-gallery/img4.png";
import img5 from "../assets/puma-gallery/img5.png";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { id: 'slide-1', src: img1 },
  { id: 'slide-2', src: img2 },
  { id: 'slide-3', src: img3 },
  { id: 'slide-4', src: img4 },
  { id: 'slide-5', src: img5 },
];

export default function PumaCarousel() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const idBase = useId();

  // Drag Refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentDelta = useRef(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    // 1. USE GSAP CONTEXT FOR AUTOMATIC CLEANUP
    const ctx = gsap.context(() => {
      const items = itemsRef.current;
      if (!items.length) return;

      // Initial State
      gsap.set(items, { opacity: 0, x: 0 });
      gsap.set(items[0], { opacity: 1 });

      // Create Fade Timeline
      const tl = gsap.timeline({ 
        repeat: -1,
        defaults: { duration: 1.2, ease: "power2.inOut" }
      });

      images.forEach((_, i) => {
        const currentItem = items[i];
        const nextIndex = (i + 1) % images.length;
        const nextItem = items[nextIndex];

        tl.addLabel(`slide-${i}`, `+=${2.5}`);
        tl.to(currentItem, { opacity: 0 }, `slide-${i}`);
        tl.to(nextItem, { 
          opacity: 1,
          onStart: () => setActiveIndex(nextIndex)
        }, `slide-${i}`);
      });

      timelineRef.current = tl;

      // Entry Animation
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef); // Scope the context to the container

    return () => ctx.revert(); // 2. REVERT EVERYTHING ON UNMOUNT (Kills animations & ScrollTriggers)
  }, []);

  const goToSlide = (index) => {
    if (!timelineRef.current) return;
    const targetIndex = (index + images.length) % images.length;
    setActiveIndex(targetIndex);
    timelineRef.current.play(`slide-${targetIndex === 0 ? images.length - 1 : targetIndex - 1}`);
  };

  const onStart = (e) => {
    isDragging.current = true;
    startX.current = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    if (timelineRef.current) timelineRef.current.pause();
  };

  const onMove = (e) => {
    if (!isDragging.current) return;
    const x = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    currentDelta.current = x - startX.current;
    gsap.set(itemsRef.current[activeIndex], { x: currentDelta.current * 0.4 });
  };

  const onEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 50;

    if (currentDelta.current < -threshold) {
      goToSlide(activeIndex + 1);
    } else if (currentDelta.current > threshold) {
      goToSlide(activeIndex - 1);
    } else {
      gsap.to(itemsRef.current[activeIndex], { x: 0, duration: 0.1, ease: "power2.out" });
      if (timelineRef.current) timelineRef.current.play();
    }
    currentDelta.current = 0;
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden select-none"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-screen bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div 
        className="relative w-full h-full max-w-[1440px] px-6 md:px-20 py-20 flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseEnter={() => timelineRef.current?.pause()}
        onMouseLeave={() => !isDragging.current && timelineRef.current?.play()}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
      >
        {images.map((img, i) => (
          <div 
            key={`${idBase}-${img.id}`}
            ref={el => itemsRef.current[i] = el}
            className="absolute inset-x-6 md:inset-x-20 inset-y-20 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
               <img 
                src={img.src} 
                alt={img.id}
                className="w-full h-full object-cover select-none"
              />
            </div>
          </div>
        ))}

        {/* Indicators */}
        <div className="absolute bottom-10 flex space-x-3 z-20">
            {images.map((_, i) => (
                <div 
                  key={`indicator-${i}`} 
                  className={`h-[2px] rounded-full transition-all duration-500 ${activeIndex === i ? "w-12 bg-white" : "w-6 bg-white/10"}`} 
                />
            ))}
        </div>
      </div>
    </section>
  );
}
