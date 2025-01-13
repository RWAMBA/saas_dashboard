# Authentication Features

## Overview
This document outlines the authentication features provided by the application, including registration, password management, and email verification processes.

## Registration
- **Endpoint**: `POST /api/auth/register`
- **Functionality**: Allows new users to register. It checks for existing users with the same email, hashes the password, and sends a verification email with a token.
- **Request Body**:    ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }  ```
- **Response**:    ```json
  {
    "message": "User created successfully. Please check your email to verify your account.",
    "user": {
      "id": "userId",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }  ```

## Forgot Password
- **Endpoint**: `POST /api/auth/forgot-password`
- **Functionality**: Generates a password reset token and sends it via email if the user exists.
- **Request Body**:    ```json
  {
    "email": "john@example.com"
  }  ```
- **Response**:    ```json
  {
    "message": "If an account exists, you will receive a reset email"
  }  ```

## Reset Password
- **Endpoint**: `POST /api/auth/reset-password`
- **Functionality**: Allows users to reset their password using a valid reset token.
- **Request Body**:    ```json
  {
    "token": "resetTokenHere",
    "password": "newSecurePassword123"
  }  ```
- **Response**:    ```json
  {
    "message": "Password reset successful"
  }  ```

## Email Verification
- **Endpoint**: `GET /api/auth/verify`
- **Functionality**: Verifies user's email using a token provided via email.
- **Request Parameters**: `token=verificationTokenHere`
- **Response**:    ```json
  {
    "message": "Email verified successfully",
    "status": "verified"
  }  ```

## Resend Verification Email
- **Endpoint**: `POST /api/auth/resend-verification`
- **Functionality**: Resends the verification email if the user's email is not verified.
- **Request Body**:    ```json
  {
    "email": "john@example.com"
  }  ```
- **Response**:    ```json
  {
    "message": "Verification email sent"
  }  ```

This documentation provides a comprehensive overview of the authentication-related endpoints, including details on request formats and expected responses. It should serve as a useful guide for developers integrating with or testing the application's authentication functionalities.