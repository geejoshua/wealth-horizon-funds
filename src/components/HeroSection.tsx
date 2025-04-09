
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-wealth-silver to-white py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <h1 className="font-display font-bold tracking-tight">
              <span className="block">Smart Investments for a</span>
              <span className="gradient-text">Prosperous Future</span>
            </h1>
            <p className="text-lg md:text-xl text-wealth-gray max-w-md">
              Diversify your portfolio with our expert-managed investment products. Bonds, Treasury Bills, and more—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild className="bg-wealth-navy hover:bg-wealth-blue text-white px-8 py-6 text-base">
                <Link to="/investments">Explore Investments</Link>
              </Button>
              <Button asChild variant="outline" className="group border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white px-8 py-6 text-base">
                <Link to="/dashboard" className="flex items-center gap-2">
                  View Dashboard
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="pt-4">
              <p className="text-sm text-wealth-gray font-medium">Trusted by investors worldwide</p>
              <div className="flex flex-wrap gap-6 mt-4 items-center">
                <div className="text-wealth-gray/60 font-semibold">TRUSTED PARTNER</div>
                <div className="text-wealth-gray/60 font-semibold">GLOBAL FINANCE</div>
                <div className="text-wealth-gray/60 font-semibold">INVESTMAG</div>
                <div className="text-wealth-gray/60 font-semibold">FINANCIAL TIMES</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
              <div className="aspect-[4/3] bg-gradient-to-br from-wealth-navy via-wealth-blue to-wealth-navy p-1">
                <div className="bg-white w-full h-full rounded-lg overflow-hidden">
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Portfolio Overview</h3>
                      <span className="text-sm text-green-600 font-medium">+8.2% YTD</span>
                    </div>
                    <div className="h-48 bg-gradient-to-b from-wealth-blue/5 to-wealth-blue/0 rounded-md relative">
                      <div className="absolute inset-0 flex items-end">
                        <div className="w-full h-1/2 bg-gradient-to-t from-wealth-blue/0 to-wealth-blue/10 flex items-end">
                          <div className="w-full">
                            <div className="h-1/2 w-full bg-gradient-to-t from-wealth-blue/20 to-wealth-blue/0">
                              <div className="border-t border-wealth-blue/30 w-full relative">
                                <div className="absolute w-2 h-2 bg-wealth-blue rounded-full -top-1 -right-1"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-wealth-gray">Bonds</p>
                          <p className="font-medium">48%</p>
                        </div>
                        <div>
                          <p className="text-sm text-wealth-gray">T-Bills</p>
                          <p className="font-medium">36%</p>
                        </div>
                        <div>
                          <p className="text-sm text-wealth-gray">Other</p>
                          <p className="font-medium">16%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-wealth-gold/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-wealth-blue/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
