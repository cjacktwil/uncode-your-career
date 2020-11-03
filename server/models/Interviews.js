const { Schema } = require('mongoose');

const contactSchema = require('./Contact');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the Job's `interviews` array in Jobs.js
const interviewSchema = new Schema(
    {
        interviewType: String,
        interviewDate: Date,
        interviewer: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contact'
            }
        ],
        feedback: String  
        }
);

module.exports = interviewSchema;