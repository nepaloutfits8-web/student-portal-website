const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const { protect } = require('../middleware/auth');

// @route   GET /api/assignments
// @desc    Get all assignments for student
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const student = req.student;
    
    const assignments = await Assignment.find({
      department: student.academicInfo.department,
      semester: student.academicInfo.semester
    }).sort({ dueDate: 1 });

    // Add submission status for each assignment
    const assignmentsWithStatus = assignments.map(assignment => {
      const submission = assignment.submissions.find(
        sub => sub.student.toString() === student._id.toString()
      );

      return {
        _id: assignment._id,
        title: assignment.title,
        description: assignment.description,
        subject: assignment.subject,
        dueDate: assignment.dueDate,
        totalMarks: assignment.totalMarks,
        isOverdue: assignment.isOverdue,
        submission: submission || null,
        status: submission ? submission.status : 'Not Submitted'
      };
    });

    res.status(200).json({
      success: true,
      count: assignmentsWithStatus.length,
      data: assignmentsWithStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/assignments/:id
// @desc    Get single assignment
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    const submission = assignment.submissions.find(
      sub => sub.student.toString() === req.student._id.toString()
    );

    res.status(200).json({
      success: true,
      data: {
        assignment,
        submission: submission || null
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

// @route   POST /api/assignments/:id/submit
// @desc    Submit assignment
// @access  Private
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      sub => sub.student.toString() === req.student._id.toString()
    );

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: 'Assignment already submitted'
      });
    }

    // Add submission
    const submission = {
      student: req.student._id,
      files: req.body.files || [],
      status: new Date() > assignment.dueDate ? 'Late' : 'Submitted'
    };

    assignment.submissions.push(submission);
    await assignment.save();

    res.status(200).json({
      success: true,
      message: 'Assignment submitted successfully',
      data: submission
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
