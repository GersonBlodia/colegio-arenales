
export const metadata = {
 title: 'Registrate a Colegio de Programadores',
 description: 'SEO Title',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <>
        {children}
     </>
  );
}