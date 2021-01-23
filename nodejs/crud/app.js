const { json } = require('express');
const express = require('express');
const app = express();



app.set('vie engine', 'ejs');


app.use(express.urlencoded({extended:false}));
app.use(express(json));

app.use('/', require('./router'));



app.listen(5000, () =>{
    console.log("server running in http://localhost:5000");
    }
)

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
