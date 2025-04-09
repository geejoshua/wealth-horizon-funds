
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-wealth-navy to-wealth-blue text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Join thousands of investors building wealth with our professionally managed investment products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-wealth-gold hover:bg-wealth-gold/90 text-wealth-navy px-8 py-6 text-base">
              <Link to="/investments">Start Investing Today</Link>
            </Button>
            <Button asChild variant="outline" className="group border-white text-white hover:bg-white/10 px-8 py-6 text-base">
              <Link to="/about" className="flex items-center gap-2">
                Learn More About Us
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
