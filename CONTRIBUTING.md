# 🤝 Contributing to Student Portal

Thank you for your interest in contributing to the Student Portal project! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, browser)

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing feature requests** first
- **Provide clear use case** and benefits
- **Include mockups** if possible
- **Explain implementation ideas**

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## 🛠️ Development Setup

### Prerequisites

- Node.js v14+
- MongoDB v4.4+
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/student-portal-website.git
cd student-portal-website

# Add upstream remote
git remote add upstream https://github.com/nepaloutfits8-web/student-portal-website.git

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Setup environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start development servers
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm start
```

## 📝 Coding Standards

### JavaScript/React

- Use **ES6+ syntax**
- Follow **Airbnb style guide**
- Use **functional components** with hooks
- Keep components **small and focused**
- Write **meaningful variable names**

### File Structure

```
backend/
├── models/          # Database models
├── routes/          # API routes
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
└── utils/           # Utility functions

frontend/
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── context/     # Context providers
│   ├── services/    # API services
│   └── utils/       # Utility functions
```

### Code Style

**Good:**
```javascript
// Clear, descriptive names
const fetchStudentAttendance = async (studentId) => {
  try {
    const response = await axios.get(`/api/attendance/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance:', error);
    throw error;
  }
};
```

**Avoid:**
```javascript
// Unclear, abbreviated names
const getAtt = async (id) => {
  const res = await axios.get(`/api/attendance/${id}`);
  return res.data;
};
```

### Component Structure

```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ prop1, prop2 }) => {
  // State
  const [state, setState] = useState(null);

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default MyComponent;
```

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(attendance): add attendance percentage calculation

- Calculate overall attendance
- Add subject-wise breakdown
- Display warning for low attendance

Closes #123
```

```bash
fix(login): resolve authentication token expiry issue

Fixed bug where JWT tokens were expiring prematurely
due to incorrect expiry time calculation.

Fixes #456
```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers (if frontend)
- [ ] Commit messages follow guidelines

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

### Review Process

1. **Automated checks** must pass
2. **At least one approval** required
3. **Address review comments**
4. **Squash commits** if requested
5. **Maintainer will merge**

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Manual Testing Checklist

- [ ] Login/Logout works
- [ ] All pages load correctly
- [ ] API calls succeed
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] Cross-browser compatible

## 📚 Resources

- [React Documentation](https://reactjs.org/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

## 🆘 Getting Help

- **GitHub Issues**: For bugs and features
- **Discussions**: For questions and ideas
- **Email**: nepaloutfits8@gmail.com

## 🎉 Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Given credit in documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🙏**

Every contribution, no matter how small, makes a difference!
