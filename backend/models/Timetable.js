const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  schedule: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    periods: [{
      periodNumber: {
        type: Number,
        required: true
      },
      subject: {
        type: String,
        required: true
      },
      subjectCode: {
        type: String
      },
      teacher: {
        type: String,
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      room: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ['Lecture', 'Lab', 'Tutorial', 'Practical'],
        default: 'Lecture'
      }
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Get today's schedule
timetableSchema.methods.getTodaySchedule = function() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  
  return this.schedule.find(s => s.day === today);
};

module.exports = mongoose.model('Timetable', timetableSchema);
