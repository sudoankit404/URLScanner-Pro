# Contributing to URLScanner-Pro

Thank you for considering contributing to URLScanner-Pro! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## 📜 Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of:
- Age, body size, disability
- Ethnicity, gender identity
- Experience level
- Nationality, personal appearance
- Race, religion
- Sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing viewpoints
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what is best for the community
- ✅ Showing empathy towards others

**Unacceptable behavior includes:**
- ❌ Trolling, insulting/derogatory comments
- ❌ Public or private harassment
- ❌ Publishing others' private information
- ❌ Other unprofessional conduct

## 🤝 How Can I Contribute?

### 1. Report Bugs 🐛

Found a bug? Help us fix it!

**Before submitting:**
- Check if the bug has already been reported
- Verify it's reproducible in the latest version
- Test in multiple browsers

**Submit a bug report:**
1. Go to [Issues](https://github.com/sudoankit404/urlscanner-pro/issues)
2. Click "New Issue"
3. Use the bug report template
4. Provide detailed information

**Include:**
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS information

### 2. Suggest Features 💡

Have an idea? We'd love to hear it!

**Before suggesting:**
- Check if it's already been suggested
- Ensure it aligns with project goals
- Consider the scope and feasibility

**Submit a feature request:**
1. Go to [Issues](https://github.com/sudoankit404/urlscanner-pro/issues)
2. Click "New Issue"
3. Use the feature request template
4. Describe your idea clearly

**Include:**
- Problem it solves
- Proposed solution
- Alternative solutions considered
- Use cases and benefits

### 3. Improve Documentation 📝

Documentation improvements are always welcome!

**Areas to improve:**
- README clarity
- Code comments
- Usage examples
- Setup instructions
- Troubleshooting guides

### 4. Submit Code 🔧

Ready to code? Here's how:

**Good first issues:**
- Look for `good-first-issue` label
- Start with small improvements
- Fix typos or formatting
- Improve error messages

## 🛠️ Development Setup

### Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime, Atom, etc.)
- Git for version control

### Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork:
git clone https://github.com/sudoankit404/urlscanner-pro.git
cd urlscanner-pro
```

### Project Structure

```
urlscanner-pro/
├── index.html          # Main HTML structure
├── style.css          # All styling (light/dark themes)
├── script.js          # All functionality
├── README.md           # Project documentation
├── CONTRIBUTING.md     # This file
└── LICENSE             # MIT License
```

### Local Development

```bash
# Method 1: Direct open
open index.html

# Method 2: Python server
python -m http.server 8000
# Visit: http://localhost:8000

# Method 3: Node.js server
npx serve .
# Visit: http://localhost:3000

# Method 4: PHP server
php -S localhost:8000
# Visit: http://localhost:8000
```

### Testing Your Changes

1. **Visual Testing**
   - Test in multiple browsers
   - Check responsive design
   - Verify dark/light themes
   - Test all features

2. **Functional Testing**
   - Scan various URLs
   - Test error handling
   - Verify screenshot loading
   - Check theme persistence

3. **Cross-Browser Testing**
   - Chrome/Edge
   - Firefox
   - Safari
   - Mobile browsers

## 📏 Coding Guidelines

### HTML Guidelines

```html
<!-- Use semantic HTML5 -->
<header>, <main>, <section>, <article>

<!-- Proper indentation (2 spaces) -->
<div class="container">
  <div class="card">
    <h1>Title</h1>
  </div>
</div>

<!-- Meaningful class names -->
<button class="scan-button">Scan Link</button>

<!-- Accessibility attributes -->
<button aria-label="Toggle theme">
```

### CSS Guidelines

```css
/* Use CSS variables for themes */
:root {
  --primary-color: #2563eb;
}

/* Follow existing naming conventions */
.card { }
.card-title { }
.card-content { }

/* Comment complex styles */
/* Gradient background for dark mode */
html.dark {
  background: linear-gradient(...);
}

/* Use consistent spacing (2 spaces) */
.button {
  padding: 0.75rem 1.5rem;
  margin-bottom: 1rem;
}
```

### JavaScript Guidelines

```javascript
// Use modern ES6+ syntax
const scanUrl = async () => { };

// Meaningful variable names
const isValidUrl = validateUrl(input);

// Add comments for complex logic
// Calculate risk points based on multiple factors
let riskPoints = 0;

// Use consistent formatting
function analyzeUrl(url) {
  try {
    // ... logic
  } catch (error) {
    console.error('Error:', error);
  }
}

// Avoid global variables
// Use functions and scope properly
```

### General Best Practices

- ✅ Keep code simple and readable
- ✅ Follow DRY (Don't Repeat Yourself)
- ✅ Write descriptive comments
- ✅ Use consistent indentation (2 spaces)
- ✅ Test thoroughly before submitting
- ✅ Keep commits focused and atomic

## 🔄 Pull Request Process

### Before Submitting

1. **Test Your Changes**
   - Verify functionality
   - Test in multiple browsers
   - Check responsive design
   - Ensure no console errors

2. **Update Documentation**
   - Update README if needed
   - Add code comments
   - Document new features

3. **Follow Style Guide**
   - Consistent formatting
   - Proper indentation
   - Meaningful names

### Submitting a Pull Request

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make Your Changes**
   ```bash
   # Edit files
   # Test thoroughly
   ```

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of changes"
   ```

   **Commit Message Format:**
   ```
   Add: New feature description
   Fix: Bug fix description
   Update: Changes to existing feature
   Docs: Documentation updates
   Style: Code formatting changes
   Refactor: Code restructuring
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in PR template
   - Submit

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] Tested dark/light themes

## Screenshots
(If applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No console errors
- [ ] Tested thoroughly
```

### Review Process

1. Maintainer reviews your PR
2. Feedback/changes requested (if needed)
3. You make requested changes
4. Maintainer approves and merges
5. Your contribution is live! 🎉

## 🐛 Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- Browser: [e.g. Chrome 120]
- OS: [e.g. Windows 11]
- Device: [e.g. Desktop]

**Additional context**
Any other relevant information
```

## 💡 Feature Request Template

```markdown
**Problem Statement**
Describe the problem this feature would solve

**Proposed Solution**
Describe your proposed solution

**Alternative Solutions**
Other solutions you've considered

**Benefits**
How this would improve the project

**Use Cases**
Real-world scenarios where this would help

**Additional Context**
Screenshots, mockups, or examples
```

## ❓ Questions?

- 💬 [Start a Discussion](https://github.com/sudoankit404/urlscanner-pro/discussions)
- 📧 Open an issue with the `question` label
- 📖 Check existing documentation

## 🙏 Thank You!

Every contribution, no matter how small, makes a difference. Thank you for helping make URLScanner-Pro better!

---

**Happy Contributing! 🚀**
