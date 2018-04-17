var mongoose = require('mongoose');

var EventsSchema = new mongoose.Schema({
  email: String,
  phone: String,
  name: String,
  jam: String,  
  tanggal: String,    
  tempat: String,  
  guestStar: String,  
  image: String,
  kuota: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  kuliner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kuliner' }],
  pesanEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pesanEvents' }]
}, {collection: 'events'});

module.exports = mongoose.model('Events', EventsSchema);

// var mongoose = require('mongoose');
// var Events = mongoose.model("Events");
// Events.find(function(err, comments) {
//     // some code here
// });