import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Heart, ShoppingBag, SlidersHorizontal } from "lucide-react";

// Asset imports
import shoe1 from "../assets/shoespng/shoe1.png";
import shoe2 from "../assets/shoespng/shoe2.png";
import shoe3 from "../assets/shoespng/shoe3.png";

// Grid Assets (Selecting a variety from the shoes-image folder)
import grid1 from "../assets/shoes-image/image.png";
import grid2 from "../assets/shoes-image/image copy.png";
import grid3 from "../assets/shoes-image/image copy 2.png";
import grid4 from "../assets/shoes-image/image copy 3.png";
import grid5 from "../assets/shoes-image/image copy 4.png";
import grid6 from "../assets/shoes-image/image copy 5.png";
import grid7 from "../assets/shoes-image/image copy 6.png";
import grid8 from "../assets/shoes-image/image copy 7.png";

const heroShoes = [
  { id: 1, img: shoe1, name: "AIR FORCE" },
  { id: 2, img: shoe2, name: "SKY STRIKER" },
  { id: 3, img: shoe3, name: "AERO STEP" },
];

const gridProducts = [
  { id: 1, name: "Air M32 Pro Air M32 Pro", price: "$560", image: grid1, colors: ["#ff4500", "#1e90ff", "#32cd32", "#ffd700"] },
  { id: 2, name: "Air M32 Pro Air M32 Pro", price: "$560", image: grid2, colors: ["#333", "#fff", "#f00", "#00f"] },
  { id: 3, name: "Air M32 Pro Air M32 Pro", price: "$560", image: grid3, colors: ["#ff4500", "#1e90ff", "#32cd32", "#ffd700"] },
  { id: 4, name: "Air M32 Pro Air M32 Pro", price: "$560", image: grid4, colors: ["#ff4500", "#1e90ff", "#32cd32", "#ffd700"] },
  { id: 5, name: "Air M32 Pro Air M32 Pro", price: "$560", image: grid5, colors: ["#ff4500", "#1e90ff", "#32cd32", "#ffd700"] },
  { id: 6, name: "Air M32 Pro Air M32 Pro", price: "$560", image: grid6, colors: ["#ff4500", "#1e90ff", "#32cd32", "#ffd700"] },
  { id: 7, name: "Air M32 Pro Air M32 Pro", price: "$560", image: grid7, colors: ["#ff4500", "#1e90ff", "#32cd32", "#ffd700"] },
  { id: 8, name: "Air M32 Pro Air M32 Pro", price: "$560", image: grid8, colors: ["#ff4500", "#1e90ff", "#32cd32", "#ffd700"] },
];

