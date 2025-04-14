
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sorplux-blue text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img 
                src="/lovable-uploads/a8fb786b-03ee-4fb9-b4dd-01669f11ecb1.png" 
                alt="Sorplux" 
                className="h-8 w-auto bg-white/20 p-1 rounded"
              />
              <span className="text-xl font-display font-bold text-white">Sorplux</span>
            </Link>
            <p className="text-gray-300 text-sm mt-4">
              Building financial futures through smart, diversified investments and personalized portfolio management.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link to="/investments" className="text-gray-300 hover:text-white text-sm">Mutual Funds</Link></li>
              <li><Link to="/investments" className="text-gray-300 hover:text-white text-sm">Bonds</Link></li>
              <li><Link to="/investments" className="text-gray-300 hover:text-white text-sm">Treasury Bills</Link></li>
              <li><Link to="/investments" className="text-gray-300 hover:text-white text-sm">Portfolio Management</Link></li>
              <li><Link to="/investments" className="text-gray-300 hover:text-white text-sm">Retirement Plans</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white text-sm">Our Team</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white text-sm">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white text-sm">Press & Media</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Cookie Policy</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Investment Disclaimer</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Sorplux. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Investment involves risk. Past performance is not a guarantee of future returns.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
