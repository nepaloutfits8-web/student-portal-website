const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true,
    default: 100
  },
  attachments: [{
    filename: String,
    url: String
  }],
  createdBy: {
    type: String, // Teacher ID
    required: true
  },
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    files: [{
      filename: String,
      url: String
    }],
    marksObtained: {
      type: Number
    },
    feedback: {
      type: String
    },
    status: {
      type: String,
      enum: ['Submitted', 'Graded', 'Late'],
      default: 'Submitted'
    }
  }]
}, {
  timestamps: true
});

// Check if assignment is overdue
assignmentSchema.virtual('isOverdue').get(function() {
  return new Date() > this.dueDate;
});

module.exports = mongoose.model('Assignment', assignmentSchema);
