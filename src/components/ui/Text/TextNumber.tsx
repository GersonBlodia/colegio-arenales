"use client";
import React, { useEffect, useState, useRef } from "react";  
import CountUp from "react-countup";  
import { motion } from "framer-motion";  

export const TextNumber: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false); 
  const sectionRef = useRef<HTMLDivElement | null>(null);  

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
       
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true);  
          window.removeEventListener("scroll", handleScroll);  
        }
      }
    };

    window.addEventListener("scroll", handleScroll);  
    return () => {
      window.removeEventListener("scroll", handleScroll);  
    };
  }, []);

  return (
    
        <div
          ref={sectionRef}
          className="flex flex-col gap-6 text-center md:text-left flex-1 border-r-0 md:border-r md:border-gray-300 pr-0 md:pr-8"
        >
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <h2 className="text-4xl font-bold text-blue-900">
                {isVisible ? <CountUp end={100} duration={2} suffix="%" /> : "0%"}
              </h2>
              <p className="text-lg text-gray-700">
                En especialidades Tecnologicas
              </p>
            </div>
          </motion.div>
    
          <div className="border-t border-gray-300 my-4"></div>
     
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div>
              <h2 className="text-4xl font-bold text-blue-900">
                {isVisible ? <CountUp end={15000} duration={3} /> : "0"}
              </h2>
              <p className="text-lg text-gray-700">Seguidores en Nuestras Redes</p>
            </div>
          </motion.div>
    
          <div className="border-t border-gray-300 my-4"></div>
     
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div>
              <h2 className="text-4xl font-bold text-blue-900">
                {isVisible ? <CountUp end={30} duration={2} prefix="Más de " /> : "0"}
              </h2>
              <p className="text-lg text-gray-700">Especializaciones</p>
            </div>
          </motion.div>
        </div>
  );
};
