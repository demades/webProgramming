const connection = require('../database/db');

// Managing requests for Contacts. A contact in this content is a person infected (yes, I bit misleading)


exports.addPerson = (req, res) =>{
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const comments = req.body.comments;
    const email = req.body.email;
    connection.query('INSERT INTO contacts SET ?', {name:name, address:address, phone:phone, comments:comments, email:email}, (err, results)=>{
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

// Managing requests for Matches. A match in a contact among two or more people (yes, I bit misleading)


exports.newMatch = (req, res) =>{
    const checked = req.body.checked;
    const comments = req.body.comments;
    const date = req.body.date;
    connection.query('INSERT INTO matches SET ?', [{comments:comments, date:date}], (err, results)=>{
        if (err){
            throw err;
        }
    })
    checked.forEach(contact_id => {
        connection.query('INSERT INTO matches_contacts SET ? , id = LAST_INSERT_ID()', {contact_id:contact_id}, (err, results)=>{
            if (err){
                throw err;
            }      
        })    
    });
    res.redirect('/newMatch');
}

exports.updateMatch = (req, res) =>{
    const id = req.body.id;
    const date = req.body.date;
    const comments = req.body.comments;

    connection.query('UPDATE matches SET ?  WHERE id =?', [{date:date, comments:comments}, id], (err, results)=>{
        if (err){
            throw err;
        }else{
            res.redirect('/listMatches');
        }
    })
}


