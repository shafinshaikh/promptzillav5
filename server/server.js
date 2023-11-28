// server.js
//CORS middleware
const cors = require('cors');
app.use(cors());

//Mongodb server setup
const mongoose = require('mongoose');
const mongoDBUri = import.meta.env.MONGODB_URI;

mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//Express server setup
const express = require('express');
const app = express();
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
