"use client";
import React, { useState } from "react";
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  DollarSign,
  Bell,
  Settings,
} from "lucide-react";
import { useDetectedRole } from "@/hooks/user/detectedRole";
import { StatsCard } from "@/components/ux/Stats/StatsCard";
import { CardGrid } from "@/components/ux/cards/CardGrid";
import { ModalCourse } from "@/components/ux/modal/ModalCourse";
import Link from "next/link";

const PageDashboard = () => {
  const { usuario } = useDetectedRole();
  // Simulamos el rol del usuario - puedes cambiar esto dinámicamente
  const userRole = usuario?.role; // 'Admin', 'Docente', 'Estudiante'

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
      roles: ["Admin", "Docente", "Estudiante"],
      description: "Vista general del sistema",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "estudiantes",
      title: "Estudiantes",
      icon: Users,
      roles: ["Admin", "Docente"],
      description: "Gestión de estudiantes y asistencia",
      color: "from-green-500 to-green-600",
      children: [
        {
          id: "lista-estudiantes",
          title: "Lista de Estudiantes",
          href: "/estudiantes",
          roles: ["Admin", "Docente"],
        },
        {
          id: "nuevo-estudiante",
          title: "Registrar Estudiante",
          href: "/estudiantes/nuevo",
          roles: ["Admin"],
        },
        {
          id: "asistencia",
          title: "Control de Asistencia",
          href: "/estudiantes/asistencia",
          roles: ["Admin", "Docente"],
        },
      ],
    },
    {
      id: "docentes",
      title: "Docentes",
      icon: GraduationCap,
      roles: ["Admin"],
      description: "Gestión de docentes y horarios",
      color: "from-purple-500 to-purple-600",
      children: [
        {
          id: "lista-docentes",
          title: "Lista de Docentes",
          href: "/docentes",
          roles: ["Admin"],
        },
        {
          id: "nuevo-docente",
          title: "Registrar Docente",
          href: "/docentes/nuevo",
          roles: ["Admin"],
        },
        {
          id: "horarios-docentes",
          title: "Horarios",
          href: "/docentes/horarios",
          roles: ["Admin"],
        },
      ],
    },
    {
      id: "academico",
      title: "Académico",
      icon: BookOpen,
      roles: ["Admin", "Docente", "Estudiante"],
      description: "Cursos, calificaciones y tareas",
      color: "from-indigo-500 to-indigo-600",
      children: [
        {
          id: "cursos",
          title: "Cursos",
          href: "/academico/cursos",
          roles: ["Admin", "Docente", "Estudiante"],
        },
        {
          id: "calificaciones",
          title: "Calificaciones",
          href: "/academico/calificaciones",
          roles: ["Admin", "Docente", "Estudiante"],
        },
        {
          id: "horarios",
          title: "Horarios de Clase",
          href: "/academico/horarios",
          roles: ["Admin", "Docente", "Estudiante"],
        },
        {
          id: "tareas",
          title: "Tareas",
          href: "/academico/tareas",
          roles: ["Docente", "Estudiante"],
        },
      ],
    },
    {
      id: "reportes",
      title: "Reportes",
      icon: FileText,
      roles: ["Admin", "Docente"],
      description: "Reportes y estadísticas",
      color: "from-orange-500 to-orange-600",
      children: [
        {
          id: "reporte-notas",
          title: "Reporte de Notas",
          href: "/reportes/notas",
          roles: ["Admin", "Docente"],
        },
        {
          id: "reporte-asistencia",
          title: "Reporte de Asistencia",
          href: "/reportes/asistencia",
          roles: ["Admin", "Docente"],
        },
        {
          id: "estadisticas",
          title: "Estadísticas",
          href: "/reportes/estadisticas",
          roles: ["Admin"],
        },
      ],
    },
    {
      id: "finanzas",
      title: "Finanzas",
      icon: DollarSign,
      roles: ["Admin"],
      description: "Pagos, mensualidades y becas",
      color: "from-emerald-500 to-emerald-600",
      children: [
        {
          id: "pagos",
          title: "Pagos",
          href: "/finanzas/pagos",
          roles: ["Admin"],
        },
        {
          id: "mensualidades",
          title: "Mensualidades",
          href: "/finanzas/mensualidades",
          roles: ["Admin"],
        },
        {
          id: "becas",
          title: "Becas",
          href: "/finanzas/becas",
          roles: ["Admin"],
        },
      ],
    },
    {
      id: "comunicaciones",
      title: "Comunicaciones",
      icon: Bell,
      roles: ["Admin", "Docente", "Estudiante"],
      description: "Notificaciones, mensajes y anuncios",
      color: "from-pink-500 to-pink-600",
      children: [
        {
          id: "notificaciones",
          title: "Notificaciones",
          href: "/comunicaciones/notificaciones",
          roles: ["Admin", "Docente", "Estudiante"],
        },
        {
          id: "mensajes",
          title: "Mensajes",
          href: "/comunicaciones/mensajes",
          roles: ["Admin", "Docente", "Estudiante"],
        },
        {
          id: "anuncios",
          title: "Anuncios",
          href: "/comunicaciones/anuncios",
          roles: ["Admin", "Docente"],
        },
      ],
    },
    {
      id: "configuracion",
      title: "Configuración",
      icon: Settings,
      roles: ["Admin"],
      description: "Usuarios, sistema y respaldos",
      color: "from-gray-500 to-gray-600",
      children: [
        {
          id: "usuarios",
          title: "Usuarios",
          href: "/configuracion/usuarios",
          roles: ["Admin"],
        },
        {
          id: "sistema",
          title: "Sistema",
          href: "/configuracion/sistema",
          roles: ["Admin"],
        },
        {
          id: "respaldos",
          title: "Respaldos",
          href: "/configuracion/respaldos",
          roles: ["Admin"],
        },
      ],
    },
  ];
  const [isActive, setIsActive] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  // Filtrar items basándose en el rol del usuario
  const filteredMenuItems = menuItems.filter(
    (item) => item.roles.includes(userRole) && item.id !== "dashboard"
  );

  const handleCardClick = (item: string) => {
    console.log("item: ", item);
    if (item) {
      setSelectedCourseId(item);
      setIsActive(true);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(249, 250, 251, 0.8), rgba(243, 244, 246, 0.8)), url('https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // Opcional para efecto parallax
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Dashboard Educativo {usuario?.name}
        </h1>
        <p className="text-gray-600 text-lg">
          Bienvenido al sistema de gestión educativa
        </p>
        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          Rol: {userRole}
        </div>
      </div>

      {/* Cards Grid */}
      <CardGrid
        filteredMenuItems={filteredMenuItems}
        handleCardClick={handleCardClick}
        userRole={usuario?.role}
      />

      {/* Stats Cards */}
      <StatsCard />

      {isActive && selectedCourseId && (
        <ModalCourse
          courseId={selectedCourseId}
          isActive={isActive}
          onClose={() => setIsActive(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
        >
          {menuItems.find((item) => item.id === selectedCourseId) && (
            <div className="space-y-6">
              {/* Header del módulo */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${
                        menuItems.find((item) => item.id === selectedCourseId)
                          ?.color || "from-blue-500 to-blue-600"
                      } rounded-lg flex items-center justify-center`}
                    >
                      {React.createElement(
                        menuItems.find((item) => item.id === selectedCourseId)
                          ?.icon || BookOpen,
                        {
                          className: "w-6 h-6 text-white",
                        }
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-1">
                      {
                        menuItems.find((item) => item.id === selectedCourseId)
                          ?.title
                      }
                    </h4>
                    <p className="text-sm text-gray-600">
                      {
                        menuItems.find((item) => item.id === selectedCourseId)
                          ?.description
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Navegación de submenús */}
              {menuItems.find((item) => item.id === selectedCourseId)
                ?.children && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Opciones Disponibles
                  </h3>
                  <nav className="grid gap-3">
                    {menuItems
                      .find((item) => item.id === selectedCourseId)
                      ?.children?.filter((child) =>
                        child.roles.includes(userRole)
                      )
                      .map((subItem, index) => (
                        <div
                          key={subItem.id}
                          className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border border-gray-100 hover:border-blue-200"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                            <span className="text-blue-600 font-bold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold  m-0 text-gray-800 group-hover:text-blue-700 transition-colors mb-1">
                              {subItem.title}
                            </h4>
                            <Link href={`/dashboard/${subItem.href}`} className=" uppercase text-sm mt-0 text-gray-500 hover:text-blue-200 transition-colors">
                              ir a {subItem.title}
                            </Link>
                          </div>
                          <div className="flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                  </nav>
                </div>
              )}

              {/* Información adicional si no hay children */}
              {!menuItems.find((item) => item.id === selectedCourseId)
                ?.children && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-yellow-700">
                      Este módulo no tiene submenús disponibles en este momento.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </ModalCourse>
      )}
    </div>
  );
};

export default PageDashboard;
