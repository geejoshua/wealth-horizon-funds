
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Settings, 
  History, 
  Wallet, 
  ShoppingBag, 
  Menu, 
  X,
  ChevronRight,
  PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { userData } = useAuth();

  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: PieChart, label: "My Portfolio", path: "/portfolio" },
    { icon: History, label: "Transaction History", path: "/transactions" },
    { icon: Wallet, label: "Fund Wallet", path: "/fund-wallet" },
    { icon: ShoppingBag, label: "Buy Assets", path: "/investments" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden absolute top-24 left-4 z-30">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMobile}
          className="rounded-full bg-wealth-navy text-white"
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Sidebar - desktop */}
      <div 
        className={cn(
          "hidden md:flex flex-col h-[calc(100vh-4rem)] bg-white border-r border-gray-100 transition-all duration-300 sticky top-16",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Wallet summary */}
        <div className={cn(
          "p-4 flex flex-col gap-1 border-b border-gray-100",
          collapsed && "items-center"
        )}>
          <h3 className={cn(
            "text-sm text-wealth-gray",
            collapsed && "hidden"
          )}>
            Wallet Balance
          </h3>
          <p className={cn(
            "font-semibold text-lg",
            collapsed ? "text-xs" : "text-xl"
          )}>
            ₦{userData?.walletBalance.toLocaleString()}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm mb-1 hover:bg-gray-50",
                location.pathname === item.path 
                  ? "text-wealth-navy border-r-4 border-wealth-navy bg-blue-50" 
                  : "text-wealth-gray",
                collapsed && "justify-center"
              )}
            >
              <item.icon size={collapsed ? 20 : 18} className="flex-shrink-0" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Collapse button */}
        <div className="p-4 border-t border-gray-100">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleCollapse}
            className={cn(
              "w-full flex items-center justify-center",
              collapsed && "p-0"
            )}
          >
            <ChevronRight 
              size={18} 
              className={cn(
                "transition-transform", 
                collapsed ? "rotate-180" : "rotate-0"
              )} 
            />
            {!collapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transition-transform transform md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-medium">Menu</span>
          <Button variant="ghost" size="icon" onClick={toggleMobile}>
            <X size={18} />
          </Button>
        </div>
        
        {/* Wallet summary */}
        <div className="p-4 flex flex-col gap-1 border-b border-gray-100">
          <h3 className="text-sm text-wealth-gray">Wallet Balance</h3>
          <p className="font-semibold text-xl">
            ₦{userData?.walletBalance.toLocaleString()}
          </p>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm",
                location.pathname === item.path 
                  ? "text-wealth-navy border-r-4 border-wealth-navy bg-blue-50" 
                  : "text-wealth-gray"
              )}
              onClick={toggleMobile}
            >
              <item.icon size={18} />
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleMobile}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
