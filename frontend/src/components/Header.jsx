import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', target: 'hero' },
    { name: 'Why Choose Us', target: 'why-choose-us' },
    { name: 'Testimonials', target: 'testimonials' },
    { name: 'About Us', target: 'about-us' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="hero" spy={true} smooth={true} offset={-70} duration={700} className="cursor-pointer">
          <img 
            src="https://i.ibb.co/68qn8Qh/staysmart-logo.png" 
            alt="StaySmart Logo" 
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.target}
              spy={true}
              smooth={true}
              offset={-70}
              duration={700}
              className={`font-medium cursor-pointer hover:text-primary-green transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button className="btn btn-primary">Login</button>
          <button className="btn btn-secondary">Register</button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.target}
                spy={true}
                smooth={true}
                offset={-70}
                duration={700}
                className="text-gray-800 hover:text-primary-green font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="btn btn-primary w-full">Login</button>
            <button className="btn btn-secondary w-full">Register</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;