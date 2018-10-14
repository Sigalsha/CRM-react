const mongoose = require('mongoose')
const Schema =  mongoose.Schema

let clientSchema = new Schema({
    name: String,
    email: String,
    firstContact: String,
    emailType: String,
    sold: Boolean,
    owner: String,
    country: String
  })

let Client = mongoose.model('client', clientSchema)

module.exports = Client;  