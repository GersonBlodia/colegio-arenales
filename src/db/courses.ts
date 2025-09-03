import { Course } from "@/types/course";
export const categories :  string[]  = [
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
 export const courses: Record<string, Course[] > = {
      "Programación y desarrollo web": [
        {
          title: "HTML & CSS Ninja – Domina la base del desarrollo web",
          slug: "html-css-ninja",
          img: "https://i.ytimg.com/vi/rr2H086z16s/maxresdefault.jpg",
          description: "Aprende desde cero a crear sitios web profesionales con HTML y CSS."
        },
        {
          title: "Diseño UX/UI con Figma y Tailwind CSS – Crea interfaces que enamoran",
          slug: "ux-ui-figma-tailwind",
          img: "https://img.freepik.com/vector-gratis/fondo-degradado-ui-ux_23-2149051557.jpg",
          description: "Domina el diseño de interfaces modernas con herramientas avanzadas."
        }
      ],
      "Desarrollo frontend": [
        {
          title: "JavaScript Moderno (ES6+) al Máximo – De principiante a experto",
          slug: "javascript-moderno",
          img: "https://www.datocms-assets.com/48401/1628644950-javascript.png",
          description: "Conviértete en un experto en JavaScript  "
        },
        {
          title: "React Masterclass – Construye aplicaciones interactivas como un pro",
          slug: "react-masterclass",
          img: "https://kinsta.com/es/wp-content/uploads/sites/8/2023/04/react-must-be-in-scope-when-using-jsx.jpg",
          description: "Aprende a crear aplicaciones web con React desde cero."
        },
        {
          title: "Angular Pro – Arquitectura escalable y buenas prácticas",
          slug: "angular-pro",
          img: "https://ionic.io/blog/wp-content/uploads/2024/02/angular-feature-image-1-1024x512.png",
          description: "Domina Angular y desarrolla aplicaciones escalables."
        }
      ],
      "Desarrollo backend": [
        {
          title: "SQL Server desde Cero – Aprende consultas, relaciones y optimización",
          slug: "sql-server",
          img: "https://storage.googleapis.com/medium-feed.appspot.com/images%2F9353691196%2Fbf0353ae89496-O-que-e-SQL-Server.jpg",
          description: "Domina SQL Server y la gestión de bases de datos."
        },
        {
          title: "Python Backend Power – Crea APIs robustas con Django y Flask",
          slug: "python-backend",
          img: "https://cdn.activestate.com/wp-content/uploads/2021/12/python-coding-mistakes.jpg",
          description: "Aprende a desarrollar APIs seguras y eficientes con Python."
        },
        {
          title: "Java desde Cero a Experto – Tu camino al backend profesional",
          slug: "java-backend",
          img: "https://blog.codmind.com/content/images/2021/01/banner-12.jpg",
          description: "Domina Java para el desarrollo backend."
        }
      ]
    };