const express = require('express');
const router = express.Router();
const Library = require('../models/Library');
const { protect } = require('../middleware/auth');

// @route   GET /api/library
// @desc    Get all books issued to student
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const books = await Library.find({ student: req.student._id })
      .sort({ issueDate: -1 });

    // Calculate fines for overdue books
    books.forEach(book => {
      if (book.status !== 'Returned') {
        book.calculateFine();
      }
    });

    const activeBooks = books.filter(b => b.status === 'Issued' || b.status === 'Overdue');
    const returnedBooks = books.filter(b => b.status === 'Returned');
    const totalFine = books.reduce((sum, book) => sum + book.fine, 0);

    res.status(200).json({
      success: true,
      summary: {
        activeBooks: activeBooks.length,
        returnedBooks: returnedBooks.length,
        totalFine
      },
      data: {
        active: activeBooks,
        returned: returnedBooks
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

// @route   POST /api/library/:id/renew
// @desc    Renew book
// @access  Private
router.post('/:id/renew', protect, async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book record not found'
      });
    }

    if (book.student.toString() !== req.student._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (!book.canRenew()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot renew book. Maximum renewals reached or book is overdue.'
      });
    }

    // Extend due date by 14 days
    const newDueDate = new Date(book.dueDate);
    newDueDate.setDate(newDueDate.getDate() + 14);
    
    book.dueDate = newDueDate;
    book.renewalCount += 1;
    await book.save();

    res.status(200).json({
      success: true,
      message: 'Book renewed successfully',
      data: book
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
