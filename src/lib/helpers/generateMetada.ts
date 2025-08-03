// app/productos/[id]/page.js
//mantenimiento para que se pueda generar la metadata de la página de productos

export async function generateMetadata({ params }:{ params: { id: string } }) {
  // Obtener datos del producto 
  return {
    title: `${producto.nombre} - Mi Tienda`,
    description: producto.descripcion,
    openGraph: {
      title: producto.nombre,
      description: producto.descripcion,
      images: [producto.imagen],
    },
  };
}

 