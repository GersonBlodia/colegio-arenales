"use client"
import React, { useState, useMemo } from 'react';
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
  User,
} from 'lucide-react';

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  experience: number;
  avatar?: string;
}

const PageTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@universidad.edu',
      phone: '+51 987 654 321',
      specialization: 'Matemáticas',
      department: 'Ciencias',
      status: 'active',
      joinDate: '2020-03-15',
      experience: 8
    },
    {
      id: 2,
      firstName: 'María',
      lastName: 'García',
      email: 'maria.garcia@universidad.edu',
      phone: '+51 987 654 322',
      specialization: 'Física',
      department: 'Ciencias',
      status: 'active',
      joinDate: '2019-08-20',
      experience: 12
    },
    {
      id: 3,
      firstName: 'Carlos',
      lastName: 'López',
      email: 'carlos.lopez@universidad.edu',
      phone: '+51 987 654 323',
      specialization: 'Historia',
      department: 'Humanidades',
      status: 'inactive',
      joinDate: '2021-01-10',
      experience: 5
    },
    {
      id: 4,
      firstName: 'Ana',
      lastName: 'Rodríguez',
      email: 'ana.rodriguez@universidad.edu',
      phone: '+51 987 654 324',
      specialization: 'Inglés',
      department: 'Idiomas',
      status: 'pending',
      joinDate: '2023-09-01',
      experience: 3
    },
    {
      id: 5,
      firstName: 'Roberto',
      lastName: 'Martínez',
      email: 'roberto.martinez@universidad.edu',
      phone: '+51 987 654 325',
      specialization: 'Programación',
      department: 'Tecnología',
      status: 'active',
      joinDate: '2022-05-12',
      experience: 6
    },
    {
      id: 6,
      firstName: 'Elena',
      lastName: 'Vásquez',
      email: 'elena.vasquez@universidad.edu',
      phone: '+51 987 654 326',
      specialization: 'Química',
      department: 'Ciencias',
      status: 'active',
      joinDate: '2018-11-30',
      experience: 15
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<number | null>(null);

  const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    department: '',
    status: 'pending',
    joinDate: '',
    experience: 0
  });

  // Datos únicos para filtros
  const departments = useMemo(() => {
    const deps = [...new Set(teachers.map(teacher => teacher.department))];
    return deps.sort();
  }, [teachers]);

  // Filtrado y búsqueda
  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = 
        teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
      const matchesDepartment = departmentFilter === 'all' || teacher.department === departmentFilter;
      
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [teachers, searchTerm, statusFilter, departmentFilter]);

  // Paginación
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialization: '',
      department: '',
      status: 'pending',
      joinDate: '',
      experience: 0
    });
  };

  const openModal = (mode: 'create' | 'edit' | 'view', teacher?: Teacher) => {
    setModalMode(mode);
    if (teacher) {
      setSelectedTeacher(teacher);
      setFormData({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        phone: teacher.phone,
        specialization: teacher.specialization,
        department: teacher.department,
        status: teacher.status,
        joinDate: teacher.joinDate,
        experience: teacher.experience
      });
    } else {
      resetForm();
      setSelectedTeacher(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
    resetForm();
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newTeacher: Teacher = {
        ...formData,
        id: Math.max(...teachers.map(t => t.id)) + 1
      };
      setTeachers([...teachers, newTeacher]);
    } else if (modalMode === 'edit' && selectedTeacher) {
      setTeachers(teachers.map(teacher => 
        teacher.id === selectedTeacher.id 
          ? { ...teacher, ...formData }
          : teacher
      ));
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setTeacherToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (teacherToDelete) {
      setTeachers(teachers.filter(teacher => teacher.id !== teacherToDelete));
      setShowDeleteConfirm(false);
      setTeacherToDelete(null);
    }
  };

  const handleInputChange = (field: keyof Omit<Teacher, 'id'>, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Docentes</h1>
            <p className="text-gray-600 mt-1">Administra los docentes del sistema</p>
          </div>
          <button 
            onClick={() => openModal('create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Docente</span>
          </button>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar docentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por Estado */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="pending">Pendiente</option>
            </select>

            {/* Filtro por Departamento */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los departamentos</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Limpiar filtros */}
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setDepartmentFilter('all');
                setCurrentPage(1);
              }}
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
                    Docente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Especialización
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experiencia
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {teacher.firstName[0]}{teacher.lastName[0]}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {teacher.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.email}</div>
                      <div className="text-sm text-gray-500">{teacher.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{teacher.specialization}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(teacher.status)}`}>
                        {getStatusLabel(teacher.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.experience} años</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openModal('view', teacher)}
                          className="text-gray-400 hover:text-blue-600 p-1"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal('edit', teacher)}
                          className="text-gray-400 hover:text-green-600 p-1"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(teacher.id)}
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
                Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredTeachers.length)} de {filteredTeachers.length} docentes
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {modalMode === 'create' && 'Nuevo Docente'}
                  {modalMode === 'edit' && 'Editar Docente'}
                  {modalMode === 'view' && 'Detalles del Docente'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      Especialización
                    </label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Departamento
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive' | 'pending')}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Años de Experiencia
                    </label>
                    <input
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || 0)}
                      disabled={modalMode === 'view'}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Ingreso
                    </label>
                    <input
                      type="date"
                      value={formData.joinDate}
                      onChange={(e) => handleInputChange('joinDate', e.target.value)}
                      disabled={modalMode === 'view'}
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
                  ¿Estás seguro de que quieres eliminar este docente? Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
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
        {filteredTeachers.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron docentes
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'all' || departmentFilter !== 'all'
                ? 'Intenta cambiar los filtros de búsqueda'
                : 'Comienza agregando tu primer docente'
              }
            </p>
            <button
              onClick={() => openModal('create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Agregar Docente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageTeachers;