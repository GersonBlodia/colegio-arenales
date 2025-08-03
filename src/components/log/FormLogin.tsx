import {
  FormularioLogin,
  FormularioRegistro,
} from "@/hooks/formulario/useFormulario";
import Image from "next/image";
import { ChangeEvent, FormEvent } from "react";

interface FormProps {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setIsFormulario: (formulario: "registro" | "login") => void;
  data: FormularioLogin | FormularioRegistro;
}
export const FormLogin = ({
  handleInputChange,
  setIsFormulario,
  data,
  handleSubmit,
}: FormProps) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="block gap-4 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl w-full max-w-md mx-auto space-y-6"
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
            <div className="text-xl font-semibold">Blackboard</div>
          </div>
        </div>
      </div>
      {/* Main login button */}
      <button
        onClick={() => setIsFormulario("registro")}
        type="submit"
        className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-lg mb-4"
      >
        Registrate si no tienes cuenta
      </button>

      <div className="block text-center text-white/80 text-sm mb-4">
        - haz clic aquí -
      </div>

      {/* Form fields */}
      <input
        type="text"
        name="userName"
        placeholder="Username"
        value={data.userName}
        onChange={(e) => handleInputChange(e)}
        className="block w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 placeholder-gray-500 mb-4"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => handleInputChange(e)}
        className="block w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 placeholder-gray-500 mb-4"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => handleInputChange(e)}
        className="block w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 placeholder-gray-500 mb-4"
      />

      {/* Office 365 button */}
      <button
        type="submit"
        className="block w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 mb-4"
      >
        <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
          <span className="text-orange-500 text-xs font-bold">O</span>
        </div>
        Iniciar Sesion
      </button>
    </form>
  );
};
