import { BookOpen, GraduationCap, Users } from "lucide-react"

 
export const StatsCard = () => {
  return (
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
  )
}
