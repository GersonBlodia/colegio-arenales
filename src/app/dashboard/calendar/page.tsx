"use client";
import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  Edit2,
  Trash2,
  X,
  Save,
  Filter,
  BookOpen,
  GraduationCap,
} from "lucide-react";

// Interfaces
interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: "class" | "exam" | "meeting" | "holiday" | "assignment" | "event";
  location: string;
  instructor?: string;
  course?: string;
  participants?: number;
  color: string;
  isAllDay: boolean;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

// Configuración de tipos de eventos
const EVENT_TYPES = {
  class: {
    label: "Clase",
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  exam: {
    label: "Examen",
    color: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
  },
  meeting: {
    label: "Reunión",
    color: "bg-purple-500",
    textColor: "text-purple-700",
    bgColor: "bg-purple-50",
  },
  holiday: {
    label: "Feriado",
    color: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
  },
  assignment: {
    label: "Tarea",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
  },
  event: {
    label: "Evento",
    color: "bg-indigo-500",
    textColor: "text-indigo-700",
    bgColor: "bg-indigo-50",
  },
};

// Hook personalizado para el calendario
const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "Matemáticas Avanzadas",
      description: "Clase regular de cálculo diferencial",
      startDate: "2025-08-06",
      endDate: "2025-08-06",
      startTime: "08:00",
      endTime: "10:00",
      type: "class",
      location: "Aula 101",
      instructor: "Dr. García",
      course: "MAT-301",
      participants: 30,
      color: "#3b82f6",
      isAllDay: false,
    },
    {
      id: 2,
      title: "Examen Final - Física",
      description: "Examen final del curso de física cuántica",
      startDate: "2025-08-08",
      endDate: "2025-08-08",
      startTime: "14:00",
      endTime: "16:00",
      type: "exam",
      location: "Laboratorio A",
      instructor: "Dra. Martínez",
      course: "FIS-402",
      participants: 25,
      color: "#ef4444",
      isAllDay: false,
    },
    {
      id: 3,
      title: "Reunión de Docentes",
      description: "Reunión mensual del departamento",
      startDate: "2025-08-10",
      endDate: "2025-08-10",
      startTime: "16:00",
      endTime: "18:00",
      type: "meeting",
      location: "Sala de Reuniones",
      participants: 15,
      color: "#8b5cf6",
      isAllDay: false,
    },
    {
      id: 4,
      title: "Día de la Independencia",
      description: "Feriado nacional",
      startDate: "2025-08-15",
      endDate: "2025-08-15",
      startTime: "",
      endTime: "",
      type: "holiday",
      location: "",
      color: "#10b981",
      isAllDay: true,
    },
    {
      id: 5,
      title: "Entrega de Proyecto",
      description: "Fecha límite para entrega del proyecto final",
      startDate: "2025-08-12",
      endDate: "2025-08-12",
      startTime: "23:59",
      endTime: "23:59",
      type: "assignment",
      location: "Virtual",
      course: "ING-501",
      color: "#f59e0b",
      isAllDay: false,
    },
  ]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [filterType, setFilterType] = useState<string>("all");

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return events.filter((event) => {
      if (filterType === "all") return event.startDate === dateString;
      return event.startDate === dateString && event.type === filterType;
    });
  };
  // Generar días del calendario
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const days: CalendarDay[] = [];

    // Días del mes anterior
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: getEventsForDate(date),
      });
    }

    // Días del mes actual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      const today = new Date();
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        events: getEventsForDate(date),
      });
    }

    // Días del siguiente mes para completar la grilla
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: getEventsForDate(date),
      });
    }

    return days;
  }, [currentDate, events]);

  const filteredEvents = useMemo(() => {
    if (filterType === "all") return events;
    return events.filter((event) => event.type === filterType);
  }, [events, filterType]);

  return {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    events,
    setEvents,
    calendarDays,
    showEventModal,
    setShowEventModal,
    modalMode,
    setModalMode,
    selectedEvent,
    setSelectedEvent,
    viewMode,
    setViewMode,
    filterType,
    setFilterType,
    filteredEvents,
    getEventsForDate,
  };
};

// Componente de encabezado del calendario
const CalendarHeader: React.FC<{
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  viewMode: string;
  onViewModeChange: (mode: "month" | "week" | "day") => void;
  onCreateEvent: () => void;
}> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  viewMode,
  onViewModeChange,
  onCreateEvent,
}) => {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="flex items-center justify-between mb-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onToday}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Hoy
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Selector de vista */}
        <div className="flex bg-gray-100 rounded-lg">
          {["month", "week", "day"].map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode as "month" | "week" | "day")}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                viewMode === mode
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {mode === "month" ? "Mes" : mode === "week" ? "Semana" : "Día"}
            </button>
          ))}
        </div>

        <button
          onClick={onCreateEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Evento</span>
        </button>
      </div>
    </div>
  );
};

