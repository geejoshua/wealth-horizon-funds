
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle, ChevronRight, Landmark, User, CreditCard, Briefcase } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { countries } from "@/lib/countries";

// Define the sections of the KYC flow
type Section = "personal" | "transaction" | "employment";

// Personal Details Schema
const personalSchema = z.object({
  gender: z.enum(["male", "female"], {
    required_error: "Please select your gender",
  }),
  dateOfBirth: z.date({
    required_error: "Please select your date of birth",
  }).refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear();
    const monthDiff = new Date().getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < date.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }, "You must be at least 18 years old to register"),
  maritalStatus: z.enum(["single", "married", "divorced"], {
    required_error: "Please select your marital status",
  }),
  citizenship: z.string().min(1, "Please select your citizenship"),
  idType: z.enum(["bvn", "nin"], {
    required_error: "Please select an ID type",
  }),
  idNumber: z.string().min(1, "Please enter your ID number"),
  address: z.object({
    city: z.string().min(1, "Please enter your city"),
    localGovernment: z.string().min(1, "Please enter your local government"),
    state: z.string().min(1, "Please enter your state"),
  }),
});

// Transaction Details Schema
const transactionSchema = z.object({
  transactionPin: z.string().length(4, "PIN must be exactly 4 digits").regex(/^\d+$/, "PIN must contain only digits"),
  confirmTransactionPin: z.string().length(4, "PIN must be exactly 4 digits"),
  secretQuestion: z.string().min(1, "Please select a secret question"),
  secretAnswer: z.string().min(1, "Please provide an answer to your secret question"),
  bankName: z.string().min(1, "Please select your bank"),
  accountNumber: z.string().length(10, "Account number must be exactly 10 digits").regex(/^\d+$/, "Account number must contain only digits"),
  accountName: z.string().min(1, "Please enter your account name"),
  reinvestReturns: z.boolean().default(true),
}).refine((data) => data.transactionPin === data.confirmTransactionPin, {
  message: "PINs do not match",
  path: ["confirmTransactionPin"],
});

// Employment Details Schema
const employmentSchema = z.object({
  employmentStatus: z.enum(["employed", "self-employed", "not-employed"], {
    required_error: "Please select your employment status",
  }),
  employerName: z.string().optional(),
  occupation: z.string().min(1, "Please enter your occupation"),
  sourceOfFunds: z.string().min(1, "Please select your source of funds"),
  politicallyExposed: z.boolean(),
  politicallyRelated: z.boolean(),
});

type PersonalFormValues = z.infer<typeof personalSchema>;
type TransactionFormValues = z.infer<typeof transactionSchema>;
type EmploymentFormValues = z.infer<typeof employmentSchema>;

