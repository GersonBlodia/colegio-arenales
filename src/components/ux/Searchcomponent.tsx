"use client";
import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";
// Interfaces
interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: "route" | "student" | "course" | "task";
  route?: string;
  icon?: string;
  data?: any;
}

interface GlobalSearchProps {
  onNavigate?: (route: string) => void;
  onSelect?: (result: SearchResult) => void;
  className?: string;
  placeholder?: string;
  maxResults?: number;
}

interface SearchCategory {
  title: string;
  type: SearchResult["type"];
  results: SearchResult[];
}

// Datos de ejemplo - aquí conectarías con tu API/estado real
const mockData: SearchResult[] = [
  // Rutas/Navegación
  {
    id: "dashboard",
    title: "Dashboard",
    type: "route",
    route: "/dashboard",
    icon: "🏠",
  },
  {
    id: "students",
    title: "Estudiantes",
    type: "route",
    route: "/students",
    icon: "👥",
  },
  {
    id: "courses",
    title: "Cursos",
    type: "route",
    route: "/courses",
    icon: "📚",
  },
  { id: "tasks", title: "Tareas", type: "route", route: "/tasks", icon: "📝" },
  {
    id: "calendar",
    title: "Calendario",
    type: "route",
    route: "/calendar",
    icon: "📅",
  },
  {
    id: "reports",
    title: "Reportes",
    type: "route",
    route: "/reports",
    icon: "📊",
  },
  {
    id: "settings",
    title: "Configuración",
    type: "route",
    route: "/settings",
    icon: "⚙️",
  },
  {
    id: "profile",
    title: "Mi Perfil",
    type: "route",
    route: "/profile",
    icon: "👤",
  },

  // Estudiantes
  {
    id: "student-1",
    title: "María González",
    subtitle: "Estudiante • Ingeniería",
    type: "student",
    route: "/students/1",
    icon: "👩‍🎓",
  },
  {
    id: "student-2",
    title: "Juan Pérez",
    subtitle: "Estudiante • Medicina",
    type: "student",
    route: "/students/2",
    icon: "👨‍🎓",
  },
  {
    id: "student-3",
    title: "Ana Rodríguez",
    subtitle: "Estudiante • Derecho",
    type: "student",
    route: "/students/3",
    icon: "👩‍🎓",
  },
  {
    id: "student-4",
    title: "Carlos López",
    subtitle: "Estudiante • Arquitectura",
    type: "student",
    route: "/students/4",
    icon: "👨‍🎓",
  },
  {
    id: "student-5",
    title: "Sofia Martínez",
    subtitle: "Estudiante • Psicología",
    type: "student",
    route: "/students/5",
    icon: "👩‍🎓",
  },

  // Cursos
  {
    id: "course-1",
    title: "Matemáticas Avanzadas",
    subtitle: "Prof. Dr. Smith • 45 estudiantes",
    type: "course",
    route: "/courses/1",
    icon: "📐",
  },
  {
    id: "course-2",
    title: "Historia Universal",
    subtitle: "Prof. Dra. García • 32 estudiantes",
    type: "course",
    route: "/courses/2",
    icon: "🏛️",
  },
  {
    id: "course-3",
    title: "Química Orgánica",
    subtitle: "Prof. Dr. Johnson • 28 estudiantes",
    type: "course",
    route: "/courses/3",
    icon: "🧪",
  },
  {
    id: "course-4",
    title: "Literatura Española",
    subtitle: "Prof. Dra. Morales • 35 estudiantes",
    type: "course",
    route: "/courses/4",
    icon: "📖",
  },
  {
    id: "course-5",
    title: "Física Cuántica",
    subtitle: "Prof. Dr. Einstein • 15 estudiantes",
    type: "course",
    route: "/courses/5",
    icon: "⚛️",
  },

  // Tareas
  {
    id: "task-1",
    title: "Ensayo de Historia",
    subtitle: "Vence: 15 Mar • Historia Universal",
    type: "task",
    route: "/tasks/1",
    icon: "📄",
  },
  {
    id: "task-2",
    title: "Laboratorio de Química",
    subtitle: "Vence: 20 Mar • Química Orgánica",
    type: "task",
    route: "/tasks/2",
    icon: "🔬",
  },
  {
    id: "task-3",
    title: "Examen de Matemáticas",
    subtitle: "Fecha: 25 Mar • Matemáticas Avanzadas",
    type: "task",
    route: "/tasks/3",
    icon: "📊",
  },
  {
    id: "task-4",
    title: "Proyecto Final",
    subtitle: "Vence: 30 Mar • Literatura Española",
    type: "task",
    route: "/tasks/4",
    icon: "📚",
  },
  {
    id: "task-5",
    title: "Práctica de Física",
    subtitle: "Vence: 10 Abr • Física Cuántica",
    type: "task",
    route: "/tasks/5",
    icon: "🎯",
  },
];

const typeIcons = {
  route: "🧭",
  student: "👤",
  course: "📚",
  task: "📝",
};

const typeLabels = {
  route: "Navegación",
  student: "Estudiantes",
  course: "Cursos",
  task: "Tareas",
};

