export const AccessInfoCard = () => {
  return (
    <div className="bg-transparent rounded-md shadow-black   shadow-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Cómo funciona el acceso limitado
      </h3>

      <div className="space-y-4 text-white">
        <div className="flex items-start">
          <div className="min-w-8 flex items-center">
            <div className="h-4 w-4 rounded-full bg-pink-500"></div>
          </div>
          <div>
            <p className="font-medium">Hoy</p>
            <p className="text-gray-600 text-sm">Se abre la semana 1</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="min-w-8 flex items-center">
            <div className="h-5 w-5 border border-gray-300 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-xs">4</span>
            </div>
          </div>
          <div>
            <p className="font-medium">4 de febrero</p>
            <p className="text-gray-600 text-sm">Se abre la semana 2</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="min-w-8 flex items-center">
            <div className="h-5 w-5 border border-gray-300 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-xs">11</span>
            </div>
          </div>
          <div>
            <p className="font-medium">11 de febrero</p>
            <p className="text-gray-600 text-sm">Se abre la semana 3</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="min-w-8 flex items-center">
            <div className="h-5 w-5 border border-gray-300 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-xs">18</span>
            </div>
          </div>
          <div>
            <p className="font-medium">18 de febrero</p>
            <p className="text-gray-600 text-sm">Se abre la semana 4</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium text-gray-300 mb-2">
          ¿Quieres aprender a tu propio ritmo?
        </p>

        <button className="relative p-[1px] rounded w-full bg-gradient-to-r from-purple-700 to-blue-500">
          <div className="w-full bg-white rounded text-pink-500 font-medium py-2 px-4 text-center border border-transparent hover:bg-pink-50 transition duration-200">
            Obtenga acceso completo al curso
          </div>
        </button>
      </div>
    </div>
  );
};
