require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

// MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("car_dealership");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// Initialize
let db;
(async () => {
  db = await connectDB();
})();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Endpoints

// Car Endpoints
app.post('/api/cars', async (req, res) => {
  try {
    const car = {
      ...req.body,
      images: req.body.images || [req.body.image], // Handle single image or array
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await db.collection('cars').insertOne(car);
    res.status(201).json({ ...car, _id: result.insertedId });
  } catch (err) {
    console.error("Error saving car:", err);
    res.status(500).json({ error: "Failed to save car" });
  }
});

app.get('/api/cars', async (req, res) => {
  try {
    const cars = await db.collection('cars').find().toArray();
    res.json(cars);
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

app.get('/api/cars/:id', async (req, res) => {
  try {
    const car = await db.collection('cars').findOne({ _id: new ObjectId(req.params.id) });
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (err) {
    console.error("Error fetching car:", err);
    res.status(500).json({ error: "Failed to fetch car" });
  }
});

app.delete('/api/cars/:id', async (req, res) => {
  try {
    const result = await db.collection('cars').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ error: "Failed to delete car" });
  }
});

// Existing inquiries endpoints
app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = {
      ...req.body,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await db.collection('inquiries').insertOne(inquiry);
    res.status(201).json({ ...inquiry, _id: result.insertedId });
  } catch (err) {
    console.error("Error saving inquiry:", err);
    res.status(500).json({ error: "Failed to save inquiry" });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await db.collection('inquiries')
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json(inquiries);
  } catch (err) {
    console.error("Error fetching inquiries:", err);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

app.put('/api/inquiries/:id/status', async (req, res) => {
  try {
    const result = await db.collection('inquiries').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: req.body.status, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    res.json({ success: result.modifiedCount > 0 });
  } catch (err) {
    console.error("Error updating inquiry:", err);
    res.status(500).json({ error: "Failed to update inquiry" });
  }
});

app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    const result = await db.collection('inquiries').deleteOne(
      { _id: new ObjectId(req.params.id) }
    );
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting inquiry:", err);
    res.status(500).json({ error: "Failed to delete inquiry" });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    dbConnected: !!db,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});