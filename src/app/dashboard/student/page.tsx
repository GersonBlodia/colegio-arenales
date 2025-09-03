"use client"
import React, { useState, useMemo, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  X,
  Save,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  UserCheck
} from 'lucide-react';

// Interfaces
interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  birthDate: string;
  address: string;
  program: string;
  semester: number;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  enrollmentDate: string;
  gpa: number;
  avatar?: string;
}

interface StudentFilters {
  search: string;
  status: string;
  program: string;
  semester: string;
}

interface UseStudentsReturn {
  students: Student[];
  filteredStudents: Student[];
  currentPage: number;
  totalPages: number;
  paginatedStudents: Student[];
  filters: StudentFilters;
  selectedStudent: Student | null;
  showModal: boolean;
  modalMode: 'create' | 'edit' | 'view';
  showDeleteConfirm: boolean;
  formData: Omit<Student, 'id'>;
  programs: string[];
  semesters: number[];
  
  // Actions
  setCurrentPage: (page: number) => void;
  updateFilter: (key: keyof StudentFilters, value: string) => void;
  clearFilters: () => void;
  openModal: (mode: 'create' | 'edit' | 'view', student?: Student) => void;
  closeModal: () => void;
  handleInputChange: (field: keyof Omit<Student, 'id'>, value: string | number) => void;
  handleSave: () => void;
  handleDelete: (id: number) => void;
  confirmDelete: () => void;
  cancelDelete: () => void;
}

