
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpRight, ArrowDownRight, Shield, TrendingUp, BadgeDollarSign } from "lucide-react";

const Investments = () => {
  const [investmentType, setInvestmentType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const investmentProducts = [
    {
      id: 1,
      name: "Corporate Bond Fund",
      category: "bonds",
      rate: "7.2%",
      risk: "Medium",
      term: "3-5 years",
      minInvestment: "$1,000",
      performance: "+4.3%",
      trending: "up",
      icon: <BadgeDollarSign className="h-8 w-8 p-1 bg-blue-50 text-wealth-blue rounded-lg" />
    },
    {
      id: 2,
      name: "Government Bond Fund",
      category: "bonds",
      rate: "5.8%",
      risk: "Low",
      term: "5-10 years",
      minInvestment: "$2,500",
      performance: "+2.1%",
      trending: "up",
      icon: <Shield className="h-8 w-8 p-1 bg-green-50 text-emerald-600 rounded-lg" />
    },
    {
      id: 3,
      name: "3-Month Treasury Bill",
      category: "treasuryBills",
      rate: "4.6%",
      risk: "Very Low",
      term: "3 months",
      minInvestment: "$1,000",
      performance: "+1.1%",
      trending: "up",
      icon: <Shield className="h-8 w-8 p-1 bg-green-50 text-emerald-600 rounded-lg" />
    },
    {
      id: 4,
      name: "Growth Fund",
      category: "mutualFunds",
      rate: "9.7%",
      risk: "Medium-High",
      term: "5+ years",
      minInvestment: "$5,000",
      performance: "+7.2%",
      trending: "up",
      icon: <TrendingUp className="h-8 w-8 p-1 bg-amber-50 text-amber-600 rounded-lg" />
    },
    {
      id: 5,
      name: "High-Yield Bond Fund",
      category: "bonds",
      rate: "8.5%",
      risk: "Medium-High",
      term: "2-4 years",
      minInvestment: "$5,000",
      performance: "-0.8%",
      trending: "down",
      icon: <TrendingUp className="h-8 w-8 p-1 bg-amber-50 text-amber-600 rounded-lg" />
    },
    {
      id: 6,
      name: "6-Month Treasury Bill",
      category: "treasuryBills",
      rate: "4.8%",
      risk: "Very Low",
      term: "6 months",
      minInvestment: "$1,000",
      performance: "+1.3%",
      trending: "up",
      icon: <Shield className="h-8 w-8 p-1 bg-green-50 text-emerald-600 rounded-lg" />
    },
    {
      id: 7,
      name: "Income Fund",
      category: "mutualFunds",
      rate: "6.8%",
      risk: "Medium",
      term: "3+ years",
      minInvestment: "$2,500",
      performance: "+3.5%",
      trending: "up",
      icon: <BadgeDollarSign className="h-8 w-8 p-1 bg-blue-50 text-wealth-blue rounded-lg" />
    },
    {
      id: 8,
      name: "1-Year Treasury Bill",
      category: "treasuryBills",
      rate: "5.1%",
      risk: "Very Low",
      term: "1 year",
      minInvestment: "$1,000",
      performance: "+1.5%",
      trending: "up",
      icon: <Shield className="h-8 w-8 p-1 bg-green-50 text-emerald-600 rounded-lg" />
    },
    {
      id: 9,
      name: "Index Fund",
      category: "mutualFunds",
      rate: "8.2%",
      risk: "Medium",
      term: "5+ years",
      minInvestment: "$1,000",
      performance: "-1.2%",
      trending: "down",
      icon: <BadgeDollarSign className="h-8 w-8 p-1 bg-blue-50 text-wealth-blue rounded-lg" />
    },
  ];

  const filteredProducts = investmentProducts.filter(
    (product) => 
      (investmentType === "all" || product.category === investmentType) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const getRiskBadgeColor = (risk: string) => {
    if (risk === "Very Low") return "bg-green-100 text-green-800";
    if (risk === "Low") return "bg-emerald-100 text-emerald-800";
    if (risk === "Medium") return "bg-blue-100 text-blue-800";
    if (risk === "Medium-High") return "bg-amber-100 text-amber-800";
    if (risk === "High") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-wealth-navy">
                Investment Products
              </h1>
              <p className="text-wealth-gray mt-1">
                Explore our diverse range of investment opportunities
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search investments..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-wealth-blue focus:border-wealth-blue"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex gap-2 items-center">
                  <Filter size={16} />
                  Filter
                </Button>
                <Button className="bg-wealth-navy hover:bg-wealth-blue">
                  Compare Products
                </Button>
              </div>
            </div>
            
            <Tabs 
              defaultValue="all"
              className="w-full" 
              onValueChange={(value) => setInvestmentType(value)}
            >
              <div className="px-6 border-b">
                <TabsList className="bg-transparent">
                  <TabsTrigger 
                    value="all"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-wealth-blue data-[state=active]:text-wealth-blue rounded-none py-2 px-4"
                  >
                    All Products
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bonds"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-wealth-blue data-[state=active]:text-wealth-blue rounded-none py-2 px-4"
                  >
                    Bonds
                  </TabsTrigger>
                  <TabsTrigger 
                    value="treasuryBills"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-wealth-blue data-[state=active]:text-wealth-blue rounded-none py-2 px-4"
                  >
                    Treasury Bills
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mutualFunds"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-wealth-blue data-[state=active]:text-wealth-blue rounded-none py-2 px-4"
                  >
                    Mutual Funds
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                          <div className="flex gap-3 items-center">
                            {product.icon}
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                          </div>
                          <Badge variant="outline" className={getRiskBadgeColor(product.risk)}>
                            {product.risk} Risk
                          </Badge>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between py-2">
                            <div>
                              <p className="text-sm text-wealth-gray">Annual Return</p>
                              <p className="font-semibold text-green-600">{product.rate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-wealth-gray">Term</p>
                              <p className="font-semibold">{product.term}</p>
                            </div>
                            <div>
                              <p className="text-sm text-wealth-gray">Minimum</p>
                              <p className="font-semibold">{product.minInvestment}</p>
                            </div>
                          </div>
                          <div className="flex items-center mt-2">
                            <div className="text-sm">
                              Current Performance: 
                              <span className={`ml-1 font-medium ${product.trending === "up" ? "text-green-600" : "text-red-600"}`}>
                                {product.performance}
                                {product.trending === "up" 
                                  ? <ArrowUpRight className="inline ml-1" size={14} /> 
                                  : <ArrowDownRight className="inline ml-1" size={14} />
                                }
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button className="w-full bg-wealth-navy hover:bg-wealth-blue">
                            Invest Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-wealth-gray text-lg">No investment products found matching your criteria.</p>
                      <Button 
                        variant="link" 
                        className="mt-2 text-wealth-blue"
                        onClick={() => {
                          setSearchTerm("");
                          setInvestmentType("all");
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="bonds" className="mt-0">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                          <div className="flex gap-3 items-center">
                            {product.icon}
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                          </div>
                          <Badge variant="outline" className={getRiskBadgeColor(product.risk)}>
                            {product.risk} Risk
                          </Badge>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between py-2">
                            <div>
                              <p className="text-sm text-wealth-gray">Annual Return</p>
                              <p className="font-semibold text-green-600">{product.rate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-wealth-gray">Term</p>
                              <p className="font-semibold">{product.term}</p>
                            </div>
                            <div>
                              <p className="text-sm text-wealth-gray">Minimum</p>
                              <p className="font-semibold">{product.minInvestment}</p>
                            </div>
                          </div>
                          <div className="flex items-center mt-2">
                            <div className="text-sm">
                              Current Performance: 
                              <span className={`ml-1 font-medium ${product.trending === "up" ? "text-green-600" : "text-red-600"}`}>
                                {product.performance}
                                {product.trending === "up" 
                                  ? <ArrowUpRight className="inline ml-1" size={14} /> 
                                  : <ArrowDownRight className="inline ml-1" size={14} />
                                }
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button className="w-full bg-wealth-navy hover:bg-wealth-blue">
                            Invest Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-wealth-gray text-lg">No bond products found matching your criteria.</p>
                      <Button 
                        variant="link" 
                        className="mt-2 text-wealth-blue"
                        onClick={() => {
                          setSearchTerm("");
                          setInvestmentType("bonds");
                        }}
                      >
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="treasuryBills" className="mt-0">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                          <div className="flex gap-3 items-center">
                            {product.icon}
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                          </div>
                          <Badge variant="outline" className={getRiskBadgeColor(product.risk)}>
                            {product.risk} Risk
                          </Badge>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between py-2">
                            <div>
                              <p className="text-sm text-wealth-gray">Annual Return</p>
                              <p className="font-semibold text-green-600">{product.rate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-wealth-gray">Term</p>
                              <p className="font-semibold">{product.term}</p>
                            </div>
                            <div>
                              <p className="text-sm text-wealth-gray">Minimum</p>
                              <p className="font-semibold">{product.minInvestment}</p>
                            </div>
                          </div>
                          <div className="flex items-center mt-2">
                            <div className="text-sm">
                              Current Performance: 
                              <span className={`ml-1 font-medium ${product.trending === "up" ? "text-green-600" : "text-red-600"}`}>
                                {product.performance}
                                {product.trending === "up" 
                                  ? <ArrowUpRight className="inline ml-1" size={14} /> 
                                  : <ArrowDownRight className="inline ml-1" size={14} />
                                }
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button className="w-full bg-wealth-navy hover:bg-wealth-blue">
                            Invest Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-wealth-gray text-lg">No treasury bill products found matching your criteria.</p>
                      <Button 
                        variant="link" 
                        className="mt-2 text-wealth-blue"
                        onClick={() => {
                          setSearchTerm("");
                          setInvestmentType("treasuryBills");
                        }}
                      >
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="mutualFunds" className="mt-0">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                          <div className="flex gap-3 items-center">
                            {product.icon}
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                          </div>
                          <Badge variant="outline" className={getRiskBadgeColor(product.risk)}>
                            {product.risk} Risk
                          </Badge>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between py-2">
                            <div>
                              <p className="text-sm text-wealth-gray">Annual Return</p>
                              <p className="font-semibold text-green-600">{product.rate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-wealth-gray">Term</p>
                              <p className="font-semibold">{product.term}</p>
                            </div>
                            <div>
                              <p className="text-sm text-wealth-gray">Minimum</p>
                              <p className="font-semibold">{product.minInvestment}</p>
                            </div>
                          </div>
                          <div className="flex items-center mt-2">
                            <div className="text-sm">
                              Current Performance: 
                              <span className={`ml-1 font-medium ${product.trending === "up" ? "text-green-600" : "text-red-600"}`}>
                                {product.performance}
                                {product.trending === "up" 
                                  ? <ArrowUpRight className="inline ml-1" size={14} /> 
                                  : <ArrowDownRight className="inline ml-1" size={14} />
                                }
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button className="w-full bg-wealth-navy hover:bg-wealth-blue">
                            Invest Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-wealth-gray text-lg">No mutual fund products found matching your criteria.</p>
                      <Button 
                        variant="link" 
                        className="mt-2 text-wealth-blue"
                        onClick={() => {
                          setSearchTerm("");
                          setInvestmentType("mutualFunds");
                        }}
                      >
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Investments;
