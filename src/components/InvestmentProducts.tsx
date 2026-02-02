import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, BadgeDollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import InvestDialog from "./investments/InvestDialog";
import InvestmentCard from "./investments/InvestmentCard";

const investmentProducts = {
  bonds: [
    {
      name: "Corporate Bond Fund",
      rate: "7.2%",
      risk: "Medium",
      term: "3-5 years",
      minInvestment: "$1,000",
      description:
        "A diversified portfolio of corporate bonds with steady returns and moderate risk.",
      icon: (
        <BadgeDollarSign className="h-10 w-10 p-2 bg-blue-50 text-wealth-blue rounded-lg" />
      ),
    },
    {
      name: "Government Bond Fund",
      rate: "5.8%",
      risk: "Low",
      term: "5-10 years",
      minInvestment: "$2,500",
      description:
        "Long-term government bonds offering stable and predictable returns with minimal risk.",
      icon: (
        <Shield className="h-10 w-10 p-2 bg-green-50 text-emerald-600 rounded-lg" />
      ),
    },
    {
      name: "High-Yield Bond Fund",
      rate: "8.5%",
      risk: "Medium-High",
      term: "2-4 years",
      minInvestment: "$5,000",
      description:
        "Higher-yielding corporate bonds for investors seeking stronger returns with increased risk tolerance.",
      icon: (
        <TrendingUp className="h-10 w-10 p-2 bg-amber-50 text-amber-600 rounded-lg" />
      ),
    },
  ],
  treasuryBills: [
    {
      name: "3-Month Treasury Bill",
      rate: "4.6%",
      risk: "Very Low",
      term: "3 months",
      minInvestment: "$1,000",
      description:
        "Short-term government securities with virtually no risk and competitive returns.",
      icon: (
        <Shield className="h-10 w-10 p-2 bg-green-50 text-emerald-600 rounded-lg" />
      ),
    },
    {
      name: "6-Month Treasury Bill",
      rate: "4.8%",
      risk: "Very Low",
      term: "6 months",
      minInvestment: "$1,000",
      description:
        "Medium-term treasury bills offering slightly higher returns than 3-month bills.",
      icon: (
        <Shield className="h-10 w-10 p-2 bg-green-50 text-emerald-600 rounded-lg" />
      ),
    },
    {
      name: "1-Year Treasury Bill",
      rate: "5.1%",
      risk: "Very Low",
      term: "1 year",
      minInvestment: "$1,000",
      description:
        "One-year government securities with guaranteed returns and maximum security.",
      icon: (
        <Shield className="h-10 w-10 p-2 bg-green-50 text-emerald-600 rounded-lg" />
      ),
    },
  ],
  mutualFunds: [
    {
      name: "Growth Fund",
      rate: "9.7%",
      risk: "Medium-High",
      term: "5+ years",
      minInvestment: "$5,000",
      description:
        "Focused on capital appreciation with investments in high-growth potential sectors.",
      icon: (
        <TrendingUp className="h-10 w-10 p-2 bg-amber-50 text-amber-600 rounded-lg" />
      ),
    },
    {
      name: "Income Fund",
      rate: "6.8%",
      risk: "Medium",
      term: "3+ years",
      minInvestment: "$2,500",
      description:
        "Balanced investment approach prioritizing regular income and moderate growth.",
      icon: (
        <BadgeDollarSign className="h-10 w-10 p-2 bg-blue-50 text-wealth-blue rounded-lg" />
      ),
    },
    {
      name: "Index Fund",
      rate: "8.2%",
      risk: "Medium",
      term: "5+ years",
      minInvestment: "$1,000",
      description:
        "Passively managed fund tracking major market indices with lower fees.",
      icon: (
        <BadgeDollarSign className="h-10 w-10 p-2 bg-blue-50 text-wealth-blue rounded-lg" />
      ),
    },
  ],
};

const InvestmentProducts = () => {
  const [activeTab, setActiveTab] = useState("bonds");
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [investAmount, setInvestAmount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { userData } = useAuth();

  const handleInvestClick = (product: any) => {
    setSelectedProduct(product);
    setInvestDialogOpen(true);
  };

  const handleInvestSubmit = () => {
    const amount = parseFloat(investAmount);
    const minInvestment = parseFloat(
      selectedProduct.minInvestment.replace("$", "").replace(",", ""),
    );
    const walletBalance = userData?.walletBalance || 0;

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount < minInvestment) {
      toast.error(
        `Minimum investment amount is ${selectedProduct.minInvestment}`,
      );
      return;
    }

    if (amount > walletBalance) {
      toast.error("Insufficient wallet balance");
      return;
    }

    toast.success("Investment successful!", {
      description: `You have successfully invested $${amount.toLocaleString()} in ${selectedProduct.name}`,
    });

    setInvestAmount("");
    setInvestDialogOpen(false);
  };

  const renderProducts = (products: typeof investmentProducts.bonds) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <InvestmentCard
          key={index}
          {...product}
          onInvestClick={() => handleInvestClick(product)}
        />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-wealth-silver">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-wealth-navy mb-4">Investment Products</h2>
          <p className="text-wealth-gray text-lg">
            Explore our diverse range of investment options designed to meet
            your financial goals, risk tolerance, and time horizons.
          </p>
        </div>

        <Tabs
          defaultValue="bonds"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-white/50 p-1">
            <TabsTrigger value="bonds">Bonds</TabsTrigger>
            <TabsTrigger value="treasuryBills">Treasury Bills</TabsTrigger>
            <TabsTrigger value="mutualFunds">Mutual Funds</TabsTrigger>
          </TabsList>

          <TabsContent value="bonds" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {investmentProducts.bonds.map((product, index) => (
                <div key={index} className="investment-card">
                  <div className="flex items-center justify-between mb-4">
                    <div>{product.icon}</div>
                    <span className="text-lg font-semibold text-green-600">
                      {product.rate}{" "}
                      <span className="text-sm text-wealth-gray">p.a.</span>
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                  <p className="text-wealth-gray mb-4">{product.description}</p>
                  <div className="grid grid-cols-3 gap-2 mb-6 text-sm">
                    <div>
                      <p className="text-wealth-gray mb-1">Risk Level</p>
                      <p className="font-medium">{product.risk}</p>
                    </div>
                    <div>
                      <p className="text-wealth-gray mb-1">Term</p>
                      <p className="font-medium">{product.term}</p>
                    </div>
                    <div>
                      <p className="text-wealth-gray mb-1">Minimum</p>
                      <p className="font-medium">{product.minInvestment}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-wealth-navy hover:bg-wealth-blue">
                    Invest Now
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="treasuryBills" className="mt-0">
            {renderProducts(investmentProducts.treasuryBills)}
          </TabsContent>

          <TabsContent value="mutualFunds" className="mt-0">
            {renderProducts(investmentProducts.mutualFunds)}
          </TabsContent>

          <div className="flex justify-center mt-10">
            <Button
              asChild
              variant="outline"
              className="group border-wealth-navy text-wealth-navy hover:bg-wealth-navy hover:text-white px-8"
            >
              <Link to="/investments" className="flex items-center gap-2">
                View All Investment Options
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </div>
        </Tabs>

        <InvestDialog
          open={investDialogOpen}
          onOpenChange={setInvestDialogOpen}
          selectedProduct={selectedProduct}
          investAmount={investAmount}
          onInvestAmountChange={setInvestAmount}
          onInvestSubmit={handleInvestSubmit}
          walletBalance={userData?.walletBalance}
        />
      </div>
    </section>
  );
};

export default InvestmentProducts;
