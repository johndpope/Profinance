const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const userSchema = new Schema({
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    accessToken: { 
        type: String, 
    }
}, {versionKey: false});

module.exports = model('User', userSchema);