// Hook personalizado para gestionar estudiantes
const useStudents = (itemsPerPage: number = 5): UseStudentsReturn => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      firstName: 'Ana',
      lastName: 'García',
      email: 'ana.garcia@estudiante.edu',
      phone: '+51 987 654 321',
      dni: '12345678',
      birthDate: '2002-05-15',
      address: 'Av. Principal 123, Lima',
      program: 'Ingeniería de Sistemas',
      semester: 5,
      status: 'active',
      enrollmentDate: '2022-03-01',
      gpa: 3.8
    },
    {
      id: 2,
      firstName: 'Carlos',
      lastName: 'López',
      email: 'carlos.lopez@estudiante.edu',
      phone: '+51 987 654 322',
      dni: '87654321',
      birthDate: '2001-08-22',
      address: 'Jr. Los Olivos 456, Arequipa',
      program: 'Medicina',
      semester: 8,
      status: 'active',
      enrollmentDate: '2021-03-01',
      gpa: 4.2
    },
    {
      id: 3,
      firstName: 'María',
      lastName: 'Rodríguez',
      email: 'maria.rodriguez@estudiante.edu',
      phone: '+51 987 654 323',
      dni: '11223344',
      birthDate: '2000-12-10',
      address: 'Calle Las Flores 789, Cusco',
      program: 'Derecho',
      semester: 10,
      status: 'graduated',
      enrollmentDate: '2019-03-01',
      gpa: 3.9
    },
    {
      id: 4,
      firstName: 'José',
      lastName: 'Martínez',
      email: 'jose.martinez@estudiante.edu',
      phone: '+51 987 654 324',
      dni: '55667788',
      birthDate: '2003-02-28',
      address: 'Av. Universitaria 321, Trujillo',
      program: 'Administración',
      semester: 3,
      status: 'suspended',
      enrollmentDate: '2023-03-01',
      gpa: 2.1
    },
    {
      id: 5,
      firstName: 'Laura',
      lastName: 'Vásquez',
      email: 'laura.vasquez@estudiante.edu',
      phone: '+51 987 654 325',
      dni: '99887766',
      birthDate: '2002-07-18',
      address: 'Calle Real 654, Huancayo',
      program: 'Psicología',
      semester: 6,
      status: 'active',
      enrollmentDate: '2022-03-01',
      gpa: 3.6
    },
    {
      id: 6,
      firstName: 'Roberto',
      lastName: 'Silva',
      email: 'roberto.silva@estudiante.edu',
      phone: '+51 987 654 326',
      dni: '44556677',
      birthDate: '2001-11-05',
      address: 'Jr. Libertad 987, Piura',
      program: 'Ingeniería Civil',
      semester: 7,
      status: 'active',
      enrollmentDate: '2021-03-01',
      gpa: 3.4
    }
  ]);

  const [filters, setFilters] = useState<StudentFilters>({
    search: '',
    status: 'all',
    program: 'all',
    semester: 'all'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);

  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dni: '',
    birthDate: '',
    address: '',
    program: '',
    semester: 1,
    status: 'active',
    enrollmentDate: '',
    gpa: 0
  });

  // Datos únicos para filtros
  const programs = useMemo(() => {
    const progs = [...new Set(students.map(student => student.program))];
    return progs.sort();
  }, [students]);

  const semesters = useMemo(() => {
    const sems = [...new Set(students.map(student => student.semester))];
    return sems.sort((a, b) => a - b);
  }, [students]);

  // Filtrado
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.dni.includes(filters.search) ||
        student.program.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || student.status === filters.status;
      const matchesProgram = filters.program === 'all' || student.program === filters.program;
      const matchesSemester = filters.semester === 'all' || student.semester.toString() === filters.semester;
      
      return matchesSearch && matchesStatus && matchesProgram && matchesSemester;
    });
  }, [students, filters]);

  // Paginación
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Actions
  const updateFilter = useCallback((key: keyof StudentFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      status: 'all',
      program: 'all',
      semester: 'all'
    });
    setCurrentPage(1);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dni: '',
      birthDate: '',
      address: '',
      program: '',
      semester: 1,
      status: 'active',
      enrollmentDate: '',
      gpa: 0
    });
  }, []);

  const openModal = useCallback((mode: 'create' | 'edit' | 'view', student?: Student) => {
    setModalMode(mode);
    if (student) {
      setSelectedStudent(student);
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        dni: student.dni,
        birthDate: student.birthDate,
        address: student.address,
        program: student.program,
        semester: student.semester,
        status: student.status,
        enrollmentDate: student.enrollmentDate,
        gpa: student.gpa
      });
    } else {
      resetForm();
      setSelectedStudent(null);
    }
    setShowModal(true);
  }, [resetForm]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedStudent(null);
    resetForm();
  }, [resetForm]);

  const handleInputChange = useCallback((field: keyof Omit<Student, 'id'>, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSave = useCallback(() => {
    if (modalMode === 'create') {
      const newStudent: Student = {
        ...formData,
        id: Math.max(...students.map(s => s.id)) + 1
      };
      setStudents(prev => [...prev, newStudent]);
    } else if (modalMode === 'edit' && selectedStudent) {
      setStudents(prev => prev.map(student => 
        student.id === selectedStudent.id 
          ? { ...student, ...formData }
          : student
      ));
    }
    closeModal();
  }, [modalMode, formData, selectedStudent, students, closeModal]);

  const handleDelete = useCallback((id: number) => {
    setStudentToDelete(id);
    setShowDeleteConfirm(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (studentToDelete) {
      setStudents(prev => prev.filter(student => student.id !== studentToDelete));
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
    }
  }, [studentToDelete]);

  const cancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
    setStudentToDelete(null);
  }, []);

  return {
    students,
    filteredStudents,
    currentPage,
    totalPages,
    paginatedStudents,
    filters,
    selectedStudent,
    showModal,
    modalMode,
    showDeleteConfirm,
    formData,
    programs,
    semesters,
    setCurrentPage,
    updateFilter,
    clearFilters,
    openModal,
    closeModal,
    handleInputChange,
    handleSave,
    handleDelete,
    confirmDelete,
    cancelDelete
  };
};