const CollectionPage = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All Arrivals");
  const [trendingIndex, setTrendingIndex] = useState(0);

  // Hero Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroShoes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans scroll-smooth pt-[110px]">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-[calc(100vh-110px)] overflow-hidden flex items-center justify-center select-none">
        {/* BACKGROUND WATERMARK */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-[0.05] pointer-events-none">
          <h1 className="text-[25vw] font-black uppercase tracking-tighter whitespace-nowrap">
            OWN THE WALK
          </h1>
        </div>

        {/* TOP HEADER */}
        <div className="absolute top-[10%] z-20 text-center px-4 w-full">
          <motion.h2 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-8xl lg:text-[7.5rem] font-black leading-tight tracking-tighter uppercase"
          >
            STEP INTO <br /> SHOES STYLE
          </motion.h2>
        </div>

        {/* SIDE NAV (Left) */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col space-y-8">
            {heroShoes.map((shoe, i) => (
                <div key={shoe.id} className={`text-sm font-black tracking-[0.3em] transition-all duration-500 flex items-center gap-6 ${heroIndex === i ? "text-white translate-x-4" : "text-neutral-700"}`}>
                    {heroIndex === i && <div className="w-12 h-[2px] bg-white transition-all" />}
                    {shoe.name}
                </div>
            ))}
        </div>

        {/* CONTENT & CONTROLS (Right) */}
        <div className="absolute right-10 bottom-20 lg:top-[60%] lg:-translate-y-1/2 z-20 max-w-xs flex flex-col items-start gap-8">
            <div className="flex gap-4">
                <button onClick={() => setHeroIndex((prev) => (prev - 1 + heroShoes.length) % heroShoes.length)} className="p-4 rounded-full border border-neutral-800 bg-neutral-900/40 hover:border-white transition-all backdrop-blur-md">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={() => setHeroIndex((prev) => (prev + 1) % heroShoes.length)} className="p-4 rounded-full border border-neutral-800 bg-neutral-900/40 hover:border-white transition-all backdrop-blur-md">
                    <ChevronRight size={20} />
                </button>
            </div>
            <p className="text-neutral-400 text-sm font-medium leading-relaxed">
                Experience the pinnacle of footwear engineering. Our latest drops combine future-ready aesthetics with pure performance.
            </p>
            <button className="flex items-center gap-4 bg-white px-8 py-4 rounded-full text-black hover:bg-neutral-200 transition-all group">
                <span className="text-sm font-black uppercase tracking-widest">Discover Collection</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
        </div>

        {/* CENTER IMAGE */}
        <div className="relative w-full h-full flex items-center justify-center z-10 pointer-events-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={heroIndex}
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: -15, y: [0, -15, 0] }}
                    exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    transition={{ opacity: { duration: 0.8 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                    className="relative w-full max-w-[600px] md:max-w-[800px] aspect-square flex items-center justify-center"
                >
                    <div className="absolute bottom-[20%] w-[70%] h-[15%] bg-white/5 blur-[100px] rounded-full" />
                    <img src={heroShoes[heroIndex].img} alt="" className="w-full h-full object-contain drop-shadow-[0_20px_100px_rgba(255,255,255,0.1)]" />
                </motion.div>
            </AnimatePresence>
        </div>
      </section>

      {/* SECTION 2: TRENDING NOW (FEATURED DROP) */}
      <section className="relative w-full py-32 px-6 md:px-20 overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Image Section */}
            <div className="relative flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={trendingIndex}
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        animate={{ y: [0, -20, 0] }}
                        transition={{ opacity: { duration: 0.8, ease: "easeInOut" }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                        className="relative w-full max-w-[600px] aspect-square flex items-center justify-center"
                    >
                        <div className="absolute bottom-10 w-[70%] h-[10%] bg-white/5 blur-[80px] rounded-full" />
                        <img 
                            src={heroShoes[trendingIndex].img} 
                            alt="Trending Shoe" 
                            className="w-full h-full object-contain transform -rotate-12 drop-shadow-[0_20px_100px_rgba(255,255,255,0.08)]" 
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Thumbnails */}
                <div className="flex gap-4 mt-8 z-20">
                    {heroShoes.map((shoe, i) => (
                        <button 
                            key={shoe.id}
                            onClick={() => setTrendingIndex(i)}
                            className={`w-20 h-20 p-2 rounded-2xl border-2 transition-all ${trendingIndex === i ? "border-white bg-neutral-900" : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"}`}
                        >
                            <img src={shoe.img} alt="" className="w-full h-full object-contain" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Text Section */}
            <motion.div 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex flex-col items-start"
            >
                <h4 className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs mb-4">Trending Now</h4>
                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                    Step Into <br /> The Future
                </h3>
                <p className="text-neutral-400 text-lg md:text-xl font-medium max-w-md mb-10 leading-relaxed">
                    Designed for high-impact movement and street-ready style. Experience zero-gravity comfort in every stride.
                </p>
                <div className="flex items-center gap-8 mb-12">
                    <div className="flex flex-col">
                        <span className="text-neutral-600 line-through text-sm font-bold">$120.00</span>
                        <span className="text-red-500 text-4xl font-black tracking-tighter">$89.00</span>
                    </div>
                </div>
                <button className="flex items-center gap-6 bg-white px-12 py-5 rounded-full text-black hover:bg-neutral-200 transition-all group overflow-hidden relative shadow-2xl">
                    <span className="relative z-10 text-sm font-black uppercase tracking-widest">Shop Now</span>
                    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                </button>
            </motion.div>
        </div>
        
        {/* Glow Decor */}
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-white/[0.03] blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* SECTION 3: EXPLORE GRID */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-[1440px] mx-auto">
            
            {/* Header & Filter */}
            <div className="flex flex-col items-center mb-20 text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">Explore Our Latest Collection</h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {["All Arrivals", "Popular", "Male", "FEMALE", "CHILDREN"].map((filter) => (
                        <button 
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all ${activeFilter === filter ? "bg-white text-black border-white" : "bg-transparent border-neutral-800 text-neutral-500 hover:border-neutral-600"}`}
                        >
                            <span className="flex items-center gap-2">
                                {filter.toUpperCase()}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {gridProducts.map((p) => (
                    <motion.div 
                        key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: p.id * 0.05 }}
                        className="group bg-white rounded-[2.5rem] overflow-hidden flex flex-col p-6 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(255,255,255,0.05)] cursor-pointer"
                    >
                        <div className="relative aspect-square flex items-center justify-center p-8 bg-[#f8f8f8] rounded-[2rem] overflow-hidden mb-6">
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-3 bg-white rounded-full shadow-lg text-black hover:scale-110 transition-transform">
                                    <Heart size={18} />
                                </button>
                            </div>
                            <img src={p.image} alt="" className="w-full h-full object-contain transform group-hover:scale-110 group-hover:rotate-[-8deg] transition-all duration-700" />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    {p.colors.map((c, i) => (
                                        <div key={i} className="w-3 h-3 rounded-full border border-neutral-200" style={{ backgroundColor: c }} />
                                    ))}
                                </div>
                                <span className="text-black font-black text-lg">{p.price}</span>
                            </div>
                            <div>
                                <h3 className="text-black font-black text-base uppercase tracking-tight group-hover:text-red-500 transition-colors truncate">{p.name}</h3>
                                <p className="text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Shoes</p>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex gap-2">
                                    {["42", "43", "44"].map(size => (
                                        <span key={size} className="text-[10px] font-black text-neutral-300 hover:text-black cursor-pointer">{size}</span>
                                    ))}
                                </div>
                                <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors">
                                    <ShoppingBag size={14} /> Add to Bag
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* View All Button */}
            <div className="mt-20 flex justify-center">
                <button className="flex items-center gap-4 border-2 border-neutral-800 px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all">
                    View All Products <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </section>
      <div className="absolute bottom-12 left-8 md:left-20 z-20 pointer-events-none opacity-40">
        <span className="text-xs md:text-sm font-black text-neutral-600 tracking-[0.5em] uppercase">
          2025 - PRESENT
        </span>
      </div>
    </div>
  );
};

export default CollectionPage;
