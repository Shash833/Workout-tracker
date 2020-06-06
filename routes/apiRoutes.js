const db = require("../models");

module.exports = function (app) {

    //To GET workout range
    app.get("/api/workouts/range", async function (req, res) {
        try {
            //Retrieve workouts from DB
            const dbExercise = await db.Exercise.find({})
            res.json(dbExercise);
        }
        catch (err) { res.status(400).json(err); }
    });

    //To GET workouts
    app.get("/api/workouts", async function (req, res) {
        try {
            //retrieve workouts from DB
            const dbExercise = await db.Exercise.find({})
            res.json(dbExercise);
        }
        catch (err) { res.status(400).json(err); }
    })
    //To post new workout/document
    app.post("/api/workouts", async function (req, res) {
        try {
            const workout = req.body
            const exercise = await db.Exercise.create(workout)
            res.json(exercise);
        }
        catch (err) { res.status(400).json(err); }
    });

    //To add exercise to existing workout/document
    app.put("/api/workouts/:id", async function (req, res) {
        //Workout ID
        const id = req.params.id
        //Workout entry retrieved from front end
        const { type, name, distance, weight, sets, reps, duration } = req.body
        try {
            //If workout type is "resistance" then add relevent data to DB
            if (type == "resistance") {
                //Update document with current workout ID
                const exercise = await db.Exercise.updateOne({ _id: id }, {
                    $push: {
                        exercises:
                            [{
                                type: type,
                                name: name,
                                weight: weight,
                                sets: sets,
                                reps: reps,
                                duration: duration
                            }]
                    }
                })
                res.json(exercise);
            }
            else {
                //If workout type is "cardio" then add relevent data to DB
                //Update document with current workout ID
                const exercise = await db.Exercise.updateOne({ _id: id }, {
                    $push: {
                        exercises:
                            [{
                                type: type,
                                name: name,
                                distance: distance,
                                duration: duration
                            }]
                    }
                })
                res.json(exercise)
            }
        }
        catch (err) {
            res.status(400).json(err)
        }
    });
};
