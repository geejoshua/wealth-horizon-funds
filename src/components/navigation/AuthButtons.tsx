
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthButtonsProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
  className?: string;
}

const AuthButtons = ({ isAuthenticated, handleLogout, className = "" }: AuthButtonsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className={`hidden md:flex items-center gap-4 ${className}`}>
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
  );
};

export default AuthButtons;