// Componente de filtros
const CalendarFilters: React.FC<{
  filterType: string;
  onFilterChange: (type: string) => void;
}> = ({ filterType, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center space-x-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <span className="text-sm font-medium text-gray-700">
          Filtrar por tipo:
        </span>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange("all")}
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              filterType === "all"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>

          {Object.entries(EVENT_TYPES).map(([type, config]) => (
            <button
              key={type}
              onClick={() => onFilterChange(type)}
              className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${
                filterType === type
                  ? `${config.color} text-white`
                  : `${config.bgColor} ${config.textColor} hover:opacity-80`
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  filterType === type ? "bg-white" : config.color
                }`}
              ></div>
              <span>{config.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente de día del calendario
const CalendarDay: React.FC<{
  day: CalendarDay;
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}> = ({ day, onDayClick, onEventClick }) => {
  return (
    <div
      className={`min-h-[120px] border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 ${
        !day.isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white"
      } ${day.isToday ? "bg-blue-50 border-blue-300" : ""}`}
      onClick={() => onDayClick(day.date)}
    >
      <div
        className={`text-sm font-medium mb-1 ${
          day.isToday
            ? "text-blue-600"
            : day.isCurrentMonth
            ? "text-gray-900"
            : "text-gray-400"
        }`}
      >
        {day.date.getDate()}
      </div>

      <div className="space-y-1">
        {day.events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
            className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${
              EVENT_TYPES[event.type].bgColor
            } ${EVENT_TYPES[event.type].textColor}`}
          >
            <div className="flex items-center space-x-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  EVENT_TYPES[event.type].color
                }`}
              ></div>
              <span className="truncate">{event.title}</span>
            </div>
            {!event.isAllDay && (
              <div className="text-xs opacity-75">{event.startTime}</div>
            )}
          </div>
        ))}

        {day.events.length > 3 && (
          <div className="text-xs text-gray-500 text-center">
            +{day.events.length - 3} más
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de lista de eventos
const EventsList: React.FC<{
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: number) => void;
}> = ({ events, onEventClick, onEditEvent, onDeleteEvent }) => {
  const todayEvents = events.filter((event) => {
    const today = new Date().toISOString().split("T")[0];
    return event.startDate === today;
  });

  const upcomingEvents = events
    .filter((event) => {
      const today = new Date().toISOString().split("T")[0];
      return event.startDate > today;
    })
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Eventos</h3>

      {/* Eventos de hoy */}
      {todayEvents.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Hoy</h4>
          <div className="space-y-2">
            {todayEvents.map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onEventClick={onEventClick}
                onEditEvent={onEditEvent}
                onDeleteEvent={onDeleteEvent}
              />
            ))}
          </div>
        </div>
      )}

      {/* Próximos eventos */}
      {upcomingEvents.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Próximos</h4>
          <div className="space-y-2">
            {upcomingEvents.map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onEventClick={onEventClick}
                onEditEvent={onEditEvent}
                onDeleteEvent={onDeleteEvent}
              />
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <div className="text-center py-8">
          <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No hay eventos programados</p>
        </div>
      )}
    </div>
  );
};

// Componente de item de evento
const EventItem: React.FC<{
  event: CalendarEvent;
  onEventClick: (event: CalendarEvent) => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: number) => void;
}> = ({ event, onEventClick, onEditEvent, onDeleteEvent }) => {
  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm ${
        EVENT_TYPES[event.type].bgColor
      }`}
      onClick={() => onEventClick(event)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <div
              className={`w-3 h-3 rounded-full ${
                EVENT_TYPES[event.type].color
              }`}
            ></div>
            <span className="font-medium text-sm">{event.title}</span>
          </div>

          {!event.isAllDay && (
            <div className="flex items-center space-x-1 text-xs text-gray-600 mb-1">
              <Clock className="w-3 h-3" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
          )}

          {event.location && (
            <div className="flex items-center space-x-1 text-xs text-gray-600">
              <MapPin className="w-3 h-3" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditEvent(event);
            }}
            className="p-1 text-gray-400 hover:text-blue-600"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteEvent(event.id);
            }}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal del calendario