// Componente principal
const PageStudents: React.FC = () => {
  const {
    paginatedStudents,
    filteredStudents,
    currentPage,
    totalPages,
    filters,
    showModal,
    modalMode,
    showDeleteConfirm,
    formData,
    programs,
    semesters,
    setCurrentPage,
    updateFilter,
    clearFilters,
    openModal,
    closeModal,
    handleInputChange,
    handleSave,
    handleDelete,
    confirmDelete,
    cancelDelete
  } = useStudents(5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'graduated': return 'Graduado';
      case 'suspended': return 'Suspendido';
      default: return status;
    }
  };

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600';
    if (gpa >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Estudiantes</h1>
            <p className="text-gray-600 mt-1">Administra los estudiantes del sistema</p>
          </div>
          <button 
            onClick={() => openModal('create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Estudiante</span>
          </button>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar estudiantes..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por Estado */}
            <select
              value={filters.status}
              onChange={(e) => updateFilter('status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="graduated">Graduado</option>
              <option value="suspended">Suspendido</option>
            </select>

            {/* Filtro por Programa */}
            <select
              value={filters.program}
              onChange={(e) => updateFilter('program', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los programas</option>
              {programs.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>

            {/* Filtro por Semestre */}
            <select
              value={filters.semester}
              onChange={(e) => updateFilter('semester', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los semestres</option>
              {semesters.map(semester => (
                <option key={semester} value={semester.toString()}>{semester}° Semestre</option>
              ))}
            </select>

            {/* Limpiar filtros */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Programa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semestre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPA
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {student.firstName[0]}{student.lastName[0]}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            DNI: {student.dni}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.email}</div>
                      <div className="text-sm text-gray-500">{student.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.program}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.semester}°</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                        {getStatusLabel(student.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${getGpaColor(student.gpa)}`}>
                        {student.gpa.toFixed(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openModal('view', student)}
                          className="text-gray-400 hover:text-blue-600 p-1"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal('edit', student)}
                          className="text-gray-400 hover:text-green-600 p-1"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {((currentPage - 1) * 5) + 1} a {Math.min(currentPage * 5, filteredStudents.length)} de {filteredStudents.length} estudiantes
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 border rounded-lg ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal para Crear/Editar/Ver */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {modalMode === 'create' && 'Nuevo Estudiante'}
                  {modalMode === 'edit' && 'Editar Estudiante'}
                  {modalMode === 'view' && 'Detalles del Estudiante'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      DNI
                    </label>
                    <input
                      type="text"
                      value={formData.dni}
                      onChange={(e) => handleInputChange('dni', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Programa
                    </label>
                    <input
                      type="text"
                      value={formData.program}
                      onChange={(e) => handleInputChange('program', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Semestre
                    </label>
                    <input
                      type="number"
                      value={formData.semester}
                      onChange={(e) => handleInputChange('semester', parseInt(e.target.value) || 1)}
                      disabled={modalMode === 'view'}
                      min="1"
                      max="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive' | 'graduated' | 'suspended')}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                      <option value="graduated">Graduado</option>
                      <option value="suspended">Suspendido</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Matrícula
                    </label>
                    <input
                      type="date"
                      value={formData.enrollmentDate}
                      onChange={(e) => handleInputChange('enrollmentDate', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GPA (Promedio)
                    </label>
                    <input
                      type="number"
                      value={formData.gpa}
                      onChange={(e) => handleInputChange('gpa', parseFloat(e.target.value) || 0)}
                      disabled={modalMode === 'view'}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {modalMode !== 'view' && (
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmación de Eliminación */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                  Confirmar Eliminación
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  ¿Estás seguro de que quieres eliminar este estudiante? Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron estudiantes
            </h3>
            <p className="text-gray-500 mb-4">
              {filters.search || filters.status !== 'all' || filters.program !== 'all' || filters.semester !== 'all'
                ? 'Intenta cambiar los filtros de búsqueda'
                : 'Comienza agregando tu primer estudiante'
              }
            </p>
            <button
              onClick={() => openModal('create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Agregar Estudiante
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageStudents;