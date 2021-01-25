const { json } = require('express');
const express = require('express');
const app = express();



app.set('vie engine', 'ejs');


app.use(express.urlencoded({extended:false}));
app.use(express(json));

app.use('/', require('./router'));



app.listen(8080, () =>{
    console.log("server running in port 8080");
    }
)

