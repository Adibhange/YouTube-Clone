# YouTube Clone

This is a YouTube clone built using React, Node.js, Express.js, MongoDB, and Tailwind CSS.

## Features

- **User authentication**

  - Sign up
  - Sign in
  - Sign out

- **Channel management**

  - Create channel
  - Update channel

- **Video management**

  - Upload video
  - Update video
  - Delete video
  - Like video
  - Comment on video

- **Comment Management**

  - Comment on video
  - Edit comment
  - Delete comment

- **Search and filter videos**

  - Search videos
  - Filter videos by category

- **UI**

  - Responsive design
  - Toast notifications

## Technologies Used

- **Frontend**

  - React (with **Vite**)
  - Tailwind CSS
  - Firebase for storage
  - Toastify for toast notifications
  - React Spinners for loading spinners
  - Redux for state management

- **Backend**

  - Node.js
  - Express.js
  - MongoDB
  - JWT for authentication
  - Cors for cross-origin requests
  - Bcrypt for password hashing
  - Mongoose for database schema

## Getting Started

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Adibhange/YouTube-Clone.git
```

2. Go to the client directory:

```bash
cd client
```

3. Install the dependencies:

```bash
npm install
```

4. Create a Firebase Web App and get the Firebase config values.

5. Set the Firebase config values in the .env file.

```bash
VITE_REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
VITE_REACT_APP_FIREBASE_DOMAIN=your-firebase-domain
VITE_REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
```

6. Go to the server directory:

```bash
cd ../server
```

7. Install the dependencies:

```bash
npm install
```

8. Create .env file and set the environment variables:

```bash
PORT= your-port
MONGO_URL= your-mongo-url
JWT_SECRET= your-jwt-secret
CORS_ORIGIN_Local= your-cors-origin
```

9. Start the server:

```bash
npm run dev
```

10. Go to the client directory:

```bash
cd ../client
```

11. Start the client:

```bash
npm run dev
```

## 📣 Feedback

If you have any feedback, please reach out to me at bhangeaditya13@gmail.com
