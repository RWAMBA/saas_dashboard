# API Endpoints

## Overview
This document lists all the available API endpoints for Analytics Pro, their methods, and usage.

## Analytics Endpoints

### Export Analytics Data
- **Endpoint**: `POST /api/analytics/export`
- **Functionality**: Exports analytics data based on user-defined options.
- **Authorization**: Required
- **Request Body**:    ```json
    {
      "startDate": "2023-01-01",
      "endDate": "2023-01-31",
      "metrics": ["sessions", "pageviews"]
    }    ```
- **Response**:    ```json
    {
      "data": "Exported data here..."
    }    ```

### Import Analytics Data
- **Endpoint**: `POST /api/analytics/import`
- **Functionality**: Imports analytics data from a CSV format.
- **Authorization**: Required
- **Request Body**:    ```json
    {
      "data": "CSV data in JSON format"
    }    ```
- **Response**:    ```json
    {
      "success": true,
      "count": 10
    }    ```

### Real-time Analytics
- **Endpoint**: `GET /api/analytics/realtime`
- **Functionality**: Streams real-time analytics data.
- **Authorization**: Required
- **Response**:    ```json
    {
      "data": "Real-time data stream..."
    }    ```

### Customer Metrics
- **Endpoint**: `GET /api/customers/metrics`
- **Functionality**: Retrieves metrics related to customers.
- **Authorization**: Required
- **Response**:    ```json
    {
      "totalCustomers": 100,
      "activeSubscriptions": 80,
      "churnRate": "5%",
      "growth": "3%"
    }    ```

### Update User Profile
- **Endpoint**: `PATCH /api/user/profile`
- **Functionality**: Updates user profile information, including password and email.
- **Authorization**: Required
- **Request Body**:    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "newPassword": "newSecurePassword123",
      "currentPassword": "currentPassword123"
    }    ```
- **Response**:    ```json
    {
      "message": "Profile updated successfully"
    }    ```

This updated documentation provides a comprehensive overview of the endpoints related to analytics, customers, and user profile management, including details on request formats and expected responses. It should serve as a useful guide for developers integrating with or testing the application's functionalities.
