// models/SharedPrompt.js
const mongoose = require('mongoose');
const sharedPromptSchema = new mongoose.Schema({
    prompt: { type: mongoose.Schema.Types.ObjectId, ref: 'PromptSuggestion' },
    sharedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: Number, // To track the effectiveness or popularity of the prompt
    sharedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('SharedPrompt', sharedPromptSchema);
