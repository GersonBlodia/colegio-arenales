"use client";
import { motion } from "framer-motion";
import { EyeClosed } from "lucide-react";
interface PropsModal {
  isActive: boolean;
  onClose: () => void;
  courseId: string;
  className?: string;
  children?: React.ReactNode;
}
export const ModalCourse = ({
  courseId,
  isActive,
  onClose,
  children,
  className,
}: PropsModal) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -50 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      data-testid="modal-course"
      className={className}
    >
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[85vh] overflow-y-auto mx-4">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Detalles del Módulo
            </h2>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {courseId}
            </span>
          </div>
          <button
            className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            onClick={onClose}
          >
            <EyeClosed size={20} />
          </button>
        </div>

        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg mb-6">
          <p className="text-gray-700 leading-relaxed">
            Aquí podrás visualizar todo el contenido del módulo{" "}
            <span className="font-semibold text-blue-700">{courseId}</span>
          </p>
        </div>

        <div className="space-y-4">{children}</div>
      </div>
    </motion.div>
  );
};
