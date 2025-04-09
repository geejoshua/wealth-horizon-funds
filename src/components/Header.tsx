
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Investments', path: '/investments' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-wealth-navy to-wealth-blue rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">WH</span>
              </div>
              <span className="text-xl font-display font-bold text-wealth-navy">Wealth Horizon</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-wealth-blue ${
                  isActive(item.path) ? 'text-wealth-blue' : 'text-wealth-gray'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="text-wealth-navy border-wealth-navy hover:bg-wealth-navy hover:text-white">
              Log In
            </Button>
            <Button className="bg-wealth-navy text-white hover:bg-wealth-blue" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-base font-medium py-2 ${
                  isActive(item.path) ? 'text-wealth-blue' : 'text-wealth-gray'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Button variant="outline" className="w-full">Log In</Button>
              <Button className="w-full bg-wealth-navy text-white" asChild>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
