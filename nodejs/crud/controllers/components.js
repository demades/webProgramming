const connection = require('../database/db');

exports.addPerson = (req, res) =>{
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const comments = req.body.comments;
    connection.query('INSERT INTO contacts SET ?', {name:name, address:address, phone:phone, comments:comments}, (err, results)=>{
        if (err){
            throw err;
        }else{
            res.redirect('/contacts');
        }        
    })
}


exports.updatePerson = (req, res) =>{
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const comments = req.body.comments;
    const phone = req.body.phone;
    connection.query('UPDATE contacts SET ?  WHERE id = ?', [{name:name, address:address, comments:comments, phone:phone}, id], (err, results)=>{
        if (err){
            throw err;
        }else{
            res.redirect('/contacts');
        }
    })
}

exports.removePerson = (req, res) =>{
    const id = req.body.id;
    connection.query('DELETE from contacts WHERE id = ?', [{id:id}], (err, results)=>{
        if (err){
            throw err;
        }else{
            res.redirect('/contacts');
        }
    })
}

