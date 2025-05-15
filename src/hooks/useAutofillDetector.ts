import { useEffect } from 'react';
import { isIOS } from '@/lib/formUtils';

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
        
        // Different detection techniques for iOS vs other browsers
        if (isIOS()) {
          // On iOS, we simply check if the field has a value but our state doesn't
          if (input.value !== "" && formData[name as keyof T] === "") {
            wasAutofilled = true;
            setFormData(prev => ({
              ...prev,
              [name]: input.value
            }));
          }
        } else {
          // For other browsers, check for autofill styling and value changes
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
        }
      });
      
      return wasAutofilled;
    };
    
    // Initial check
    const initialCheck = checkAutofill();
    
    // iOS needs more frequent checks and different timing
    const interval = setInterval(() => {
      checkAutofill();
    }, isIOS() ? 200 : 300);
    
    // Monitor focus events which can trigger autofill on mobile
    const handleFocusChange = () => {
      // On iOS focus events often trigger autofill
      if (isIOS()) {
        // Immediate check
        checkAutofill();
        
        // And then after a slight delay (iOS is sometimes slow with autofill)
        setTimeout(checkAutofill, 500);
        setTimeout(checkAutofill, 1000);
      }
    };
    
    // Add focus event listeners to document
    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('focusout', handleFocusChange);
    
    // Clean up all event listeners on unmount
    return () => {
      clearInterval(interval);
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('focusout', handleFocusChange);
    };
  }, [formData, setFormData]);
}

export default useAutofillDetector; 