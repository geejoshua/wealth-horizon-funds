
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardSidebar from "@/components/DashboardSidebar";
import WalletCard from "@/components/WalletCard";
import InvestmentSummary from "@/components/InvestmentSummary";
import RecentActivity from "@/components/RecentActivity";
import PortfolioChart from "@/components/PortfolioChart";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { userData } = useAuth();

  if (!userData) {
    return null; // Show nothing while loading user data
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main content */}
        <main className="flex-grow bg-gray-50 py-10 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-wealth-navy">
                  Welcome back, {userData.name.split(' ')[0]}
                </h1>
                <p className="text-wealth-gray mt-1">
                  Here's the latest overview of your investments
                </p>
              </div>
            </div>

            {/* Investment summary */}
            <div className="mb-8">
              <InvestmentSummary />
            </div>
            
            {/* Portfolio chart and wallet */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <PortfolioChart />
              </div>
              <div className="lg:col-span-1">
                <WalletCard />
              </div>
            </div>
            
            {/* Recent activity */}
            <div className="mb-8">
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
