# SecureChats 🔒

A modern, secure real-time messaging application with end-to-end encryption built with React, Node.js, and Socket.IO.

## Features

- 🔐 **End-to-End Encryption** - All messages are encrypted using AES-256-CBC
- 💬 **Real-time Messaging** - Instant message delivery with Socket.IO
- 👥 **User Management** - Secure authentication and user profiles
- 🖼️ **Image Sharing** - Send images with automatic cloud storage
- 🌙 **Dark/Light Themes** - Multiple theme options for better UX
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔒 **Secure Authentication** - JWT-based authentication with secure cookies

## Tech Stack

### Frontend

- React 18 with Vite
- Tailwind CSS + DaisyUI
- Zustand for state management
- Socket.IO Client
- React Router for navigation

### Backend

- Node.js with Express
- Socket.IO for real-time communication
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image storage
- Crypto module for message encryption

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Cloudinary account

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd fullstack-chat-app
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables

```bash
# Backend (.env)
MONGODB_URI="mongodb://localhost:27017"
PORT=3000
JWT_SECRET="your-jwt-secret"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
ENC_KEY="your-32-character-encryption-key"

# Frontend (.env)
VITE_BACKEND_API="http://localhost:3000"
```

4. Start the development servers

```bash
# Start backend
cd backend
npm run dev

# Start frontend (in new terminal)
cd frontend
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Security Features

- **Message Encryption**: All messages are encrypted using AES-256-CBC before storage
- **Secure Authentication**: JWT tokens with secure cookie settings
- **CORS Protection**: Properly configured CORS for cross-origin requests
- **Input Validation**: Server-side validation for all user inputs
- **HTTPS Ready**: Configured for production HTTPS deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

Built with ❤️ for secure communication
