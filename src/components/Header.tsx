
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut } from 'lucide-react';

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
  
  const isActive = (path: string) => location.pathname === path;
  
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
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/a8fb786b-03ee-4fb9-b4dd-01669f11ecb1.png" 
                alt="Sorplux" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-display font-bold text-sorplux-blue">Sorplux</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-sorplux-blue ${
                  isActive(item.path) ? 'text-sorplux-blue' : 'text-wealth-gray'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                className="text-sorplux-blue border-sorplux-blue hover:bg-sorplux-blue hover:text-white flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Log Out
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="text-sorplux-blue border-sorplux-blue hover:bg-sorplux-blue hover:text-white"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Button className="bg-sorplux-blue text-white hover:bg-sorplux-blue/80" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
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
                  isActive(item.path) ? 'text-sorplux-blue' : 'text-wealth-gray'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
