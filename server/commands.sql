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
);