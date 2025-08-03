"use client"
import React from 'react';
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  DollarSign,
  Bell,
  Settings,
  ChevronRight
} from 'lucide-react';

const PageDashboard = () => {
  // Simulamos el rol del usuario - puedes cambiar esto dinámicamente
  const userRole = 'Admin'; // 'Admin', 'Docente', 'Estudiante'

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      href: '/dashboard',
      roles: ['Admin', 'Docente', 'Estudiante'],
      description: 'Vista general del sistema',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'estudiantes',
      title: 'Estudiantes',
      icon: Users,
      roles: ['Admin', 'Docente'],
      description: 'Gestión de estudiantes y asistencia',
      color: 'from-green-500 to-green-600',
      children: [
        { id: 'lista-estudiantes', title: 'Lista de Estudiantes', href: '/estudiantes', roles: ['Admin', 'Docente'] },
        { id: 'nuevo-estudiante', title: 'Registrar Estudiante', href: '/estudiantes/nuevo', roles: ['Admin'] },
        { id: 'asistencia', title: 'Control de Asistencia', href: '/estudiantes/asistencia', roles: ['Admin', 'Docente'] }
      ]
    },
    {
      id: 'docentes',
      title: 'Docentes',
      icon: GraduationCap,
      roles: ['Admin'],
      description: 'Gestión de docentes y horarios',
      color: 'from-purple-500 to-purple-600',
      children: [
        { id: 'lista-docentes', title: 'Lista de Docentes', href: '/docentes', roles: ['Admin'] },
        { id: 'nuevo-docente', title: 'Registrar Docente', href: '/docentes/nuevo', roles: ['Admin'] },
        { id: 'horarios-docentes', title: 'Horarios', href: '/docentes/horarios', roles: ['Admin'] }
      ]
    },
    {
      id: 'academico',
      title: 'Académico',
      icon: BookOpen,
      roles: ['Admin', 'Docente', 'Estudiante'],
      description: 'Cursos, calificaciones y tareas',
      color: 'from-indigo-500 to-indigo-600',
      children: [
        { id: 'cursos', title: 'Cursos', href: '/academico/cursos', roles: ['Admin', 'Docente', 'Estudiante'] },
        { id: 'calificaciones', title: 'Calificaciones', href: '/academico/calificaciones', roles: ['Admin', 'Docente', 'Estudiante'] },
        { id: 'horarios', title: 'Horarios de Clase', href: '/academico/horarios', roles: ['Admin', 'Docente', 'Estudiante'] },
        { id: 'tareas', title: 'Tareas', href: '/academico/tareas', roles: ['Docente', 'Estudiante'] }
      ]
    },
    {
      id: 'reportes',
      title: 'Reportes',
      icon: FileText,
      roles: ['Admin', 'Docente'],
      description: 'Reportes y estadísticas',
      color: 'from-orange-500 to-orange-600',
      children: [
        { id: 'reporte-notas', title: 'Reporte de Notas', href: '/reportes/notas', roles: ['Admin', 'Docente'] },
        { id: 'reporte-asistencia', title: 'Reporte de Asistencia', href: '/reportes/asistencia', roles: ['Admin', 'Docente'] },
        { id: 'estadisticas', title: 'Estadísticas', href: '/reportes/estadisticas', roles: ['Admin'] }
      ]
    },
    {
      id: 'finanzas',
      title: 'Finanzas',
      icon: DollarSign,
      roles: ['Admin'],
      description: 'Pagos, mensualidades y becas',
      color: 'from-emerald-500 to-emerald-600',
      children: [
        { id: 'pagos', title: 'Pagos', href: '/finanzas/pagos', roles: ['Admin'] },
        { id: 'mensualidades', title: 'Mensualidades', href: '/finanzas/mensualidades', roles: ['Admin'] },
        { id: 'becas', title: 'Becas', href: '/finanzas/becas', roles: ['Admin'] }
      ]
    },
    {
      id: 'comunicaciones',
      title: 'Comunicaciones',
      icon: Bell,
      roles: ['Admin', 'Docente', 'Estudiante'],
      description: 'Notificaciones, mensajes y anuncios',
      color: 'from-pink-500 to-pink-600',
      children: [
        { id: 'notificaciones', title: 'Notificaciones', href: '/comunicaciones/notificaciones', roles: ['Admin', 'Docente', 'Estudiante'] },
        { id: 'mensajes', title: 'Mensajes', href: '/comunicaciones/mensajes', roles: ['Admin', 'Docente', 'Estudiante'] },
        { id: 'anuncios', title: 'Anuncios', href: '/comunicaciones/anuncios', roles: ['Admin', 'Docente'] }
      ]
    },
    {
      id: 'configuracion',
      title: 'Configuración',
      icon: Settings,
      roles: ['Admin'],
      description: 'Usuarios, sistema y respaldos',
      color: 'from-gray-500 to-gray-600',
      children: [
        { id: 'usuarios', title: 'Usuarios', href: '/configuracion/usuarios', roles: ['Admin'] },
        { id: 'sistema', title: 'Sistema', href: '/configuracion/sistema', roles: ['Admin'] },
        { id: 'respaldos', title: 'Respaldos', href: '/configuracion/respaldos', roles: ['Admin'] }
      ]
    }
  ];

  // Filtrar items basándose en el rol del usuario
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole) && item.id !== 'dashboard'
  );

  const handleCardClick = (item) => {
    if (item.href) {
      console.log(`Navegando a: ${item.href}`);
      // Aquí iría la navegación real
    } else if (item.children && item.children.length > 0) {
      // Si tiene hijos, navegar al primero disponible para el rol
      const firstAvailableChild = item.children.find(child => 
        child.roles.includes(userRole)
      );
      if (firstAvailableChild) {
        console.log(`Navegando a: ${firstAvailableChild.href}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" style={{
    background: 
      "linear-gradient(to bottom right, rgba(249, 250, 251, 0.8), rgba(243, 244, 246, 0.8)), url('https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed" // Opcional para efecto parallax
  }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Dashboard Educativo
        </h1>
        <p className="text-gray-600 text-lg">
          Bienvenido al sistema de gestión educativa
        </p>
        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          Rol: {userRole}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMenuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Card Content */}
              <div className="relative p-6">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} mb-4 shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Children Count */}
                {item.children && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.children.filter(child => child.roles.includes(userRole)).length} opciones
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                )}

                {/* Hover Effect Border */}
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Estudiantes</p>
              <p className="text-3xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
              <p className="text-3xl font-bold text-gray-900">42</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Docentes</p>
              <p className="text-3xl font-bold text-gray-900">89</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashboard;