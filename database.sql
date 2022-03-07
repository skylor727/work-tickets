CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(100) NOT NULL,
    img VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL DEFAULT 'User',
    google_id VARCHAR(250) NOT NULL UNIQUE
);

CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
subject VARCHAR(255) NOT NULL,
description VARCHAR(255) NOT NULL,
assigned_to INT references users(username) NOT NULL,
is_active BOOLEAN NOT NULL DEFAULT True,
created_by VARCHAR(255) references users(username) NOT NULL
);