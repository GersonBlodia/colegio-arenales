import React from 'react';
import { ChevronRight, Fingerprint } from 'lucide-react';

interface UXUICardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  imageUrl?: string;
}

export const UXUICard: React.FC<UXUICardProps> = ({
  title = "UX / UI",
  description = "Fortalece tus habilidades en diseño UX/UI en nuestra escuela, donde aprenderás a crear experiencias de...",
  buttonText = "Empieza a estudiar",
  imageUrl = "/perfil/robot-frontend.png"
}) => {
  return (
    <div className="relative w-full max-w-md h-96 bg-gradient-to-br from-teal-900 to-teal-950 rounded-2xl overflow-hidden p-6">
     
      <div className="relative z-10 w-3/5">
        {/* Icono de escuela */}
        <div className="flex items-center mb-4">
          <div className="bg-teal-500 bg-opacity-20 w-6 h-6 rounded-full flex items-center justify-center mr-2">
            <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
          </div>
          <span className="text-gray-200 text-sm">Escuela de</span>
        </div>
        
        {/* Título */}
        <h2 className="text-white text-3xl font-bold mb-4">{title}</h2>
        
        {/* Descripción */}
        <p className="text-gray-300 text-sm mb-6">
          {description}
        </p>
        
        {/* Botón de acción */}
        <button className="flex items-center text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
          {buttonText}
          <span className="inline-flex items-center justify-center ml-2 w-6 h-6 bg-teal-500 bg-opacity-20 rounded-full">
            <ChevronRight size={16} />
          </span>
        </button>
      </div>
      
      
      <div className="absolute w-full bottom-0 right-0 h-full flex items-end">
        <img 
          src={imageUrl} 
          alt="UX/UI instructor" 
          className="h-64 object-cover object-center"
          style={{ maxWidth: '45%', position: 'absolute', right: '0', bottom: '0' }}
        />
      </div>
      
      {/* Icono de escudo/insignia */}
      <div className="absolute top-6 right-6 w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center">
        <Fingerprint size={24} className="text-teal-950" />
      </div>
    </div>
  );
};

 