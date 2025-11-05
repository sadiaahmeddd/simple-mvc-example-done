// Import Mongoose
const mongoose = require('mongoose');

// Create the Dog schema
const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the Dog model using the schema
const DogModel = mongoose.model('Dog', DogSchema);

// Export the model
module.exports = DogModel;

