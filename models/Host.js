var mongoose = require('mongoose');
    Schema = mongoose.Schema;
//스키마 정의
var schema = new Schema({
    email: {type: String, required: true, index: true, unique: true, trim: true},
    password: {type: String},
    title: {type: String},
    content: {type: String},
    read: {type:Number, default: 0},
    createdAt: {type: Date, default: Date.now},
});


var Host = mongoose.model('Host', schema);

module.exports =  Host;