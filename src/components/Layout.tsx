
import React, { useState } from "react";
import SideNav from "./SideNav";
import { Menu } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <SideNav isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <main className="flex-1 overflow-auto">
        {/* Mobile menu toggle */}
        <button
          className="fixed top-4 left-4 z-30 rounded-md bg-sidebar p-2 text-white lg:hidden"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={24} />
        </button>
        
        <div className="container mx-auto py-8 px-4 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
