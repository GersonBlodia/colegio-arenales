import { CheckCircle, GraduationCap } from "lucide-react";
 
export const MBACard :React.FC<{title: string; slug:string, img:string, description:string}>=({title,slug,img,description}) => {
    return (
      <div className=" w-[300px] h-[300px]  bg-white shadow-lg   overflow-hidden border border-gray-200">
        <div className="bg-indigo-900 text-white text-sm font-semibold p-2 flex items-center justify-between">
          <span className="flex  items-center"><CheckCircle className="w-4 h-4 text-gray-100 mr-1" />Arriba Grado</span>
        </div>
        <img 
          src={img} 
          alt="MBA" 
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <span className="bg-pink-200 text-pink-700 text-xs font-semibold px-2 py-1 rounded">{title.length> 10 ? title.slice(0,10)   : title}</span>
          <h3 className="text-gray-600 text-sm mt-2">Universidad de Roehampton</h3>
          <h2 className="text-lg font-semibold mt-1">{description } </h2>
          <div className="flex items-center text-gray-500 text-sm mt-2"> 
          <span className="text-sm mb-2 flex items-center">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        Maestría
                      </span>
          </div>
          <button
          
          className="w-full bg-pink-600 text-white font-semibold py-2 rounded mt-4 hover:bg-pink-700 transition">
            Más información 
          </button>
        </div>

    
      </div>
    );
  };
  