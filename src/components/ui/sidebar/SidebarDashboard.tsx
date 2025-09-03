"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
 
import { 
  ChevronDownIcon, 
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  ChartBarIcon,
  CalendarIcon,
  UserIcon,
  BellIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useDetectedRole, User } from '@/hooks/user/detectedRole';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
  children?: MenuItem[];
  roles: string[];
}
interface PropsSidebar{
    setIsMobileOpen: Dispatch<SetStateAction<boolean>>
    isMobileOpen: boolean
    usuario: User | undefined;
}
export const Sidebar = ({setIsMobileOpen,isMobileOpen, usuario}:PropsSidebar) => {
  
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: HomeIcon,
      href: '/dashboard',
      roles: ['Admin', 'Docente', 'Estudiante']
    },
    {
      id: 'estudiantes',
      title: 'Estudiantes',
      icon: UserGroupIcon,
      roles: ['Admin', 'Docente'],
      children: [
        { id: 'lista-estudiantes', title: 'Lista de Estudiantes', icon: UserIcon, href: '/estudiantes', roles: ['Admin', 'Docente'] },
        { id: 'nuevo-estudiante', title: 'Registrar Estudiante', icon: UserIcon, href: '/estudiantes/nuevo', roles: ['Admin'] },
        { id: 'asistencia', title: 'Control de Asistencia', icon: ClipboardDocumentListIcon, href: '/estudiantes/asistencia', roles: ['Admin', 'Docente'] }
      ]
    },
    {
      id: 'docentes',
      title: 'Docentes',
      icon: AcademicCapIcon,
      roles: ['Admin'],
      children: [
        { id: 'lista-docentes', title: 'Lista de Docentes', icon: UserIcon, href: '/docentes', roles: ['Admin'] },
        { id: 'nuevo-docente', title: 'Registrar Docente', icon: UserIcon, href: '/docentes/nuevo', roles: ['Admin'] },
        { id: 'horarios-docentes', title: 'Horarios', icon: CalendarIcon, href: '/docentes/horarios', roles: ['Admin'] }
      ]
    },
    {
      id: 'academico',
      title: 'Académico',
      icon: BookOpenIcon,
      roles: ['Admin', 'Docente', 'Estudiante'],
      children: [
        { id: 'cursos', title: 'Cursos', icon: BookOpenIcon, href: '/academico/cursos', roles: ['Admin', 'Docente', 'Estudiante'] },
        { id: 'calificaciones', title: 'Calificaciones', icon: ChartBarIcon, href: '/academico/calificaciones', roles: ['Admin', 'Docente', 'Estudiante'] },
        { id: 'horarios', title: 'Horarios de Clase', icon: CalendarIcon, href: '/academico/horarios', roles: ['Admin', 'Docente', 'Estudiante'] },
        { id: 'tareas', title: 'Tareas', icon: ClipboardDocumentListIcon, href: '/academico/tareas', roles: ['Docente', 'Estudiante'] }
      ]
    },
    {
      id: 'reportes',
      title: 'Reportes',
      icon: DocumentTextIcon,
      roles: ['Admin', 'Docente'],
      children: [
        { id: 'reporte-notas', title: 'Reporte de Notas', icon: ChartBarIcon, href: '/reportes/notas', roles: ['Admin', 'Docente'] },
        { id: 'reporte-asistencia', title: 'Reporte de Asistencia', icon: ClipboardDocumentListIcon, href: '/reportes/asistencia', roles: ['Admin', 'Docente'] },
        { id: 'estadisticas', title: 'Estadísticas', icon: ChartBarIcon, href: '/reportes/estadisticas', roles: ['Admin'] }
      ]
    },
    {
      id: 'finanzas',
      title: 'Finanzas',
      icon: CurrencyDollarIcon,
      roles: ['Admin'],
      children: [
        { id: 'pagos', title: 'Pagos', icon: CurrencyDollarIcon, href: '/finanzas/pagos', roles: ['Admin'] },
        { id: 'mensualidades', title: 'Mensualidades', icon: DocumentTextIcon, href: '/finanzas/mensualidades', roles: ['Admin'] },
        { id: 'becas', title: 'Becas', icon: ShieldCheckIcon, href: '/finanzas/becas', roles: ['Admin'] }
      ]
    },
    {
      id: 'comunicaciones',
      title: 'Comunicaciones',
      icon: BellIcon,
      roles: ['Admin', 'Docente', 'Estudiante'],
      children: [
        { id: 'notificaciones', title: 'Notificaciones', icon: BellIcon, href: '/comunicaciones/notificaciones', roles: ['Admin', 'Docente', 'Estudiante'] },
        { id: 'mensajes', title: 'Mensajes', icon: DocumentTextIcon, href: '/comunicaciones/mensajes', roles: ['Admin', 'Docente', 'Estudiante'] },
        { id: 'anuncios', title: 'Anuncios', icon: BellIcon, href: '/comunicaciones/anuncios', roles: ['Admin', 'Docente'] }
      ]
    },
    {
      id: 'configuracion',
      title: 'Configuración',
      icon: CogIcon,
      roles: ['Admin'],
      children: [
        { id: 'usuarios', title: 'Usuarios', icon: UserIcon, href: '/configuracion/usuarios', roles: ['Admin'] },
        { id: 'sistema', title: 'Sistema', icon: CogIcon, href: '/configuracion/sistema', roles: ['Admin'] },
        { id: 'respaldos', title: 'Respaldos', icon: ShieldCheckIcon, href: '/configuracion/respaldos', roles: ['Admin'] }
      ]
    }
  ];

  const toggleDropdown = (itemId: string): void => {
    setOpenDropdowns(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filterMenuByRole = (items: MenuItem[]): MenuItem[] => {
    if (!usuario?.role) return [];
    
    return items.filter(item => {
      if (!item.roles.includes(usuario.role)) return false;
      
      if (item.children) {
        item.children = filterMenuByRole(item.children);
        return item.children.length > 0;
      }
      
      return true;
    });
  };

  const filteredMenu = filterMenuByRole(menuItems);
 
  useEffect(() => {
    const desktop= 1000;
    if (window.innerWidth >= desktop) {
         setIsMobileOpen(true);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth <= desktop) {
        setIsMobileOpen(false);
      } else {
        setIsMobileOpen(true);
      }
    });
  }, [])
  
  // Animation variants
  const dropdownVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
        when: "beforeChildren" as const,
        staggerChildren: 0.05
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const,
        when: "afterChildren" as const
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut" as const }
    },
    closed: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.1, ease: "easeIn" as const }
    }
  };

  const chevronVariants = {
    open: {
      rotate: 0,
      transition: { duration: 0.2, ease: "easeOut" as const }
    },
    closed: {
      rotate: -90,
      transition: { duration: 0.2, ease: "easeOut" as const }
    }
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0): React.ReactNode => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openDropdowns.includes(item.id);
    const IconComponent = item.icon;

    return (
      <div key={item.id} className="w-full">
        <motion.div
          className={`
            flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 
            hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer
            ${level > 0 ? 'pl-12' : 'pl-4'}
          `}
          onClick={() => hasChildren ? toggleDropdown(item.id) : null}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3">
            <IconComponent className="w-5 h-5" />
            <span>{item.title}</span>
          </div>
          
          {hasChildren && (
            <motion.div
              variants={chevronVariants}
              animate={isOpen ? "open" : "closed"}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </motion.div>
          )}
        </motion.div>
        
        <AnimatePresence>
          {hasChildren && isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="bg-gray-50 overflow-hidden"
            >
              {item.children?.map(child => (
                <motion.div
                  key={child.id}
                  variants={itemVariants}
                >
                  {renderMenuItem(child, level + 1)}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  if (!usuario) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 h-screen flex items-center justify-center">
        <motion.div 
          className="text-gray-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Cargando...
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-md bg-white shadow-md border border-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <XMarkIcon className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bars3Icon className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            className="fixed inset-0 bg-black z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 
          flex flex-col lg:translate-x-0
        `}
        variants={sidebarVariants}
        animate={isMobileOpen ? "open" : "closed"}
        initial={false}
      >
        
        {/* Header */}
        <motion.div
  className="flex items-center justify-center h-16 px-4 bg-blue-600 text-white"
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.1 }}
>
  <div className="flex items-center space-x-3">
    {/* Logo */}
    <div className="relative">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
        </svg>
      </div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
        <span className="text-xs text-blue-600 font-bold">★</span>
      </div>
    </div>
    
    {/* Título */}
    <h1 className="text-lg font-bold">Colegio de 22393</h1>
  </div>
</motion.div>
        
        {/* User Info */}
        <motion.div 
          className="flex items-center p-4 bg-gray-50 border-b border-gray-200"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.img 
            src={usuario.avatar} 
            alt={usuario.name}
            className="w-10 h-10 rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{usuario.name}</p>
            <motion.p 
              className="text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {usuario.role}
            </motion.p>
          </div>
        </motion.div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <motion.div 
            className="py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {filteredMenu.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {renderMenuItem(item)}
              </motion.div>
            ))}
          </motion.div>
        </nav>
        
        {/* Footer */}
        <motion.div 
          className="p-4 border-t border-gray-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs text-gray-500 text-center">
            © 2025 Colegio de Programadores
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

 