CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS catnap;

CREATE TABLE IF NOT EXISTS catnap.user (
    id TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS catnap.note (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    content TEXT
);

CREATE TABLE IF NOT EXISTS catnap.user_note (
    user_id TEXT NOT NULL,
    note_id TEXT NOT NULL,
    PRIMARY KEY (user_id, note_id),
    FOREIGN KEY (user_id) REFERENCES catnap.user(id),
    FOREIGN KEY (note_id) REFERENCES catnap.note(id)
);
