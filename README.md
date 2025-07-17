# 🔐 SecureChats - Frontend

The frontend React application for SecureChats, a modern end-to-end encrypted chat application featuring military-grade encryption and real-time messaging.

## ✨ Frontend Features
- **React 18** with modern hooks and context
- **End-to-End Encryption UI** - Client-side AES-256-GCM + RSA-2048-OAEP encryption
- **Real-Time Chat Interface** - Socket.IO integration for instant messaging
- **Modern UI/UX** - Glassmorphism design with Tailwind CSS + DaisyUI
- **Responsive Design** - Works perfectly on desktop and mobile
- **Image Sharing** - Secure image upload interface
- **User Authentication** - Clerk integration for secure login
- **Profile Management** - Update profile pictures and information
- **Online Status Indicators** - Real-time user presence
- **Smooth Animations** - Framer Motion for beautiful transitions

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/iamprashu/secureChat.git
   cd secureChat
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Environment Variables
Create a `.env` file in the root directory with the following variable:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

**Required Environment Variables:**
- `VITE_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key from your Clerk dashboard

**Getting Your Clerk Key:**
1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the publishable key from your Clerk dashboard
4. Add it to your `.env` file

## 🏗️ Frontend Architecture

### Tech Stack
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management
- **Tailwind CSS + DaisyUI** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Socket.IO Client** - Real-time communication
- **Web Crypto API** - Browser-native encryption
- **Clerk** - Authentication and user management

### Project Structure
```
src/
├── components/         # Reusable UI components
├── pages/             # Page components (Chat, Auth, etc.)
├── store/             # Zustand state management
├── lib/               # Utility functions and crypto helpers
├── constants/         # App constants and configuration
├── index.css          # Global styles
└── main.jsx           # App entry point
```

## 🔐 Client-Side Encryption

This frontend handles all encryption/decryption operations:

1. **Key Generation** - RSA-2048 key pairs generated in browser
2. **Message Encryption** - AES-256-GCM with unique keys per message
3. **Key Exchange** - RSA-OAEP for secure AES key sharing
4. **Zero-Knowledge** - Backend never sees plaintext messages

## 📱 Usage

1. **Authentication** - Sign up/login with Clerk
2. **E2EE Setup** - Automatic RSA key generation
3. **Chat Interface** - Select users and start encrypted conversations
4. **Image Sharing** - Upload and share images securely
5. **Real-time Updates** - Instant message delivery and online status


## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Frontend for SecureChats** - Built with React and modern web technologies for secure, encrypted messaging.
