var mongoose = require('mongoose');
var MessageSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    username: String,
    text: String
});
MessageSchema.pre('save', function(next) {
    this.timestamp = Date.now();
    next();
});
var message = mongoose.model('Chat', MessageSchema);

module.exports = message;