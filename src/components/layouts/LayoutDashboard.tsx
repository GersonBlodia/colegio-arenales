"use client";
import React, { useState } from "react";
import { Sidebar } from "../ui/sidebar/SidebarDashboard";
import { HeaderComponent } from "../ui/header/HeaderComponent";
import { useDetectedRole } from "@/hooks/user/detectedRole";
interface LayoutDashboardProps {
  children?: React.ReactNode;
}
export const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  const { usuario } = useDetectedRole();
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  return (
    <>
      <Sidebar
       usuario={usuario}
      isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <HeaderComponent
          isMobileMenuOpen={false}
          user={usuario}
          onMobileMenuToggle={() => setIsMobileOpen(!isMobileOpen)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          {/* Content wrapper */}
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </>
  );
};
