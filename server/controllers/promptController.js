// controllers/promptController.js
const PromptSuggestion = require('../models/PromptSuggestion');

exports.getPrompts = async (req, res) => {
    try {
        const query = req.query.query; // Get the user's search query
        let filter = {};

        if (query) {
            // Search for prompts that contain the query in either the 'prompt' field or 'keywords' array
            filter = {
                $or: [
                    { prompt: { $regex: query, $options: 'i' } }, // case-insensitive search in 'prompt'
                    { keywords: { $regex: query, $options: 'i' } } // case-insensitive search in 'keywords'
                ]
            };
        }

        const prompts = await PromptSuggestion.find(filter);
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.submitPrompt = async (req, res) => {
    try {
        const newPrompt = new PromptSuggestion({
            aiModel: req.body.aiModel,
            prompt: req.body.prompt,
            preview: req.body.preview,
            createdBy: req.body.userId,
            keywords: req.body.keywords
        });

        const savedPrompt = await newPrompt.save();
        res.status(201).json(savedPrompt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
