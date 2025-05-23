import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about-us" className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-primary-blue">About Us</h2>
          <div className="w-20 h-1 bg-primary-green mx-auto mb-6"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <img 
              src="https://i.ibb.co/68qn8Qh/staysmart-logo.png"
              alt="StaySmart Logo" 
              className="max-w-md mx-auto"
            />
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-3xl font-semibold mb-6 text-primary-blue"
            >
              Revolutionizing Student Housing
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 mb-4"
            >
              StaySmart was founded with a clear mission: to transform the student housing experience by bringing transparency, technology, and trust to the market.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 mb-4"
            >
              Our team combines cutting-edge technology with deep understanding of student needs to create the perfect platform for finding your ideal accommodation.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;