var mongoose = require('mongoose');

var pesanEventsSchema = new mongoose.Schema({
  email: {type: String, required: true},
  phone: {type: mongoose.Schema.Types.Mixed, required: true},
  name: {type: String, required: true},
  tanggal: {type: String, required: true},
  jam: {type: String, required: true},
  tempat: {type: String, required: true},
  event_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Events', required:true},  
  kode: {type: String, required: true},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  kuliner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kuliner' }]
}, {collection: 'pesanEvents'});

module.exports = mongoose.model('pesanEvents', pesanEventsSchema);

// var mongoose = require('mongoose');
// var Events = mongoose.model("Events");
// Events.find(function(err, comments) {
//     // some code here
// });