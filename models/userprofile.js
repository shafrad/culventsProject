var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {type: mongoose.Schema.Types.Mixed, required: true},
  phone: {type: mongoose.Schema.Types.Mixed, required: true},
  education: {type: String, required: true},
  aoi: {type: String, required: true},
  name: {type: String, required: true},
  pass: {type: mongoose.Schema.Types.Mixed, required: true},
  level: {type: String, required: true},
  events: { type: mongoose.Schema.Types.ObjectId, ref: 'Events' },
  kuliner: { type: mongoose.Schema.Types.ObjectId, ref: 'Kuliner' }
}, {collection: 'userprofile'});

module.exports = mongoose.model('User', UserSchema);

// cara panggil
// var mongoose = require('mongoose');
// var User = mongoose.model("User");
// User.find(function(err, users) {
//     some code here
// });