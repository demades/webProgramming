const express = require('express');
const mysql = require('mysql');
const chance = require('chance').Chance();

// Create connection 
const db = mysql.createConnection({
    host    : 'ec2-54-93-165-109.eu-central-1.compute.amazonaws.com',
    user    : 'webprog',
    password: 'webprog',
    database: 'exercise4'
});

// Connect 
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('database connected');
})

const data = {
    headers :  ["Name", "Telephone", "Address", "City"],
    rows    : new Array(10).fill(undefined).map(() => {
        return [
            chance.name(),
            chance.phone(),
            chance.address({full: true}),
            chance.city(),
        ];
    })
};
    

const app = express();

app.listen('3000', () => {
    console.log('server started on port 3000');
})

app.get('/users', (req, res) => {
    res.json(data); 
  }) 
    
