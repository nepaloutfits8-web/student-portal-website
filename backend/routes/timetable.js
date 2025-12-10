const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');
const { protect } = require('../middleware/auth');

// @route   GET /api/timetable
// @desc    Get timetable for student
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const student = req.student;
    
    const timetable = await Timetable.findOne({
      department: student.academicInfo.department,
      semester: student.academicInfo.semester,
      isActive: true
    });

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: 'Timetable not found for your department and semester'
      });
    }

    res.status(200).json({
      success: true,
      data: timetable
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/timetable/today
// @desc    Get today's schedule
// @access  Private
router.get('/today', protect, async (req, res) => {
  try {
    const student = req.student;
    
    const timetable = await Timetable.findOne({
      department: student.academicInfo.department,
      semester: student.academicInfo.semester,
      isActive: true
    });

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: 'Timetable not found'
      });
    }

    const todaySchedule = timetable.getTodaySchedule();

    res.status(200).json({
      success: true,
      data: todaySchedule || { message: 'No classes today' }
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
