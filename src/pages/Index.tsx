import React, { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Handle redirect URL on component mount
    const qs = new URLSearchParams(window.location.search);
    const redirect = qs.get('redirect');
    if (redirect) {
      const redirectInput = document.getElementById('redirect_url') as HTMLInputElement;
      if (redirectInput) {
        redirectInput.value = redirect;
      }
    }
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-white to-lamanga-gray flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-luxury p-4">
        <div className="flex justify-center mb-1.5">
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
          id="cisco-login" 
          action="http://192.0.2.1/login.html" 
          method="POST"
          className="space-y-2.5"
        >
          <input type="hidden" name="buttonClicked" value="4" />
          <input type="hidden" name="err_flag" value="0" />
          <input type="hidden" name="username" value="" />
          <input type="hidden" name="password" value="" />
          <input type="hidden" name="redirect_url" id="redirect_url" value="" />

          <input 
            type="text" 
            name="fullname" 
            placeholder="Full Name" 
            required 
            className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lamanga-blue focus:border-transparent transition-all"
          />
          
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lamanga-blue focus:border-transparent transition-all"
          />

          <button 
            type="submit"
            className="w-full bg-lamanga-blue text-white py-2 px-4 rounded-lg hover:bg-lamanga-blue-dark transition-colors"
          >
            Connect to Wi-Fi
          </button>
        </form>

        <script dangerouslySetInnerHTML={{
          __html: `
            const qs = new URLSearchParams(window.location.search);
            const redirect = qs.get('redirect');
            if (redirect) {
              document.getElementById('redirect_url').value = redirect;
            }

            document.getElementById('cisco-login').addEventListener('submit', async function (e) {
              await fetch('https://formsubmit.co/ajax/info@timingchaingatwick.co.uk', {
                method: 'POST',
                body: new FormData(this)
              });
            });
          `
        }} />
      </div>
    </div>
  );
};

export default Index;
