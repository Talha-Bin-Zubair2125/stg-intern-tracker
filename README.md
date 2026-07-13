# 📚 STG Intern Tracker

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application developed to simplify internship management by providing separate portals for **Supervisors** and **Internees**.

The system enables supervisors to manage interns, monitor their progress, and review submitted reports, while allowing internees to update their profiles and submit internship reports securely.

---

## 🚀 Features

### 👨‍💼 Supervisor Module

- 🔐 Secure Login
- ➕ Add New Interns
- ✏️ Update Intern Information
- ❌ Delete Interns
- 👥 View All Registered Interns
- 👤 View Individual Intern Profiles
- 📄 View Submitted Reports
- ⬇️ Download Uploaded Reports
- 🔒 Protected Dashboard
- 🍪 Cookie-Based Authentication

---

### 👨‍🎓 Internee Module

- 🔐 Secure Login
- 👤 View Personal Profile
- ✏️ Update Profile
- 📤 Upload Internship Reports
- 📂 View Previously Submitted Reports
- 🔒 Protected Dashboard
- 🍪 Cookie-Based Authentication

---

# ✨ Application Workflow

### Supervisor

- Login
- Dashboard Access
- Add Intern
- Update Intern
- Delete Intern
- View Intern Profile
- View Submitted Reports
- Download Reports

### Internee

- Login
- Dashboard Access
- View Profile
- Update Profile
- Upload Report
- View Report History

---

# 🔐 Authentication & Security

The application follows industry-standard security practices.

- JWT Authentication
- Cookie-Based Authentication
- Password Hashing using **bcrypt**
- Input Validation using **Joi**
- Protected Routes using Authentication Middleware
- Environment Variables using **dotenv**
- Secure Password Storage
- Server-side Validation
- Error Handling

---

# 📂 Report Management

Reports are handled securely using **Multer**.

Features include:

- Upload Internship Reports
- Store Uploaded Files
- View Submission History
- Download Reports
- Supervisor Access to All Reports
- Individual Report History for Each Internee

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Context API
- CSS3

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB
- Mongoose

---

## Authentication

- JWT (JSON Web Token)
- Cookie-Based Authentication
- bcrypt

---

## Validation

- Joi

---

## File Upload

- Multer

---

## Environment Variables

- dotenv

---

# 📦 Packages Used

## Backend

- express
- mongoose
- bcrypt
- jsonwebtoken
- cookie-parser
- multer
- joi
- dotenv
- cors
- nodemon

---

## Frontend

- react
- react-router-dom
- axios
- vite

---

# 📁 Project Structure

```
stg_intern_tracker/
│
├── backend/
│   ├── controllers/
│   │   ├── Auth_Controller.js
│   │   ├── Internee_Controller.js
│   │   └── reportController.js
│   │
│   ├── middlewares/
│   │   ├── Auth_Middleware.js
│   │   ├── Internee_Middleware.js
│   │   └── Upload_Middleware.js
│   │
│   ├── model/
│   │   ├── Auth_Model.js
│   │   ├── Internee_Model.js
│   │   └── Report.js
│   │
│   ├── routes/
│   │   ├── Internee_Auth_Route.js
│   │   ├── Report_Route.js
│   │   └── Supervisor_Auth_Route.js
│   │
│   ├── uploads/
│   ├── db.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── context/
    │   └── authContext.jsx
    │
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   ├── style/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── App.css
    │   └── index.css
    │
    ├── package.json
    └── vite.config.js
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/stg_intern_tracker.git
```

Move into the project

```bash
cd stg_intern_tracker
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🌍 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 🔌 API Modules

## Authentication

- Login
- Logout
- Verify User
- Cookie Authentication

---

## Supervisor APIs

- Add Internee
- Update Internee
- Delete Internee
- View All Internees
- View Individual Internee
- View Reports
- Download Reports

---

## Internee APIs

- View Profile
- Update Profile
- Upload Report
- View Uploaded Reports

---

# 📸 Screens

- Login Page
- Supervisor Dashboard
- Internee Dashboard
- Add Internee
- Update Internee
- Internee Profile
- Upload Report
- View Reports
- Download Reports

---

# 🎯 Key Functionalities

✅ CRUD Operations

✅ Authentication & Authorization

✅ Cookie-Based Authentication

✅ JWT Authentication

✅ Password Hashing (bcrypt)

✅ Joi Validation

✅ File Upload using Multer

✅ Report Download

✅ Protected Routes

✅ MongoDB Integration

✅ React Context API

✅ REST APIs

✅ MVC Architecture

---

# 📚 What I Learned

During this project I gained hands-on experience with:

- Full Stack MERN Development
- Building REST APIs
- MVC Architecture
- Authentication using JWT
- Cookie-Based Authentication
- Password Hashing using bcrypt
- File Upload using Multer
- Form Validation using Joi
- MongoDB & Mongoose
- CRUD Operations
- Protected Routes
- React Context API
- State Management
- API Integration with Axios
- Error Handling
- Backend Middleware
- Database Design
- Secure Authentication Flow

---

# 🚀 Future Improvements

- Dashboard Analytics
- Search Interns
- Pagination
- Report Approval Workflow
- Email Notifications
- Cloud Storage (Cloudinary / AWS S3)
- Role Management
- Admin Dashboard
- Mobile Responsive Design
- Profile Pictures
- Report Comments
- Notification System

---

# 📌 Tech Summary

| Technology | Purpose |
|------------|---------|
| React.js | Frontend |
| Vite | Frontend Build Tool |
| Context API | State Management |
| Axios | API Requests |
| Node.js | Backend Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Cookie Parser | Cookie Management |
| bcrypt | Password Hashing |
| Joi | Validation |
| Multer | File Upload |
| dotenv | Environment Variables |

---

# 👨‍💻 Author

**Talha Bin Zubair**

### MERN Stack Developer

If you found this project interesting, feel free to ⭐ the repository and share your feedback!

---

# 📄 License

This project is developed for learning and portfolio purposes.
