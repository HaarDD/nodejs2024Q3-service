# Home Library Service (v2)

A REST service for managing your home music library. Built with NestJS, PostgreSQL, and Prisma.

## Description

This service allows you to:
- Manage users, artists, albums, tracks & favorites
- Create and manage favorites lists
- Store all data in PostgreSQL database
- Run the entire application in Docker containers

## Prerequisites

- [Docker](https://docs.docker.com/engine/install/) 
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/) v22.x or higher

## Installation

1. Clone git repository
2. Checkout develop branch
3. Configure environment variables in `.env` file with `.env.example` content

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Running

Build and start containers:

```
npm install

docker-compose up --build
```
(npm install locally needs only for testing)

The application will be available at http://localhost:4000

API Documentation will be available at http://localhost:4000/doc

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
