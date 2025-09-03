"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Rocket, Database, Layout, Code, BarChart } from 'lucide-react';

// Componente de la tarjeta individual
const LearningPathCard = ({ data, isActive }) => {
  const { title, subtitle, description, color, icon, isFeatured } = data;
  
  const colorMap = {
    blue: {
      bg: 'bg-blue-950',
      border: 'border-blue-500',
      text: 'text-blue-500',
      glow: 'from-blue-500/50',
      button: 'bg-blue-500'
    },
    green: {
      bg: 'bg-green-950',
      border: 'border-green-500',
      text: 'text-green-500',
      glow: 'from-green-500/50',
      button: 'bg-green-500'
    },
    red: {
      bg: 'bg-red-950',
      border: 'border-red-500',
      text: 'text-red-500',
      glow: 'from-red-500/50',
      button: 'bg-red-500'
    },
    yellow: {
      bg: 'bg-yellow-950',
      border: 'border-yellow-500',
      text: 'text-yellow-500',
      glow: 'from-yellow-500/50',
      button: 'bg-yellow-500'
    },
    purple: {
      bg: 'bg-purple-950',
      border: 'border-purple-500',
      text: 'text-purple-500',
      glow: 'from-purple-500/50',
      button: 'bg-purple-500'
    }
  };

  const colorStyle = colorMap[color];
  const iconComponents = {
    rocket: <Rocket size={18} />,
    database: <Database size={18} />,
    layout: <Layout size={18} />,
    code: <Code size={18} />,
    chart: <BarChart size={18} />
  };

  const cardScale = isActive ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-50';
  const transitionClass = 'transition-all duration-300 ease-in-out';

  return (
    <div className={`w-64 h-[30rem] ${colorStyle.bg} rounded-lg overflow-hidden relative ${cardScale} ${transitionClass}`}>
      {/* Imagen y círculos que brillan */}
      <div className="h-64 flex justify-center items-center relative">
        <div className={`absolute top-1/2 transform -translate-y-1/2 w-48 h-48 rounded-full border-2 ${colorStyle.border} opacity-20`}></div>
        <div className={`absolute top-1/2 transform -translate-y-1/2 w-56 h-56 rounded-full border-2 ${colorStyle.border} opacity-20`}></div>
        
        {/* Imagen de la persona */}
        <img 
          src="/perfil/robot-frontend.png" 
          alt={title} 
          className="h-full object-cover z-10"
        />
        
        {/* Efecto de luz inferior */}
        <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${colorStyle.glow} to-transparent opacity-60`}></div>

        {/* Icono con badge de destacado */}
        <div className="absolute top-8 right-8 z-20">
          <div className={`w-10 h-10 ${colorStyle.button} rounded-lg flex items-center justify-center`}>
            <span className="text-white">
              {iconComponents[icon]}
            </span>
          </div>
          {isFeatured && (
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 w-5 h-5 rounded-full flex items-center justify-center">
              <span className="text-xs">⭐</span>
            </div>
          )}
        </div>
      </div>

      {/* Contenido de texto */}
      <div className="p-4">
        {/* Botón de "Escuela de" */}
        <div className="mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${colorStyle.button} text-white`}>
            ● Escuela de
          </span>
        </div>

        {/* Título */}
        <h3 className="text-white text-xl font-bold uppercase mb-1">{title}</h3>
        <h4 className="text-white text-xl font-bold uppercase mb-3">{subtitle}</h4>
        
        {/* Descripción */}
        <p className="text-gray-400 text-sm">
          {description}
        </p>
        
        {/* Botón de "Empieza a estudiar" */}
        <div className="mt-4 flex">
          <a href="#" className={`text-${color}-400 hover:text-${color}-300 text-sm`}>
            Empieza a estudiar
            <span className="inline-flex items-center justify-center ml-1 w-6 h-6 rounded-full bg-opacity-20 bg-purple-500">
              <ChevronRight size={14} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente de carrusel principal
const LearningPathSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Datos de las tarjetas
  const cards = [
    {
      title: "INTELIGENCIA",
      subtitle: "ARTIFICIAL",
      description: "Conviértete en experto en inteligencia artificial en nuestra escuela especializada que te guiará en todo el proceso.",
      color: "yellow",
      icon: "chart",
      isFeatured: true
    },
    {
      title: "MARKETING Y",
      subtitle: "NEGOCIOS",
      description: "Aprende marketing y negocios en nuestra escuela, donde te prepararás para el entorno digital...",
      color: "purple",
      icon: "rocket",
      isFeatured: true
    },
    {
      title: "PROGRAMACIÓN Y",
      subtitle: "DESARROLLO WEB",
      description: "Aprende programación y desarrollo web desde cero con las tecnologías más demandadas.",
      color: "blue",
      icon: "code",
      isFeatured: true
    },
    {
      title: "DESARROLLO",
      subtitle: "FRONTEND",
      description: "Domina el desarrollo frontend y crea interfaces web atractivas y funcionales.",
      color: "green",
      icon: "layout",
      isFeatured: true
    },
    {
      title: "DESARROLLO",
      subtitle: "BACKEND",
      description: "Domina el desarrollo backend en esta escuela especializada que te guiará en todo el proceso.",
      color: "red",
      icon: "database",
      isFeatured: true
    }
  ];

  // Lógica para el swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextCard();
    }
    if (isRightSwipe) {
      prevCard();
    }
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  // Función para el autoslide
  useEffect(() => {
    const interval = setInterval(() => {
      nextCard();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Renderiza las cards con posición relativa
  const renderCards = () => {
    return cards.map((card, index) => {
      // Determine isActive
      const isActive = index === currentIndex;
      
      // Calcular la posición
      let position = "translate-x-0";
      
      if (index < currentIndex) {
        position = "-translate-x-16";
      } else if (index > currentIndex) {
        position = "translate-x-16";
      }
      
      return (
        <div 
          key={index} 
          className={`absolute transition-all duration-300 ease-in-out ${position}`}
          style={{
            zIndex: isActive ? 10 : 5 - Math.abs(index - currentIndex)
          }}
        >
          <LearningPathCard data={card} isActive={isActive} />
        </div>
      );
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div 
        className="relative w-64 h-96 mx-auto"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {renderCards()}
        
        {/* Controles de navegación */}
        <div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2 px-4 z-20">
          <button 
            onClick={prevCard}
            className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-70 text-white flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextCard}
            className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-70 text-white flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-4' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPathSlider;