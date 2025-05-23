import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    title: 'AI Recommendations',
    description: 'Our smart AI matches you with properties that perfectly fit your preferences and budget.',
    image: 'https://i.ibb.co/cY0QfPG/ai-recommendations.png'
  },
  {
    id: 2,
    title: 'Real-Time Chat Support',
    description: 'Connect directly with landlords or tenants through our secure messaging platform.',
    image: 'https://i.ibb.co/yBGbKSW/real-time-chat.png'
  },
  {
    id: 3,
    title: 'Smart Rent Pricing',
    description: 'See honest and transparent pricing with no hidden fees or unexpected charges.',
    image: 'https://i.ibb.co/kXw50GL/smart-pricing.png'
  }
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-primary-blue">Why Choose Us?</h2>
          <div className="w-20 h-1 bg-primary-green mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing the student housing experience with innovative technology and a focus on transparency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.id * 0.2 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-6">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-contain mx-auto"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary-blue text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;