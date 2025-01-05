# API Endpoints

## Overview
This document lists all the available API endpoints for Analytics Pro, their methods, and usage.

## Endpoint List

### User Management
- **Create User**
  - **Method**: POST
  - **URL**: `/api/users`
  - **Body**:    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }    ```

### Data Retrieval
- **Fetch Analytics**
  - **Method**: GET
  - **URL**: `/api/analytics`

## Pagination
- Use `?page=` to specify the page number.
- Use `?limit=` to specify the number of items per page.

## Filtering
- Use query parameters to filter results, e.g., `/api/users?status=active`.
