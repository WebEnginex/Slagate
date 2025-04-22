import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Award, Gift, Users, Menu, X, Flame } from "lucide-react";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent",
        isActive && "bg-sidebar-accent text-solo-purple"
      )}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

type SideNavProps = {
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNav = ({ isMobileOpen, setIsMobileOpen }: SideNavProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: "/", icon: <Home size={20} />, label: "Accueil" },
    { to: "/tier-list", icon: <Award size={20} />, label: "Tier List" },
    { to: "/builds", icon: <Flame size={20} />, label: "Builds" }, // Nouveau lien pour Builds
    { to: "/atelier", icon: <Flame size={20} />, label: "Atelier" },
    { to: "/promo-codes", icon: <Gift size={20} />, label: "Code Promo" },
    { to: "/creators", icon: <Users size={20} />, label: "Creators" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Side navigation */}
      <nav
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-64 flex-col bg-sidebar p-4 transition-transform duration-200 lg:relative lg:flex lg:transform-none",
          isMobileOpen
            ? "flex translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute right-4 top-4 text-sidebar-foreground lg:hidden"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-4">
          <img
            src="/images/logo/Sohoven_Logo.png"
            alt="Sohoven Logo"
            className="h-8 w-8 rounded object-cover"
          />

          <div className="flex flex-col">
            <span className="font-bold text-sidebar-foreground">
              Solo Leveling : Arise
            </span>
            <span className="text-xs text-muted-foreground">Guides</span>
          </div>
        </div>

        {/* Nav links */}
        <div className="mt-8 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={currentPath === item.to}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-sidebar-border pt-4 text-xs text-muted-foreground">
          <p>WebEngine</p>
        </div>
      </nav>
    </>
  );
};

export default SideNav;
