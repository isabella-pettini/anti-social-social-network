const { Schema, model } = require('mongoose')

// thoughtSchema
const thoughtSchema = new Schema (
    {
        // thoughtText - string, required, 1-280 chars

        // createdAt - date, set default val to current timestamp, use getter method to format timestamp on query

        // username (user that created this thought) - string, required

        // reactions (like replies) - array of nested docs created with the reactionSchema
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
// reactionCount (virtual) - retrieves the length of thought's reactions array field on query.

// create Thought model using thoughtSchema
const Thought = model('Thought', thoughtSchema);
// export Thought model
module.exports = Thought;