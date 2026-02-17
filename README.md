# 🧠 BrainBox: Engaging E-Learning System

BrainBox is a full-stack e-learning web application that allows educators to create their own online academies and share unique enrollment links with students. Students can join courses through these links either for free or via secure payment integration.

The platform is designed to provide a seamless digital learning experience by offering course management, role-based authentication, student enrollment tracking, and an intuitive dashboard for both educators and students.

---

## 🚀 Features

- 👨‍🏫 Educator & Student Role-Based Authentication
- 🔗 Unique Course Enrollment Links
- 💳 Free & Paid Course Enrollment
- 📚 Course Creation & Management
- 📊 Student Progress Tracking
- 🔐 Secure Login using JWT Authentication
- 📱 Responsive UI for All Devices
- 📈 Admin Dashboard for User & Content Management
- 💬 Live Session & Chat Support (Optional)
- 🏆 Gamification (Badges & Leaderboard)

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- React.js

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JSON Web Token (JWT)

### Payment Gateway
- Razorpay / Stripe (Optional)

---

## 📂 Project Structure

```
BrainBox/
│
├── client/            # Frontend (React)
│   ├── src/
│   └── public/
│
├── server/            # Backend (Node.js + Express)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── config/
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/BrainBox.git
cd BrainBox
```

---

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

---

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
```

---

### Step 4: Setup Environment Variables

Create a `.env` file inside the `server` folder and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY=your_razorpay_key
```

---

### Step 5: Run the Application

Run Backend:

```bash
cd server
npm start
```

Run Frontend:

```bash
cd client
npm start
```

---

## 🧑‍💻 Usage

1. Register as an Educator or Student
2. Educators can create courses
3. Generate unique enrollment links
4. Share links with students
5. Students can join courses via free or paid access
6. Monitor progress via dashboard

---

## 📌 Future Enhancements

- Live Video Classes Integration
- AI-Based Course Recommendation
- Certificate Generation System
- Mobile Application Support
- Multi-language Support

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## ✨ Author

**Sharad Tiwari**

---

