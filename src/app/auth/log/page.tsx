"use client";
import { FormLogin } from "@/components/log/FormLogin";
import { FormRegister } from "@/components/log/FormRegister";
import { FooterIconComponent } from "@/components/ui/footer/FooterIconComponent";
import { useFormulario } from "@/hooks/formulario/useFormulario";
import { useEffect } from "react";
import { motion } from "framer-motion";
const PageLogin = () => {
  const {
    handleInputChange,
    setIsFormulario,
    resetFormulario,
    data,
    setFormulario,
    isFormulario,
  } = useFormulario();
  useEffect(() => {
    return () => {
      setFormulario("login");
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("formulario enviado", data);
    resetFormulario();
  };
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/img/wallpaper_school.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen bg-[url('/public/img/wallpaper_school.jpg')] relative overflow-hidden"
    >
      {/* Background geometric pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 border border-white/20 rotate-45"></div>
          <div className="absolute top-40 right-32 w-32 h-32 border border-white/20 rotate-12"></div>
          <div className="absolute bottom-20 left-40 w-48 h-48 border border-white/20 -rotate-12"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 border border-white/20 rotate-45"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Login form container */}
        <div className="">
          {/*form with login  */}
          {isFormulario === "login" && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FormLogin
                data={data}
                setIsFormulario={setIsFormulario}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            </motion.div>
          )}
          {/* End of form */}

          {/* Registration form */}
          {isFormulario === "registro" && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FormRegister
                setIsFormulario={setIsFormulario}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            </motion.div>
          )}
        </div>
        {/* Footer social icons */}
        {/*<FooterIconComponent/*/}
        <FooterIconComponent />
      </div>
    </div>
  );
};

export default PageLogin;
