const MongoClient = require('mongodb').MongoClient
var mongodb = require(mongodb-Promise)

const url = 'mongodb://localhost27017';

const dbName = 'headsOfStateDB'
const colName = 'headsOfState'

var headsOfStateDB
var headsOfState

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then((client) => {
   headsOfStateDB = client.db(dbName)
   headsOfState = headsOfStateDB.collection(colName)
})
.catch((error) => {
    //console.log(error)    (Used for testing)
})

//Function to get acces into heads Of State database
var getHeadsOfState = function() {
    //returns new Promise
    return new Promise((resolve, reject) => {
        var cursor = headsOfState.find();
        cursor.toArray()
        .then((documents) => {
            //console.log(documents)    (Used for testing)
            resolve(documents)
        })
        .catch((error) => {
            //console.log(error)   (Used for testing)
            reject(error)
        })
    })
}

var addCountry =function(country_id, country_name, country_details){
     //returns new Promise
    return new Promise((resolve, reject) => {
        headsOfState.insertOne({"countryCode":countryCode, "headName":headName})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
             //console.log(error)   (Used for testing)
            reject(error)
        })
    })
}

module.exports = {getHeadsOfState, addCountry}