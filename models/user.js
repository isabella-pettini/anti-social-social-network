const { Schema, model } = require('mongoose');

// userSchema
const userSchema = new Schema(
    {
        // username - string, unique, required, trimmed
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        // email - string, required, unique, match a valid email
        email: {
            type: String,
            unique: true,
            required: true,
            match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address.' ]
        },
        // thoughts - array of _id values ref Thought model
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
        // friends - array of _id values ref User model (self ref)
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// friendCount (virtual) - retrieves the length of user's friends array field on query. 
userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`;
    })

// User model using userSchema
const User = model('User', userSchema);
// export User model
module.exports = User;