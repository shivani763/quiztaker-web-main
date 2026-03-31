# ProQuiz - Advanced CS Quiz Platform

ProQuiz is a premium, real-world Computer Science quiz platform built with **React** and **Vite**. It features a stunning modern UI with glassmorphism effects, dynamic animations, and comprehensively explained answers for every question.

## 🚀 Features

- **9+ CS Subjects**: Covering Operating Systems, DBMS, Networking, Algorithms, Software Engineering, TOC, and more.
- **50 Questions Per Subject**: A massive bank of 450+ questions to test your depth.
- **Immediate Feedback**: Correct answers are highlighted instantly with detailed explanations.
- **Wikipedia Citations**: Every explanation includes a source for further reading.
- **Custom Quiz Creator**: Add your own questions and publish custom modules locally.
- **Premium UI**: Dark mode, responsive design, and smooth transitions powered by CSS variables and React state.

## 🛠️ Technology Stack

- **Core**: React 18+
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Modern CSS Variables & Glassmorphism)
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shivani763/quiztaker-web-main.git
   ```

2. **Navigate to the directory**:

   ```bash
   cd quiztaker-web-main
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🧠 Navigation

- **Home**: Browse and select a CS subject to start a quiz.
- **Create Quiz**: Mock up a custom quiz by adding individual questions to a draft.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
quiztaker-web-main/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Header.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── QuizInterface.jsx
│   │   ├── QuizResult.jsx
│   │   └── Signup.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── QuizContext.jsx
│   ├── App.jsx
│   ├── data.js
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

_Built for Computer Science students, by Computer Science students._
