import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FrameScroll() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const n1Ref = useRef(null);
  const n2Ref = useRef(null);
  const n3Ref = useRef(null);
  const n4Ref = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const frameCount = 162; 
    
    const currentFrame = (index) =>
      new URL(`../assets/image-1/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`, import.meta.url).href;

    const images = [];
    const sequence = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const idx = Math.max(0, Math.min(frameCount - 1, Math.round(sequence.frame)));
      const img = images[idx];
      
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);
        
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    if (images[0]) {
      images[0].onload = render;
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial positioning
    gsap.set([n1Ref.current, n3Ref.current], { opacity: 0, x: -80, filter: "blur(20px)" });
    gsap.set([n2Ref.current, n4Ref.current], { opacity: 0, x: 80, filter: "blur(20px)" });
    gsap.set(btnRef.current, { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1.2,
        start: "top top",
        end: "+=4500",
      },
    });

    const totalUnits = frameCount - 1;

    // 1. Core Frame Scrubber
    tl.to(sequence, {
      frame: totalUnits,
      snap: "frame",
      ease: "none",
      duration: totalUnits,
      onUpdate: () => requestAnimationFrame(render),
    }, 0);

    // 2. Subtle Cinematic Zoom
    tl.to(canvasRef.current, {
      scale: 1.1,
      duration: totalUnits,
      ease: "power1.inOut",
    }, 0);

    // --- PART 1: PUMA Centered (F1-30) ---
    tl.fromTo(textRef.current, 
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 10, ease: "power2.out" },
      0
    );
    tl.to(textRef.current, {
      opacity: 0,
      y: 40,
      duration: 10,
      ease: "power2.in",
    }, 20);

    // --- PART 2: ALTERNATING NARRATIVE (F32-150) ---
    
    // Narrative 1 (Left): F32-50
    tl.to(n1Ref.current, { 
      opacity: 1, x: 0, filter: "blur(0px)", y: -30, duration: 10, ease: "power2.out" 
    }, 32);
    tl.to(n1Ref.current, { 
      opacity: 0, y: -60, duration: 8, ease: "power1.in" 
    }, 45);

    // Narrative 2 (Right): F50-70
    tl.to(n2Ref.current, { 
      opacity: 1, x: 0, filter: "blur(0px)", y: -30, duration: 10, ease: "power2.out" 
    }, 50);
    tl.to(n2Ref.current, { 
      opacity: 0, y: -60, duration: 10, ease: "power1.in" 
    }, 62);

    // Narrative 3 (Left): F70-110
    tl.to(n3Ref.current, { 
      opacity: 1, x: 0, filter: "blur(0px)", y: -40, duration: 15, ease: "power2.out" 
    }, 70);
    tl.to(n3Ref.current, { 
      opacity: 0, y: -80, duration: 20, ease: "power1.in" 
    }, 95);

    // Narrative 4 (Right): F110-150
    tl.to(n4Ref.current, { 
      opacity: 1, x: 0, filter: "blur(0px)", y: -40, duration: 20, ease: "power2.out" 
    }, 110);
    tl.to(n4Ref.current, { 
      opacity: 0, y: -80, duration: 15, ease: "power1.in" 
    }, 140);

    // --- FINAL SECTION: BUTTON (F145-161) ---
    tl.to(btnRef.current, {
      opacity: 1,
      scale: 1,
      duration: 15,
      ease: "power2.out",
    }, 145);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-screen overflow-hidden relative flex flex-col items-center justify-center p-0 m-0 bg-black font-sans"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute inset-0 z-0"
        style={{ willChange: "transform" }}
      />

      {/* PART 1 */}
      <div ref={textRef} className="absolute z-10 text-center pointer-events-none select-none">
        <h1 className="text-8xl md:text-[14rem] font-black text-white uppercase tracking-tighter drop-shadow-2xl">
          PUMA
        </h1>
      </div>

      {/* PART 2: ALTERNATING NARRATIVE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-10 md:px-24 z-10 pointer-events-none select-none">
        
        {/* Left Side Texts */}
        <div ref={n1Ref} className="absolute left-10 md:left-32 text-white text-3xl md:text-6xl font-black uppercase tracking-tight max-w-[400px] leading-none drop-shadow-lg">
          step into <br /> the future
        </div>
        <div ref={n3Ref} className="absolute left-10 md:left-32 text-white text-3xl md:text-6xl font-black uppercase tracking-tight max-w-[400px] leading-none drop-shadow-lg">
          engineered <br /> for motion
        </div>

        {/* Right Side Texts */}
        <div ref={n2Ref} className="absolute right-10 md:right-32 text-white text-3xl md:text-6xl font-black uppercase tracking-tight text-right max-w-[400px] leading-none drop-shadow-lg">
          where style <br /> meets speed
        </div>
        <div ref={n4Ref} className="absolute right-10 md:right-32 text-white text-3xl md:text-6xl font-black uppercase tracking-tight text-right max-w-[400px] leading-none drop-shadow-lg">
          built for <br /> champions
        </div>

      </div>

      {/* FINAL SECTION */}
      <button 
        ref={btnRef}
        className="absolute bottom-16 z-20 px-12 py-5 bg-black border border-white/30 text-white font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
      >
        Purchase Now
      </button>
    </div>
  );
}
