# Home Library Service

A RESTful API service for managing a personal music library built with NestJS.

## Features
- User Management
  - Create, read, update, and delete users
  - Password update functionality
  - Version control for user entities

- Music Library Management
  - Artists management (CRUD operations)
  - Albums management (CRUD operations)
  - Tracks management (CRUD operations)

- Favorites System
  - Add/remove tracks to favorites
  - Add/remove albums to favorites
  - Add/remove artists to favorites
  - View all favorites in one request

- Data Validation
  - Input validation using class-validator
  - UUID validation for entity IDs
  - Request DTOs validation

- API Documentation
  - Swagger UI available at doc endpoint
  - API specification in OpenAPI format

## The project follows layered architecture. Key Directories:

- **controller/**: API endpoints and route handlers
- **dto/**: Data Transfer Objects for request/response validation
- **entity/**: Domain models and business objects
- **mappers/**: Conversion between entities and DTOs
- **modules/**: NestJS module definitions and configurations
- **repository/**: Data access layer with interfaces
- **service/**: Business logic implementation
- **utils/**: Helper functions and utilities


## Requirements

- Node.js: Version 22.0.0 or higher.
- npm: Node package manager.

## Installation & Running

1. Clone git repository
2. Checkout develop branch
3. Configure environment variables in `.env` file with `.env.example` content
4. Install node dependencies: `npm install`
5. Run app: `npm start`

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests:

```
npm run test
```
To check ESlint errors:
```
npm run lint
```
