const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
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
  examType: {
    type: String,
    enum: ['Mid-term', 'End-term', 'Internal', 'Final'],
    required: true
  },
  subjects: [{
    subjectName: {
      type: String,
      required: true
    },
    subjectCode: {
      type: String,
      required: true
    },
    credits: {
      type: Number,
      required: true
    },
    marksObtained: {
      type: Number,
      required: true
    },
    totalMarks: {
      type: Number,
      required: true
    },
    grade: {
      type: String,
      required: true
    },
    gradePoint: {
      type: Number,
      required: true
    }
  }],
  sgpa: {
    type: Number
  },
  cgpa: {
    type: Number
  },
  percentage: {
    type: Number
  },
  rank: {
    type: Number
  },
  totalStudents: {
    type: Number
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  remarks: {
    type: String
  }
}, {
  timestamps: true
});

// Calculate SGPA before saving
resultSchema.pre('save', function(next) {
  if (this.subjects && this.subjects.length > 0) {
    let totalCredits = 0;
    let totalGradePoints = 0;
    let totalMarks = 0;
    let obtainedMarks = 0;

    this.subjects.forEach(subject => {
      totalCredits += subject.credits;
      totalGradePoints += subject.gradePoint * subject.credits;
      totalMarks += subject.totalMarks;
      obtainedMarks += subject.marksObtained;
    });

    this.sgpa = (totalGradePoints / totalCredits).toFixed(2);
    this.percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);
  }
  next();
});

module.exports = mongoose.model('Result', resultSchema);
