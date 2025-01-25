-- Migration number: 0001 	 2025-01-25T16:43:09.064Z
CREATE TABLE comment (
    comment_id TEXT PRIMARY KEY,
    article_id TEXT NOT NULL,
    name TEXT NOT NULL,
    text TEXT NOT NULL,
    commented_at TIMESTAMP NOT NULL
);