const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const PromptSuggestion = require('./models/PromptSuggestion'); // Update the path as necessary

// Use the environment variable from .env file
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const results = [];

fs.createReadStream('prompts.csv') // Update with the correct path
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        const prompts = results.map(item => ({
            aiModel: 'ChatGPT', // Assuming all prompts are for ChatGPT
            prompt: item.prompt,
            preview: '', // No preview data in CSV
            createdBy: null, // Set this appropriately if you have user IDs
            keywords: [item.act] // Using 'act' as a keyword
        }));

        PromptSuggestion.insertMany(prompts)
            .then(() => {
                console.log('Prompts inserted successfully');
                mongoose.connection.close();
            })
            .catch(err => {
                console.error('Error inserting prompts', err);
                mongoose.connection.close();
            });
    });