// KYC Component
const KYC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>("personal");
  const [userData, setUserData] = useState<any>(null);
  const [completed, setCompleted] = useState<Record<Section, boolean>>({
    personal: false,
    transaction: false,
    employment: false,
  });

  // Initialize forms for each section
  const personalForm = useForm<PersonalFormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      gender: undefined,
      dateOfBirth: undefined,
      maritalStatus: undefined,
      citizenship: "",
      idType: undefined,
      idNumber: "",
      address: {
        city: "",
        localGovernment: "",
        state: "",
      },
    },
  });

  const transactionForm = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionPin: "",
      confirmTransactionPin: "",
      secretQuestion: "",
      secretAnswer: "",
      bankName: "",
      accountNumber: "",
      accountName: "",
      reinvestReturns: true,
    },
  });

  const employmentForm = useForm<EmploymentFormValues>({
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      employmentStatus: undefined,
      employerName: "",
      occupation: "",
      sourceOfFunds: "",
      politicallyExposed: false,
      politicallyRelated: false,
    },
  });

  // Get user data from sessionStorage
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Handle form submissions for each section
  const handlePersonalSubmit = (data: PersonalFormValues) => {
    console.log("Personal details:", data);
    // Simulate ID verification
    toast.success("ID verified successfully!");
    
    setCompleted((prev) => ({ ...prev, personal: true }));
    setActiveSection("transaction");
  };

  const handleTransactionSubmit = (data: TransactionFormValues) => {
    console.log("Transaction details:", data);
    // Simulate bank account verification
    toast.success("Bank account verified successfully!");
    
    setCompleted((prev) => ({ ...prev, transaction: true }));
    setActiveSection("employment");
  };

  const handleEmploymentSubmit = (data: EmploymentFormValues) => {
    console.log("Employment details:", data);
    
    // Combine all form data for final submission
    const completeKycData = {
      ...userData,
      personal: personalForm.getValues(),
      transaction: transactionForm.getValues(),
      employment: data,
    };
    
    console.log("Complete KYC data:", completeKycData);
    
    toast.success("KYC verification completed!", {
      description: "Your account has been successfully verified.",
    });
    
    // Clear session storage and navigate to dashboard
    setTimeout(() => {
      sessionStorage.removeItem("userData");
      navigate("/dashboard");
    }, 2000);
  };

  const secretQuestions = [
    "What was your childhood nickname?",
    "What is the name of your first pet?",
    "In which city were you born?",
    "What is your mother's maiden name?",
    "What was your first car?",
  ];

  const banks = [
    "Access Bank",
    "Guaranty Trust Bank",
    "First Bank of Nigeria",
    "United Bank for Africa (UBA)",
    "Zenith Bank",
    "Fidelity Bank",
    "Ecobank Nigeria",
    "Union Bank of Nigeria",
    "Sterling Bank",
    "Wema Bank",
    "First City Monument Bank (FCMB)",
  ];

  const fundsSource = [
    "Salary",
    "Business Income",
    "Inheritance",
    "Investments",
    "Savings",
    "Gift",
    "Other",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-wealth-navy">Complete Your KYC Verification</h1>
            <p className="text-gray-600 mt-2">Please provide the required information to verify your identity</p>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div 
                className={`flex flex-col items-center ${activeSection === "personal" ? "text-wealth-navy" : completed.personal ? "text-green-500" : "text-gray-400"}`}
                onClick={() => completed.personal && setActiveSection("personal")}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  completed.personal ? "bg-green-100" : activeSection === "personal" ? "bg-wealth-navy text-white" : "bg-gray-200"
                }`}>
                  {completed.personal ? <CheckCircle size={20} /> : <User size={20} />}
                </div>
                <span className="text-sm font-medium">Personal</span>
              </div>
              
              <div className={`w-20 h-1 ${completed.personal ? "bg-green-500" : "bg-gray-200"}`}></div>
              
              <div 
                className={`flex flex-col items-center ${activeSection === "transaction" ? "text-wealth-navy" : completed.transaction ? "text-green-500" : "text-gray-400"}`}
                onClick={() => completed.transaction && setActiveSection("transaction")}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  completed.transaction ? "bg-green-100" : activeSection === "transaction" ? "bg-wealth-navy text-white" : "bg-gray-200"
                }`}>
                  {completed.transaction ? <CheckCircle size={20} /> : <CreditCard size={20} />}
                </div>
                <span className="text-sm font-medium">Transaction</span>
              </div>
              
              <div className={`w-20 h-1 ${completed.transaction ? "bg-green-500" : "bg-gray-200"}`}></div>
              
              <div 
                className={`flex flex-col items-center ${activeSection === "employment" ? "text-wealth-navy" : completed.employment ? "text-green-500" : "text-gray-400"}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  completed.employment ? "bg-green-100" : activeSection === "employment" ? "bg-wealth-navy text-white" : "bg-gray-200"
                }`}>
                  {completed.employment ? <CheckCircle size={20} /> : <Briefcase size={20} />}
                </div>
                <span className="text-sm font-medium">Employment</span>
              </div>
            </div>
          </div>
          
          <Card className="border-wealth-navy/20 shadow-lg">
            <CardHeader className="bg-wealth-navy/5 border-b">
              <CardTitle className="text-xl text-wealth-navy">
                {activeSection === "personal" && "Personal Details"}
                {activeSection === "transaction" && "Transaction Details"}
                {activeSection === "employment" && "Employment Details"}
              </CardTitle>
              <CardDescription>
                {activeSection === "personal" && "Provide your personal information for identity verification"}
                {activeSection === "transaction" && "Set up your transaction security and banking information"}
                {activeSection === "employment" && "Provide information about your employment and source of funds"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {activeSection === "personal" && (
                <Form {...personalForm}>
                  <form onSubmit={personalForm.handleSubmit(handlePersonalSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FormField
                        control={personalForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={personalForm.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of Birth</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full pl-3 text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    // Disable future dates and dates less than 18 years ago
                                    const eighteenYearsAgo = new Date();
                                    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
                                    return date > new Date() || date > eighteenYearsAgo;
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              You must be at least 18 years old.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FormField
                        control={personalForm.control}
                        name="maritalStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marital Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your marital status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married">Married</SelectItem>
                                <SelectItem value="divorced">Divorced</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={personalForm.control}
                        name="citizenship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Citizenship</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your country of citizenship" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map((country) => (
                                  <SelectItem key={country.name} value={country.name}>
                                    {country.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <FormField
                        control={personalForm.control}
                        name="idType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID Type</FormLabel>
                            <FormDescription>Select type of ID for verification</FormDescription>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="bvn" id="bvn" />
                                  <label htmlFor="bvn" className="font-medium">BVN (Bank Verification Number)</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="nin" id="nin" />
                                  <label htmlFor="nin" className="font-medium">NIN (National Identification Number)</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={personalForm.control}
                        name="idNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID Number</FormLabel>
                            <FormDescription>
                              Enter your {personalForm.watch("idType") === "bvn" ? "BVN" : personalForm.watch("idType") === "nin" ? "NIN" : "ID"} number
                            </FormDescription>
                            <FormControl>
                              <Input placeholder="Enter ID number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-wealth-navy">Address Information</h3>
                      
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField
                          control={personalForm.control}
                          name="address.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={personalForm.control}
                          name="address.localGovernment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Local Government Area</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your LGA" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={personalForm.control}
                        name="address.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your state" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-wealth-navy hover:bg-wealth-blue">
                      Continue to Transaction Details
                      <ChevronRight size={16} />
                    </Button>
                  </form>
                </Form>
              )}
              
              {activeSection === "transaction" && (
                <Form {...transactionForm}>
                  <form onSubmit={transactionForm.handleSubmit(handleTransactionSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-wealth-navy">Security Settings</h3>
                      
                      <FormField
                        control={transactionForm.control}
                        name="transactionPin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transaction PIN</FormLabel>
                            <FormDescription>
                              Create a 4-digit PIN for authorizing transactions
                            </FormDescription>
                            <FormControl>
                              <InputOTP maxLength={4} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={transactionForm.control}
                        name="confirmTransactionPin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Transaction PIN</FormLabel>
                            <FormControl>
                              <InputOTP maxLength={4} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={transactionForm.control}
                        name="secretQuestion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secret Question</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a secret question" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {secretQuestions.map((question) => (
                                  <SelectItem key={question} value={question}>
                                    {question}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={transactionForm.control}
                        name="secretAnswer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secret Answer</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your answer" 
                                {...field} 
                                type="password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-semibold text-wealth-navy">Bank Account Details</h3>
                      <FormDescription>
                        This account will be used for withdrawals and payments
                      </FormDescription>
                      
                      <FormField
                        control={transactionForm.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your bank" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {banks.map((bank) => (
                                  <SelectItem key={bank} value={bank}>
                                    {bank}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={transactionForm.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter 10-digit account number" 
                                {...field} 
                                maxLength={10}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={transactionForm.control}
                        name="accountName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter account name" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={transactionForm.control}
                        name="reinvestReturns"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 space-y-0 gap-2">
                            <div className="space-y-0.5">
                              <FormLabel>Reinvest Returns</FormLabel>
                              <FormDescription>
                                Would you like your investment returns to be automatically reinvested?
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setActiveSection("personal")}
                      >
                        Back to Personal Details
                      </Button>
                      <Button type="submit" className="bg-wealth-navy hover:bg-wealth-blue">
                        Continue to Employment Details
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
              
              {activeSection === "employment" && (
                <Form {...employmentForm}>
                  <form onSubmit={employmentForm.handleSubmit(handleEmploymentSubmit)} className="space-y-6">
                    <FormField
                      control={employmentForm.control}
                      name="employmentStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your employment status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="employed">Employed</SelectItem>
                              <SelectItem value="self-employed">Self-Employed</SelectItem>
                              <SelectItem value="not-employed">Not Employed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {(employmentForm.watch("employmentStatus") === "employed") && (
                      <FormField
                        control={employmentForm.control}
                        name="employerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employer Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your employer's name" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={employmentForm.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your occupation" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={employmentForm.control}
                      name="sourceOfFunds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Source of Funds</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your primary source of funds" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {fundsSource.map((source) => (
                                <SelectItem key={source} value={source.toLowerCase()}>
                                  {source}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-semibold text-wealth-navy">Political Exposure</h3>
                      
                      <FormField
                        control={employmentForm.control}
                        name="politicallyExposed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Have you occupied a political office?
                              </FormLabel>
                              <FormDescription>
                                Please indicate if you have held a political position in the past or currently.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={employmentForm.control}
                        name="politicallyRelated"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Are you related to a political office holder?
                              </FormLabel>
                              <FormDescription>
                                Please indicate if you have any close relatives who hold or have held political positions.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setActiveSection("transaction")}
                      >
                        Back to Transaction Details
                      </Button>
                      <Button type="submit" className="bg-wealth-navy hover:bg-wealth-blue">
                        Complete KYC
                        <CheckCircle size={16} className="ml-2" />
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KYC;
