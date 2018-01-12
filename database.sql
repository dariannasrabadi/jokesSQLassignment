--use database jokes

CREATE TABLE jokes (
	id SERIAL PRIMARY KEY,
	whoseJoke VARCHAR(50) NOT NULL,
	jokeQuestion VARCHAR(255) NOT NULL,
	punchLine VARCHAR(255) NOT NULL,
	funniness INT DEFAULT 1
);

INSERT INTO jokes (whoseJoke, jokeQuestion, punchLine)
VALUES ('Danny', 'Why do scuba divers fall backwards out of boats?','If they fell forwards they''d still be in the boat!
');