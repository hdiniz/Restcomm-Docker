var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var response = require('./response');

const clientMap = {}

app.get('/', function (req, res) {
  console.log("call started");

  res.set('Content-Type', 'text/xml');

  if (!req.query.client || !req.query.name || !req.query.email) {
    console.log("client not setup correctly, announcing error");
    res.send(response.setupError());
  } else {
    const client = {
      id: req.query.client,
      name: req.query.name,
      email: req.query.email
    }
    clientMap[client.id] = client;
    console.log(client);

    res.send(response.dial(client.id, client.name));
  }
});

app.get('/sendEmail', function (req, res) {
  console.log("send email callback");

  res.set('Content-Type', 'text/xml');

  if (!req.query.client) {
    console.log("invalid callback from restcomm, missing client id");
    res.send(response.hangup());
  } else {
    const client = clientMap[req.query.client];
    if (!client) {
      console.log("client information not found, hanging up without email");
      res.send(response.hangup());
    } else {
      console.log("sending email");
      console.log(client);
      res.send(response.sendEmail(client.email, req.query.From || "anonymous", req.query.PublicRecordingUrl || "unavailable"));
    }
  }
});

app.listen(3000, function () {
  console.log('Voice mail app listening on port 3000!');
});

