const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const RoomSchema = require('./room')
//const Room = require('./room');
const { Room } = require(__dirname + '/Room.js')


const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // rooms: [Room]
  rooms_subscribe_to: [{
      type: Schema.Type.ObjectId,
      ref: "Room"
    }],
  rooms_admin_of: [{
      type: Schema.Type.ObjectId,
      ref: "Room"
  }]
}, {
  timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema);