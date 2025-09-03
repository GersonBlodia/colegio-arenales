import { useEffect, useState } from "react";

export const usePagination = (data = [], elementosPorPagina = 4) => {
    // Inicializar con datos del localStorage o los proporcionados
    const storedPacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    const [dataPaciente, setDataPaciente] = useState(data.length ? data : storedPacientes);
    const [dataFiltrada, setDataFiltrada] = useState(dataPaciente);
    const [dataRender, setDataRender] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [filtro, setFiltro] = useState("");

    // Guardar en localStorage cuando cambie `dataPaciente`
    useEffect(() => {
        localStorage.setItem("pacientes", JSON.stringify(dataPaciente));
    }, [dataPaciente]);

    // Filtrar por nombre y apellido
    useEffect(() => {
        const resultado = dataPaciente.filter(paciente =>
            `${paciente.nombre} ${paciente.apellido}`
                .toLowerCase()
                .includes(filtro.toLowerCase())
        );
        setDataFiltrada(resultado);
        setPagina(0);
    }, [filtro, dataPaciente]);

    // Paginación
    useEffect(() => {
        const start = pagina * elementosPorPagina;
        const end = start + elementosPorPagina;
        setDataRender(dataFiltrada.slice(start, end));
    }, [pagina, dataFiltrada, elementosPorPagina]);

    // Cambiar página con validación
    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina < 0 || nuevaPagina >= Math.ceil(dataFiltrada.length / elementosPorPagina)) return;
        setPagina(nuevaPagina);
    };

    return {
        dataRender,
        pagina,
        totalPaginas: Math.ceil(dataFiltrada.length / elementosPorPagina),
        cambiarPagina,
        filtro,
        setFiltro,
        setDataPaciente, // Para actualizar manualmente pacientes
    };
};
