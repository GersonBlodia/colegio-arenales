"use client";
import React, { useState } from "react";
import {
  Calendar,
  Plus,
  ChevronDown,
  Clock,
  Users,
  BookOpen,
  Play,
  CheckCircle,
} from "lucide-react";

const PageCourses = () => {
  const [activeTab, setActiveTab] = useState("Classes");
  const [activeFilter, setActiveFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("Last Active");

  const courses = [
    {
      id: 1,
      title: "Move from Graphic Designer to UX Designer - Class 1",
      instructor: "Herman Wong",
      rating: 4.9,
      students: 819,
      duration: "18 HOURS",
      image: "/img/courses/backend-is.png",
      status: "EnCurso",
      progress: 65,
      category: "Design",
    },
    {
      id: 2,
      title: "Move from Graphic Designer to UX Designer - Class 2",
      instructor: "Herman Wong",
      rating: 4.8,
      students: 756,
      duration: "19 HOURS",
      image: "/img/courses/frontend.png",
      status: "EnCurso",
      progress: 40,
      category: "Design",
    },
    {
      id: 3,
      title: "User Experience Design For Mobile Apps & Websites UXD",
      instructor: "Herman Wong",
      rating: 4.9,
      students: 912,
      duration: "16 HOURS",
      image: "/img/courses/Historia.webp",
      status: "Completado",
      progress: 100,
      category: "UX Design",
      isNew: true,
    },
    {
      id: 4,
      title: "The Complete Android Developer Course",
      instructor: "Herman Wong",
      rating: 4.8,
      students: 1205,
      duration: "32 HOURS",
      image: "/img/courses/UX.jpg",
      status: "Borrador",
      progress: 0,
      category: "Development",
    },
    {
      id: 5,
      title: "How To Create a Simple Website With Bootstrap 4",
      instructor: "Herman Wong",
      rating: 4.7,
      students: 634,
      duration: "12 HOURS",
      image: "/img/courses/matematicas.jpg",
      status: "EnCurso",
      progress: 25,
      category: "Web Development",
      isVerified: true,
    },
    {
      id: 6,
      title: "Become a UI/UX Designer Everything You need to know",
      instructor: "Herman Wong",
      rating: 4.9,
      students: 892,
      duration: "24 HOURS",
      image: "/img/courses/comunicacion.jpg",
      status: "EnCurso",
      progress: 80,
      category: "Design",
      isVerified: true,
    },
    {
      id: 7,
      title: "Learn to make websites with Google's Material Design",
      instructor: "Herman Wong",
      rating: 4.8,
      students: 567,
      duration: "16 HOURS",
      image: "/img/courses/UX.jpg",

      status: "EnCurso",
      progress: 60,
      category: "Web Design",
      isVerified: true,
    },
    {
      id: 8,
      title: "User Experience Design For Mobile Apps & Websites",
      instructor: "Herman Wong",
      rating: 4.9,
      students: 723,
      duration: "20 HOURS",
      image: "/img/courses/frontend.png",
      status: "EnCurso",
      progress: 45,
      category: "UX Design",
      isVerified: true,
    },
  ];

  const filterOptions = ["todos", "EnCurso", "Completado", "Borrador"];
  const EnCursoCount = courses.filter(
    (course) => course.status === "EnCurso"
  ).length;
  const CompletadoCount = courses.filter(
    (course) => course.status === "Completado"
  ).length;
  const BorradorCount = courses.filter(
    (course) => course.status === "Borrador"
  ).length;

  const filteredCourses =
    activeFilter === "todos"
      ? courses
      : courses.filter(
          (course) => course.status === activeFilter.toLowerCase()
        );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "EnCurso":
        return "text-blue-600";
      case "Completado":
        return "text-green-600";
      case "Borrador":
        return "text-gray-500";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "EnCurso":
        return <Play className="w-4 h-4" />;
      case "Completado":
        return <CheckCircle className="w-4 h-4" />;
      case "Borrador":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-semibold text-gray-900">Mis Cursos</h1>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActiveTab("Classes")}
                className={`pb-2 border-b-2 ${
                  activeTab === "Classes"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Clases
              </button>
              <button
                onClick={() => setActiveTab("Calendar")}
                className={`pb-2 border-b-2 flex items-center space-x-2 ${
                  activeTab === "Calendar"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Calendario</span>
              </button>
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
            <span>Create Nueva clase</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Filters and Sort */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${
                  activeFilter === filter
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{filter}</span>
                {filter === "EnCurso" && EnCursoCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {EnCursoCount}
                  </span>
                )}
                {filter === "Completado" && CompletadoCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {CompletadoCount}
                  </span>
                )}
                {filter === "Borrador" && BorradorCount > 0 && (
                  <span className="bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {BorradorCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort:</span>
            <button className="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900">
              <span>{sortBy}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Course Image */}
              <div
                style={{
                  backgroundImage: `url(${course.image})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "300px",
                }}
                className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100"
              >
                {course.isNew && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
                    NEW
                  </div>
                )}
                {course.status === "Completado" && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    {getStatusIcon(course.status)}
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {course.title}
                </h3>

                {/* Instructor */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">H</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {course.instructor}
                  </span>
                  {course.isVerified && (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Progress Bar (for EnCurso courses) */}
                {course.status === "EnCurso" && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Status */}
                <div
                  className={`flex items-center space-x-1 text-sm font-medium ${getStatusColor(
                    course.status
                  )}`}
                >
                  {getStatusIcon(course.status)}
                  <span className="capitalize">{course.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 mb-4">
              Try changing your filter or create a new course
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
              Create Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageCourses;
