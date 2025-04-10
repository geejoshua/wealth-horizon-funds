
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { CheckCircle2, Clock } from "lucide-react";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user came from login page
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
      toast.error("Please login first", {
        description: "You need to login before verifying OTP",
      });
      navigate("/login");
      return;
    }
    
    setUserEmail(email);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  const handleVerify = async () => {
    if (otp.length !== 4) {
      toast.error("Invalid OTP", {
        description: "Please enter a valid 4-digit OTP",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would validate the OTP with an API call
      // For demo purposes, any 4-digit code is accepted
      console.log("Verifying OTP:", otp);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store authentication status
      sessionStorage.setItem("isAuthenticated", "true");
      
      // Success message
      toast.success("Login successful", {
        description: "Welcome back to Wealth Horizon",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error("Verification failed", {
        description: "Invalid verification code",
      });
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    
    try {
      // In a real app, this would call an API to resend OTP
      console.log("Resending OTP to:", userEmail);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset countdown
      setCountdown(30);
      
      // Success message
      toast.success("OTP resent", {
        description: `A new verification code has been sent to ${userEmail}`,
      });
    } catch (error) {
      toast.error("Failed to resend OTP", {
        description: "Please try again later",
      });
      console.error("Resend OTP error:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-wealth-navy">Verify Your Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600">
                We've sent a 4-digit verification code to your phone and email
                {userEmail ? ` (${userEmail.replace(/^(.{3})(.*)(@.*)$/, '$1•••••$3')})` : ''}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={4} 
                  value={otp} 
                  onChange={setOtp}
                  containerClassName="gap-4"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-14 h-14 text-2xl" />
                    <InputOTPSlot index={1} className="w-14 h-14 text-2xl" />
                    <InputOTPSlot index={2} className="w-14 h-14 text-2xl" />
                    <InputOTPSlot index={3} className="w-14 h-14 text-2xl" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button
                onClick={handleVerify}
                disabled={otp.length !== 4 || isLoading}
                className="w-full bg-wealth-navy hover:bg-wealth-blue"
              >
                {isLoading ? (
                  "Verifying..."
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Verify and Continue
                  </>
                )}
              </Button>
              
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">
                  Didn't receive a code?
                </div>
                <Button
                  variant="link"
                  onClick={handleResendOTP}
                  disabled={countdown > 0 || isResending}
                  className="text-wealth-blue hover:text-wealth-navy"
                >
                  {isResending ? (
                    "Sending..."
                  ) : countdown > 0 ? (
                    <>
                      <Clock className="mr-1 h-4 w-4" />
                      Resend in {countdown}s
                    </>
                  ) : (
                    "Resend Code"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyOTP;
