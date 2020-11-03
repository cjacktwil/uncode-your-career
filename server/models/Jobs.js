const { Schema, model } = require('mongoose');

const jobSchema = new Schema(
    {
        job_id: {
          type: String,
          required: true,
          unique: true  
        },
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        location: String,
        type: String,
        description: String,
        created_at: Date,
        saved: {
            type: Boolean,
            default: false
    },
        interview: [interviewSchema],
        contacts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contact'
              }
        ],
        offer: Boolean,
        salary: Number,
        benefits: String,
        accepted: Boolean

}
);

const Job = model('Job', jobSchema);

module.exports = Job;