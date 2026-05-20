# 🍔 Chill & Grill Premium Bistro & Sweets

A premium, modern, and fully responsive static restaurant website built from scratch using pure HTML, Vanilla CSS, and modern ES6 JavaScript. Features interactive shopping cart logic, dark/light theme switching, full-screen gallery lightboxes, and a glowing search engine helper.

---

## ✨ Features

- **🌓 Persistent Dark & Light Modes**
  - Smooth theme transitions with state persistence saved across browser sessions using `localStorage`.
- **🛒 Stateful Side-Drawer Shopping Cart**
  - Interactive item selection using custom pricing dropdown variants.
  - Automatically calculates item quantities, badge count updates, and subtotal prices.
  - Auto-populates the checkout form fields on click.
- **🖼️ Photo Lightbox Media Viewer**
  - Full-screen lightbox viewer for gallery items with auto-overlay captions.
- **🔍 Glow-Highlight Search Filter**
  - Real-time page scroll to targeted food sections with a temporary amber outline animation feedback.
- **📱 Fully Responsive Design**
  - Grid-based structural shifts catering seamlessly to mobile devices, tablets, and wide-screen monitors.

---

## 🛠️ Tech Stack

- **Structure:** Semantic HTML5
- **Style:** Vanilla CSS3 (Custom Variables, Flexbox, CSS Grid, Glassmorphic cards, Micro-animations)
- **Logic:** Vanilla ES6 JavaScript
- **Icons:** [Font Awesome v6.4.0](https://fontawesome.com/)
- **Typography:** Google Fonts (*Outfit* for Headings & *Plus Jakarta Sans* for Body)

---

## 📂 Project Structure

```text
Restraunt/
│
├── index.html         # Main entry point website template
├── style.css          # Core premium design system stylesheet
├── script.js          # Interactive cart, theme, & UI logic script
│
├── images/            # Organized directory containing all site assets
│   ├── logo.png       # Header navigation logo
│   ├── burger.png     # Hero section showcase
│   ├── pizza.jpeg     # Menu card pizza asset
│   ├── user1.jpg      # Testimonial user avatar
│   └── ...            # Other dish & gallery thumbnails
│
├── README.md          # Project documentation (this file)
└── task.md            # Redesign and formatting checklist
```

---

## 🚀 Running Locally

To run the project on your local machine, serve the folder using a local HTTP server:

### Using Node.js (npx)
```bash
npx http-server -p 8080
```
Open **`http://localhost:8080`** in your browser.

### Using Python
```bash
python -m http.server 8000
```
Open **`http://localhost:8000`** in your browser.

---

## 🌐 Deployment

You can host this site for free in under a minute:
1. **Netlify**: Drag and drop the root `Restraunt` folder directly into [Netlify Drop](https://app.netlify.com/drop) to publish instantly.
2. **GitHub Pages**: Upload the folder to a GitHub repository and turn on **GitHub Pages** under repository **Settings > Pages**.
