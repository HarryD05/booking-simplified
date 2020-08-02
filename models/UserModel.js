const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email required"]
  },
  password: {
    type: String,
    required: [true, "Password required"]
  },
  createdEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
});

module.exports = mongoose.model('User', userSchema);

