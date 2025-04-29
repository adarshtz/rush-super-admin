import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GalleryVerticalEnd,
  Users,
  Calendar,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { icon: Users, label: "Patients", path: "/dashboard/patients" },
    {
      icon: Calendar,
      label: "Subscriptions",
      path: "/dashboard/subscriptions",
    },
    { icon: ClipboardList, label: "Doctors", path: "/dashboard/doctors" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col bg-card border-r p-4 h-screen transition-all duration-300 fixed md:sticky top-0 z-40",
          isOpen ? "left-0 w-64" : "-left-64 md:left-0 w-64",
          className
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <GalleryVerticalEnd className="h-6 w-6" />
          <h1 className="text-xl font-bold">Rush Health</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    isActive ? "bg-secondary" : "hover:bg-secondary/50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto text-xs text-center text-muted-foreground pt-4">
          Rush Health Admin © {new Date().getFullYear()}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
