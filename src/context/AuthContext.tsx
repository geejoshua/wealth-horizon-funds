
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UserData {
  name: string;
  email: string;
  phone?: string;
  walletBalance: number;
  totalInvested: number;
  currentInvested: number;
  totalDeductions: number;
  reinvestReturns?: boolean;
  portfolioGrowth: {
    date: string;
    value: number;
  }[];
  linkedBankAccount?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  autoInvest?: {
    amount: number;
    frequency: string;
    startDate: string;
    status: 'active' | 'cancelled';
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (email: string) => void;
  logout: () => void;
  verifyOTP: (otp: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUserData: UserData = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  phone: '+234 812 345 6789',
  walletBalance: 25000.00,
  totalInvested: 100000.00,
  currentInvested: 124750.63,
  totalDeductions: 3500.00,
  portfolioGrowth: [
    { date: '2023-01', value: 100000 },
    { date: '2023-02', value: 102500 },
    { date: '2023-03', value: 105000 },
    { date: '2023-04', value: 107800 },
    { date: '2023-05', value: 110400 },
    { date: '2023-06', value: 113200 },
    { date: '2023-07', value: 115800 },
    { date: '2023-08', value: 118500 },
    { date: '2023-09', value: 120100 },
    { date: '2023-10', value: 121900 },
    { date: '2023-11', value: 123400 },
    { date: '2023-12', value: 124750 },
  ]
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  // Check for existing session on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      
      // Load user data from session storage or use mock data
      const storedUserData = sessionStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        // Use mock data for demonstration
        setUserData(mockUserData);
        sessionStorage.setItem('userData', JSON.stringify(mockUserData));
      }
    }
  }, []);

  const login = (email: string) => {
    sessionStorage.setItem('userEmail', email);
    // Note: isAuthenticated will be set to true after OTP verification
  };

  const verifyOTP = (otp: string) => {
    // For demo purposes, any OTP is valid
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');
    
    // Set user data when verifying OTP
    setUserData(mockUserData);
    sessionStorage.setItem('userData', JSON.stringify(mockUserData));
    
    toast.success('Login successful', {
      description: 'Welcome to your dashboard',
    });
    
    // Ensure redirection to dashboard
    navigate('/dashboard', { replace: true });
  };

  const updateUserData = (data: Partial<UserData>) => {
    if (userData) {
      const updatedData = { ...userData, ...data };
      setUserData(updatedData);
      sessionStorage.setItem('userData', JSON.stringify(updatedData));
    }
  };

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserData(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout, verifyOTP, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
