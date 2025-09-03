"use client";

import { useState } from "react";
 
import { ChevronDown, Menu } from 'lucide-react';
import { X } from 'lucide-react';


const NavbarComponent = () => {
  type Category = keyof typeof courses;

  const categories: Category[] = [
    "Programación y desarrollo web",
    "Desarrollo frontend",
    "Desarrollo backend",
    "Inteligencia Artificial",
    "Marketing y negocios",
    "Seguridad Informática",
    "DevOps y Cloud Computing",
    "Ciberseguridad",
    "UX/UI design",
    "Diseño y multimedia",
    "Desarrollo móvil",
    "Redes y electrónica",
    "Inglés para developers",
    "Creación de contenido",
    "Análisis y ciencia de datos",
  ];

  const courses: Record<string, string[]> = {
    "Programación y desarrollo web": [
      "HTML & CSS Ninja – Domina la base del desarrollo web",
      "Diseño UX/UI con Figma y Tailwind CSS – Crea interfaces que enamoran",
    ],
    "Desarrollo frontend": [
      "JavaScript Moderno (ES6+) al Máximo – De principiante a experto",
      "React Masterclass – Construye aplicaciones interactivas como un pro",
      "Angular Pro – Arquitectura escalable y buenas prácticas",
    ],
    "Desarrollo backend": [
      "SQL Server desde Cero – Aprende consultas, relaciones y optimización",
      "Python Backend Power – Crea APIs robustas con Django y Flask",
      "Java desde Cero a Experto – Tu camino al backend profesional",
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    "Programación y desarrollo web"
  );
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({
    subjects: false,
    courses: false,
    business: false,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = (menu: string) => {
    setIsOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <nav className="sticky top-0 z-50 bg-black bg-opacity-90 backdrop-blur-md shadow-md px-6 py-4 md:px-12 flex items-center justify-between">
      <div className="text-2xl md:text-3xl font-bold text-white">evocode</div>

      <div className="md:hidden flex items-center space-x-4">
        <button className="text-white">
       
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <button className="bg-blue-700 text-white px-4 py-1.5 font-semibold hover:bg-blue-600 text-sm">
          Registro
        </button>
      </div>

      <div
  className={`${
              menuOpen ? "flex flex-col items-start space-y-4 w-full mt-4" : "hidden"
            } md:flex md:flex-row md:items-center md:space-x-6 text-white font-semibold text-lg`}
            >
        {["Inicio", "Cursos", "Nosotros", "Servicios", "Contacto"].map(
          (item, index) => {
            const key = item.toLowerCase().replace(" ", "");
            return (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleDropdown(key)}
                  className="flex items-center gap-1 hover:underline focus:outline-none"
                  aria-expanded={isOpen[key]}
                >
                  {item} {item === "Cursos" && <ChevronDown size={20} />}
                </button>

                {isOpen[key] && item === "Cursos" && (
                  <div className="absolute left-0 top-full mt-4 w-[900px] bg-white border rounded-md shadow-lg flex p-4 z-50 hidden md:flex">
                    <div className="w-1/3 border-r pr-4">
                      <h3 className="font-bold text-black mb-2 text-lg">Cursos</h3>
                      <ul className="flex flex-wrap md:block justify-center gap-2 text-black text-sm max-h-80 overflow-auto">

                        {categories.map((category, index) => (
                          <li
                            key={index}
                            onClick={() => setSelectedCategory(category)}
                            className={`cursor-pointer px-2 py-1 rounded-md ${
                              selectedCategory === category
                                ? "bg-gray-200 font-bold"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {category} {courses[category] ? ">" : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-1/3 px-4">
                      <h3 className="font-bold text-black mb-2 text-lg">
                        Temas de {selectedCategory}
                      </h3>
                      <ul className="space-y-2 text-black text-sm">
                        {courses[selectedCategory] ? (
                          courses[selectedCategory].map((course, i) => (
                            <li
                              key={i}
                              className="text-gray-700 hover:underline cursor-pointer"
                            >
                              {course}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">No hay cursos disponibles</li>
                        )}
                      </ul>
                      <button className="mt-4 text-black font-semibold hover:underline text-sm">
                        Ver todos los cursos de {selectedCategory}
                      </button>
                    </div>
                    <div className="w-1/3 pl-4">
                      <h3 className="font-bold text-black mb-2 text-lg">Lanzamiento</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-100 p-2 rounded-md">
                          <img
                            src="/images/curso-html.jpg"
                            alt="Featured 1"
                            className="w-full rounded-md"
                          />
                          <p className="text-sm font-semibold mt-1 text-black">
                            Curso de HTML desde cero - 2025
                          </p>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-md">
                          <img
                            src="/images/curso-css.jpg"
                            alt="Featured 2"
                            className="w-full rounded-md"
                          />
                          <p className="text-sm font-semibold mt-1 text-black">
                            Curso de CSS desde cero - 2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar cursos en línea"
            className="border rounded-full px-4 py-1.5 text-gray-700 w-60 focus:ring-2 focus:ring-pink-300"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-700"
            aria-label="Search"
          >
            
          </button>
        </div>
        <button className="text-white font-semibold">Iniciar sesión</button>
        <button className="bg-blue-700 text-white px-4 py-1.5 font-semibold hover:bg-blue-600 text-sm">
          Registro
        </button>
      </div>
    </nav>
  );
};

export default NavbarComponent;
