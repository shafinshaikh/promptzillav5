// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed password
    // You can add more fields as needed
});
module.exports = mongoose.model('User', userSchema);
