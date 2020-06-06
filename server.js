const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDB", {
//     useNewUrlParser: true,
//     useFindAndModify: false
// });
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workoutDB";

//Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
