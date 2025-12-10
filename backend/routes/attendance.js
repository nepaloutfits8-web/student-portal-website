const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { protect } = require('../middleware/auth');

// @route   GET /api/attendance
// @desc    Get student attendance summary
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.student._id })
      .sort({ date: -1 });

    // Get unique subjects
    const subjects = [...new Set(attendance.map(a => a.subject))];

    // Calculate attendance for each subject
    const summary = await Promise.all(
      subjects.map(async (subject) => {
        const percentage = await Attendance.calculatePercentage(req.student._id, subject);
        const total = await Attendance.countDocuments({ 
          student: req.student._id, 
          subject 
        });
        const present = await Attendance.countDocuments({ 
          student: req.student._id, 
          subject, 
          status: { $in: ['Present', 'Late'] } 
        });

        return {
          subject,
          total,
          present,
          absent: total - present,
          percentage: parseFloat(percentage)
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        summary,
        records: attendance
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/attendance/:subject
// @desc    Get attendance for specific subject
// @access  Private
router.get('/:subject', protect, async (req, res) => {
  try {
    const attendance = await Attendance.find({ 
      student: req.student._id,
      subject: req.params.subject
    }).sort({ date: -1 });

    const percentage = await Attendance.calculatePercentage(
      req.student._id, 
      req.params.subject
    );

    res.status(200).json({
      success: true,
      data: {
        subject: req.params.subject,
        percentage: parseFloat(percentage),
        records: attendance
      }
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
