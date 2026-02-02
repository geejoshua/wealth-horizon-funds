
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

import BrandLogo from './navigation/BrandLogo';
import DesktopNavigation from './navigation/DesktopNavigation';
import AuthButtons from './navigation/AuthButtons';
import MobileNavigation from './navigation/MobileNavigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check authentication status whenever location changes
  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, [location]);
  
  // Define navigation items based on authentication status
  const navItems = [
    { name: 'Home', path: '/' },
    ...(isAuthenticated ? [
      { name: 'Investments', path: '/investments' },
      { name: 'Dashboard', path: '/dashboard' },
    ] : []),
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userData');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <BrandLogo />
          <DesktopNavigation navItems={navItems} />
          <AuthButtons isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileNavigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navItems={navItems}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
