const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',  // your MySQL username
  password: 'Neha@0506',  // your MySQL password
  database: 'eventdb'
});

// User registration endpoint
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email.toLowerCase(), password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'User already exists' });
      }
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'User registered', userId: result.insertId });
  });
});

// List all events
app.get('/events', (req, res) => {
  db.query('SELECT * FROM events ORDER BY date ASC', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

// Register user for an event
// Register user for an event (simplified, use eventId)
app.post('/register', (req, res) => {
  const { name, email, eventId } = req.body;
  if (!name || !email || !eventId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // Find user ID by email
  db.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase()], (err, userResults) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (userResults.length === 0) {
      return res.status(404).json({ error: 'User not found. Please register first.' });
    }
    const userId = userResults[0].id;
    // Check if already registered
    db.query('SELECT id FROM registrations WHERE userId = ? AND eventId = ?', [userId, eventId], (err, regResults) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (regResults.length > 0) {
        return res.status(409).json({ error: 'Already registered for this event' });
      }
      // Register
      db.query('INSERT INTO registrations (userId, eventId) VALUES (?, ?)', [userId, eventId], (err, insertResult) => {
        if (err) return res.status(500).json({ error: 'DB error' });
        res.json({ message: 'Successfully joined!', registrationId: insertResult.insertId });
      });
    });
  });
});


// Get user event history
app.get('/user-events', (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'No email provided' });

  const sql = `
    SELECT e.*
    FROM registrations r
    JOIN users u ON r.userId = u.id
    JOIN events e ON r.eventId = e.id
   WHERE LOWER(u.email) = LOWER(?)

    ORDER BY r.registrationDate DESC
  `;

  db.query(sql, [email.toLowerCase()], (err, results) => {

    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});


// List volunteers
app.get('/volunteers', (req, res) => {
  db.query('SELECT * FROM volunteers', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

// Volunteer signup
app.post('/volunteers/signup', (req, res) => {
  const { name, email, volunteerTitle, phone, address, reason } = req.body;
  if (!name || !email || !volunteerTitle || !phone || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // You can choose to store this in a volunteer_signups table or process it otherwise
  res.json({ message: 'Volunteer signup received. We will contact you soon.' });
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
db.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1); // Exit server if connection fails
  } else {
    console.log('MySQL connected with thread ID:', connection.threadId);
    connection.release();
  }
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email.toLowerCase(), password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = results[0];
    res.json({
      name: user.name,
      email: user.email,
      location: user.location || ''
    });
  });
});


