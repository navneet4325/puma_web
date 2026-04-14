import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NavItem = ({ label, to }) => {
  const itemRef = useRef(null);
  const underlineRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = (e) => {
    gsap.to(underlineRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    // Magnetic pull
    gsap.to(itemRef.current, {
      x: 10,
      y: -2,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(underlineRef.current, {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    // Return to origin
    gsap.to(itemRef.current, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={itemRef}
      className="relative group cursor-pointer px-4 py-2 text-white/70 hover:text-white transition-colors duration-300 font-medium tracking-wide uppercase text-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => to && navigate(to)}
    >
      <span className="relative z-10 transition-shadow duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
        {label}
      </span>
      <div
        ref={underlineRef}
        className="absolute bottom-1 left-4 right-4 h-[1px] bg-white origin-left scale-x-0"
      />
    </div>
  );
};


export default function Navbar({ isBannerVisible }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isShopPage = location.pathname === "/shop";
  const isCollectionPage = location.pathname === "/collection";
  const shouldBeBlack = isShopPage || isCollectionPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial Logo Floating
    gsap.to(logoRef.current, {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleNavbarMouseMove = (e) => {
    if (!navRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const moveX = (clientX - innerWidth / 2) / 100;
    const moveY = (clientY - innerHeight / 2) / 80;

    gsap.to(navRef.current, {
      x: moveX,
      y: moveY,
      duration: 1,
      ease: "power2.out",
    });
  };

  return (
    <>
      <nav
        ref={navRef}
        onMouseMove={handleNavbarMouseMove}
        onMouseLeave={() => {
          gsap.to(navRef.current, { x: 0, y: 0, duration: 1 });
        }}
        style={{ 
          top: isBannerVisible ? "40px" : "0px",
          transition: "top 700ms cubic-bezier(0.4, 0, 0.2, 1), background-color 500ms, padding 500ms"
        }}
        className={`fixed left-0 w-full z-[100] border-b ${
          shouldBeBlack || isScrolled
            ? "bg-black py-3 border-white/10 shadow-2xl"
            : "bg-transparent py-6 border-white/0"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between relative">
          
          {/* LEFT: Menu */}
          <div className="hidden lg:flex items-center space-x-2 flex-1">
            <NavItem label="Home" to="/" />
            <NavItem label="Collection" to="/collection" />
            <NavItem label="Shop" to="/shop" />
            <NavItem label="Contact" />
          </div>

          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* CENTER: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
            <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <h1
              ref={logoRef}
              onClick={() => navigate("/")}
              className="text-2xl md:text-3xl font-black text-white tracking-[0.4em] cursor-pointer transition-transform duration-500 hover:scale-110 select-none"
            >
              PUMA
            </h1>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center justify-end space-x-4 md:space-x-6 flex-1">
            <div className="hidden xl:flex items-center space-x-2">
              <NavItem label="Best Deal" />
              <NavItem label="Service" />
            </div>

            {/* Search */}
            <div className={`flex items-center bg-white/5 rounded-full overflow-hidden transition-all duration-500 ${isSearchOpen ? "w-40 md:w-64 px-4 ring-1 ring-white/20" : "w-10 h-10 ring-0"}`}>
              <Search 
                size={20} 
                className="text-white cursor-pointer min-w-[20px] hover:text-white/80 transition-colors"
                onClick={toggleSearch} 
              />
              <input 
                type="text" 
                placeholder="Search..."
                className={`bg-transparent border-none focus:ring-0 text-white text-sm ml-3 outline-none transition-opacity duration-300 ${isSearchOpen ? "opacity-100" : "opacity-0 invisible"}`}
              />
            </div>

            {/* Cart */}
            <div className="relative group cursor-pointer">
              <div 
                className="text-white hover:text-white/80 transition-all duration-300 active:scale-90"
                onMouseEnter={() => {
                  gsap.to(".cart-icon", { rotation: 15, duration: 0.1, yoyo: true, repeat: 3 });
                }}
                onMouseLeave={() => {
                  gsap.to(".cart-icon", { rotation: 0, duration: 0.2 });
                }}
              >
                <ShoppingBag size={24} className="cart-icon" />
              </div>
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                2
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-[200] bg-black/95 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full"
        >
          <X size={32} />
        </button>
        
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {[
            { label: "Home", to: "/" },
            { label: "Collection" },
            { label: "Shop", to: "/shop" },
            { label: "Best Deal" },
            { label: "Service" },
            { label: "Contact" }
          ].map((item, idx) => (
             <h2 
              key={item.label} 
              className="text-white text-4xl font-bold uppercase tracking-widest hover:text-white/50 cursor-pointer transition-colors transition-transform duration-500 hover:scale-110"
              style={{ transitionDelay: `${idx * 50}ms` }}
              onClick={() => {
                if (item.to) navigate(item.to);
                setIsMobileMenuOpen(false);
              }}
             >
               {item.label}
             </h2>
          ))}
        </div>
      </div>
    </>
  );
}
