import { HeaderComponent } from "@/components/ui/header/HeaderComponent";
import { Sidebar } from "@/components/ui/sidebar/SidebarDashboard";

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

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
  <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <HeaderComponent 
       
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          {/* Content wrapper */}
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}