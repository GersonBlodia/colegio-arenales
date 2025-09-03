export const ConsentOptions = () => {
    return (
      <div className="mb-6 space-y-3">
        <div className="flex items-start">
          <input type="checkbox" className="mt-1 mr-2" />
          <p className="text-white text-sm">
            Envíenme por correo electrónico información adicional sobre mis cursos y otros cursos o
            productos relevantes
          </p>
        </div>
        <div className="flex items-start">
          <input type="checkbox" className="mt-1 mr-2" />
          <p className="text-white text-sm">
            Envíenme por correo electrónico invitaciones para participar en investigaciones
            realizadas por FutureLearn y nuestras organizaciones asociadas.
          </p>
        </div>
      </div>
    );
  };
