
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Message = require('../../models/Message');
const validateMessageInput = require('../../validation/message');

router.get("/test", (req, res) => res.json({ msg: "This is the messages route" }));

router.get('/', (req, res) => {
  console.log("this is the messages route");
  Message.find()
    .then(messages => { 
      res.json(messages);
      //console.log(messages);
    })
    .catch(err => res.status(404).json({ nomessagesfound: 'No messages found' }));
});


module.exports = router;