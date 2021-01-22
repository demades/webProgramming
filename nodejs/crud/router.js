const express = require('express');
const router = express.Router();
const connection = require('./database/db');

router.get('/', (req, res) => {
    res.render('home.ejs');
})

router.get('/contacts', (req, res) => {
    res.render('contacts.ejs');
})

router.get('/list', (req, res) => {
    res.render('list.ejs');
})

const components = require('./controllers/components');

router.post('/save', components.submit);

module.exports = router;