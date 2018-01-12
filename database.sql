CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    whosejoke VARCHAR(100) NOT NULL
);


CREATE TABLE jokes (
	id SERIAL PRIMARY KEY,
	authors_id INT REFERENCES authors,
	jokeQuestion VARCHAR(255) NOT NULL,
	punchLine VARCHAR(255) NOT NULL,
	funniness INT DEFAULT 1
);

INSERT INTO authors(whosejoke) VALUES ('Darian'), ('Andrew'), ('Darren');
INSERT INTO jokes(authors_id, jokeQuestion, punchLine, funniness) VALUES
	(1, 'Why do scuba divers fall backwards out of boats?', 'If they fell forwards they''d still be in the boat!', 1),
	(2, 'What''s brown and sticky?', 'A stick!', 4),
	(3, 'What did a squirrel say to the squirrel it was chasing?', 'I am going to cashew!', 5);


SELECT jokes.id, authors.whosejoke, jokes.jokequestion, jokes.punchline, jokes.funniness 
    FROM
        jokes
        JOIN authors ON jokes.authors_id = authors.id;



INSERT INTO jokes(whosejoke, jokequestion, punchline, funniness) VALUES ($1, $2, $3, $4)


/*CREATE TABLE authors_jokes (
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES authors,
    joke_id INT REFERENCES jokes
);

SELECT * FROM authors_jokes;*/