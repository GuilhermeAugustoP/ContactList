const express = require('express')
const fs = require('fs')
const app = express()
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function (req, res) {
    const contact = fs.readFileSync('./Contacts.json', {encoding: "utf8"})
    //const contactList = JSON.stringify(contact)
    res.send(contact)
})
app.post('/', function (req, res){
    console.log(req.body)
    const contactList = JSON.stringify(req.body)
    const contact =fs.appendFileSync('./Contacts.json',contactList, {enconding:'utf8'})
    res.send('200')
})

app.listen(3000)