const PageCalendar: React.FC = () => {
  const {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    events,
    setEvents,
    calendarDays,
    showEventModal,
    setShowEventModal,
    modalMode,
    setModalMode,
    selectedEvent,
    setSelectedEvent,
    viewMode,
    setViewMode,
    filterType,
    setFilterType,
    filteredEvents,
  } = useCalendar();

  const [formData, setFormData] = useState<Omit<CalendarEvent, "id">>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    type: "class",
    location: "",
    instructor: "",
    course: "",
    participants: 0,
    color: "#3b82f6",
    isAllDay: false,
  });

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      type: event.type,
      location: event.location,
      instructor: event.instructor || "",
      course: event.course || "",
      participants: event.participants || 0,
      color: event.color,
      isAllDay: event.isAllDay,
    });
    setModalMode("view");
    setShowEventModal(true);
  };

  const handleCreateEvent = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      title: "",
      description: "",
      startDate: selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : today,
      endDate: selectedDate ? selectedDate.toISOString().split("T")[0] : today,
      startTime: "09:00",
      endTime: "10:00",
      type: "class",
      location: "",
      instructor: "",
      course: "",
      participants: 0,
      color: "#3b82f6",
      isAllDay: false,
    });
    setSelectedEvent(null);
    setModalMode("create");
    setShowEventModal(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      type: event.type,
      location: event.location,
      instructor: event.instructor || "",
      course: event.course || "",
      participants: event.participants || 0,
      color: event.color,
      isAllDay: event.isAllDay,
    });
    setModalMode("edit");
    setShowEventModal(true);
  };

  const handleSaveEvent = () => {
    if (modalMode === "create") {
      const newEvent: CalendarEvent = {
        ...formData,
        id: Math.max(...events.map((e) => e.id), 0) + 1,
      };
      setEvents([...events, newEvent]);
    } else if (modalMode === "edit" && selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? { ...event, ...formData } : event
        )
      );
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleInputChange = (
    field: keyof Omit<CalendarEvent, "id">,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onCreateEvent={handleCreateEvent}
        />

        <CalendarFilters
          filterType={filterType}
          onFilterChange={setFilterType}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendario principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Encabezado de días */}
              <div className="grid grid-cols-7 bg-gray-50 border-b">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="p-3 text-sm font-medium text-gray-700 text-center"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Grilla del calendario */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => (
                  <CalendarDay
                    key={index}
                    day={day}
                    onDayClick={handleDayClick}
                    onEventClick={handleEventClick}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar con eventos */}
          <div className="lg:col-span-1">
            <EventsList
              events={filteredEvents}
              onEventClick={handleEventClick}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        </div>

        {/* Modal de evento */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {modalMode === "create" && "Nuevo Evento"}
                  {modalMode === "edit" && "Editar Evento"}
                  {modalMode === "view" && "Detalles del Evento"}
                </h2>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      disabled={modalMode === "view"}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        handleInputChange("type", e.target.value)
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    >
                      {Object.entries(EVENT_TYPES).map(([type, config]) => (
                        <option key={type} value={type}>
                          {config.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Inicio
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Fin
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-2 mb-3">
                      <input
                        type="checkbox"
                        id="isAllDay"
                        checked={formData.isAllDay}
                        onChange={(e) =>
                          handleInputChange("isAllDay", e.target.checked)
                        }
                        disabled={modalMode === "view"}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="isAllDay"
                        className="text-sm font-medium text-gray-700"
                      >
                        Todo el día
                      </label>
                    </div>
                  </div>

                  {!formData.isAllDay && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hora de Inicio
                        </label>
                        <input
                          type="time"
                          value={formData.startTime}
                          onChange={(e) =>
                            handleInputChange("startTime", e.target.value)
                          }
                          disabled={modalMode === "view"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hora de Fin
                        </label>
                        <input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) =>
                            handleInputChange("endTime", e.target.value)
                          }
                          disabled={modalMode === "view"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>
                    </>
                  )}

                  {(formData.type === "class" || formData.type === "exam") && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Instructor
                        </label>
                        <input
                          type="text"
                          value={formData.instructor}
                          onChange={(e) =>
                            handleInputChange("instructor", e.target.value)
                          }
                          disabled={modalMode === "view"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Curso
                        </label>
                        <input
                          type="text"
                          value={formData.course}
                          onChange={(e) =>
                            handleInputChange("course", e.target.value)
                          }
                          disabled={modalMode === "view"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Participantes
                    </label>
                    <input
                      type="number"
                      value={formData.participants}
                      onChange={(e) =>
                        handleInputChange(
                          "participants",
                          parseInt(e.target.value) || 0
                        )
                      }
                      disabled={modalMode === "view"}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <div className="flex space-x-2">
                      {[
                        "#3b82f6",
                        "#ef4444",
                        "#8b5cf6",
                        "#10b981",
                        "#f59e0b",
                        "#6366f1",
                      ].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleInputChange("color", color)}
                          disabled={modalMode === "view"}
                          className={`w-8 h-8 rounded-full border-2 ${
                            formData.color === color
                              ? "border-gray-800"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {modalMode !== "view" && (
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowEventModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveEvent}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                  </div>
                )}

                {modalMode === "view" && (
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowEventModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={() => {
                        setModalMode("edit");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Eventos Hoy</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {
                    events.filter(
                      (e) =>
                        e.startDate === new Date().toISOString().split("T")[0]
                    ).length
                  }
                </p>
              </div>
              <CalendarIcon className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clases</p>
                <p className="text-2xl font-semibold text-green-600">
                  {events.filter((e) => e.type === "class").length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Exámenes</p>
                <p className="text-2xl font-semibold text-red-600">
                  {events.filter((e) => e.type === "exam").length}
                </p>
              </div>
              <GraduationCap className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reuniones</p>
                <p className="text-2xl font-semibold text-purple-600">
                  {events.filter((e) => e.type === "meeting").length}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCalendar;
