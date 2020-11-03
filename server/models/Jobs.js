const { Schema, model } = require('mongoose');

const interviewSchema = require('./Interviews');
const jobSchema = new Schema(
    {
        job_id: {
          type: String,
          required: true,
          unique: true  
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
        location: String,
        title: {
            type: String,
            required: true
        },
        description: String,
    //     saved: {
    //         type: Boolean,
    //         default: false
    // },
    //     applied: {
    //         type: Boolean,
    //         default: false
    //     },
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

const Job = model('Job', jobSchema);

module.exports = Job;