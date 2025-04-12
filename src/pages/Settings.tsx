
import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/components/settings/ProfileForm";
import PasswordChangeForm from "@/components/settings/PasswordChangeForm";
import PinChangeForm from "@/components/settings/PinChangeForm";
import SupportSection from "@/components/settings/SupportSection";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar />
        
        <main className="flex-grow bg-gray-50 py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-2xl md:text-3xl font-bold text-wealth-navy mb-6">
              Settings
            </h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="pin">Security PIN</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <ProfileForm />
              </TabsContent>
              
              <TabsContent value="password">
                <PasswordChangeForm />
              </TabsContent>
              
              <TabsContent value="pin">
                <PinChangeForm />
              </TabsContent>
              
              <TabsContent value="support">
                <SupportSection />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
