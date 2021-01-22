const mysql = require('mysql');

const  connection = mysql.createConnection({

    host : "ec2-54-93-165-109.eu-central-1.compute.amazonaws.com",
    user : "webprog",
    database : "exercise4",
    password : "webprog"
})

connection.connect((error) =>{
    if(error){
        console.error("Db connection issue: "  + error);
        return
    }
    console.log("connected to db")
}
)

module.exports = connection