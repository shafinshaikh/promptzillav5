const sharedPromptController = require('./controllers/sharedPromptController');

app.get('/api/shared-prompts', sharedPromptController.getSharedPrompts);
app.post('/api/shared-prompts', sharedPromptController.sharePrompt);
// controllers/sharedPromptController.js
const SharedPrompt = require('../models/SharedPrompt');
// Implement getSharedPrompts, sharePrompt, etc.

exports.getSharedPrompts = async (req, res) => {
    try {
        const sharedPrompts = await SharedPrompt.find().populate('prompt');
        res.status(200).json(sharedPrompts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sharePrompt = async (req, res) => {
    try {
        const newSharedPrompt = new SharedPrompt({
            prompt: req.body.promptId,
            sharedBy: req.body.userId,
            score: req.body.score
        });

        const savedSharedPrompt = await newSharedPrompt.save();
        res.status(201).json(savedSharedPrompt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
