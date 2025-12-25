document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  try {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();

    if (response.ok) {
      // Save user info in localStorage
      localStorage.setItem('user_profile', JSON.stringify({
        name: data.name || '',
        email: data.email,
        location: data.location || ''
      }));

      // Redirect to dashboard
      window.location.href = '/dashboard.html';
    } else {
      errorMsg.textContent = data.error || 'Login failed. Please try again.';
    }
  } catch (err) {
    errorMsg.textContent = 'Network error: ' + err.message;
  }
});
