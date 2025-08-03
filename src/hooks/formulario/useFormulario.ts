import { TRegisterUsuario } from "@/types/tregister-usuario";
import { useEffect, useState } from "react"
export interface FormularioLogin {
    userName: string;
    password: string;
    email: string;
}
export interface FormularioRegistro {
    userName: string;
    password: string;
    email: string;
    confirmPassword: string;
}
export const useFormulario = () => {

    const [isFormulario, setIsFormulario] = useState<'login' | 'registro'>("login");
    const [isFormularioOpen, setIsFormularioOpen] = useState(false);
    //initial data for login
    const initialLoginData: FormularioLogin = {
        userName: "",
        password: "",
        email: "",
    };

    //initial data for register 

    const initialRegisterData: TRegisterUsuario = {
        userName: "",
        password: "",
        email: "",
        confirmPassword: "",
        dni: 0
    };
    const [data, setData] = useState<FormularioLogin | TRegisterUsuario>(initialLoginData)
    //resetear formulario 
    const resetFormulario = () => {
        setIsFormulario('login');
        setData(initialLoginData);
        setIsFormularioOpen(false);
    }
    useEffect(() => {
        return () => {
            resetFormulario();
        };
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value === 'dni' ? parseInt(value) : value // Convert 'dni' to number,
        }));
    }
    //funcion para que el formulario cambie 
    const setFormulario = (formulario: 'login' | 'registro') => {
        setIsFormulario(formulario);
        setIsFormularioOpen(true);
        if (formulario === 'login') {
            setData(initialLoginData)
        }
        else if (formulario === 'registro') {
            setData(initialRegisterData)
        }
    }
    // Función mejorada para cambiar formulario (usada por los botones)
    const cambiarFormulario = (formulario: 'login' | 'registro') => {
        setIsFormulario(formulario);

        if (formulario === 'login') {
            setData(initialLoginData);
        } else if (formulario === 'registro') {
            setData(initialRegisterData);
        }
    }
    return {
        isFormulario,
        setIsFormulario: cambiarFormulario,
        isFormularioOpen,
        setIsFormularioOpen,
        setFormulario,
        handleInputChange,
        data,
        resetFormulario
    }
}