
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('wifi-form');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) {
    console.error('No form found on the page.');
    return;
  }

  // Read query parameters for switch_url or actionurl
  const urlParams = new URLSearchParams(window.location.search);
  const switchUrl = urlParams.get('switch_url') || urlParams.get('actionurl');
  const fallbackUrl = 'http://192.0.2.1/login.html';

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Show loading state
    if (submitBtn) {
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.textContent = 'Connecting...';
    }

    // Copy email to username field (required for Cisco Email Address login mode)
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');

    if (emailInput && usernameInput && emailInput.value) {
      usernameInput.value = emailInput.value;
    }

    // Collect form data
    const formData = new FormData(form);

    // Optional: Send form data to guest capture endpoint
    fetch('https://example.com/guest-capture', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      console.log('Data sent successfully:', response);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    })
    .finally(() => {
      // Always redirect after attempting to send data
      const redirectUrl = switchUrl || fallbackUrl;
      console.log('Redirecting to:', redirectUrl);
      window.location.href = redirectUrl;
    });
  });
});
