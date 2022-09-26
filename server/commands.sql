CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password TEXT
);

INSERT INTO "user" (name, email, password) VALUES('test1', 'test1@gmail.com', 'dsfuah8uy3');

SELECT * FROM "user";

CREATE TABLE "post"(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	content TEXT,
	user_id INT,
	CONSTRAINT fk_user
		FOREIGN KEY(user_id)
			REFERENCES "user"(id)
<<<<<<< HEAD
);

-----------------------------------------------------

CREATE DATABASE tech_shop
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Ukrainian_Ukraine.1251'
    LC_CTYPE = 'Ukrainian_Ukraine.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	

CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255),
	email VARCHAR(255) UNIQUE,
	password TEXT,
	role VARCHAR(255) DEFAULT 'USER'
);

INSERT INTO "user" (username, email, password) VALUES ('user1', 'email1@gmail.com', 'hashpass1');

DROP TABLE "user";

CREATE TABLE "cart" (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES "user"(id)
);
=======
);
>>>>>>> e3fae0ba60737c7d0a776cf4c0c3dc2ca70b9ff2
