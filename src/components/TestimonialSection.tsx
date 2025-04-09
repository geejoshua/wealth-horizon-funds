
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "Investing with Wealth Horizon has been transformative for my financial future. The returns are consistently above market average, and their platform makes tracking my investments effortless.",
    author: "Sarah Johnson",
    position: "Retail Investor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    quote: "As someone new to investing, I appreciated the guidance and educational resources provided by Wealth Horizon. Their Treasury Bill offerings have given me a safe place to start building wealth.",
    author: "Michael Rodriguez",
    position: "First-time Investor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww"
  },
  {
    quote: "The bond portfolio managed by Wealth Horizon has been the cornerstone of my retirement strategy. Their professional management and transparent reporting give me peace of mind.",
    author: "Robert Chen",
    position: "Retirement Planner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww"
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-wealth-navy mb-4">What Our Investors Say</h2>
          <p className="text-wealth-gray text-lg">
            Join thousands of satisfied investors who are growing their wealth with our investment products.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-wealth-silver p-8 md:p-12 rounded-xl">
            <div className="absolute -top-5 left-10">
              <span className="text-7xl leading-none text-wealth-gold opacity-50">"</span>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl italic mb-6">{testimonials[currentIndex].quote}</p>
                  <div>
                    <p className="font-semibold text-wealth-navy">{testimonials[currentIndex].author}</p>
                    <p className="text-wealth-gray">{testimonials[currentIndex].position}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full w-10 h-10"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full w-10 h-10"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="absolute bottom-6 left-6 flex gap-2">
              {testimonials.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-wealth-navy w-6' : 'bg-wealth-gray/40'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
