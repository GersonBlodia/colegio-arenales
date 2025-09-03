import { Course } from "@/types/course";
import { CheckCircle, GraduationCap } from "lucide-react";

interface Props {
  courses: Record<string, Course[]>;
  selectedCategory: string | number;
}

export const LoadingComponentXDesing = ({ courses, selectedCategory }: Props) => {
  const courseList = courses[selectedCategory] || [];

  return (
    <div className="flex flex-wrap gap-4">
      {courseList.length > 0 &&
        courseList.map((_, index) => (
          <div
            key={index}
            className="w-[300px] h-[300px] bg-white shadow-lg overflow-hidden border border-gray-200 animate-pulse"
          >
            {/* Header */}
            <div className="bg-indigo-900 text-white text-sm font-semibold p-2 flex items-center justify-between">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-gray-400 mr-1" />
                <div className="w-24 h-4 bg-gray-400 rounded"></div>
              </span>
            </div>

            {/* Imagen simulada */}
            <div className="w-full h-40 bg-gray-300"></div>

            {/* Contenido */}
            <div className="p-4">
              <div className="w-20 h-5 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded mt-2"></div>
              <div className="w-full h-6 bg-gray-300 rounded mt-1"></div>

              {/* Icono + Texto */}
              <div className="flex items-center text-sm mt-2">
                <GraduationCap className="w-4 h-4 text-gray-400 mr-1" />
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
              </div>

              {/* Botón */}
              <div className="w-full h-10 bg-gray-300 rounded mt-4"></div>
            </div>
          </div>
        ))}
    </div>
  );
};
