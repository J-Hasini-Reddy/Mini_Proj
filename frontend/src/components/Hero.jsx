import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="pt-20 relative bg-gradient-to-r from-primary-blue to-primary-green">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - For students */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Search, explore and book your room!
            </h2>
            <p className="text-white mb-6 text-lg">
              Find perfect accommodation near your university with verified listings and honest reviews.
            </p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by city, university or area" 
                className="w-full px-4 py-3 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-green text-white px-4 py-1 rounded-md">
                Search
              </button>
            </div>
          </motion.div>
          
          {/* Right Side - For property owners */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              List your property. Find tenants fast.
            </h2>
            <p className="text-white mb-6 text-lg">
              Connect with verified students and fill your vacancies quickly with our smart matching algorithm.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-accent w-fit shadow-lg"
            >
              Post a Property
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute left-0 top-0 w-1/2 h-full">
          <img 
            src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg" 
            alt="Student with books" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <img 
            src="https://images.pexels.com/photos/5816288/pexels-photo-5816288.jpeg" 
            alt="Property handover" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;