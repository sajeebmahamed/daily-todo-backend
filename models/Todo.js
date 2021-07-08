// external imports
const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        isCompleted: {
            type: Boolean,
            enum: [true, false],
            default: false
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "People"
        }
    }, {
        timestamps: true
    }
)
const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo