const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

// reactionSchema
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// getter method to change format of timestamp 
reactionSchema.path('createdAt')
    .get(function(v) {
        return dayjs(v).format('MM/DD/YYYY')
    })
    
module.exports = reactionSchema;