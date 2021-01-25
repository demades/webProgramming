// Import modules 
const express = require('express');
const router = express.Router();
const connection = require('./database/db');

// Set home page

router.get('/', (req, res) => {
    res.render('home.ejs');
})

// List of contacts (people infected)
router.get('/contacts', (req, res) => {
    connection.query('SELECT * FROM contacts', (err, results) => {
        if (err){
            throw err;
        }else{
            res.render('contacts.ejs', {results:results});
        }
    })
})

// Edit a contact by ID

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

// Remove a contact by ID

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

// New Match from two or more contacts
router.get('/newMatch', (req, res) => {
    connection.query('SELECT * FROM contacts', (err, results) => {
        if (err){
            throw err;
        }else{
            res.render('newMatch.ejs', {results:results});
        }
    })
})

// List Mtaches
router.get('/listMatches', (req, res) => {
    connection.query('SELECT * FROM matches', (err, results) => {
        if (err){
            throw err;
        }else{
            res.render('listMatches.ejs', {results:results});
        }
    })
})


// Remove and existing Match

router.get('/removeMatch/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    connection.query('DELETE from matches WHERE id = ?', [id], (err, results) => {
        if (err){
            throw err;
        }
        connection.query('DELETE from matches_contacts WHERE id = ?', [id], (err, results)=>{
            if (err){
                throw err;
            }        
        });
    })
    res.redirect('/listMatches');
})

// Edit a match by ID

router.get('/editMatch/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    connection.query('SELECT m.id, m.comments, m.date, mc.contact_id, c.name FROM matches m INNER JOIN matches_contacts mc ON m.id = mc.id INNER JOIN contacts c ON mc.contact_id = c.id WHERE m.id=?',[id], (err, results) => {
        if (err){
            throw err;
        }else{
            res.render('editMatch.ejs', {match:results});
        }
    })
})

// Import controller where lie POST request handlers

const components = require('./controllers/components');


// Routing to POST request to 'components' handlers.
router.post('/addPerson', components.addPerson);
router.post('/updatePerson', components.updatePerson);
router.post('/newMatch', components.newMatch);
router.post('/updateMatch', components.updateMatch);



module.exports = router;