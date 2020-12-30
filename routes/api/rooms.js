
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Room = require('../../models/Room');
const { populate } = require('../../models/User');
const User = require('../../models/User');
const validateRoomInput = require('../../validation/room');

router.get("/test", (req, res) => res.json({ msg: "This is the rooms route" }));

const filterRooms = (rooms, userId) =>{
  let filteredRooms = [];
  rooms.forEach(room => {
    room.users.forEach(user => {
       
      if (user.id === userId){
        filteredRooms.push(room);
      } 
    });
  });
  return filteredRooms;
}
const filterAvailableRooms = (rooms, userId) =>{
  let filteredRooms = [];
  rooms.forEach(room => {
    let include = true;
    
    room.users.forEach(user => {
      
      if (user._id.toString() === userId){
        include = false;
      } 
    });
    include ? filteredRooms.push(room) : null;

  });
  return filteredRooms;
};



//get available rooms to join
  //excludes rooms a user already bleongs to
router.get('/:userId/roomsAvailable', (req,res)=> {
  
  Room.find({})
    .populate({
      path: 'messages',
      model: 'Message',
      populate: {
        path: 'sender',
        model: 'User'
      },
      populate: {
        path: 'replies'
      }
    }).populate({
      path: 'users',
      model: 'User'
    }).exec((err, rooms)=>{
      if (err) {
        res.status(404).json({ noroomsfound: 'No rooms found' });
      } else {
        let roomList = filterAvailableRooms(rooms, req.params.userId);
        // 
        res.json(roomList);
      }
    })
})



//retrieve all rooms by user
router.get('/:userId/rooms', (req, res) => {
  debugger;
  Room.find({})
      .populate({
        path: 'messages',
        model: 'Message',
        populate: {
          path: 'sender',
          model: 'User'
        }
      }).populate({
        path: 'users',
        model: 'User'
      }) //populate the array of messages
      .exec((err, rooms)=>{
         
        if(err){
          res.status(404).json({ noroomsfound: 'No rooms found' });
        } else {
          debugger;
          let roomList = filterRooms(rooms, req.params.userId);
           debugger;
           
          res.json(roomList);
        }

      }) 
});




//retrieve single room
router.get('/:roomId', (req, res) => {
  console.log("this is the room route");
  Room.findById(req.params.roomId)
    .populate('admin')
    .then(room => {
      res.json(room);
      //console.log(messages);
    })
    .catch(err => res.status(404).json({ noroomfound: 'No room found' }));
});


//find current users in one single room
// router.get('/:roomId/users', (req,res)=> {
  
//   Room.findById(req.params.roomId)
//     .then((err, room)=>{
//       if (err) {
//         res.status(404).json({ noroomsfound: 'No rooms found' });
//       } else {
//         let userList = [];
//         room.users.forEach(user => {
//           userList.push(User.find({_id: user}));
//         })
//         res.json(userList);
//       }
//   })
// })


//create room
router.post('/',
  //passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRoomInput(req.body);
    

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newRoom = new Room({
      title: req.body.title,
      admin: req.body.admin,
      messages: [],
      users: req.body.users,
    });

    newRoom.save().then(room => res.json(room));
  }
);


//delete room
router.post('/:roomId/delete', 
  (req,res) => {
    Room.findByIdAndRemove(req.params.roomId)
      .then(room => {
        res.json(room);
        //returns the deleted room;
      })
      .catch(err => res.status(404).json({ noroomfound: 'No room found' }));
  }
)

//edit room
router.post('/:roomId',
  //passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRoomInput(req.body);
    
    //  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let updateRoom = Room.findById(req.params.roomId).exec().then(room => {
      room.title = req.body.title;
      room.admin = req.body.admin;
      room.users = req.body.users;
      //  
      room.save().then(room => {
        Room.findById(req.params.roomId)
          .populate({
            path: 'messages',
            model: 'Message',
            populate: {
              path: 'sender',
              model: 'User'
            }
          }).populate({
            path: 'users',
            model: 'User'
          }).exec().then(room => {
            res.json(room);

          })
      });
      //returns the updated room
    }
    );

    
  }
);

module.exports = router;