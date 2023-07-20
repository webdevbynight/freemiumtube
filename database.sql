-- Table languages
CREATE TABLE languages
(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lang VARCHAR(7) NOT NULL UNIQUE KEY,
    description VARCHAR(255) NOT NULL
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

-- Table users
CREATE TABLE users
(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lang_id INT UNSIGNED NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    channel VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    url VARCHAR(255),
    avatar VARCHAR(255),
    registered INT UNSIGNED NOT NULL,
    role TINYINT UNSIGNED NOT NULL DEFAULT (0),
    CONSTRAINT FOREIGN KEY (lang_id) REFERENCES languages(id)
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

-- Table videos
CREATE TABLE videos
(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lang_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    src VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    uploaded INT UNSIGNED NOT NULL,
    status TINYINT UNSIGNED NOT NULL,
    published INT UNSIGNED,
    views INT UNSIGNED NOT NULL DEFAULT(0),
    CONSTRAINT FOREIGN KEY (lang_id) REFERENCES languages(id),
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

-- Table comments
CREATE TABLE comments
(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lang_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    comment TEXT NOT NULL,
    published INT UNSIGNED NOT NULL,
    CONSTRAINT FOREIGN KEY (lang_id) REFERENCES languages(id),
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

-- Table likes
CREATE TABLE likes
(
    user_id INT UNSIGNED NOT NULL,
    video_id INT UNSIGNED NOT NULL,
    CONSTRAINT PRIMARY KEY(user_id, video_id)
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

-- Insertions for languages
INSERT INTO languages (lang, description) VALUES
    ('en', 'English'),
    ('es', 'Español'),
    ('fr', 'Français'),
    ('pt', 'Português');

-- Insertions for users
INSERT INTO users (lang_id, email, password, channel, description, url, registered, role)
    VALUES(1, 'contact@victor-brito.name', '123456', 'webdevbynight', 'Front-end developer', 'https://victor-brito.dev', UNIX_TIMESTAMP(), 1);