const typeColors = {
  route: "bg-blue-100 text-blue-700 border-blue-200",
  student: "bg-green-100 text-green-700 border-green-200",
  course: "bg-purple-100 text-purple-700 border-purple-200",
  task: "bg-orange-100 text-orange-700 border-orange-200",
};

export const GlobalSearchComponent: React.FC<GlobalSearchProps> = ({
  onNavigate,
  onSelect,
  className = "",
  placeholder = "Buscar estudiantes, cursos, tareas...",
  maxResults = 8,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [currentFocusIndex, setCurrentFocusIndex] = useState<number>(-1);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simular búsqueda con delay
  const performSearch = async (
    searchQuery: string
  ): Promise<SearchResult[]> => {
    if (!searchQuery.trim()) return [];

    setIsLoading(true);

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 200));

    const filtered = mockData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setIsLoading(false);
    return filtered.slice(0, maxResults);
  };

  const handleInputChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const value = e.target.value;
    setQuery(value);
    setCurrentFocusIndex(-1);

    if (value.trim()) {
      if (!isOpen) setIsOpen(true);
      const results = await performSearch(value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen && query.trim()) {
          setIsOpen(true);
        } else if (searchResults.length > 0) {
          setCurrentFocusIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (searchResults.length > 0) {
          setCurrentFocusIndex((prev) =>
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
        }
        break;

      case "Enter":
        e.preventDefault();
        if (currentFocusIndex >= 0 && searchResults[currentFocusIndex]) {
          handleSelect(searchResults[currentFocusIndex]);
        }
        break;

      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setCurrentFocusIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (result: SearchResult): void => {
    setQuery(result.title);
    setIsOpen(false);
    setCurrentFocusIndex(-1);

    onSelect?.(result);

    if (result.route && onNavigate) {
      onNavigate(result.route);
    }
  };

  const handleClear = (): void => {
    setQuery("");
    setSearchResults([]);
    setIsOpen(false);
    setCurrentFocusIndex(-1);
    inputRef.current?.focus();
  };

  const handleFocus = (): void => {
    if (query.trim() && searchResults.length > 0) {
      setIsOpen(true);
    }
  };

  // Agrupar resultados por tipo
  const groupedResults: SearchCategory[] = [];
  const types = ["route", "student", "course", "task"] as const;

  types.forEach((type) => {
    const results = searchResults.filter((result) => result.type === type);
    if (results.length > 0) {
      groupedResults.push({
        title: typeLabels[type],
        type,
        results,
      });
    }
  });

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setCurrentFocusIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let globalIndex = 0;

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto ${className}`}
      ref={searchRef}
    >
      {/* Search Input */}
      <div
        className={`
        relative bg-white border-2 rounded-xl shadow-sm transition-all duration-200
        ${
          isOpen
            ? "border-blue-500 shadow-lg"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
      >
        <div className="relative flex items-center">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
            ) : (
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-[4px] text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-base rounded-xl"
            autoComplete="off"
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
          />

          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Limpiar búsqueda"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-hidden">
          {searchResults.length === 0 && !isLoading && query.trim() && (
            <div className="p-8 text-center text-gray-500">
              <div className="flex flex-col items-center space-y-3">
                <svg
                  className="w-12 h-12 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.002-5.824-2.709M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium">No se encontraron resultados</p>
                  <p className="text-sm text-gray-400">
                    Intenta con otros términos de búsqueda
                  </p>
                </div>
              </div>
            </div>
          )}

          {groupedResults.length > 0 && (
            <div className="py-2 max-h-96 overflow-y-auto">
              {groupedResults.map((category) => (
                <div key={category.type} className="mb-1 last:mb-0">
                  {/* Category Header */}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-b border-gray-100 flex items-center space-x-2">
                    <span>{typeIcons[category.type]}</span>
                    <span>{category.title}</span>
                    <span className="ml-auto bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {category.results.length}
                    </span>
                  </div>

                  {/* Category Results */}
                  {category.results.map((result) => {
                    const isHighlighted = globalIndex === currentFocusIndex;
                    const currentIndex = globalIndex++;

                    return (
                      <button
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setCurrentFocusIndex(currentIndex)}
                        className={`
                          w-full px-4 py-3 text-left transition-colors duration-150 flex items-center space-x-3 border-none bg-transparent cursor-pointer
                          ${
                            isHighlighted
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }
                        `}
                      >
                        <div className="flex-shrink-0 text-xl">
                          {result.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium truncate ${
                              isHighlighted ? "text-blue-700" : "text-gray-900"
                            }`}
                          >
                            {result.title}
                          </p>
                          {result.subtitle && (
                            <p
                              className={`text-xs truncate ${
                                isHighlighted
                                  ? "text-blue-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {result.subtitle}
                            </p>
                          )}
                        </div>
                        <div
                          className={`flex-shrink-0 px-2 py-1 text-xs rounded-full border ${
                            typeColors[result.type]
                          }`}
                        >
                          {typeLabels[result.type]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}

              {/* Keyboard Shortcuts Help */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
                        ↑↓
                      </kbd>
                      <span>Navegar</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
                        ↵
                      </kbd>
                      <span>Seleccionar</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
                        Esc
                      </kbd>
                      <span>Cerrar</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
