//mongoose database model ==> user schema that we want to store in DB
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max:50,
    },
    description: String, //******* */
    likedMovies: Array,
});

module.exports = mongoose.model("users", userSchema);