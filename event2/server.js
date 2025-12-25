const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// --- YOUR FULL EVENTS ARRAY ---
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

// --- EVENTS API ---
app.get('/events', (req, res) => {

console.log("Sending events:", events);   res.json(events);
});

// --- QR API ---
app.get('/api/qr', (req, res) => {
  const upiId = 'Planupi@oksbi';
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=PlanUp&cu=INR`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUrl)}`;
  res.json({ qrDataUrl: qrApiUrl, upiUrl });
});

// --- JOIN EVENT (REGISTRATION) API ---
app.post('/register', (req, res) => {
  console.log('Received registration:', req.body); 
  const { name, email, eventId } = req.body;
  if (!name || !email || !eventId) {
    return res.status(400).json({ error: "Missing name, email, or eventId!" });
  }
  res.json({
    message: "Successfully joined event!",
    registrationId: Math.floor(Math.random() * 100000)
  });
});

// --- Static files ---
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`✅ PlanUp Server running on http://localhost:${PORT}`);
});
