const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const os = require('os');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/firstdb')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Schema
const FormData = mongoose.model('FormData', new mongoose.Schema({
  name: String,
  mobile_no: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
}));

// Route
app.post('/submit-form', async (req, res) => {
  try {
    const newEntry = new FormData(req.body);
    await newEntry.save();
    console.log(req.body);
    res.send('✅ Form saved to MongoDB');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Failed to save form');
  }
});


// Server
app.listen("https://aditienterprises.vercel.app", () => console.log('🚀 Server running on vercel'));
//   }
// });

// app.listen(8080, () => console.log('Server listening on 8080'));

