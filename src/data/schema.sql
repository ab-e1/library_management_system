/* create a book table */

CREATE TABLE IF NOT EXISTS books(
  id serial PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(50) NOT NULL,
  genre VARCHAR(100),
  year INTEGER,
  copies INTEGER DEFAULT 1,
  available_copies INTEGER DEFAULT 1
);

/* cretae a members table*/

CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    name  VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role varchar(50) DEFAULT 'member',
    registered_at TIMESTAMP DEFAULT NOW()
);

/* create a loan table */
 
 CREATE TABLE IF NOT EXISTS loans(
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    member_id INTEGER REFERENCES members(id),
    borrowed_at TIMESTAMP,
    due_at TIMESTAMP,
    returned_at TIMESTAMP DEFAULT NULL,
    status varchar(20) DEFAULT 'borrowed'
);
