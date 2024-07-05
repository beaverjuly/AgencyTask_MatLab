require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define a schema and model for the data
const dataSchema = new mongoose.Schema({
  subjectID: String,
  trial: Object
});

const Data = mongoose.model('Data', dataSchema);

// API endpoint to save data
app.post('/save-data', (req, res) => {
  const newData = new Data(req.body);
  newData.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Data saved successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

