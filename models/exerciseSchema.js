const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: "Enter the type of exercise"
            },
            name: {
                type: String,
                required: "Enter the exercise name"
            },
            distance: {
                type: Number,
            },
            weight: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            duration: {
                type: Number,
                required: "Enter the duration of your exercise"
            }
        }

    ]

});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
