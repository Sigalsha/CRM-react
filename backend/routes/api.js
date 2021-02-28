const express = require("express");
const router = express.Router();
const fs = require("fs");
const Promise = require("bluebird");
Promise.promisifyAll(fs);
const Client = require("../models/ClientModel.js");
const ClientController = require("../controllers/client.controllers");

//GET - get all the clients form DB:
router.get("/clients", ClientController.getClients);

/* router.get("/clients", async function(req, res) {
     Client.find((err, data) => {
    if (err) {
      console.log(err);
    }
    // console.log(data);
    res.send(data);
  }); 
}); */

// POST - add new client
router.post("/clients/add", ClientController.addNewClient);

//PUT - find client by id and update client's details:
router.put("/clients/:id", ClientController.updateClient);

/*router.put("/clients", function(req, res) {
  let { id, name, country } = req.body;
  Client.findByIdAndUpdate(
    { _id: id },
    { name: name },
    { country: country },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(result);
    }
  );
});*/

router.get("/actions", function(req, res) {
  Client.find({ _id: _id, name: name, owner: owner }, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.send(data);
  });
});

router.put("/actions/update", function(req, res) {
  let { _id, owner, emailType, sold } = req.body;
  Client.findByIdAndUpdate(
    { _id: _id },
    { owner: owner },
    { emailType: emailType },
    { sold: sold },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(result);
    }
  );
});

module.exports = router;
