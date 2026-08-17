# Library Management System

A RESTful API for managing library books, members, and loans — built with Express.

## Quick Start

```bash
npm install
npm start
```

The server runs on `http://localhost:4000`.

## API Documentation

Interactive Swagger docs: [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

### Books

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/books | List all books |
| GET | /api/books/:id | Get a book by ID |
| POST | /api/books | Create a new book |
| POST | /api/books/:id/copies | Add copies to a book |
| PUT | /api/books/:id | Update a book |
| DELETE | /api/books/:id | Delete a book |

### Members

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/members | List all members |
| GET | /api/members/email?email= | Get a member by email |
| GET | /api/members/:id | Get a member by ID |
| POST | /api/members | Create a new member |
| PUT | /api/members/:id | Update a member |
| DELETE | /api/members/:id | Delete a member |

### Loans

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/loans | List all loans |
| GET | /api/loans/:id | Get a loan by ID |
| POST | /api/loans/borrow/:memberId/:bookId | Borrow a book |
| PUT | /api/loans/:id/return | Return a book |

## Tech Stack

- Node.js, Express 5
- In-memory arrays (PostgreSQL planned)
- bcrypt for password hashing
- JWT for authentication (planned)
- Swagger for API documentation