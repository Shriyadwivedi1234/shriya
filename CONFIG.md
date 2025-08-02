# 🎯 Portfolio Configuration Guide

## 🔗 **Social Media Links**

Update these links in `index.html` with your actual profiles:

### **GitHub**
```html
<a href="https://github.com/YOUR_USERNAME" target="_blank" class="social-link">
```

### **LinkedIn**
```html
<a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" class="social-link">
```

### **Twitter**
```html
<a href="https://twitter.com/YOUR_USERNAME" target="_blank" class="social-link">
```

### **Dribbble**
```html
<a href="https://dribbble.com/YOUR_USERNAME" target="_blank" class="social-link">
```

## 📧 **Contact Information**

### **Email**
```html
<a href="mailto:your.actual.email@example.com" class="contact-link">your.actual.email@example.com</a>
```

### **Phone**
```html
<a href="tel:+YOUR_PHONE_NUMBER" class="contact-link">+1 (555) 123-4567</a>
```

## 📄 **CV Download**

Update the CV download function in `script.js`:

```javascript
function downloadCV() {
    // Replace with your actual CV file URL
    const cvUrl = 'https://drive.google.com/file/d/YOUR_ACTUAL_FILE_ID/view?usp=sharing';
    // or use a direct download link
    // const cvUrl = 'https://yourwebsite.com/cv.pdf';
    
    const link = document.createElement('a');
    link.href = cvUrl;
    link.target = '_blank';
    link.download = 'YourName_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('CV download started!', 'success');
}
```

## 👤 **Personal Information**

Update these sections in `index.html`:

### **Name and Title**
```html
<h3>Your Actual Name</h3>
<p>Your Actual Title</p>
```

### **Location**
```html
<p>Based in <span class="location-highlight">Your Actual Location</span></p>
```

### **About Section**
```html
<p class="about-description">
    Your actual description about yourself...
</p>
```

### **Stats**
```html
<div class="stat-number">Your Actual Years</div>
<div class="stat-number">Your Actual Projects</div>
<div class="stat-number">Your Actual Satisfaction Rate</div>
```

## 🎨 **Projects Section**

Replace the placeholder projects with your actual work:

```html
<div class="project-card">
    <div class="project-image">
        <img src="path/to/your/project-image.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Actual Project</h3>
        <p class="project-description">
            Your actual project description...
        </p>
        <div class="project-tags">
            <span class="tag">Actual Technology</span>
            <span class="tag">Actual Tool</span>
        </div>
    </div>
</div>
```

## 💻 **Skills Section**

Update with your actual skills:

```html
<div class="skill-item">
    <div class="skill-icon">🎨</div>
    <div class="skill-name">Your Actual Skill</div>
</div>
```

## 🎯 **Quick Update Checklist**

- [ ] Update all social media links
- [ ] Update contact information
- [ ] Update personal name and title
- [ ] Update location
- [ ] Update about description
- [ ] Update project statistics
- [ ] Add your actual projects
- [ ] Update skills list
- [ ] Update CV download link
- [ ] Test all buttons and links

## 🚀 **After Updates**

1. **Test locally** first
2. **Redeploy to Vercel**
3. **Verify all links work**
4. **Test contact form**
5. **Check responsive design**

---

**Your portfolio will be fully functional with real links! 🎉** 