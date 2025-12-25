document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.textContent = "";

  try {
    const res = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registration successful! Please log in.");
      window.location.href = "login.html";
    } else {
      errorMsg.textContent = data.error || "Registration failed.";
    }
  } catch (err) {
    errorMsg.textContent = "Network error: " + err.message;
  }
});
