CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS catnap;

CREATE TABLE IF NOT EXISTS catnap.user (
    id TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS catnap.note (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES catnap.user(id) ON DELETE CASCADE
);
