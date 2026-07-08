# STG Intern Tracker (Full-Stack MERN Application)

A streamlined full-stack tracking application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Vite. This system provides a specialized interface for **Supervisors** to securely authenticate, manage, and track individual internee progress.

> ⚡ **Zero Installation Environment:** This workspace is completely pre-bundled. All required development and runtime dependencies (`mongoose`, `bcryptjs`, `dotenv`, `react`, etc.) are pre-configured within the internal environment. **No `npm install` execution is required.**

---

## 📂 Project Directory Structure

```text
stg_intern_tracker/
├── backend/                       # Node.js + Express API Engine
│   ├── middlewares/               # Token validation & route protection middleware
│   ├── model/                     # Data schemas for MongoDB persistence
│   │   ├── Auth_Model.js          # Authentication structural rules
│   │   └── Internee_Model.js      # Internee metric data structure
│   ├── routes/                    # API endpoints routing logic
│   │   └── Auth_Route.js          # Auth endpoints (Login / Verification)
│   ├── .env                       # Environment secrets configurations
│   ├── db.js                      # Core MongoDB connection script
│   ├── package.json               # Backend configuration metadata
│   ├── seed.js                    # Automated database provisioning tool
│   └── server.js                  # Application backend entry point
│
└── frontend/                      # React UI Client Workspace (Vite-Powered)
    ├── context/                   # Global application state management
    │   └── authContext.jsx        # Keeps track of login state across pages
    ├── public/                    # Global public assets (logos, icons)
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── assets/                # Local graphic components
        ├── components/            # Reusable UI architecture
        │   ├── Login_Component.jsx
        │   └── Update_Component.jsx
        ├── pages/                 # Full structural layouts
        │   └── supervisor_dashboard.jsx
        ├── style/                 # Independent element stylesheets
        │   ├── Login_Component.css
        │   ├── Supervisor_Dashboard.css
        │   └── Update_Component.css
        ├── App.css                # Global layout rules
        ├── App.jsx                # Main application layer component
        ├── index.css              # Reset and foundational layout norms
        ├── main.jsx               # Client initialization entry point
        ├── eslint.config.js       # Code standards validation profile
        ├── index.html             # Single Page Application entry point
        ├── package.json           # Frontend configuration metadata
        └── vite.config.js         # Build pipeline configurations
