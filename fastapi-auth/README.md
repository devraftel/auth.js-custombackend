# FastAPI Authentication & Authorization Microservice

This microservice is part of the `Auth.js-CustomBackend` project, providing authentication and user management capabilities using FastAPI. It is designed to integrate seamlessly with any frontend or full-stack framework, using OAuth2 for secure user authentication.

## Overview

The `fastapi-auth` microservice offers a robust authentication solution that can be utilized with various frontend technologies. It handles user registration, login, password recovery, and user management, supporting both traditional and Google-based authentication.

## Features

- **OAuth2 Authentication**: Secure token-based authentication.
- **User Management**: Create, update, delete, and retrieve users.
- **Password Recovery**: Functionality to recover and reset passwords.
- **Google Authentication**: Support for logging in with Google credentials.
- **Role Management**: Manage user roles and permissions.

## API Endpoints

### Authentication Endpoints

1. **Login Access Token**
   - **URL**: `POST /api/v1/login/access-token`
   - **Description**: Obtain an OAuth2-compatible access token by providing a username and password.
   - **Request Body**: 
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```
   - **Responses**:
     - `200`: Returns a token object with `access_token` and `token_type`.
     - `422`: Validation error.

2. **Test Token**
   - **URL**: `POST /api/v1/login/test-token`
   - **Description**: Test the validity of the current access token.
   - **Security**: Requires `OAuth2PasswordBearer` token.
   - **Responses**:
     - `200`: Returns the current user's information.

3. **Google Auth Access Token**
   - **URL**: `POST /api/v1/google-auth/access-token`
   - **Description**: Obtain an access token using Google authentication.
   - **Request Body**:
     ```json
     {
       "email": "string",
       "full_name": "string",
       "provider": "google"
     }
     ```
   - **Responses**:
     - `200`: Returns a token object with `access_token` and `user_id`.
     - `422`: Validation error.

### User Management Endpoints

1. **Register User**
   - **URL**: `POST /api/v1/users/signup`
   - **Description**: Create a new user account.
   - **Request Body**:
     ```json
     {
       "email": "string",
       "password": "string",
       "full_name": "string"
     }
     ```
   - **Responses**:
     - `200`: Returns the created user's public information.
     - `422`: Validation error.

2. **Read Current User**
   - **URL**: `GET /api/v1/users/me`
   - **Description**: Retrieve the current authenticated user's information.
   - **Security**: Requires `OAuth2PasswordBearer` token.
   - **Responses**:
     - `200`: Returns the user's public information.

3. **Update Current User**
   - **URL**: `PATCH /api/v1/users/me`
   - **Description**: Update the authenticated user's information.
   - **Request Body**:
     ```json
     {
       "full_name": "string",
       "email": "string"
     }
     ```
   - **Responses**:
     - `200`: Returns the updated user's public information.
     - `422`: Validation error.

4. **Update Password**
   - **URL**: `PATCH /api/v1/users/me/password`
   - **Description**: Update the authenticated user's password.
   - **Request Body**:
     ```json
     {
       "current_password": "string",
       "new_password": "string"
     }
     ```
   - **Responses**:
     - `200`: Returns a success message.
     - `422`: Validation error.

5. **Read Users**
   - **URL**: `GET /api/v1/users/`
   - **Description**: Retrieve a list of users, supports pagination.
   - **Parameters**: `skip` (integer), `limit` (integer).
   - **Security**: Requires `OAuth2PasswordBearer` token.
   - **Responses**:
     - `200`: Returns a list of users.
     - `422`: Validation error.

6. **Read User By ID**
   - **URL**: `GET /api/v1/users/{user_id}`
   - **Description**: Retrieve a specific user by their ID.
   - **Parameters**: `user_id` (integer).
   - **Security**: Requires `OAuth2PasswordBearer` token.
   - **Responses**:
     - `200`: Returns the user's public information.
     - `422`: Validation error.

7. **Update User By ID**
   - **URL**: `PATCH /api/v1/users/{user_id}`
   - **Description**: Update a specific user's information by their ID.
   - **Parameters**: `user_id` (integer).
   - **Request Body**:
     ```json
     {
       "email": "string",
       "full_name": "string",
       "is_active": "boolean"
     }
     ```
   - **Security**: Requires `OAuth2PasswordBearer` token.
   - **Responses**:
     - `200`: Returns the updated user's public information.
     - `422`: Validation error.

8. **Delete User**
   - **URL**: `DELETE /api/v1/users/{user_id}`
   - **Description**: Delete a specific user by their ID.
   - **Parameters**: `user_id` (integer).
   - **Security**: Requires `OAuth2PasswordBearer` token.
   - **Responses**:
     - `200`: Returns a success message.
     - `422`: Validation error.

### Utility Endpoints

1. **Password Recovery**
   - **URL**: `POST /api/v1/password-recovery/{email}`
   - **Description**: Initiate the password recovery process for a user.
   - **Parameters**: `email` (string).
   - **Responses**:
     - `200`: Returns a success message.
     - `422`: Validation error.

2. **Reset Password**
   - **URL**: `POST /api/v1/reset-password/`
   - **Description**: Reset a user's password using a provided token.
   - **Request Body**:
     ```json
     {
       "token": "string",
       "new_password": "string"
     }
     ```
   - **Responses**:
     - `200`: Returns a success message.
     - `422`: Validation error.

3. **Test Email**
   - **URL**: `POST /api/v1/utils/test-email/`
   - **Description**: Send a test email to verify email functionality.
   - **Parameters**: `email_to` (string, query).
   - **Security**: Requires `OAuth2PasswordBearer` token.
   - **Responses**:
     - `201`: Returns a success message.
     - `422`: Validation error.

## Security

- The API uses OAuth2 with password flow for authentication.
- Sensitive information such as passwords and tokens are handled securely.
- HTTPS is recommended for production environments to protect data in transit.
- Additional security measures like rate limiting and role-based access control (RBAC) are recommended to enhance security.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## Getting Involved

Contributions are welcome! If you have suggestions, features, or improvements, feel free to submit a pull request or open an issue on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact us at [mr.junaidshaukat@gmail.com](mailto:mr.junaidshaukat@gmail.com).