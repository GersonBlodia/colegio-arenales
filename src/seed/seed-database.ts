async function main() {

    await prisma.empleadoDiaSemana.deleteMany();

    // 2. Delete Usuario (depends on Empleado)
    await prisma.usuario.deleteMany();

    // 3. Delete DocumentoAdjunto (depends on Persona and Tipo_Documento_Adjunto)
    await prisma.documentoAdjunto.deleteMany();

    // 4. Delete Empleado (depends on Persona)
    await prisma.empleado.deleteMany();

    // 5. Delete Persona (depends on DireccionUbicacion and Tipo_Documento)
    await prisma.persona.deleteMany();

    // 6. Delete Tipo_Documento_Adjunto (independent table)
    await prisma.tipo_Documento_Adjunto.deleteMany();

    // 7. Delete Tipo_Documento (independent table)
    await prisma.tipo_Documento.deleteMany();

    // 8. Delete DireccionUbicacion (depends on Distrito)
    await prisma.direccionUbicacion.deleteMany();

    // 9. Delete Distrito (depends on Provincia)
    await prisma.distrito.deleteMany();


    // 10. Delete Provincia (depends on Departamento)
    await prisma.provincia.deleteMany();

    // 11. Delete Departamento (depends on Pais)
    await prisma.departamento.deleteMany();

    // 12. Delete Pais (top-level parent table)
    await prisma.pais.deleteMany();



}

(() => {
    if (process.env.NODE_ENV !== 'production') return;
    main()
})()