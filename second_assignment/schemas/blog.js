var mongoose = require('mongoose');

module.exports = mongoose.model('Blog',{
  title:  {type: String, required: true, unique: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  body:   {type: String, required: true},
  comments: [{ body: String, date: { type: Date, default: Date.now } }],
  date: { type: Date, default: Date.now },
  published: Boolean  
});