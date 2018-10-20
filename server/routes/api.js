const express = require('express');
const router = express.Router();
var fs = require('fs');
var Promise = require("bluebird");
Promise.promisifyAll(fs);
const Client = require('../../models/model.js');


//Saved data form data.json to DB//
// fs.readFileAsync('./server/data.json', 'utf8')
// .then(function (resolve, reject) {
//     const clients = JSON.parse(resolve);
//     clients.forEach(function(client) {
//         let newClient = new Client ({
//             name: client.name,
//             email: client.email,
//             firstContact: client.firstContact,
//             emailType: client.emailType,
//             sold: client.sold,
//             owner: client.owner,
//             country: client.country
//         });
//         console.log(newClient)
//         newClient.save((err, data) => {
//             if (err) {
//                 console.log(err)
//             }
//             console.log(data + ' has been saved to db');
//         })  
//     })
// })



//get all the clients form DB:

router.get('/clients', function (req, res) {
    Client.find((err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data);
        res.send(data);
    });
})


//put - find client by id and update client's details:

router.put('/clients', function (req, res) {
    let { id, name, country } = req.body;
    Client.findByIdAndUpdate({ _id: id }, { name: name }, { country: country }, { new: true }, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result);
        res.send(result);
    })
})

router.get('/actions', function (req, res) {
    Client.find({ _id: id, name: name, owner: owner },(err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data);
        res.send(data);
    });
})




module.exports = router;
