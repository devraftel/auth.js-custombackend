# Auth.js-CustomBackend Project

A versatile authentication solution using Auth.js with a FastAPI backend and Next.js frontend.

Use any Frontend/FullStack Framework with Auth.js and bring your custom Auth or use FastAPI Microservice.

## Overview

This project provides a flexible, scalable authentication setup using a decoupled architecture. It integrates seamlessly with any front-end or full-stack framework, allowing developers to use the included custom backend or bring their own backend services. It supports traditional password-based login and Google authentication, providing a robust solution for various authentication needs.

### Tech Stack:
- **Backend**: FastAPI
- **Frontend**: Next.js with Auth.js (supports Next.js 14 and above)
- **Authentication:** Auth.js for managing authentication across multiple front-end or full-stack frameworks.

## Setup Instructions

### Prerequisites

- **Docker**: Ensure you have Docker installed for containerized backend setup.
- **pnpm**: Make sure pnpm is installed for managing frontend dependencies.

### Cloning the Repository

1. Clone the repository to your local machine:

   ```bash
   git clone ...
   cd auth.js-custombackend
   ```

### Starting the Backend

2. Rename .env.example in both folders. Start the FastAPI backend using Docker Compose:

   ```bash
   docker-compose up
   ```

   This command will start the FastAPI service in a Docker container.

### Starting the Frontend

3. Navigate to the frontend directory and install the dependencies using pnpm:

   ```bash
   cd nextjs-auth.js
   pnpm install
   ```

4. Start the Next.js frontend development server:

   ```bash
   pnpm dev
   ```

   The frontend will be running at `http://localhost:3000`.

## Key Features

- **Decoupled Architecture**: Easily integrate with any front-end or full-stack framework.
- **Custom Backend Flexibility**: Use the included FastAPI backend or integrate your own service.
- **Scalability and Security**: Designed to handle growing user bases while ensuring robust authentication.
- **Password-based Authentication**: Secure login and signup using traditional username and password.
- **Google Authentication**: Easily enable users to log in with their Google accounts.
- **Auth.js Integration**: Use Auth.js to manage authentication flows seamlessly within the frontend and backend.

## API Endpoints Overview

- **Login Access Token**: `/api/v1/login/access-token` - Obtain an OAuth2-compatible access token.
- **Test Token**: `/api/v1/login/test-token` - Validate the current access token.
- **Google Auth Access Token**: `/api/v1/google-auth/access-token` - Login using Google credentials.
- **Register User**: `/api/v1/users/signup` - Create a new user account.
- **Password Recovery**: `/api/v1/password-recovery/{email}` - Initiate password recovery process.
- **Reset Password**: `/api/v1/reset-password/` - Reset user password using a token.

## Getting Involved

Contributions are welcome! If you have suggestions, features, or improvements, feel free to submit a pull request or open an issue on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact us at [mr.junaidshaukat@gmail.com](mailto:mr.junaidshaukat@gmail.com).