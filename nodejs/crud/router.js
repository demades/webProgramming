const express = require('express');
const router = express.Router();
const connection = require('./database/db');

router.get('/', (req, res) => {
    res.render('home.ejs');
})

router.get('/contacts', (req, res) => {
    connection.query('SELECT * FROM contacts', (err, results) => {
        if (err){
            throw err;
        }else{
            res.render('contacts.ejs', {results:results});
        }
    })
})

router.get('/list', (req, res) => {
    connection.query('SELECT * FROM contacts', (err, results) => {
        if (err){
            throw err;
        }else{
            res.render('list.ejs', {results:results});
        }
    })
})

const components = require('./controllers/components');

router.post('/addPerson', components.addPerson);

module.exports = router;