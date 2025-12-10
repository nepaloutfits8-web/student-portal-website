const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
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
  feeBreakdown: {
    tuitionFee: { type: Number, default: 0 },
    labFee: { type: Number, default: 0 },
    libraryFee: { type: Number, default: 0 },
    examFee: { type: Number, default: 0 },
    sportsFee: { type: Number, default: 0 },
    developmentFee: { type: Number, default: 0 },
    otherFees: { type: Number, default: 0 }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  pendingAmount: {
    type: Number
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Partial', 'Overdue'],
    default: 'Pending'
  },
  payments: [{
    amount: Number,
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Card', 'UPI', 'Net Banking', 'Cheque']
    },
    transactionId: String,
    receiptNumber: String,
    remarks: String
  }],
  lateFee: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate pending amount before saving
feeSchema.pre('save', function(next) {
  this.pendingAmount = this.totalAmount - this.paidAmount + this.lateFee - this.discount;
  
  // Update status
  if (this.paidAmount >= this.totalAmount) {
    this.status = 'Paid';
  } else if (this.paidAmount > 0) {
    this.status = 'Partial';
  } else if (new Date() > this.dueDate) {
    this.status = 'Overdue';
  } else {
    this.status = 'Pending';
  }
  
  next();
});

module.exports = mongoose.model('Fee', feeSchema);
