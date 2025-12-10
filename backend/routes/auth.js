const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { protect, getSignedJwtToken } = require('../middleware/auth');

// @route   POST /api/auth/login
// @desc    Login student
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { studentId, password } = req.body;

    // Validate input
    if (!studentId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide student ID and password'
      });
    }

    // Check if student exists
    const student = await Student.findOne({ studentId }).select('+password');

    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await student.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is active
    if (!student.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact administration.'
      });
    }

    // Update last login
    student.lastLogin = Date.now();
    await student.save();

    // Create token
    const token = getSignedJwtToken(student._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        studentId: student.studentId,
        name: student.fullName,
        email: student.personalInfo.email,
        department: student.academicInfo.department,
        semester: student.academicInfo.semester,
        profilePhoto: student.personalInfo.profilePhoto
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

// @route   GET /api/auth/me
// @desc    Get current logged in student
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.student._id).select('-password');

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/auth/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    const student = await Student.findById(req.student._id).select('+password');

    // Check current password
    const isMatch = await student.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    student.password = newPassword;
    await student.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout student
// @access  Private
router.post('/logout', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
