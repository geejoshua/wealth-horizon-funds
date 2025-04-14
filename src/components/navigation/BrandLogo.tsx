
import { Link } from 'react-router-dom';

const BrandLogo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center gap-4">
        <img 
          src="/lovable-uploads/a8fb786b-03ee-4fb9-b4dd-01669f11ecb1.png" 
          alt="Sorplux" 
          className="h-16 w-16 object-contain"
        />
        <span className="text-2xl font-display font-bold text-sorplux-blue">Sorplux</span>
      </Link>
    </div>
  );
};

export default BrandLogo;
