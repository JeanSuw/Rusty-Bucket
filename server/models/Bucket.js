
// module.exports = Bucket;
const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const bucketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  dueDate: {
    type: Date,
    // get: (timestamp) => dateFormat(timestamp),
  },
  priority: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  notes: [
    {
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]
});

bucketSchema.virtual('isOverDue').get(function () {
  if (this.dueDate && this.dueDate < new Date()) {
    return true;
  }
  return false;
});

const Bucket = mongoose.model('Bucket', bucketSchema);

module.exports = Bucket;
