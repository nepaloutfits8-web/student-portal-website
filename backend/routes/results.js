const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const { protect } = require('../middleware/auth');

// @route   GET /api/results
// @desc    Get all results for student
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const results = await Result.find({ student: req.student._id })
      .sort({ semester: -1, publishedDate: -1 });

    // Calculate overall CGPA
    let totalSGPA = 0;
    let semesterCount = 0;

    results.forEach(result => {
      if (result.sgpa) {
        totalSGPA += parseFloat(result.sgpa);
        semesterCount++;
      }
    });

    const cgpa = semesterCount > 0 ? (totalSGPA / semesterCount).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      count: results.length,
      cgpa: parseFloat(cgpa),
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/results/semester/:semester
// @desc    Get results for specific semester
// @access  Private
router.get('/semester/:semester', protect, async (req, res) => {
  try {
    const results = await Result.find({ 
      student: req.student._id,
      semester: req.params.semester
    }).sort({ publishedDate: -1 });

    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No results found for this semester'
      });
    }

    res.status(200).json({
      success: true,
      data: results
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
