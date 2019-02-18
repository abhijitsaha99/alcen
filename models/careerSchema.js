var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var careerSchema = new Schema({
careerTitle : { type: String, default: 'title' },
careerBody : { type: String, default: 'news here' },
});
var careers = mongoose.model('careers', careerSchema);
module.exports= careers;
