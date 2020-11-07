const { Schema, model } = require('mongoose');

const contactSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        role: String,
        email: {
            type: String,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },
        phone: {
            type: String,
            //add in validation for phone number?
        },
        relationship: String,
        notes: String
    }
)

const Contact = model('Contact', contactSchema);

module.exports = Contact;