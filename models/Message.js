const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'rooms'
  }
}, {
  timestamps: true
})

module.exports = Message = mongoose.model('Message', MessageSchema);