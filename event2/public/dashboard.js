const events = [
  { id: 1, title: "TechFest 2025", date: "2025-11-15", desc: "Innovation and coding fest", location: "IIT Campus, Delhi", paid: true, price: 100, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=60" },
  { id: 2, title: "Hackathon 2.0", date: "2025-11-22", desc: "24-hour coding challenge", location: "Startup Hub, Delhi", paid: false, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=60" },
  { id: 3, title: "Cultural Night", date: "2025-11-30", desc: "Music, dance, and fun", location: "City Hall, Hyderabad", paid: true, price: 50, image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=500&q=60" },
  { id: 4, title: "AI Workshop", date: "2025-12-05", desc: "Hands-on robotics & AI", location: "Innovation Center, Bangalore", paid: false, image: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=500&q=60" },
  { id: 5, title: "Startup Summit", date: "2025-12-10", desc: "Pitch your business ideas", location: "Tech Park, Hyderabad", paid: true, price: 150, image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=500&q=60" },
  { id: 6, title: "Holiday Parade", date: "2025-12-18", desc: "Annual festive parade downtown", location: "Main Street, Pune", paid: false, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60" },
  { id: 7, title: "Book Fair", date: "2025-11-24", desc: "All genres & authors", location: "Expo Center, Delhi", paid: false, image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=500&q=60" },
  { id: 8, title: "Art Expo", date: "2025-11-28", desc: "Modern art showcase", location: "Art Gallery, Mumbai", paid: true, price: 120, image: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=500&q=60" },
  { id: 9, title: "Coding Bootcamp", date: "2025-12-02", desc: "Full stack workshop", location: "Tech Arena, Chennai", paid: false, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=60" },
  { id: 10, title: "Yoga Retreat", date: "2025-12-09", desc: "Morning wellness camp", location: "Yoga Hall, Delhi", paid: true, price: 200, image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=500&q=60" }
];


const volunteers = [
  { title: "Food Distribution", desc: "Help serve food at the event", hours: 2, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=60" },
  { title: "Ushering Team", desc: "Guide guests and attendees", hours: 3, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=60" },
  { title: "Tech Team", desc: "Manage sound/lights/stage", hours: 4, image: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=400&q=60" },
  { title: "Tree Plantation", desc: "Support greening activities", hours: 2, image: "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=400&q=60" },
  { title: "Registration Desk", desc: "Assist with check-in", hours: 3, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=60" },
  { title: "Medical Volunteer", desc: "On-site medical aid", hours: 6, image: "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?auto=format&fit=crop&w=400&q=60" },
  { title: "Art Decor Helpers", desc: "Help set up gallery", hours: 2, image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=400&q=60" },
  { title: "Sports Event Staff", desc: "Manage scoreboard", hours: 5, image: "https://images.unsplash.com/photo-1517260911608-4ba7a1dae302?auto=format&fit=crop&w=400&q=60" }
];

// (Then your existing code for event display, filtering, modal handling, etc., with image tag usage as shown in previous response)


const LOCALSTORAGE_REGISTRATIONS_KEY = 'planup_registrations';
const USER_PROFILE_KEY = 'user_profile';
const USER_EVENT_HISTORY_KEY = 'user_event_history';
const EVENT_REQUESTS_KEY = 'planup_eventRequests';

const registrations = JSON.parse(localStorage.getItem(LOCALSTORAGE_REGISTRATIONS_KEY) || '{}');
let eventRequests = JSON.parse(localStorage.getItem(EVENT_REQUESTS_KEY) || '[]');

function saveUserProfile(profile) {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}
function getUserProfile() {
  return JSON.parse(localStorage.getItem(USER_PROFILE_KEY) || '{}');
}
function saveUserEventHistory(email, event) {
  const history = JSON.parse(localStorage.getItem(USER_EVENT_HISTORY_KEY) || '{}');
  if (!history[email]) history[email] = [];
  if (!history[email].some(ev => ev.title === event.title && ev.date === event.date)) {
    history[email].push({ title: event.title, date: event.date, completed: false });
    localStorage.setItem(USER_EVENT_HISTORY_KEY, JSON.stringify(history));
  }
}
function loadUserEventHistory(email) {
  const USER_EVENT_HISTORY_KEY = 'user_event_history'; // make sure this matches your key

  // Retrieve event history from localStorage
  const history = JSON.parse(localStorage.getItem(USER_EVENT_HISTORY_KEY) || '{}');
  const myEvents = history[email] || [];

  // Get the elements to display upcoming and completed events
  const upcomingList = document.getElementById('profileUpcomingEventsList');
  const completedList = document.getElementById('profileCompletedEventsList');

  // Today's date in yyyy-mm-dd format for comparison
  const today = new Date().toISOString().split('T')[0];

  // Clear existing content
  upcomingList.innerHTML = '';
  completedList.innerHTML = '';

  // Show message if no events found
  if (myEvents.length === 0) {
    upcomingList.innerHTML = '<li>No upcoming events.</li>';
    completedList.innerHTML = '<li>No completed events.</li>';
    return;
  }

  // Helper function to format dates nicely
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Loop through events and separate by upcoming/completed
  myEvents.forEach(ev => {
    // Mark as completed if past date and not already completed
    if (!ev.completed && ev.date < today) ev.completed = true;

    // Create list item for event
    const li = document.createElement('li');
    li.textContent = `${ev.title} - ${formatDate(ev.date)}`;

    // Append to appropriate list
    if (ev.completed) {
      completedList.appendChild(li);
    } else {
      upcomingList.appendChild(li);
    }
  });

  // Save any updates to completed flag back to localStorage
  history[email] = myEvents;
  localStorage.setItem(USER_EVENT_HISTORY_KEY, JSON.stringify(history));
}


function getCityFromLocation(location) {
  if (!location) return '';
  const parts = location.split(',');
  return parts[parts.length - 1].trim().toLowerCase();
}

function showForYouBarAndEvents() {
  const profile = getUserProfile();
  let userCity = '';
  if (profile.location) {
    userCity = profile.location.split(',')[0].trim().toLowerCase();
    document.getElementById('forYouCity').textContent = userCity.charAt(0).toUpperCase() + userCity.slice(1);
    document.getElementById('forYouBar').style.display = "flex";
    document.getElementById('eventsSectionTitle').textContent = `Events in ${userCity.charAt(0).toUpperCase() + userCity.slice(1)}`;
  } else {
    document.getElementById('forYouBar').style.display = "none";
    document.getElementById('eventsSectionTitle').textContent = "Events";
    userCity = '';
  }
  renderEventsByLocation(userCity);
  renderEventsExceptLocation(userCity);
}

function renderEventsByLocation(userLoc) {
  const container = document.getElementById('eventsList');
  container.innerHTML = "";
  const matchedEvents = events.filter(ev => getCityFromLocation(ev.location) === userLoc);
  if (matchedEvents.length === 0) {
    container.innerHTML = `<p style="padding:16px;">No events for your location right now.</p>`;
    return;
  }
  matchedEvents.forEach((ev, idx) => {
    const card = createEventCard(ev, idx);
    container.appendChild(card);
  });
}

function renderEventsExceptLocation(userLoc) {
  const container = document.getElementById('otherEventsList');
  container.innerHTML = "";
  const nonLocalEvents = events.filter(ev => getCityFromLocation(ev.location) !== userLoc);
  if (nonLocalEvents.length === 0) {
    container.innerHTML = `<p style="padding:16px;">No other events available.</p>`;
    return;
  }
  nonLocalEvents.forEach((ev, idx) => {
    const card = createEventCard(ev, idx);
    container.appendChild(card);
  });
}


function createEventCard(ev, idx) {
  const card = document.createElement('div');
  card.className = 'event-card';
  card.tabIndex = 0;
  const priceLabel = ev.paid
    ? `<span class="event-badge paid-badge">Paid${ev.price ? `: ₹${ev.price}` : ""}</span>`
    : `<span class="event-badge free-badge">Free</span>`;
  card.innerHTML = `
    <img src="${ev.image || 'https://via.placeholder.com/250'}" alt="${ev.title}" style="width:100%; height:150px; object-fit:cover; border-radius: 15px 15px 0 0; margin-bottom: 10px;" />
    ${priceLabel}
    <h3>${ev.title}</h3>
    <p><strong>Date:</strong> ${ev.date}</p>
    <p>${ev.desc}</p>
    <button class="btn-join" aria-label="Join ${ev.title}">Join</button>
  `;
  card.onclick = () => openEventModal(idx);
  card.querySelector('.btn-join').onclick = (e) => {
    e.stopPropagation();
    openEventModal(idx);
  };
  return card;
}


function renderVolunteers() {
  const container = document.getElementById('volunteersList');
  container.innerHTML = "";
  volunteers.forEach((vol, idx) => {
    const card = document.createElement('div');
    card.className = 'volunteer-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${vol.image || 'https://via.placeholder.com/250'}" alt="${vol.title}" style="width:100%; height:auto; border-radius: 15px; margin-bottom: 10px;" />
      <h3>${vol.title}</h3>
      <p>${vol.desc}</p>
      <p><strong>Hours:</strong> ${vol.hours}</p>
    `;
    card.onclick = () => openVolunteerModal(idx);
    container.appendChild(card);
  });
}

// (The rest of your same existing modal, event, profile, admin, and page load code here unchanged)

// Card utility for events
function openEventModal(idx) {
  const ev = events[idx];
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  const profile = getUserProfile();
  let joinedUsersForEvent = registrations[ev.title] || [];

  // Check if user is logged in before allowing to join
  if (!profile.email || !profile.name) {
    alert("Please log in to join events.");
    return;
  }

  content.innerHTML = `
    <div>
      <span class="close-btn" onclick="closeModal()" aria-label="Close modal">&times;</span>
      <h2>${ev.title}</h2>
      <p><strong>Date:</strong> ${ev.date}</p>
      <p><strong>Location:</strong> ${ev.location}</p>
      <p>${ev.desc}</p>
      <form id="joinEventForm">
        <label>Name:
          <input required name="name" type="text" value="${profile.name || ''}" readonly />
        </label>
        <label>Email:
          <input required name="email" type="email" value="${profile.email || ''}" readonly />
        </label>
        ${ev.paid ? `<div><strong>Fee:</strong> ₹${ev.price}</div>` : ""}
        <button type="submit" class="btn-submit">${ev.paid ? 'Proceed to Pay' : 'Join Event'}</button>
      </form>
      <div class="qr-area" id="qrArea"></div>
      <iframe src="https://maps.google.com/maps?q=${encodeURIComponent(ev.location)}&output=embed" width="100%" height="130" frameborder="0" style="border-radius:8px;margin-top:10px;"></iframe>
    </div>
  `;

  overlay.style.display = 'flex';
  overlay.setAttribute('aria-hidden', 'false');
document.getElementById('joinEventForm').onsubmit = function(e) {
  e.preventDefault();

  // Extract name and email from the form fields!
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();

  if (!name || !email) {
    alert("Please fill in all required fields.");
    return;
  }
  if (joinedUsersForEvent.some(u => u.email === email)) {
    alert("You have already joined this event.");
    return;
  }
  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, eventId: ev.id })
  })
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    if (data.message) {
      alert("Successfully joined! Registration ID: " + data.registrationId);
      // Only paid events get a QR code after registration
      if (ev.paid) {
        fetch('http://localhost:3000/api/qr')
          .then(resp => resp.json())
          .then(qrData => {
            document.getElementById('qrArea').innerHTML =
              `<img src="${qrData.qrDataUrl}" alt="QR Code" style="width:220px;height:220px;border:1px solid #ccc;" />
               <div style="margin-top:8px;">UPI Link: <strong>${qrData.upiUrl}</strong></div>`;
          })
          .catch(() => alert('Could not generate QR!'));
      }
    } else {
      alert("Error: " + (data.error || "Unknown issue"));
    }
  })
  .catch(err => {
    alert("Backend error: " + err.message);
  });
};

}




function openVolunteerModal(idx) {
  const vol = volunteers[idx];
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <span class="close-btn" onclick="closeModal()" aria-label="Close modal">&times;</span>
    <h2>Join Volunteer: ${vol.title}</h2>
    <p>${vol.desc}</p>
    <form id="joinVolunteerForm">
      <label>Name:<input required name="name" type="text" /></label>
      <label>Email:<input required name="email" type="email" /></label>
      <label>Phone Number:<input required name="phone" type="tel" /></label>
      <label>Address:<input required name="address" type="text" /></label>
      <label>Why do you want to join?<textarea required name="reason" rows="3" style="resize:none;"></textarea></label>
      <button type="submit" class="btn-submit">Join Volunteer</button>
    </form>
  `;
  overlay.style.display = 'flex';
  overlay.setAttribute('aria-hidden', 'false');
  document.getElementById('joinVolunteerForm').onsubmit = function(e) {
    e.preventDefault();
    this.innerHTML = "<p>Thank you for joining! We will get in touch with you shortly.</p>";
  };
}
function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'none';
  overlay.setAttribute('aria-hidden', 'true');
  document.getElementById('modalContent').innerHTML = '';
}

// ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
  // Location picker modal logic
  const profile = getUserProfile();
  if (!profile.location) {
    document.getElementById('locationModal').style.display = "flex";
    document.getElementById('saveLocationBtn').onclick = () => {
      const select = document.getElementById('locationSelect');
      const city = select.value;
      if (!city) return alert('Please select a city!');
      saveUserProfile({ ...profile, location: city });
      document.getElementById('locationModal').style.display = "none";
      showForYouBarAndEvents();
      renderVolunteers();
      document.getElementById('eventsSection').classList.add('show-section');
      document.getElementById('volunteersSection').classList.add('show-section');
    };
    return; // Stop until location is set
  }

  showForYouBarAndEvents();
  renderVolunteers();
  document.getElementById('eventsSection').classList.add('show-section');
  document.getElementById('volunteersSection').classList.add('show-section');
  document.getElementById('eventsRight').onclick = () => {
    document.getElementById('eventsList').scrollBy({ left: 240, behavior: 'smooth' });
  };
  document.getElementById('volunteersRight').onclick = () => {
    document.getElementById('volunteersList').scrollBy({ left: 240, behavior: 'smooth' });
  };
  document.getElementById('searchInput').addEventListener('input', e => {
    const term = e.target.value.trim().toLowerCase();
    document.querySelectorAll('.event-card').forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(term) ? '' : 'none';
    });
    document.querySelectorAll('.volunteer-card').forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(term) ? '' : 'none';
    });
  });
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('nav-active'));
      link.classList.add('nav-active');
      document.getElementById('eventsSection').classList.remove('show-section');
      document.getElementById('volunteersSection').classList.remove('show-section');
      const tab = link.getAttribute('data-tab').toLowerCase().trim();
      if(tab === 'dashboard' || tab === 'events') {
        showForYouBarAndEvents();
        document.getElementById('eventsSection').classList.add('show-section');
      } 
      if(tab === 'dashboard' || tab === 'volunteer') {
        document.getElementById('volunteersSection').classList.add('show-section');
      }
      if(tab === 'volunteer'){
        document.getElementById('forYouBar').style.display = "none";
        document.getElementById('eventsSection').classList.remove('show-section');
      }
    });
  });
  const profileIcon = document.getElementById('profileIcon');
  const profileDropdown = document.getElementById('profileDropdown');
  profileIcon.addEventListener('click', e => {
    e.stopPropagation();
    const isVisible = profileDropdown.classList.toggle('show');
    profileDropdown.setAttribute('aria-hidden', !isVisible);
    profileIcon.setAttribute('aria-expanded', isVisible);
  });
  document.addEventListener('click', () => {
    if(profileDropdown.classList.contains('show')) {
      profileDropdown.classList.remove('show');
      profileDropdown.setAttribute('aria-hidden', 'true');
      profileIcon.setAttribute('aria-expanded', 'false');
    }
  });
// Open My Event History modal and populate it
// In your myEventsBtn.addEventListener block
document.getElementById('myEventsBtn').addEventListener('click', () => {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  const userProfile = getUserProfile();
  const userEmail = userProfile.email || "user@example.com";

  content.innerHTML = `
    <span class="close-btn" onclick="closeModal()" aria-label="Close modal">&times;</span>
    <h2>My Event History</h2>
    <h3>Upcoming Events</h3>
    <ul id="profileUpcomingEventsList"></ul>
    <h3>Completed Events</h3>
    <ul id="profileCompletedEventsList"></ul>
  `;

  overlay.style.display = 'flex';
  overlay.setAttribute('aria-hidden', 'false');

  // NEW: Fetch event history from backend, not localStorage!
  fetch(`http://localhost:8000/user-events?email=${encodeURIComponent(userEmail.toLowerCase())}`)
    .then(res => res.json())
    .then(events => {
      const today = new Date().toISOString().slice(0, 10);
      const upcomingList = document.getElementById('profileUpcomingEventsList');
      const completedList = document.getElementById('profileCompletedEventsList');

      upcomingList.innerHTML = '';
      completedList.innerHTML = '';

      if (!events || events.length === 0) {
        upcomingList.innerHTML = '<li>No upcoming events.</li>';
        completedList.innerHTML = '<li>No completed events.</li>';
        return;
      }

      // Format and separate events
      events.forEach(ev => {
        const li = document.createElement('li');
        li.textContent = `${ev.title} - ${ev.date}`;
        if (ev.date >= today) {
          upcomingList.appendChild(li);
        } else {
          completedList.appendChild(li);
        }
      });
    })
    .catch(() => {
      document.getElementById('profileUpcomingEventsList').innerHTML = '<li>Error loading events!</li>';
      document.getElementById('profileCompletedEventsList').innerHTML = '<li>Error loading events!</li>';
    });
});

  // Load and render user event history in modal
 
// Close modal function
function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'none';
  overlay.setAttribute('aria-hidden', 'true');
  document.getElementById('modalContent').innerHTML = '';
}

// Example: function to get user profile from localStorage
function getUserProfile() {
  return JSON.parse(localStorage.getItem('user_profile') || '{}');
}

  document.getElementById('editProfileBtn').addEventListener('click', () => {
    const profile = getUserProfile();
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    content.innerHTML = `
      <span class="close-btn" onclick="closeModal()" aria-label="Close modal">&times;</span>
      <h2>Edit Profile</h2>
      <form id="profileForm">
        <label>Profile Picture:
          <input type="file" id="profilePicInput" accept="image/*" />
        </label>
        <img id="profilePicPreview" src="https://via.placeholder.com/100" alt="Profile Picture Preview" style="margin-top:10px; border-radius:50%; max-width:100px;"/>
        <label>Name:
          <input type="text" name="name" required value="${profile.name || 'User Name'}" />
        </label>
        <label>Email:
          <input type="email" name="email" required value="${profile.email || 'user@example.com'}" />
        </label>
        <label>Location/City:
          <input type="text" name="location" required value="${profile.location || 'Delhi'}" />
        </label>
        <label>Phone:
          <input type="tel" name="phone" placeholder="Optional" value="${profile.phone || ''}" />
        </label>
        <label>Password:
          <input type="password" name="password" placeholder="Enter new password" />
        </label>
        <label>Notification Preferences:
          <select name="notifications">
            <option value="all" ${profile.notifications !== 'events' && profile.notifications !== 'none' ? 'selected' : ''}>All Notifications</option>
            <option value="events" ${profile.notifications === 'events' ? 'selected' : ''}>Events Only</option>
            <option value="none" ${profile.notifications === 'none' ? 'selected' : ''}>None</option>
          </select>
        </label>
        <div style="margin: 14px 0;">
          <label><input type="checkbox" id="darkModeToggle" ${document.body.classList.contains('dark-mode') ? 'checked' : ''}/> Enable Dark Mode</label>
        </div>
        <button type="submit" class="btn-submit">Save Changes</button>
      </form>
    `;
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePicPreview = document.getElementById('profilePicPreview');
    profilePicInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if(file) {
        const reader = new FileReader();
        reader.onload = ev => profilePicPreview.src = ev.target.result;
        reader.readAsDataURL(file);
      }
    });
    document.getElementById('profileForm').onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newProfile = {
        name: formData.get('name'),
        email: formData.get('email').toLowerCase(),
        location: formData.get('location'),
        phone: formData.get('phone'),
        notifications: formData.get('notifications')
      };
      saveUserProfile(newProfile);
      document.getElementById('profileNameLabel').textContent = newProfile.name;
      document.getElementById('profileEmailLabel').textContent = newProfile.email;
      overlay.style.display = 'none';
      if(document.getElementById('darkModeToggle').checked) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      showForYouBarAndEvents();
    };
  });
  document.getElementById('logoutBtn').addEventListener('click', () => alert('Logging out...'));
  document.getElementById('addEventBtn').addEventListener('click', () => {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    content.innerHTML = `
      <span class="close-btn" onclick="closeModal()" aria-label="Close modal">&times;</span>
      <h2>Submit New Event Request</h2>
      <form id="eventRequestForm">
        <label>Title: <input name="title" required type="text" /></label>
        <label>Date: <input name="date" required type="date" /></label>
        <label>Description: <textarea name="desc" required rows="3"></textarea></label>
        <label>Location: <input name="location" required type="text" /></label>
        <label>
          Paid Event?
          <select name="paid" id="paidSelect" required>
            <option value="false" selected>No</option>
            <option value="true">Yes</option>
          </select>
        </label>
        <label id="priceLabel" style="display:none;">Price (₹): <input name="price" type="number" min="0" /></label>
        <button type="submit" class="btn-submit">Submit Request</button>
      </form>
    `;
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    document.getElementById('paidSelect').addEventListener('change', e => {
      document.getElementById('priceLabel').style.display = e.target.value === 'true' ? 'block' : 'none';
    });
    document.getElementById('eventRequestForm').onsubmit = e => {
      e.preventDefault();
      const data = new FormData(e.target);
      const newEvent = {
        title: data.get('title').trim(),
        date: data.get('date'),
        desc: data.get('desc').trim(),
        location: data.get('location').trim(),
        paid: data.get('paid') === 'true',
        price: data.get('price') ? Number(data.get('price')) : undefined,
        status: 'pending'
      };
      if(!newEvent.title || !newEvent.date || !newEvent.desc || !newEvent.location){
        alert('Please fill in all required fields!');
        return;
      }
      if(newEvent.paid && (newEvent.price === undefined || newEvent.price < 0)){
        alert('Please enter a valid price for paid event!');
        return;
      }
      eventRequests.push(newEvent);
      localStorage.setItem('planup_eventRequests', JSON.stringify(eventRequests));
      alert('Event request submitted! The admin will review it.');
      closeModal();
    };
  });
  if (!document.getElementById('adminPanelBtn')) {
    document.getElementById('profileDropdown').insertAdjacentHTML('beforeend', `<button id="adminPanelBtn" class="btn" style="background:#ffcc00; color:#333;">Admin Panel</button>`);
    document.getElementById('adminPanelBtn').addEventListener('click', () => {
      openAdminPanel();
      document.getElementById('profileDropdown').classList.remove('show');
    });
  }
});

window.onclick = event => {
  const overlay = document.getElementById('modalOverlay');
  if(event.target === overlay) closeModal();
};

function openAdminPanel() {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  if(eventRequests.length === 0){
    alert('No pending event requests.');
    return;
  }
  content.innerHTML = `
    <span class="close-btn" onclick="closeModal()" aria-label="Close modal">&times;</span>
    <h2>Admin: Review Event Requests</h2>
    <div id="eventRequestsList"></div>
  `;
  overlay.style.display = 'flex';
  overlay.setAttribute('aria-hidden', 'false');
  const listDiv = document.getElementById('eventRequestsList');
  listDiv.innerHTML = '';
  eventRequests.forEach((ev, i) => {
  if(ev.status === 'pending') {
    const div = document.createElement('div');
    div.className = 'event-card';
    div.style.marginBottom = '12px';
    div.innerHTML = `
      <h3>${ev.title}</h3>
      <p><strong>Date:</strong> ${ev.date}</p>
      <p>${ev.desc}</p>
      <p><strong>Location:</strong> ${ev.location}</p>
      <p><strong>Paid:</strong> ${ev.paid ? 'Yes, ₹' + (ev.price || '0') : 'No'}</p>
      <button class="btn-submit" id="approveBtn${i}">Approve</button>
      <button class="btn-danger" id="rejectBtn${i}">Reject</button>
    `;
    listDiv.appendChild(div);

    document.getElementById(`approveBtn${i}`).onclick = () => {
      ev.status = 'approved';
      events.push({...ev});
      eventRequests.splice(i, 1);
      localStorage.setItem(EVENT_REQUESTS_KEY, JSON.stringify(eventRequests));
      showForYouBarAndEvents();
      openAdminPanel();
    };

    document.getElementById(`rejectBtn${i}`).onclick = () => {
      ev.status = 'rejected';
      eventRequests.splice(i, 1);
      localStorage.setItem(EVENT_REQUESTS_KEY, JSON.stringify(eventRequests));
      alert(`Event "${ev.title}" rejected.`);
      openAdminPanel();
    };
  }
    });
}