import { useEffect } from 'react';

type FormDataType = Record<string, string>;

/**
 * Custom hook to detect browser autofill and update form data accordingly
 * 
 * @param formData The current form data object
 * @param setFormData The state setter function for form data
 * @returns void
 */
export function useAutofillDetector<T extends FormDataType>(
  formData: T,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) {
  useEffect(() => {
    // Function to check for autofilled values
    const checkAutofill = () => {
      const inputs = document.querySelectorAll('input');
      let wasAutofilled = false;
      
      inputs.forEach(input => {
        const name = input.name;
        // Skip if the input doesn't have a name or isn't in our formData
        if (!name || !(name in formData)) return;
        
        // Check for browser's autofill styling
        const isAutofilled = 
          window.getComputedStyle(input, ":-webkit-autofill").getPropertyValue("background-color") !== "" ||
          input.value !== "" && formData[name as keyof T] === "";
        
        if (isAutofilled) {
          wasAutofilled = true;
          setFormData(prev => ({
            ...prev,
            [name]: input.value
          }));
        }
      });
      
      return wasAutofilled;
    };
    
    // Initial check
    const initialCheck = checkAutofill();
    
    // Set up interval for recurring checks
    const interval = setInterval(() => {
      checkAutofill();
    }, 300);
    
    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, [formData, setFormData]);
}

export default useAutofillDetector; 