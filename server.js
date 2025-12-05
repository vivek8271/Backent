const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const os = require('os');

const app = express();
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.cqpn3dg.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// mongoose.connect('mongodb://localhost:27017/firstdb')
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ MongoDB error:', err));

// Schema
const FormData = MongoClient.model('FormData', new MongoClient.Schema({
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
// app.listen("https://aditienterprises.vercel.app", () => console.log('🚀 Server running on vercel'));
//   }
// });

// app.listen(8080, () => console.log('Server listening on 8080'));


