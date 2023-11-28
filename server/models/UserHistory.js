// models/UserHistory.js
const mongoose = require('mongoose');
const userHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    aiModel: String,
    prompt: String,
    response: String, // Store the AI model's response or output
    timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('UserHistory', userHistorySchema);
