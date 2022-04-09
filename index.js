const express = require('express')
const fs = require('fs')
const app = express()
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/api/contacts/', function (req, res) { //Read contact list
    const contact = fs.readFileSync('./Contacts.json', {encoding: "utf8"})
    res.status(200).send(contact)
})
app.post('/api/contacts/', function (req, res) { //Add contact to list
    const contactRead = fs.readFileSync('./Contacts.json', {encoding: "utf8"})
    const contactObj = JSON.parse(contactRead)

    contactObj.push(req.body)
    const contactAdd = JSON.stringify(contactObj)
    fs.writeFileSync('./Contacts.json',contactAdd, {enconding:'utf8'})
    res.status(200).send(contactAdd)
})
app.get('/api/contacts/:id', function (req, res) { //Read a specific contact
  const contact = require('./Contacts.json')
  const contactInfo = contact.find( cont => cont.name === req.params.id)
  if (contactInfo) res.status(200).send(contactInfo)
  else res.status(404).send('We could not find the contact.')
})
app.put('/api/contacts/:id', function (req, res) { //edit a specific contact name or number
  const contact = require('./Contacts.json')
  const contactInfo = contact.find( cont => cont.name == req.params.id)
  if(contactInfo) {
    contactInfo.name = req.body?.name || contactInfo.name
    //contactInfo.name != req.body.name ? contactInfo.name,e = req.body.name : contactInfo.name
    contactInfo.number = req.body?.number || contactInfo.number
    const editContact = JSON.stringify(contact)
    fs.writeFileSync('./Contacts.json',editContact, {enconding:'utf8'})
    res.status(200).send(contactInfo)
  }
    else res.status(404).send('We could not find the contact.')
})
app.patch('/api/contacts/:id', function (req, res) { //edit the number of aspecific contact
  const contact = require('./Contacts.json')
  const contactInfo = contact.find( cont => cont.name == req.params.id)
  if(contactInfo) {
    contactInfo.number = req.body?.number || contactInfo.number
    const editContact = JSON.stringify(contact)
    fs.writeFileSync('./Contacts.json',editContact, {enconding:'utf8'})
    res.status(200).send(contactInfo)
  }
    else res.status(404).send('We could not find the contact.')
})
app.delete('/api/contacts/:id', (req,res) => { //delete a specific contact
  const contact = require('./Contacts.json')
  const contactInfo = contact.find(cont => cont.name == req.params.id)
  if(contactInfo) {
      const index = contact.indexOf(contactInfo)
      contact.splice(index, 1)
      const editContact = JSON.stringify(contact)
      fs.writeFileSync('./Contacts.json',editContact, {enconding:'utf8'})
      res.send(contactInfo)
  }
  else res.status(404).send('We could not find the contact.')

})
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))