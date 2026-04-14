import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import images from the assets folder
import shoe1 from '../assets/shoes-image/image.png';
import shoe2 from '../assets/shoes-image/image copy.png';
import shoe3 from '../assets/shoes-image/image copy 2.png';
import shoe4 from '../assets/shoes-image/image copy 3.png';
import featuredShoe from '../assets/shoes-image/image copy 4.png';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const BestCollection = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const filters = ['ALL', 'BEST SELLER', 'TRENDING', 'WOMEN', 'NEW IN'];

  const products = [
    {
      id: 1,
      name: 'PUMA RS-X EFFECT',
      originalPrice: '$130.00',
      offerPrice: '$95.00',
      image: shoe1,
      badge: 'SALE',
    },
    {
      id: 2,
      name: 'PUMA CALI STAR L',
      originalPrice: '$110.00',
      offerPrice: '$79.00',
      image: shoe2,
      badge: 'SALE',
    },
    {
      id: 3,
      name: 'PUMA MAYZE TRIPLE',
      originalPrice: '$120.00',
      offerPrice: '$89.00',
      image: shoe3,
      badge: 'SALE',
    },
    {
      id: 4,
      name: 'PUMA SUEDE VTG',
      originalPrice: '$95.00',
      offerPrice: '$69.00',
      image: shoe4,
      badge: 'SALE',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = cardsRef.current;
      
      gsap.fromTo(elements, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-screen bg-[#000000] text-white py-20 px-6 md:px-12 lg:px-24 font-sans overflow-hidden"
    >
      {/* Header Container */}
      <div className="max-w-7xl mx-auto flex flex-col items-center mb-20">
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8 text-center uppercase">
          BEST COLLECTION
        </h2>
        
        {/* Pill-shaped Category Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 boder-white  border-2 transition-all duration-300 text-xs font-black tracking-widest uppercase
                ${activeFilter === filter 
                  ? 'bg-white  border-white text-black scale-110 shadow-[0_0_20px_rgba(255,95,0,0.4)]' 
                  : 'bg-transparent border-white/40 text-white hover:border-white hover:text-black hover:bg-white'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Section: 2x2 Grid of Product Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-white rounded-[2.5rem] p-8 flex flex-col items-center justify-between transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)] cursor-pointer"
            >
              {/* Sale Badge */}
              <div className="absolute top-6 left-6 bg-red-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full z-10 uppercase tracking-tighter">
                {product.badge}
              </div>

              {/* Centered Shoe Image */}
              <div className="w-full aspect-square flex items-center justify-center p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain transform transition-transform duration-700 group-hover:rotate-[-8deg] group-hover:scale-110"
                />
              </div>

              {/* Product Details */}
              <div className="text-center mt-6">
                <h3 className="text-neutral-900 font-black text-xl mb-2 tracking-tight uppercase">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-neutral-400 line-through text-base font-bold">
                    {product.originalPrice}
                  </span>
                  <span className="text-red-500 font-black text-2xl">
                    {product.offerPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section: Large Featured Card */}
        <div 
          ref={el => cardsRef.current[4] = el}
          className="lg:col-span-4 relative group rounded-[2.5rem] overflow-hidden bg-neutral-900 shadow-2xl min-h-[600px]"
        >
          {/* Featured Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={featuredShoe} 
              alt="Featured PUMA"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            {/* Dark Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-white z-10 transform transition-all duration-500 group-hover:translate-y-[-10px]">
            <span className="text-[#FF5F00] text-xs font-black uppercase tracking-[0.3em] mb-4">
              Premium Release
            </span>
            <h4 className="text-5xl font-black mb-6 uppercase leading-[0.9] tracking-tighter">
              BEYOND <br /> VELOCITY
            </h4>
            <p className="text-white/60 text-sm mb-8 max-w-[280px] font-medium leading-relaxed">
              Engineered for the elite. The new collection represents the pinnacle of performance and street style.
            </p>
            <button className="group/btn relative px-10 py-4 overflow-hidden rounded-full bg-white text-black font-black uppercase text-xs tracking-widest transition-all hover:bg-[#FF5F00] hover:text-white">
              <span className="relative z-10">Discover More</span>
              <div className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 bg-[#FF5F00] transition-transform duration-300" />
            </button>
          </div>
          
          {/* Aesthetic Glow Effect */}
          <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-[#FF5F00]/10 blur-[120px] rounded-full group-hover:bg-[#FF5F00]/20 transition-all duration-700" />
        </div>
      </div>
    </section>
  );
};

export default BestCollection;
