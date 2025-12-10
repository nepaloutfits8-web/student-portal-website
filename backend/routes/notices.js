const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const { protect } = require('../middleware/auth');

// @route   GET /api/notices
// @desc    Get all notices for student
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const student = req.student;
    
    const notices = await Notice.find({
      isActive: true,
      $or: [
        { 'targetAudience.allStudents': true },
        { 'targetAudience.departments': student.academicInfo.department },
        { 'targetAudience.semesters': student.academicInfo.semester }
      ],
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: { $gte: new Date() } }
      ]
    }).sort({ priority: -1, publishDate: -1 });

    // Group by category
    const grouped = notices.reduce((acc, notice) => {
      if (!acc[notice.category]) {
        acc[notice.category] = [];
      }
      acc[notice.category].push(notice);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      count: notices.length,
      data: {
        all: notices,
        grouped
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

// @route   GET /api/notices/:id
// @desc    Get single notice
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    // Increment view count
    notice.views += 1;
    await notice.save();

    res.status(200).json({
      success: true,
      data: notice
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
