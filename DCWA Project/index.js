var express = require('express')
var mongoDAO = require('./mongoDAO')

var app = express();

app.get('/', (req,res) => {
    res.redirect('/headsOfState')
})

app.get('/headsOfState', (req,res) => {
    mongoDAO.getHeadsOfState()
    .then((documents) => {
        res.send(documents)
    })
    .catch((error) => {
        res.send(error)
    })
})

app.get.get('/addHeadOfState', (req,res) => {
     
})

//This makes the app to open in localhost port 3004
app.listen(3004, () => {
    console.log("Listening on port 3004")
})