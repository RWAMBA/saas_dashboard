# API Rate Limits

## Overview
To ensure fair usage and prevent abuse, the Analytics Pro API enforces rate limits.

## Rate Limit Rules
- **60 requests per minute** per API key.
- Exceeding the limit will result in a `429 Too Many Requests` response.

## Best Practices
- Implement exponential backoff in your retry logic.
- Cache responses whenever possible to reduce the number of requests.
