// import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { X, LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  navItems: Array<{ name: string; path: string }>;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

const MobileNavigation = ({
  isMenuOpen,
  setIsMenuOpen,
  navItems,
  isAuthenticated,
  handleLogout,
}: MobileNavigationProps) => {
  const location = useLocation();
  // const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-100">
      <div className="container px-4 py-4 flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "text-base font-medium py-2",
              isActive(item.path) ? "text-sorplux-blue" : "text-wealth-gray",
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        {/* <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              <LogOut size={16} />
              Log Out
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/login');
                }}
              >
                Log In
              </Button>
              <Button className="w-full bg-sorplux-blue text-white" asChild>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
              </Button>
            </>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default MobileNavigation;
