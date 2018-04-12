var mongoose = require('mongoose');

var pesanEventsSchema = new mongoose.Schema({
  email: {type: mongoose.Schema.Types.Mixed, required: true},
  phone: {type: mongoose.Schema.Types.Mixed, required: true},
  name: {type: String, required: true},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  kuliner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kuliner' }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }]
}, {collection: 'pesanEvents'});

module.exports = mongoose.model('pesanEvents', pesanEventsSchema);

// var mongoose = require('mongoose');
// var Events = mongoose.model("Events");
// Events.find(function(err, comments) {
//     // some code here
// });