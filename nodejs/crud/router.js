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

router.get('/editPerson/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM contacts WHERE ID=?',[id], (err, results) => {
        if (err){
            throw err;
        }else{
            res.render('editPerson.ejs', {user:results[0]});
        }
    })
})

router.get('/removePerson/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM contacts WHERE ID=?',[id], (err, results) => {
        if (err){
            throw err;
        }else{
            res.redirect('/contacts');
        }
    })
})

router.get('/newMatch', (req, res) => {
    connection.query('SELECT * FROM contacts', (err, results) => {
        if (err){
            throw err;
        }else{
            res.render('newMatch.ejs', {results:results});
        }
    })
})

const components = require('./controllers/components');

router.post('/addPerson', components.addPerson);
router.post('/updatePerson', components.updatePerson);
router.post('/newMatch', components.newMatch);

module.exports = router;