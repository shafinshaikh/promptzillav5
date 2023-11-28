// controllers/historyController.js
const UserHistory = require('../models/UserHistory');

exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const history = await UserHistory.find({ user: userId }).sort({ timestamp: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addHistory = async (req, res) => {
    try {
        const newHistory = new UserHistory({
            user: req.body.user,
            aiModel: req.body.aiModel,
            prompt: req.body.prompt,
            response: req.body.response
        });
        const savedHistory = await newHistory.save();
        res.status(201).json(savedHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
