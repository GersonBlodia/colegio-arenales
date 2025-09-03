'use client'
 
import { AccordionDesign } from "@/components/ui/Accordition/Accordion";
import { MBACard } from "@/components/ui/card/courses/MBACard";
import { LoadingComponentXDesing } from "@/components/ui/loading/LoadingComponent";
import { categories, courses } from "@/db/courses";
import { useFilterStore } from "@/hooks/useFilter";
import clsx from "clsx";
import { ChevronRight } from "lucide-react"
 
 
 
 
 
export  function MainCourses() {
  const {loading,setSelectedCategory,selectedCategory}=useFilterStore();
 
  return (
    <div>
    
    <main>
        <div className="w-[99%] mx-auto p-8">
          <div className="mb-12 text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Eventos en línea
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Aprenda de manera flexible con nuestros cursos de grado en línea
              creados por las principales universidades. Desde la licenciatura
              hasta el posgrado, haga que el aprendizaje a nivel de grado
              funcione para usted y lleve su carrera al siguiente nivel.
            </p>
          </div>
          <div className="flex gap-4 py-8 flex-col md:flex-row">
            <div className="w-[350px]">
              <h3 className="text-xl font-semibold text-[#3a343a]">
                Categorías
              </h3>
              <ul className="space-y-2">
                {categories.map((item) => (
                  <li
                    key={item}
                    onClick={() => setSelectedCategory(item)}
                    className={clsx("flex items-center  hover:underline cursor-pointer  ",   selectedCategory === item ? "text-blue-600 underline font-semibold": "text-gray-600")}
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {item} ({courses[item]?.length || 0})
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-4">
              {loading ? (
                <LoadingComponentXDesing courses={courses} selectedCategory={selectedCategory}/>
              ) : courses[selectedCategory]?.length ? (
                courses[selectedCategory].map((course, index) => (
                  <MBACard
                    key={index}
                    title={course.title}
                    slug={course.slug}
                    img={course.img}
                    description={course.description}
                  />
                ))
              ) : (
                <p className="text-gray-600">
                  Todavía no hay cursos disponibles en esta categoría.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
  
      <section className="w-[97%] mx-auto p-8">
        <h2 className="text-[#3a343a] text-[2rem] font-semibold">Gana tu licenciatura en línea y estudia a tu propio ritmo</h2>
        <p className="text-[#3a343a] text-[17px] font-semibold">Nuestras licenciaturas totalmente en línea le permiten iniciar su carrera y obtener un título a su conveniencia. Estudie de prestigiosas universidades a nivel mundial, en cualquier momento, en cualquier lugar. Equilibra su educación con sus otros compromisos sin sacrificar la calidad. </p>

        <h2 className="text-[#3a343a] text-[2rem] font-semibold">Por qué deberías elegir una licenciatura en línea</h2>
        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">Flexibilidad y comodidad</h3>
        <p className="text-[#3a343a] text-[17px] font-semibold">Nuestras licenciaturas totalmente en línea le permiten iniciar su carrera y obtener un título a su conveniencia. Estudie de prestigiosas universidades a nivel mundial, en cualquier momento, en cualquier lugar. Equilibra su educación con sus otros compromisos sin sacrificar la calidad. </p>

        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">Flexibilidad y comodidad</h3>
        <p className="text-[#3a343a] text-[17px] font-semibold">Nuestras licenciaturas totalmente en línea le permiten iniciar su carrera y obtener un título a su conveniencia. Estudie de prestigiosas universidades a nivel mundial, en cualquier momento, en cualquier lugar. Equilibra su educación con sus otros compromisos sin sacrificar la calidad. </p>

        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">Flexibilidad y comodidad</h3>
        <p className="text-[#3a343a] text-[17px] font-semibold">Nuestras licenciaturas totalmente en línea le permiten iniciar su carrera y obtener un título a su conveniencia. Estudie de prestigiosas universidades a nivel mundial, en cualquier momento, en cualquier lugar. Equilibra su educación con sus otros compromisos sin sacrificar la calidad. </p>

        <h3 className="text-[#3a343a] text-[1.4rem] font-semibold mt-2">Preguntas frecuentes</h3>
        <div className="w-[100%] mx-auto mt-8">
        <AccordionDesign id={1}
        title={"Qué puedes hacer con una licenciatura en línea?"}
        content={"Una licenciatura en línea te prepara para varios roles en varios sectores, incluyendo negocios, salud, educación, tecnología y las artes. Los graduados a menudo realizan estudios o certificaciones adicionales para avanzar aún más en sus carreras."}

        />
<AccordionDesign 
id={2}
        title={"Cuánto tiempo se tarda en obtener una licenciatura en línea?"}
        content={"La duración de completar una licenciatura en línea suele oscilar entre 3 y 4 años, dependiendo de la estructura del programa y de su ritmo de estudio."}
        
        />
        <AccordionDesign

        id={3}
        title={"Cuánto cuesta una licenciatura en línea?"}
        content={"El costo de los grados de licenciatura varía dependiendo de una multitud de factores. Los grados en línea, sin embargo, suelen costar menos que los títulos tradicionales. Con FutureLearn, usted encontrará títulos de licenciatura en línea de universidades de clase mundial a un costo más asequible que las tasas universitarias tradicionales."}
        
        />
        </div>
        



        </section>


    
    </div>
  )
}

