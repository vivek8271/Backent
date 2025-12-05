const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const os = require('os');

const app = express();
app.use(cors());
app.use(express.json());



// const bodyParser = require('express').json;
// const requestIp = require('request-ip'); // npm i request-ip
// app.use(bodyParser());
// app.use(requestIp.mw()); // adds req.clientIp

// MongoDB connection

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


// mongoose.connect('mongodb://localhost:27017/mydb', {
//   useNewUrlParser: true, useUnifiedTopology: true
// });

// // schema
// const deviceSchema = new mongoose.Schema({
//   userAgent: String,
//   platform: String,
//   vendor: String,
//   language: String,
//   screen: Object,
//   viewport: Object,
//   url: String,
//   referrer: String,
//   ip: String,
//   timestamp: { type: Date, default: Date.now }
// });

// const Device = mongoose.model('Device', deviceSchema);

// app.post('/report-device', async (req, res) => {
//   try {
//     const ip = req.clientIp || req.ip || req.headers['x-forwarded-for'] || null;
//     const payload = { ...req.body, ip };
//     const doc = new Device(payload);
//     await doc.save();
//     res.status(201).json({ ok: true });
//   } catch (err) {
//     console.error('Save device error', err);
//     res.status(500).json({ ok: false, error: 'server error' });
//   }
// });



// Server
app.listen(8080, () => console.log('🚀 Server running on http://localhost:8080'));






// app.js


// const bodyParser = require('express').json;
// const requestIp = require('request-ip'); // npm i request-ip


// app.use(bodyParser());
// app.use(requestIp.mw()); // adds req.clientIp

// mongoose.connect('mongodb://localhost:27017/mydb', {
//   useNewUrlParser: true, useUnifiedTopology: true
// });

// // schema
// const deviceSchema = new mongoose.Schema({
//   userAgent: String,
//   platform: String,
//   vendor: String,
//   language: String,
//   screen: Object,
//   viewport: Object,
//   url: String,
//   referrer: String,
//   ip: String,
//   timestamp: { type: Date, default: Date.now }
// });

// const Device = mongoose.model('Device', deviceSchema);

// // route to receive report
// app.post('/report-device', async (req, res) => {
//   try {
//     const ip = req.clientIp || req.ip || req.headers['x-forwarded-for'] || null;
//     const payload = { ...req.body, ip };
//     const doc = new Device(payload);
//     await doc.save();
//     res.status(201).json({ ok: true });
//   } catch (err) {
//     console.error('Save device error', err);
//     res.status(500).json({ ok: false, error: 'server error' });
//   }
// });

// app.listen(8080, () => console.log('Server listening on 8080'));
