const { Schema, model } = require('mongoose');

const jobSchema = new Schema(
    {
        id: {
          type: String,
          required: true,

        },
        type: {
            type: String
        },
        url: {
            type: String,
            required: true
        },
        created_at: Date,
        company: {
            type: String,
            required: true
        },
        company_url: String,
        company_logo: String,
        location: String,
        title: {
            type: String,
            required: true
        },
        how_to_apply: String,
        description: String,
        user_id: String,
        applied: {
            type: Boolean,
            default: false
        },
        application_date: String,
        notes: String
}
);

const Jobs = model('Jobs', jobSchema);

module.exports = Jobs;