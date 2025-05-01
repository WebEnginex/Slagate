import React, { useState } from "react";
import SideNav from "./SideNav";
import { Menu } from "lucide-react";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <SideNav isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Structure verticale pour main + footer */}
      <div className="flex flex-col flex-1 min-h-screen">
        <main className="flex-1 overflow-auto relative">
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

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
