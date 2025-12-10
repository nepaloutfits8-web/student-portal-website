const express = require('express');
const router = express.Router();
const Fee = require('../models/Fee');
const { protect } = require('../middleware/auth');

// @route   GET /api/fees
// @desc    Get all fee records for student
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const fees = await Fee.find({ student: req.student._id })
      .sort({ semester: -1 });

    // Calculate totals
    const totalAmount = fees.reduce((sum, fee) => sum + fee.totalAmount, 0);
    const totalPaid = fees.reduce((sum, fee) => sum + fee.paidAmount, 0);
    const totalPending = fees.reduce((sum, fee) => sum + fee.pendingAmount, 0);

    res.status(200).json({
      success: true,
      summary: {
        totalAmount,
        totalPaid,
        totalPending
      },
      data: fees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/fees/semester/:semester
// @desc    Get fee details for specific semester
// @access  Private
router.get('/semester/:semester', protect, async (req, res) => {
  try {
    const fee = await Fee.findOne({ 
      student: req.student._id,
      semester: req.params.semester
    });

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found for this semester'
      });
    }

    res.status(200).json({
      success: true,
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/fees/:id/pay
// @desc    Make fee payment
// @access  Private
router.post('/:id/pay', protect, async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    if (fee.student.toString() !== req.student._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const { amount, paymentMethod, transactionId } = req.body;

    if (!amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount and payment method'
      });
    }

    // Add payment
    const payment = {
      amount,
      paymentMethod,
      transactionId,
      receiptNumber: `REC${Date.now()}`
    };

    fee.payments.push(payment);
    fee.paidAmount += amount;
    await fee.save();

    res.status(200).json({
      success: true,
      message: 'Payment recorded successfully',
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
