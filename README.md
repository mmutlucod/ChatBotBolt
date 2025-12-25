# BOLT ChatBot 🤖

An interactive web-based chatbot application that engages users with a series of thought-provoking questions about cats. Built with modern web technologies, this project demonstrates seamless integration between a React frontend and Node.js backend, featuring real-time user interactions and elegant animations.

## Features

**Intelligent Session Management**: The application employs a sophisticated session tracking system that automatically generates unique user identifiers upon initialization. This eliminates the need for traditional authentication while ensuring each user's conversation flow is properly maintained throughout their interaction with the chatbot. Sessions are persisted in MongoDB, allowing the system to resume conversations and track progress accurately across multiple questions.

**Dynamic Question Flow System**: BOLT ChatBot presents users with a carefully curated sequence of ten engaging questions about feline companions. The system intelligently progresses through these questions based on user responses, storing each answer in the database before advancing. This creates a natural, conversational experience where users never encounter the same question twice within a session, and their responses are permanently recorded for future reference or analysis.

**Immersive User Experience**: The interface features multiple layers of visual feedback to enhance user engagement. Messages appear with smooth typewriter animations that simulate real-time typing, creating an authentic conversation feel. The chat interface includes distinctive avatars for both the bot and user, color-coded message bubbles for easy visual distinction, and loading indicators that inform users when the system is processing their input. Upon completing all questions, users are rewarded with a celebratory confetti animation, providing a satisfying conclusion to their interaction.

**Responsive Design Architecture**: Built with Material-UI components, the application adapts seamlessly to various screen sizes and devices. The chat interface employs a fixed header and input area with a scrollable message container, ensuring optimal usability whether accessed from desktop computers, tablets, or mobile phones. The dark-themed interface reduces eye strain during extended conversations while maintaining excellent readability.

**Real-time Input Handling**: The application implements smart input management that prevents users from sending messages while the bot is typing or processing previous responses. The send button dynamically enables and disables based on input validity, and users can submit messages either by clicking the send button or pressing Enter. Multi-line input is supported with automatic height adjustment, accommodating longer, more detailed responses from users.

## Tech Stack

**Frontend**
- **React.js** - Component-based UI framework for building dynamic user interfaces
- **Material-UI (MUI)** - Comprehensive React component library providing pre-built, customizable UI elements
- **Axios** - Promise-based HTTP client for seamless API communication
- **TypeWriter Effect** - Library for creating realistic typing animations
- **Canvas Confetti** - Lightweight library for generating celebratory particle effects

**Backend**
- **Node.js** - JavaScript runtime environment for server-side execution
- **Express.js** - Minimalist web application framework for building RESTful APIs
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB integration

**Database**
- **MongoDB** - NoSQL document database for storing user sessions and responses

**Development Tools**
- **Nodemon** - Development utility for automatic server restarts
- **CORS** - Middleware for handling Cross-Origin Resource Sharing

## Installation & Setup

**Prerequisites**: Before beginning the installation process, ensure that your development environment has Node.js (version 14.x or higher) and MongoDB installed and properly configured. MongoDB can be installed locally or accessed through a cloud service like MongoDB Atlas. Additionally, npm or yarn package manager should be available for dependency installation.

**Backend Configuration**: Navigate to the server directory and initialize the backend environment by installing all required dependencies through npm. Create a dedicated database configuration file that establishes connection parameters for MongoDB, including the connection string, database name, and any necessary authentication credentials. The server is configured to run on port 5000 by default, though this can be modified in the main server file if needed. Ensure MongoDB is running before starting the backend server, as the application relies on an active database connection to manage user sessions and store responses.

**Frontend Setup**: Move to the client directory and install all frontend dependencies using npm. The React application is pre-configured to communicate with the backend API running on localhost:5000. If you've modified the backend port or are deploying to a different environment, update the API base URL in the Axios configuration accordingly. The development server for the frontend typically runs on port 3000, providing a complete local development environment when both servers are active simultaneously.

**Running the Application**: The project requires both the backend and frontend servers to be running concurrently for full functionality. Start the backend server first to ensure the API endpoints are available when the frontend initializes. In a separate terminal window, launch the React development server. Once both servers are active, navigate to localhost:3000 in your web browser to access the chatbot interface. The application will automatically connect to the backend API, initialize a new session with a unique user ID, and present the first question to begin the interactive conversation experience.

**Database Verification**: After starting the application, verify that MongoDB is successfully receiving and storing data by checking the database collections. The application creates two primary collections: one for tracking active user sessions and another for storing question-answer pairs. You can use MongoDB Compass or the MongoDB shell to inspect these collections and confirm that data is being persisted correctly as users interact with the chatbot.
