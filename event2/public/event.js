// Ensure default profile in localStorage
if (!localStorage.getItem('user_profile')) {
  localStorage.setItem('user_profile', JSON.stringify({
    name: 'Neha',
    email: 'neha@email.com'
  }));
}

function getProfile() {
  return JSON.parse(localStorage.getItem('user_profile') || '{}');
}

console.log("event.js loaded");

// --- Load Events from backend into page ---
async function loadEvents() {
  const eventsDiv = document.getElementById('eventsList');
  try {
    const res = await fetch('http://localhost:3000/events');
    const events = await res.json();
    console.log("Received events:", events); // Debug line
    if (!Array.isArray(events) || events.length === 0) {
      eventsDiv.textContent = 'No events available!';
      return;
    }
    eventsDiv.innerHTML = events.map(e =>
      `<div style="margin-bottom:18px;padding:10px;background:#f8f8fd;border-radius:8px;">
        <b>${e.title}</b><br>
        ${e.desc}<br>
        Date: ${new Date(e.date).toLocaleDateString()}<br>
        Location: ${e.location}<br>
        Price: ₹${e.price || 500} <br>
        <button onclick="joinEvent(${e.id})">Join Event</button>
        <button onclick="generateQr(${e.price || 500}, ${e.id})">Pay</button>
      </div>`
    ).join('');
  } catch (err) {
    eventsDiv.textContent = 'Network error loading events.';
  }
}
document.addEventListener('DOMContentLoaded', loadEvents);

// --- Generate and show QR code ---
async function generateQr(price, eventId) {
  console.log("QR function: ", document.getElementById('qrImage'), document.getElementById('qrSection'));
  try {
    const res = await fetch('http://localhost:3000/api/qr');
    if (!res.ok) throw new Error('HTTP error! status: ' + res.status);
    const data = await res.json();
    document.getElementById('qrImage').src = data.qrDataUrl;
    document.getElementById('upiLinkText').textContent = 'UPI Link: ' + data.upiUrl;
    document.getElementById('qrSection').style.display = 'block';
  } catch(e) {
    alert('Backend error: ' + e.message);
  }
}

// --- Join an event ---
async function joinEvent(eventId) {
  const profile = getProfile();
  console.log("Joining Event: ", { name: profile.name, email: profile.email, eventId });
  if (!profile.name || !profile.email) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }
  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: profile.name,
        email: profile.email,
        eventId
      })
    });
    const data = await res.json();
    if (res.ok) {
      alert("Successfully joined event!");
    } else {
      alert(data.error || "Failed to join event.");
    }
  } catch (e) {
    alert('Network error registering for event.');
  }
}

function goDashboard() {
  window.location.href = "dashboard.html";
}

// --- QR section toggle handling (Close QR popup) ---
document.addEventListener('DOMContentLoaded', () => {
  const closeQrBtn = document.getElementById('closeQrBtn');
  if (closeQrBtn) {
    closeQrBtn.addEventListener('click', () => {
      document.getElementById('qrSection').style.display = 'none';
      document.getElementById('qrImage').src = '';
      document.getElementById('upiLinkText').textContent = '';
    });
  }
});
