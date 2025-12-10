const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Excused'],
    required: true
  },
  period: {
    type: Number,
    required: true
  },
  markedBy: {
    type: String, // Teacher ID
    required: true
  },
  remarks: {
    type: String
  }
}, {
  timestamps: true
});

// Index for faster queries
attendanceSchema.index({ student: 1, subject: 1, date: 1 });

// Static method to calculate attendance percentage
attendanceSchema.statics.calculatePercentage = async function(studentId, subject) {
  const total = await this.countDocuments({ student: studentId, subject });
  const present = await this.countDocuments({ 
    student: studentId, 
    subject, 
    status: { $in: ['Present', 'Late'] } 
  });
  
  return total > 0 ? ((present / total) * 100).toFixed(2) : 0;
};

module.exports = mongoose.model('Attendance', attendanceSchema);
