var countryEdit = require('./views/listOfCountries')

var mysql = require('promise-mysql');


var pool

//creates a connection to sql Database server
mysql.createPool({
    connectionLimit: 3,
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'geography'
  })
.then((result) => {
    pool = result
})
.catch((error) => { console.log(error) 
});

//function listing all cities in the database
var listOfCities = function() {
     //returns new Promise
    return new Promise((resolve, reject) => {
        pool.query('select * from city')
    .then((result) => {
       resolve(result)
    })
    .catch((error) => {
        reject(error)
    })
   // console.log("HERE1") used for testing
    })
}

//function listing all Countries in the database
var listOfCountry = function() {
     //returns new Promise
    return new Promise((resolve, reject) => {
        pool.query('select * from country')
    .then((result) => {
       resolve(result)
    })
    .catch((error) => {
        reject(error)
    })
     // console.log("HERE1") used for testing
    })
}

//function listing all details of a city
var allDetails = function(city_name) {
     //returns new Promise
    return new Promise((resolve, reject) => {
        var allDetailsquery = {
            sql: 'select * from city where city_name = ?',
            values: [city_name]
        }
        pool.query(allDetailsquery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

//delete city funtion
var deleteCity = function(city_name) {
    //returns new promise
    return new Promise((resolve,reject) => {

        var deleteCityquery = {
            sql: 'delete * from city where city_name = ?',
            values: [city_name]
        }
        pool.query(deleteCityQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

//Functions that add a new values for a country
var addCountry = function(){
    //returns new promise
    return new Promise((resolve,reject) => {
        var addCountryQuery = {
            sql: 'INSERT INTO country VALUES (?, ?, ?)',
            values: [country.co_code, country.co_name, country.co_details]
        }
        pool.query(addCountryQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

//updates or edits the country that has been stored already in the database
var editCountry = function(co_code) {
    //returns new promise
    return new Promise((resolve,reject) => {

        var deleteCityquery = {
            sql: 'update country Set co_code = ?, co_name = ?, co_details =? ',
            values: [co_code, co_name, co_details]
        }
        pool.query(deleteCityQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}



module.exports = {listOfCities, listOfCountry, allDetails, deleteCity, addCountry, editCountry}