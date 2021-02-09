const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trime: true,
    minlength: 3,
  },
  email: { type: String },
  firstContact: { type: String },
  emailType: { type: String },
  sold: { type: Boolean, required: true },
  owner: { type: String, required: true },
  country: { type: String, required: true },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
