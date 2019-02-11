var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var newsSchema = new Schema({
title : { type: String, default: 'title' },
body : { type: String, default: 'news here' },
// date: { type: Date, default: Date.now }
});
var news = mongoose.model('news', newsSchema);
module.exports= news;
