// models/PromptSuggestion.js
const mongoose = require('mongoose');
const promptSuggestionSchema = new mongoose.Schema({
    aiModel: String, // e.g., 'ChatGPT', 'DALL-E', etc.
    prompt: String,
    preview: String, // URL or base64 string for preview of result of the corresponding prompt(especially for images)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    keywords: [String], // keywords associated with the prompt
});
module.exports = mongoose.model('PromptSuggestion', promptSuggestionSchema);
