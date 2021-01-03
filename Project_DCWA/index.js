const bodyParser = require('body-parser');
var express = require('express')
var mongoDAO = require('./mongoDAO');
var sqlDAO = reqire('./sqlDAO')

var app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req,res) => {
    res.redirect('/headsOfState')
})

//Takes in all the head Of State Database
app.get('/headsOfState', (req,res) => {
    mongoDAO.getHeadsOfState()
    .then((documents) => {
        res.send(documents)
    })
    .catch((error) => {
        res.send(error)
    })
})

//Add Countries
app.get('/addCountry', (req,res) => {
    res.render("addCountry")
})

//Adds Head Of States
app.get('/addHeadOfState', (req,res) => {
    res.render("addHeadsofState")
})

//Add the head of state into the database
app.post('/addHeadsOfState', (req,res)=> {
    mongoDAO.addCountry(req.body.countryCode, req.body.headName)
    .then((result) => {
        res.send('/listHeadOfState')
    })
    .catch((error) => {
        res.send(error)
    })
})

//Takes the user to the list of cities
app.get('/listOfCities', (req,res) => {
    sqlDAO.listOfCities()
    .then((result) => {
        res.render('listOfCities', {city:result})
    })
    .catch((error) => {
        res.render(error)
    })
})

//Takes the user to all details of  city
app.get('allDetails/:city', (req,res) => {
    sqlDAO.allDetails(req.params.city)
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    }) 
})

//Delete city
app.get('/listOfCitites/:cities', (req,res) => {
    mySQLDAO.deleteCollege(req.params.college)
        .then((result) => {
            if(result.affectedRows == 0){
                res.send("<h3>City: " + req.params.city + " doesn't exist</h3>")
            }
            else {
                res.send("<h3>City: " + req.params.city + " deleted</h3>")
            }
           
        })
        .catch((error) => {
            if (error.code == "ER_ROW_IS_REFERENCED_2") {
                res.send("<h3>ERROR: " + error.errno + " cannot delete city with city name: " + req.params.city_name + " as it has associated Country")
            }
            else {
                res.send("<h3>ERROR: "+ error.errno + error.sqlMessage + "</h3>")
            }
        })
})

//Add Country
app.post('/addCountry', (req,res)=> {
    mongoDAO.addCountry(req.body.countryCode, req.body.headName)
    .then((result) => {
        res.send('/addCountry')
    })
    .catch((error) => {
        res.send(error)
    })
})

//Sends inputted values into the database created
app.post('/addCountry', (req,res)=> {
    mongoDAO.addCountry(req.body.co_code, req.body.co_name, req.body.co_details)
    .then((result) => {
        if(result.affectedRows == 1){
            res.send("<h3>Country: " + req.params.co_name + " Added</h3>")
        }

        res.send('/listOfCountries')
    })
    .catch((error) => {
        res.send(error)
    })
})

//Sends inputted values back into database
app.post('/editCountry/:co_code', (req,res)=> {
    mongoDAO.addCountry(req.body.co_code, req.body.co_name, req.body.co_details)
    .then((result) => {
        if(result.affectedRows == 1){
            res.send("<h3>Country Code: " + req.params.co_code + " Updated</h3>")
        }
        if(result.affectedRows == 0){
            res.send("<h3>Country Code: " + req.params.co_code + " doesn't exist</h3>")
        }

        res.send('/listOfCountries')
    })
    .catch((error) => {
        res.send(error)
    })
})

//This makes the app to open in localhost port 3004
app.listen(3004, () => {
    console.log("Listening on port 3004")
})