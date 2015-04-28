var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    username: String,
    text: String
});

/**
 * Before saving to database add a timestamp
 */
MessageSchema.pre('save', function(next) {
    this.timestamp = Date.now();
    next();
});

module.exports = mongoose.model('Chat', MessageSchema);