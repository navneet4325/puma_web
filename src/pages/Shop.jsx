import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

// Dynamically import images from assets
import shoe1 from '../assets/shoes-image/image.png';
import shoe2 from '../assets/shoes-image/image copy.png';
import shoe3 from '../assets/shoes-image/image copy 2.png';
import shoe4 from '../assets/shoes-image/image copy 3.png';
import shoe5 from '../assets/shoes-image/image copy 4.png';
import shoe6 from '../assets/shoes-image/image copy 5.png';
import shoe7 from '../assets/shoes-image/image copy 6.png';
import shoe8 from '../assets/shoes-image/image copy 7.png';

const Shop = () => {
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);

  const products = [
    { id: 1, name: "PUMA Deviate Nitro 2", category: "Men's Running Shoes", price: "$160.00", oldPrice: "$180.00", image: shoe1, colors: ["#000", "#FF5F00", "#FFF"] },
    { id: 2, name: "PUMA Velocity Nitro", category: "Women's Training", price: "$120.00", image: shoe2, colors: ["#E2E2E2", "#000"] },
    { id: 3, name: "PUMA RS-X 3D", category: "Sportstyle Sneaker", price: "$110.00", image: shoe3, colors: ["#FF0000", "#000", "#FFF"] },
    { id: 4, name: "PUMA Cali Star", category: "Women's Lifestyle", price: "$90.00", oldPrice: "$100.00", image: shoe4, colors: ["#FFF", "#FFD700"] },
    { id: 5, name: "PUMA King Platinum", category: "Football Boots", price: "$200.00", image: shoe5, colors: ["#000", "#FFF"] },
    { id: 6, name: "PUMA Future Pro", category: "Football Performance", price: "$140.00", image: shoe6, colors: ["#00FF00", "#000"] },
    { id: 7, name: "PUMA Suede Classic", category: "Unisex Heritage", price: "$75.00", image: shoe7, colors: ["#0000FF", "#FFF", "#000"] },
    { id: 8, name: "PUMA Mayze Stack", category: "Women's Fashion", price: "$120.00", image: shoe8, colors: ["#FFF", "#F5F5DC"] },
  ];

  const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f5] pt-[110px]">
      {/* LEFT SIDEBAR: Fixed + Independent Scroll */}
      <aside className="w-[300px] min-w-[300px] h-full overflow-y-auto bg-white border-r border-neutral-200 hidden md:block">
        <div className="p-8 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-black flex items-center gap-3 uppercase tracking-tighter">
              <SlidersHorizontal size={20} /> Filters
            </h3>
          </div>

          {/* Gender Section */}
          <div>
            <h4 className="font-bold mb-5 text-xs uppercase tracking-[0.2em] text-neutral-400">Gender</h4>
            <div className="space-y-4">
              {["Men", "Women", "Kids"].map((g) => (
                <label key={g} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-neutral-300 rounded checked:bg-black checked:border-black transition-all cursor-pointer" />
                    <div className="absolute opacity-0 peer-checked:opacity-100 pointer-events-none text-white text-[10px] font-black">✓</div>
                  </div>
                  <span className="text-sm font-bold text-neutral-600 group-hover:text-black transition-colors">{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Section */}
          <div>
            <h4 className="font-bold mb-5 text-xs uppercase tracking-[0.2em] text-neutral-400">Filter By</h4>
            <div className="space-y-4">
              {["Sneakers", "Running Shoes", "Football Boots", "Lifestyle"].map((b) => (
                <label key={b} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-neutral-300 rounded checked:bg-black checked:border-black transition-all cursor-pointer" />
                    <div className="absolute opacity-0 peer-checked:opacity-100 pointer-events-none text-white text-[10px] font-black">✓</div>
                  </div>
                  <span className="text-sm font-bold text-neutral-600 group-hover:text-black transition-colors">{b}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Section */}
          <div>
            <h4 className="font-bold mb-5 text-xs uppercase tracking-[0.2em] text-neutral-400">Select Size</h4>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((s) => (
                <button key={s} className="py-2.5 text-xs font-black border-2 border-neutral-100 rounded-xl hover:border-black bg-black text-white transition-all duration-300">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT SECTION: Product Area + Independent Scroll */}
      <main className="flex-1 h-full overflow-y-auto bg-[#f8f8f8] p-6 md:p-12 custom-scrollbar">
        <div className="max-w-[1200px] mx-auto">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter leading-none mb-2">Running Shoes</h2>
              <p className="text-neutral-400 text-sm font-bold">Showing 1-8 of 24 results</p>
            </div>
            <button className="flex items-center gap-3 bg-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-sm border border-neutral-100 hover:shadow-xl hover:scale-105 transition-all text-black self-start md:self-auto">
              Sort By: Popular <ChevronDown size={14} />
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-transparent hover:border-neutral-100">
                <div className="relative aspect-[4/5] bg-neutral-50 flex items-center justify-center p-8 overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-contain transform group-hover:scale-110 group-hover:rotate-[-8deg] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors" />
                </div>
                
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    {p.colors.map((c, i) => (
                      <div key={i} className="w-3.5 h-3.5 rounded-full border border-neutral-200 ring-2 ring-transparent group-hover:ring-neutral-100 transition-all shadow-inner" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <h3 className="font-black text-black text-lg group-hover:text-red-600 transition-colors truncate uppercase tracking-tight">
                    {p.name}
                  </h3>
                  <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">{p.category}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-black font-black text-xl tracking-tighter">{p.price}</span>
                    {p.oldPrice && (
                      <span className="text-neutral-300 line-through text-xs font-bold">{p.oldPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>

  );
};

export default Shop;
