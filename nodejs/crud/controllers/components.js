const connection = require('mysql');

exports.submit = (req, res) =>{
    const user = req.body.user;
    const rol = req.body.rol;
    console.log(user + " is " + rol);
}
