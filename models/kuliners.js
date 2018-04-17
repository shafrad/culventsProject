var mongoose = require('mongoose');

var KulinerSchema = new mongoose.Schema({
  email: String,
  phone: String,
  nama: String,
  asal: String,  
  harga: String,
  details: String,
  image: String,
  upvotes: {type: Number, default: 0},
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }],
  pesanEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pesanEvents' }]
}, {collection: 'kuliner'});

module.exports = mongoose.model('Kuliner', KulinerSchema);

// var mongoose = require('mongoose');
// var Kuliner = mongoose.model("Kuliner");
// Kuliner.find(function(err, kuliners) {
//     // some code here
// });