# Library Management System

RESTful API for managing library books, members, and loans — built with Express.

## Quick Start

```bash
npm install
npm start

--------or
docker compose up

```

Server runs on `http://localhost:4000` | Swagger docs at `http://localhost:4000/api-docs`

## Environment Variables

```env
PORT=4000
JWT_SECRET=your_secret_key
LOAN_DURATION_DAYS=10
```

## API Endpoints

### Auth

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/auth/register | Register a new member |
| POST   | /api/auth/login    | Login, returns token  |

### Books

| Method | Endpoint               | Auth            | Description          |
| ------ | ---------------------- | --------------- | -------------------- |
| GET    | /api/books             | No              | Get all books        |
| GET    | /api/books/{id}        | No              | Get book by ID       |
| POST   | /api/books             | Admin/Librarian | Create a book        |
| POST   | /api/books/{id}/copies | Admin/Librarian | Add copies to a book |
| PUT    | /api/books/{id}        | Admin/Librarian | Update a book        |
| DELETE | /api/books/{id}        | Admin/Librarian | Delete a book        |

### Members

| Method | Endpoint                  | Auth            | Description         |
| ------ | ------------------------- | --------------- | ------------------- |
| GET    | /api/members              | No              | Get all members     |
| GET    | /api/members/email?email= | No              | Get member by email |
| GET    | /api/members/{id}         | No              | Get member by ID    |
| POST   | /api/members              | Admin/Librarian | Create a member     |
| POST   | /api/members/librarian    | Admin           | Create a librarian  |
| PUT    | /api/members/{id}         | Admin/Librarian | Update a member     |
| DELETE | /api/members/{id}         | Admin           | Delete a member     |

### Loans

| Method | Endpoint                              | Auth            | Description    |
| ------ | ------------------------------------- | --------------- | -------------- |
| GET    | /api/loans                            | Admin/Librarian | Get all loans  |
| GET    | /api/loans/{id}                       | Admin/Librarian | Get loan by ID |
| POST   | /api/loans/borrow/{memberId}/{bookId} | Admin/Librarian | Borrow a book  |
| PUT    | /api/loans/{id}/return                | Admin/Librarian | Return a book  |

## Usage

```bash
# Login as admin
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"abel@example.com","password":"12345abc"}'

# Create a book
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","genre":"Fiction","year":1925,"copies":3}'

# Borrow a book (member 1 borrows book 1)
curl -X POST http://localhost:4000/api/loans/borrow/1/1 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Return a loan (loan 1)
curl -X PUT http://localhost:4000/api/loans/1/return \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Password requirements: 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character (`#!?@$%^*-_`)

## Roles

| Role      | Can Do                                          |
| --------- | ----------------------------------------------- |
| member    | Register, login, borrow/return own books        |
| librarian | All of the above + manage books, members, loans |
| admin     | Full access, create/delete librarians           |

## Tech Stack

- Node.js + Express 5
- JWT auth with bcrypt
- Swagger UI (swagger-jsdoc + swagger-ui-express)
- In-memory storage

## Project Structure

```
src/
├── app.js                  # App setup, middleware, routes
├── server.js               # Entry point
├── config/                 # Configuration
├── controller/             # Request handlers
├── services/               # Business logic
├── routes/                 # Route definitions
├── middleware/              # Auth, validation, logging
├── data/                   # Seed data
└── utils/                  # Helpers (token, hash, responses)
```

## Seed Accounts

| Email            | Password | Role  |
| ---------------- | -------- | ----- |
| abel@example.com | 12345abc | admin |
