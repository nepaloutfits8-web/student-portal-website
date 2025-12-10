const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  personalInfo: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'Nepal' }
    },
    profilePhoto: {
      type: String,
      default: 'https://via.placeholder.com/150'
    }
  },
  academicInfo: {
    department: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    semester: {
      type: Number,
      required: true
    },
    batch: {
      type: String,
      required: true
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true
    }
  },
  parentInfo: {
    fatherName: String,
    motherName: String,
    guardianPhone: String,
    guardianEmail: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name
studentSchema.virtual('fullName').get(function() {
  return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`;
});

module.exports = mongoose.model('Student', studentSchema);
