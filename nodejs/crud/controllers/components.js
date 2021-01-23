const connection = require('../database/db');

exports.addPerson = (req, res) =>{
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    connection.query('INSERT INTO contacts SET ?', {name:name, address:address, phone:phone}, (err, results)=>{
        if (err){
            throw err;
        }else{
            res.redirect('/contacts');
        }        
    })
}



