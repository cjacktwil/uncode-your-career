const { Schema } = require('mongoose');

// const interviewSchema = require('./Interviews');
const jobSchema = new Schema(
    {
        id: {
          type: String,
          required: true,

        },
        type: String,
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
        applied: {
            type: Boolean,
            default: false
        },
        application_date: Date,
        notes: String
        // interview: [interviewSchema],
        // contacts: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Contact'
        //       }
        // ],
        // offer: Boolean,
        // salary: Number,
        // benefits: String,
        // accepted: Boolean

}
);

module.exports = jobSchema;

        //   unique: true  