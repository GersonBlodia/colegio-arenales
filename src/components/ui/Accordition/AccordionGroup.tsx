
"use client";
import { AccordionDesign } from "./Accordion";

export const AccordionGroup = () => {
    return (
      <div className="w-full   mx-auto flex-1">
      {[
       {
        id: 1,
        title: "¿Qué es Evocode?",
        content: "Evocode es una empresa especializada en el desarrollo de software, educación tecnológica y creación de páginas web personalizadas.",
      },
      {
        id: 2,
        title: "¿Qué servicios ofrecemos?",
        content: "Brindamos desarrollo de software a medida, cursos de programación y diseño, además de páginas web optimizadas para negocios y emprendimientos.",
      },
      {
        id: 3,
        title: "¿Por qué elegirnos?",
        content: "Contamos con un equipo de expertos en tecnología, utilizamos metodologías ágiles y garantizamos soluciones eficientes e innovadoras.",
      },
      {
        id: 4,
        title: "¿Cómo puedo contratar un servicio?",
        content: "Puedes contactarnos a través de nuestro sitio web, redes sociales o correo electrónico para una consulta personalizada.",
      },
      {
        id: 5,
        title: "¿Qué tecnologías utilizamos?",
        content: "Trabajamos con tecnologías modernas como React, Next.js, Node.js, Tailwind CSS, y bases de datos como PostgreSQL y MongoDB.",
      },
      ].map(({ id, title, content }) => (
        <AccordionDesign key={id} title={title} content={content} id={id} />
      ))}
      </div>
    );
  };