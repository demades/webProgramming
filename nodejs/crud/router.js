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

router.get('/listMatches', (req, res) => {
    connection.query('SELECT * FROM matches', (err, results) => {
        if (err){
            throw err;
        }else{
            res.render('listMatches.ejs', {results:results});
        }
    })
})


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


const components = require('./controllers/components');


router.post('/addPerson', components.addPerson);
router.post('/updatePerson', components.updatePerson);
router.post('/newMatch', components.newMatch);



module.exports = router;