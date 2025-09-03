import { LayoutDashboard } from "@/components/layouts/LayoutDashboard";
 
// app/dashboard/layout.js
export async function generateMetadata() {
  return {
    title: `dashboard - Colegio `,
    description: `Panel de control de `,
    openGraph: {
      title: `Dashboard de `,
      description: `Área privada de `,
    },
  };
}

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
  <div className="flex min-h-screen bg-gray-100">
          <LayoutDashboard>
            {children}
          </LayoutDashboard>
    </div>
  );
}