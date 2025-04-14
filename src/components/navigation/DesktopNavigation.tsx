
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DesktopNavigationProps {
  navItems: Array<{ name: string; path: string }>;
}

const DesktopNavigation = ({ navItems }: DesktopNavigationProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <Link 
          key={item.name}
          to={item.path}
          className={cn(
            "text-sm font-medium transition-colors hover:text-sorplux-blue",
            isActive(item.path) ? "text-sorplux-blue" : "text-wealth-gray"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
