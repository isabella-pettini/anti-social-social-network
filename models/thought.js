const { Schema, model } = require('mongoose')
const dayjs = require('dayjs')
const reactionSchema = require('./reaction')

// thoughtSchema
const thoughtSchema = new Schema (
    {
        // thoughtText - string, required, 1-280 chars
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        // createdAt - date, set default val to current timestamp, use getter method to format timestamp on query (line 43)
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // username (user that created this thought) - string, required
        username: {
            type: String,
            required: true,
        },
        // reactions (like replies) - array of nested docs created with the reactionSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
// reactionCount (virtual) - retrieves the length of thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })

// getter method to change format of timestamp 
thoughtSchema.path('createdAt')
    .get(function(v) {
        return dayjs(v).format('MM/DD/YYYY')
    })    

// create Thought model using thoughtSchema
const Thought = model('Thought', thoughtSchema);
// export Thought model
module.exports = Thought;