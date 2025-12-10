const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['General', 'Academic', 'Exam', 'Event', 'Holiday', 'Emergency', 'Fee', 'Placement'],
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  targetAudience: {
    departments: [String],
    semesters: [Number],
    courses: [String],
    allStudents: { type: Boolean, default: false }
  },
  attachments: [{
    filename: String,
    url: String
  }],
  publishedBy: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Check if notice is expired
noticeSchema.virtual('isExpired').get(function() {
  return this.expiryDate && new Date() > this.expiryDate;
});

module.exports = mongoose.model('Notice', noticeSchema);
