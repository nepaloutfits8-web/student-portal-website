const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  book: {
    bookId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    isbn: String,
    category: String
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Issued', 'Returned', 'Overdue', 'Lost'],
    default: 'Issued'
  },
  fine: {
    type: Number,
    default: 0
  },
  finePerDay: {
    type: Number,
    default: 5 // Default fine per day
  },
  renewalCount: {
    type: Number,
    default: 0
  },
  maxRenewals: {
    type: Number,
    default: 2
  },
  remarks: {
    type: String
  }
}, {
  timestamps: true
});

// Calculate fine for overdue books
librarySchema.methods.calculateFine = function() {
  if (this.status === 'Returned' || !this.dueDate) {
    return 0;
  }
  
  const today = new Date();
  const dueDate = new Date(this.dueDate);
  
  if (today > dueDate) {
    const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
    this.fine = daysOverdue * this.finePerDay;
    this.status = 'Overdue';
  }
  
  return this.fine;
};

// Check if book can be renewed
librarySchema.methods.canRenew = function() {
  return this.renewalCount < this.maxRenewals && this.status === 'Issued';
};

module.exports = mongoose.model('Library', librarySchema);
