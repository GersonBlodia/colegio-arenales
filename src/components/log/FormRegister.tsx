import Image from "next/image"
import { ChangeEvent, FormEvent } from "react"
interface FormProps{
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
        setIsFormulario: (formulario: "registro" | "login") => void
}
export const FormRegister = ({handleInputChange, handleSubmit,setIsFormulario}:FormProps) => {
  return (
    <form
              onSubmit={(e) => handleSubmit(e)}
              className="block gap-4 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl w-full md:w-[28rem]   mx-auto space-y-6"
            >
              <div className="text-center mb-8 text-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Image
                        src="/logo/school-logo.png"
                        alt="Logo"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium opacity-80">
                      UNIVERSIDAD PRIVADA
                    </div>
                    <div className="text-2xl font-bold">SAN JUAN BAUTISTA</div>
                    <div className="text-xl font-semibold">Registro</div>
                  </div>
                </div>
              </div>

              {/* Botón para volver al login */}
              <button
                onClick={() => setIsFormulario("login")}
                type="button"
                       className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-lg mb-4"

              >
                ¿Ya tienes cuenta? Inicia sesión
              </button>

              <div className="block text-center text-white/80 text-sm mb-4">
                - haz clic aquí -
              </div>

              {/* Campos del formulario de registro */}
              <input
                type="text"
                name="userName"
                placeholder="Nombre de usuario"
                     className="block w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 placeholder-gray-500 mb-4"
              />

              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="block w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 placeholder-gray-500 mb-4"
              />

              <input
                type="number"
                name="dni"
                placeholder="DNI"
                className="block w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 placeholder-gray-500 mb-4"
              />

              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="block w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 placeholder-gray-500 mb-4"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                className="block w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 placeholder-gray-500 mb-4"
              />

              {/* Botón de registro */}
              <button
                type="submit"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-lg mb-4"
              >
                Crear cuenta
              </button>

              {/* Botón Office 365 (opcional para registro) */}

              {/* Enlaces de ayuda */}
              <div className="block text-center">
                <a
                  href="#"
                  className="text-white/80 hover:text-white text-sm transition-colors duration-200 underline"
                >
                  ¿Necesitas ayuda con el registro?
                </a>
              </div>
            </form>
  )
}
