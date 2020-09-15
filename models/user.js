const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: false,
    default: false
  }
});

UserSchema.virtual('fullName').get(function () {
  return `${this.lastName}, ${this.firstName}`;
});

module.exports = mongoose.model('User', UserSchema);