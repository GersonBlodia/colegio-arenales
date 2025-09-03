"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/hooks/user/detectedRole";
import {
  BellIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { GlobalSearchComponent } from "@/components/ux/Searchcomponent";

interface HeaderProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  user?: User | undefined;
}

export const HeaderComponent: React.FC<HeaderProps> = ({
  onMobileMenuToggle,
  isMobileMenuOpen,
  user,
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [notifications] = useState([
    {
      id: 1,
      title: "Nueva tarea asignada",
      message: "Matemáticas - Ejercicios cap. 5",
      time: "5 min",
      unread: true,
    },
    {
      id: 2,
      title: "Calificación disponible",
      message: "Historia - Examen parcial",
      time: "1 h",
      unread: true,
    },
    {
      id: 3,
      title: "Recordatorio",
      message: "Reunión de padres mañana",
      time: "2 h",
      unread: false,
    },
  ]);

  // Actualizar hora actual
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Cerrar dropdowns cuando se hace click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
      if (!target.closest(".notification-dropdown")) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Aquí puedes agregar lógica para cambiar el tema
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
      },
    },
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const,
      },
    },
  };

  const badgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 15,
      },
    },
    exit: { scale: 0 },
  };

  const searchVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    blur: {
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.header
      className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <motion.button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bars3Icon className="w-5 h-5 text-gray-600" />
            </motion.div>
          </motion.button>

          {/* Page Title and Breadcrumb */}
          <div className="hidden sm:block">
            <motion.h1
              className="text-xl font-semibold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Dashboard
            </motion.h1>
            <motion.p
              className="text-sm text-gray-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Bienvenido de vuelta, {user?.name}
            </motion.p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <motion.div
            className="relative w-full"
            variants={searchVariants}
            whileFocus="focus"
            initial="blur"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
            </div>
            <GlobalSearchComponent />
            {searchValue && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchValue("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <span className="text-gray-400 hover:text-gray-600">×</span>
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Current Time */}
          <motion.div
            className="hidden lg:flex items-center space-x-2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono">{currentTime}</span>
          </motion.div>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-600" />
              )}
            </motion.div>
          </motion.button>

          {/* Notifications */}
          <div className="relative notification-dropdown">
            <motion.button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BellIcon className="w-5 h-5 text-gray-600" />
              <AnimatePresence>
                {unreadCount > 0 && (
                  <motion.span
                    variants={badgeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                               rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Notificaciones
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                          notification.unread
                            ? "border-blue-500 bg-blue-50"
                            : "border-transparent"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {notification.message}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {notification.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative profile-dropdown">
            <motion.button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <motion.div
                animate={{ rotate: isProfileOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  {[
                    {
                      icon: UserCircleIcon,
                      label: "Mi Perfil",
                      href: "/profile",
                    },
                    {
                      icon: Cog6ToothIcon,
                      label: "Configuración",
                      href: "/settings",
                    },
                  ].map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <item.icon className="w-4 h-4 mr-3 text-gray-500" />
                      {item.label}
                    </motion.a>
                  ))}

                  <div className="border-t border-gray-100 my-1"></div>

                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                    Cerrar Sesión
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
