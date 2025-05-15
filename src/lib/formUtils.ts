/**
 * Utilities for handling form submissions
 */

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
    
    // Check if this field appears to be autofilled by the browser
    const isAutofilled = 
      window.getComputedStyle(input, ":-webkit-autofill").getPropertyValue("background-color") !== "" ||
      input.value !== "";
    
    if (isAutofilled) {
      data[name] = input.value;
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
    
    // Combine all data sources with priority: autofill > state > form
    const allData = {
      ...Object.fromEntries(formDataObj),
      ...formData,
      ...autofillData
    };
    
    // Create a new FormData with all the combined data
    const finalFormData = new FormData();
    Object.entries(allData).forEach(([key, value]) => {
      finalFormData.append(key, value);
    });
    
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
    // Call error callback if available
    if (onError && error instanceof Error) onError(error);
    
    // Fall back to traditional form submission
    form.submit();
    return false;
  }
};

export default {
  extractAutofillData,
  submitFormWithHiddenData
}; 