
import { TrendingUp, Shield, BarChart3, Clock } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="h-6 w-6 text-wealth-blue" />,
    title: 'Growth-Focused Investments',
    description: 'Our investment strategies are designed to maximize long-term growth while managing risk effectively.',
  },
  {
    icon: <Shield className="h-6 w-6 text-wealth-blue" />,
    title: 'Asset Security',
    description: 'Your investments are secured and managed by industry professionals with decades of experience.',
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-wealth-blue" />,
    title: 'Real-Time Performance Tracking',
    description: 'Monitor your investments with our intuitive dashboard providing up-to-date performance metrics.',
  },
  {
    icon: <Clock className="h-6 w-6 text-wealth-blue" />,
    title: 'Regular Returns',
    description: 'Enjoy consistent returns with our carefully selected investment products and optimized portfolios.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-wealth-navy mb-4">Why Choose Wealth Horizon</h2>
          <p className="text-wealth-gray text-lg">
            We combine decades of financial expertise with cutting-edge technology to deliver superior investment outcomes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-wealth-silver rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-wealth-navy">{feature.title}</h3>
              <p className="text-wealth-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
