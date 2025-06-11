<h1 align="center">🌟 Prescripto – AI Powered Disease Prediction And Healthcare Assistant 🌟</h1>

<p align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/Spring%20Boot-darkgreen?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/React.js-blue?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/MySQL-red?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Tailwind%20CSS-purple?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/jwt-orange?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/Gemini%20API-orange?style=for-the-badge">
</p>

## Table of contents

1. [Descripiton](#description)
2. [Live](#live-demo)
3. [Key features](#key-features)
4. [How to run?](#how-to-run)
5. [Screenshots](#screenshots)

## Description
- AI-Driven Diagnostics: Integrated AI to predict diseases based on user symptoms and provide personalized suggestions (precautions, diet, medication, workout plans).  
- Implemented a real-time conversational module to enhance patient engagement through interactive support.  
- Implemented a secure backend using Spring Boot for robust data processing and API management. 
- Built robust features for online doctor appointment booking and consultation, significantly improving patientdoctor connectivity and streamlining administrative processes.  
- Integrated with MySQL relational database for efficient and reliable data storage. 
- Designed an intuitive and responsive user interface using React and Tailwind CSS for a seamless user experience. 

## Live Demo

🌐 [Patient App (Frontend)](https://prescripto-ai-healthcare-assistant.netlify.app)

---

## Key Features

### 👤 Patient Interface
-  **AI Symptom Checker**: Users can chat with an AI assistant to get possible diagnoses and explanations.
-  **Health Insights**: View detailed insights for common conditions.
-  **Appointment Booking**: Book appointments with doctors based on specialization.
-  **Chatbot Interface**: Personalized healthcare Q&A experience powered by Gemini API.

### 🩺 Doctor Dashboard
-  **Doctor Login**: Secure authentication and session management.
-  **Manage Profile**: Update specialization, address, fees, and availability.
-  **Manage Appointments**: View and manage appointments scheduled by patients.

### 🛠️ Admin Panel
-  **Admin Dashboard**: Overview of platform activity.
-  **Add New Doctors**: Admin can register doctors into the system.
-  **View Doctors**: Monitor and manage all registered doctors.
-  **View Appointments**: Access all booked appointments in the system.
  
---
## How to run?

### Step 1: Fork and Clone the Repository

1. Fork the repository to your GitHub account.

2. Clone the forked repository to your local machine.

```sh
git clone https://github.com/<your-username>/Prescripto-AI-Healthcare-Assistant
```

### Step 2: Setting up database configurations

- Configure the following credentials in the `application.yml` file.

```properties
---
spring:
  datasource:
    url=jdbc:mysql://localhost:3306/YOUR_DATABASE_NAME
    username=YOUR_USERNAME
    password=YOUR_PASSWORD

frontend:
  url: FRONTEND_URL
```

### Step 3: Run the backend.

- Run the backend application. It will automatically create the required tables.

### Step 4: Run the frontend

1. Navigate to [frontend direcory](https://github.com/Shashank-TS/Prescripto-AI-Healthcare-Assistant/tree/main/prescripto%20front-end/frontend).
```
cd ./frontend
```
2. Install dependencies.
```
npm install
```
3. Run the app.
```
npm start
```

Access the application at [`http://localhost:5173/`](http://localhost:5173/).

### Step 4: Run the admin

1. Navigate to [admin direcory](https://github.com/Shashank-TS/Prescripto-AI-Healthcare-Assistant/tree/main/prescripto%20front-end/admin).
```
cd ./admin
```
2. Install dependencies.
```
npm install
```
3. Run the app.
```
npm start
```

Access the application at [`http://localhost:5174/`](http://localhost:5174/).

---
## Screenshots

### 👤 Patient Interface

![Screenshot 2024-04-18 091658](https://github.com/Shashank-TS/project-assets-snapshots/blob/main/prescripto/Screenshot_20250611_130248.png)
![Screenshot 2024-04-18 091720](https://github.com/Shashank-TS/project-assets-snapshots/blob/main/prescripto/Screenshot_20250611_130312.png)
![Screenshot 2024-04-18 091720](https://github.com/Shashank-TS/project-assets-snapshots/blob/main/prescripto/Screenshot_20250611_130343.png)
![Screenshot 2024-04-18 091743](https://github.com/Shashank-TS/project-assets-snapshots/blob/main/prescripto/Screenshot_20250611_130540.png)
![Screenshot 2024-04-18 091803](https://github.com/Shashank-TS/project-assets-snapshots/blob/main/prescripto/Screenshot_20250611_130612.png)
![Screenshot 2024-04-18 091658](https://github.com/Shashank-TS/project-assets-snapshots/blob/main/prescripto/Screenshot_20250611_130636.png)

---

## 💡 Future Enhancements
-  Prescription generation and history
-  Doctor ratings and reviews
-  Wearable Device Integration:
  - Pull real-time health data from fitness trackers and smartwatches (e.g., heart rate, SpO2, sleep).
  Generate personalized insights and alerts based on trends from wearable data.

