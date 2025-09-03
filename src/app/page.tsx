"use client"
import { useTheme } from '@/components/ui/theme/ThemeProvider';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Header con toggle de tema */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Prueba de Modo Oscuro</h1>
        
        <motion.button
          onClick={toggleTheme}
          className="p-3 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isDarkMode ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-500" />
            ) : (
              <MoonIcon className="w-6 h-6 text-muted-foreground" />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Contenido de prueba */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <motion.div 
          className="bg-card border border-border rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-card-foreground">
            Estado Actual
          </h2>
          <p className="text-muted-foreground mb-4">
            Actualmente estás en modo: 
            <span className="font-bold text-foreground ml-1">
              {isDarkMode ? 'Oscuro 🌙' : 'Claro ☀️'}
            </span>
          </p>
          <div className="text-sm text-muted-foreground">
            Haz clic en el botón de arriba para cambiar
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          className="bg-card border border-border rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-card-foreground">
            Colores de Prueba
          </h2>
          <div className="space-y-2">
            <div className="p-2 bg-primary rounded text-primary-foreground text-sm">
              Color Primary
            </div>
            <div className="p-2 bg-secondary rounded text-secondary-foreground text-sm">
              Color Secondary
            </div>
            <div className="p-2 bg-accent rounded text-accent-foreground text-sm">
              Color Accent
            </div>
            <div className="p-2 bg-muted rounded text-muted-foreground text-sm">
              Color Muted
            </div>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          className="bg-card border border-border rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-card-foreground">
            Elementos Interactivos
          </h2>
          
          <div className="space-y-3">
            <button className="w-full p-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
              Botón Primary
            </button>
            
            <input 
              type="text" 
              placeholder="Campo de entrada"
              className="w-full p-2 border border-input rounded bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
              ⚠️ Mensaje de alerta
            </div>
          </div>
        </motion.div>

        {/* Card 4 - Sidebar preview */}
        <motion.div 
          className="bg-sidebar border border-sidebar-border rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-sidebar-foreground">
            Vista Previa Sidebar
          </h2>
          
          <div className="space-y-2">
            <div className="p-2 bg-sidebar-primary rounded text-sidebar-primary-foreground text-sm">
              Header del Sidebar
            </div>
            <div className="p-2 bg-sidebar-accent rounded text-sidebar-accent-foreground text-sm">
              Elemento Activo
            </div>
            <div className="text-sidebar-foreground/70 text-sm">
              Texto normal del sidebar
            </div>
          </div>
        </motion.div>

        {/* Card 5 - Popover preview */}
        <motion.div 
          className="bg-popover border border-border rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-popover-foreground">
            Vista Previa Popover
          </h2>
          <p className="text-sm text-popover-foreground/70">
            Este es el aspecto que tendrán los menús desplegables y tooltips.
          </p>
        </motion.div>

        {/* Card 6 - Estado del tema */}
        <motion.div 
          className="bg-card border border-border rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-card-foreground">
            Información del Tema
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Modo:</span>
              <span className="text-foreground font-medium">
                {isDarkMode ? 'Oscuro' : 'Claro'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guardado:</span>
              <span className="text-foreground font-medium">
                {typeof window !== 'undefined' ? localStorage.getItem('theme') || 'Auto' : 'Auto'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sistema:</span>
              <span className="text-foreground font-medium">
                {typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Oscuro' : 'Claro'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <p className="text-muted-foreground text-sm">
          🌙 Prueba completa del sistema de modo oscuro implementado
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          El tema se guarda automáticamente en localStorage
        </p>
      </motion.div>
    </div>
  );
}