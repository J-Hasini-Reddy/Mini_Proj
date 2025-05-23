import React, { useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Emma Wilson',
    role: 'Student at Oxford University',
    text: 'StaySmart made it so easy to find my perfect apartment near campus. The AI recommendations were spot on, and I found a place within a week!',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jason Chen',
    role: 'Property Owner',
    text: 'As a landlord, I\'ve tried many platforms to list my properties. StaySmart has by far the best quality tenants and their verification process gives me peace of mind.',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    role: 'Student at Imperial College',
    text: 'The transparent pricing was what sold me on StaySmart. No surprise fees or hidden costs when I moved in. What you see is what you pay!',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    rating: 4,
  },
  {
    id: 4,
    name: 'Michael Johnson',
    role: 'Property Manager',
    text: 'The real-time chat feature has drastically reduced our response time to tenant inquiries. It\'s made our property management so much more efficient.',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="section bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-primary-blue">What Our Users Say</h2>
          <div className="w-20 h-1 bg-primary-green mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. See what students and property owners have to say about their StaySmart experience.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-lg p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-3">
                  {renderStars(testimonials[activeIndex].rating)}
                </div>
                <p className="text-gray-600 italic mb-4 text-lg">"{testimonials[activeIndex].text}"</p>
                <h4 className="text-xl font-semibold text-primary-blue">{testimonials[activeIndex].name}</h4>
                <p className="text-gray-500">{testimonials[activeIndex].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <button 
            onClick={goToPrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? 'bg-primary-blue' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;