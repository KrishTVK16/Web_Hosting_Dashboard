# Web Hosting Dashboard UI

Modern, enterprise-grade Web Hosting Dashboard with Frosted Neutral Gradient design system.

## 🚀 Features

- **5 Contextual Tabs:** Overview, Hosting Services, Domains, Server Status, Activity Logs
- **Real-time Monitoring:** CPU, Memory, and Storage usage visualization
- **Data Tables:** Clean, searchable tables for hosting accounts, domains, and logs
- **Responsive Design:** Fully responsive across desktop, tablet, and mobile devices
- **Enterprise Aesthetics:** Clean, data-first design suitable for long working sessions

## 🎨 Design System

Implements the **Frosted Neutral Gradient** design system:
```css
background: linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%);
```

**Color Palette:**
- App Background: `#F8FAFC`
- Panel Background: `#FFFFFF`
- Accent Blue: `#2563EB`
- Text Heading: `#0F172A`
- Text Body: `#475569`

## 📋 Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom design system with CSS variables
- **JavaScript ES6+** - Interactive functionality
- **Bootstrap 5.3.2** - Responsive grid and components
- **Chart.js 4.4.0** - Data visualization

## 🖥️ Usage

Simply open `index.html` in your web browser:

```bash
# Navigate to the project directory
cd Web_Hosting_Dashboard_UI

# Open index.html in your default browser
start index.html    # Windows
open index.html     # macOS
xdg-open index.html # Linux
```

## 📁 Project Structure

```
Web_Hosting_Dashboard_UI/
├── index.html           # Main dashboard HTML
├── css/
│   └── dashboard.css    # Complete design system
└── js/
    └── dashboard.js     # Interactive functionality
```

## ✨ Key Components

### Overview Tab
- Dashboard metrics (Active Services, Domains, Uptime, Storage)
- Quick actions panel
- Recent activity feed
- System notifications banner

### Hosting Services Tab
- Searchable hosting accounts table
- Status indicators (Active, Expiring)
- Management actions (Manage, Upgrade, Renew)

### Domains Tab
- Domain registry with DNS and SSL status
- Expiry tracking
- Quick renewal actions

### Server Status Tab
- Real-time resource monitoring (CPU, Memory, Storage)
- Doughnut charts with Chart.js
- Server health indicators

### Activity Logs Tab
- Chronological event log
- Severity filtering
- Search functionality

## 🎯 Design Principles

- **Data-First:** Clean, uncluttered layouts prioritizing information
- **Enterprise-Ready:** Professional aesthetics comparable to AWS/Azure
- **Long-Session Friendly:** Calm colors, high contrast, minimal eye strain
- **Responsive:** Optimized for all screen sizes

## 📱 Responsive Breakpoints

- **Desktop:** ≥ 1440px
- **Laptop:** 1024px - 1440px
- **Tablet:** 768px - 1024px
- **Mobile:** ≤ 768px

## 🔧 Customization

All design tokens are defined as CSS custom properties in `css/dashboard.css`:

```css
:root {
    --gradient-frosted: linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%);
    --bg-app: #F8FAFC;
    --accent-blue: #2563EB;
    /* ... more variables */
}
```

Modify these values to customize the theme.

## 📄 License

This project is provided as-is for demonstration and educational purposes.

## 🤝 Credits

- Design System: Frosted Neutral Gradient specification
- Framework: Bootstrap 5.3
- Icons: Bootstrap Icons
- Charts: Chart.js

---

Built with ❤️ for enterprise hosting management
