# 🩸 Bludly – Blood Donation & Funding Management System

## 🌐 Live Client Site  
*https://bludly-client.web.app*

**Bludly** is a comprehensive, high-impact platform designed to bridge the gap between blood donors and recipients. It streamlines the life-saving process of blood donation while integrating a transparent funding system to support medical logistics. Whether you are looking to save a life through donation or contribute financially to help a medical cause, Bludly makes the process secure, efficient, and community-driven.

---

## ✨ Key Features

### 🩸 Life-Saving Blood Requests & Funding  
Users can browse active blood donation requests and track community funding goals. The system automatically differentiates between donation requests and funding campaigns in the UI.

---

### 📊 Powerful Admin & Donor Statistics  
A dynamic dashboard that provides real-time counts of:

- **Total Users/Donors** – Registered heroes in the community  
- **Total Funding** – Cumulative financial contributions  
- **Active Requests** – Current blood requirements needing immediate attention  

---

### 👤 User Dashboard & Role Management  
Registered users (**Donors, Volunteers, Admins**) can:

- Manage personal donation requests  
- View and update account status (**Active / Blocked**)  
- Access role-specific tools (e.g., Admins managing the entire donor database)  
- View detailed contribution history  

---

### 🔐 Secure Authentication  
Robust security powered by **Firebase Authentication**, featuring:

- Email/Password login and registration  
- Instant **Google One-Tap Sign-In**  
- Protected routes to ensure sensitive dashboard data is only accessible to authorized users  

---

### 🚀 Seamless Request Flow  
An intuitive journey from browsing requests to taking action:

- **Detailed Request Pages** – All medical details, location, and urgency levels visible at a glance  
- **Dynamic Modals** – Fast and responsive forms for submitting requests or processing donations  
- **Instant Feedback** – Toast notifications for successful actions  

---

### 🎨 Stunning & Responsive UI  
Built for speed and accessibility using:

- **React 18** and **Vite** for lightning-fast performance  
- **Tailwind CSS + DaisyUI** for a modern, clean medical aesthetic  
- **Responsive Layouts** – Optimized for mobile, tablet, and desktop viewing  

---

## 🛠 Tech Stack

**Frontend**
- React 18 + Vite  
- React Router v7  
- Tailwind CSS + DaisyUI  

**State Management**
- Context API (**AuthContext**) for global User and Role states  

**Backend**
- Node.js & Express.js  
- MongoDB  
- Secure API calls using `axiosSecure`  

**Authentication**
- Firebase Auth (Email/Password + Google)  

**Other Libraries**
- `axios` – API communication  
- `react-hot-toast` – Real-time notifications  
- `react-icons` – Intuitive navigation (FaUserFriends, FaDollarSign, etc.)  
- `framer-motion` – Smooth UI transitions  

---

> **Bludly** is built with the mission of saving lives through technology, transparency, and community-driven action.
