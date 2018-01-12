const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/authors', (req, res) => {
    console.log('in authors');
    const queryText = `SELECT * FROM authors`;
    pool.query(queryText)
    // runs on successful query
    .then((result) => {
        console.log('query results: ', result);            
        res.send(result.rows);
    })
    // error handling
    .catch((err) => {
        console.log('error making auhtors select query:', err);
        res.sendStatus(500);
    });
});


//GET - only one joke
router.get('/:id', (req,res) => {
    console.log('ID from request: ', req.params.id);
    //SQL query
    const queryText = 'SELECT * FROM jokes WHERE id=$1';
    pool.query(queryText, [req.params.id])
        // runs on successful query
        .then((result) => {
            console.log('query results: ', result);            
            res.send(result.rows);
        })
        // error handling
        .catch((err) => {
            console.log('error making select query:', err);
            res.sendStatus(500);
        });
});

router.get('/whose/:name', (req, res) => {
    const queryText = `SELECT jokes.id, authors.whosejoke, jokes.jokequestion, jokes.punchline, jokes.funniness
    FROM
        jokes
        JOIN authors ON jokes.authors_id = authors.id
    WHERE authors_id=$1
    ORDER BY jokes.id;`;
    pool.query(queryText, [req.params.name])
    // runs on successful query
    .then((result) => {
        console.log('query results: ', result);            
        res.send(result.rows);
    })
    // error handling
    .catch((err) => {
        console.log('error making select query:', err);
        res.sendStatus(500);
    });
});


router.get('/', (req, res) => {
    // query DB
    const queryText = `SELECT jokes.id, authors.whosejoke, jokes.jokequestion, jokes.punchline, jokes.funniness
    FROM
        jokes
        JOIN authors ON jokes.authors_id = authors.id
        ORDER BY jokes.id;`;
    pool.query(queryText)
        // runs on successful query
        .then((result) => {
            console.log('query results: ', result.rows);            
            res.send(result.rows);
        })
        // error handling
        .catch((err) => {
            console.log('error making select query:', err);
            res.sendStatus(500);
        });

    // send back the results
});

router.post('/', (req, res) => {
    console.log('req.body: ', req.body);
    const queryText = 'INSERT INTO jokes(authors_id, jokequestion, punchline, funniness) VALUES ($1, $2, $3, $4)';
    // use prepared statements!!!!!!!!!
    pool.query(queryText,[1, req.body.jokeQuestion, req.body.punchLine, req.body.funniness]) // TODO: hardcoded 1 for an int for authors_id
        .then((result) => {
        console.log('query results: ', result);
        res.sendStatus(201);
    })
        // error handling
        .catch((err) => {
            console.log('error making insert query:', err);
            res.sendStatus(500);
        });

    //res.sendStatus(201);
});

//DELETE - only one joke
router.delete('/:id', (req,res) => {
    console.log('ID from request: ', req.params.id);
    //SQL query
    const queryText = 'DELETE FROM jokes WHERE id=$1';
    pool.query(queryText, [req.params.id])
        // runs on successful query
        .then((result) => {
            console.log('query results: ', result);            
            res.sendStatus(200);
        })
        // error handling
        .catch((err) => {
            console.log('error making select query:', err);
            res.sendStatus(500);
        });
});

router.put('/:id', (req,res) => {
    console.log('ID from request: ', req.params.id);
    //SQL query
    const queryText = 'UPDATE jokes SET funniness=$1 WHERE id=$2';
    pool.query(queryText, [req.body.funniness, req.params.id])
        // runs on successful query
        .then((result) => {
            console.log('query results: ', result);            
            res.sendStatus(200);
        })
        // error handling
        .catch((err) => {
            console.log('error making select query:', err);
            res.sendStatus(500);
        });
});


router.get('/display/:display/whose/:name', (req, res) => {
console.log('WE ARE IN /display/:display/whose/:name');
    let queryText; 
    console.log('REQ PARAMS DISPLAY AND NAME IN ORDER: ', req.params );
    if (req.params.display == 5) {
        if (req.params.name != '') {
        queryText = `SELECT jokes.id, authors.whosejoke, jokes.jokequestion, jokes.punchline, jokes.funniness
            FROM
                jokes
                JOIN authors ON jokes.authors_id = authors.id
            WHERE authors_id=$1
            LIMIT 5
            ORDER BY jokes.id;`
        }
        else {
         queryText = `SELECT jokes.id, authors.whosejoke, jokes.jokequestion, jokes.punchline, jokes.funniness
    FROM
        jokes
        JOIN authors ON jokes.authors_id = authors.id
        ORDER BY jokes.id
        LIMIT 5;`;
        }
    }
    else {
        if (req.params.name != '') {
        queryText = `SELECT jokes.id, authors.whosejoke, jokes.jokequestion, jokes.punchline, jokes.funniness
            FROM
                jokes
                JOIN authors ON jokes.authors_id = authors.id
            WHERE authors_id=$1
            ORDER BY jokes.id;`
        }
        else {
        queryText = `SELECT jokes.id, authors.whosejoke, jokes.jokequestion, jokes.punchline, jokes.funniness
    FROM
        jokes
        JOIN authors ON jokes.authors_id = authors.id
        ORDER BY jokes.id;`
        };
    }
    pool.query(queryText, [req.params.name])
        // runs on successful query
        .then((result) => {
            console.log('query results: ', result.rows);            
            res.send(result.rows);
        })
        // error handling
        .catch((err) => {
            console.log('error making select query:', err);
            res.sendStatus(504);
        });
});

module.exports = router;