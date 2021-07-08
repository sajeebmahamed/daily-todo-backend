// external imports
const mongoose = require('mongoose')

const peopleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        todos: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Todo"
            }
        ]
    },
    {
        timestamps: true
    }
)
const People = mongoose.model("People", peopleSchema)
module.exports = People