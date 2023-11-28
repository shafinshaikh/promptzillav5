// server.js
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const mongoDBUri = process.env.MONGODB_URI;

mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
// Define routes here
app.listen(3000, () => console.log('Server running on port 3000'));

const userController = require('./controllers/userController');

app.post('/api/users/register', userController.register);
app.post('/api/users/login', userController.login);

const promptController = require('./controllers/promptController');

app.get('/api/prompts', promptController.getPrompts);
app.post('/api/prompts', promptController.submitPrompt);

const historyController = require('./controllers/historyController');

app.get('/api/history/:userId', historyController.getUserHistory);
app.post('/api/history', historyController.addHistory);


const sharedPromptController = require('./controllers/sharedPromptController');

app.get('/api/shared-prompts', sharedPromptController.getSharedPrompts);
app.post('/api/shared-prompts', sharedPromptController.sharePrompt);

//Error handling in middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
