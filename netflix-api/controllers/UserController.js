//UserModel me ka userSchema pe processing karne ka logic iss controller me==> to like the movie

const User = require("../models/UserModel");


//controller function used for adding liked Movies to database
module.exports.addToLikedMovies = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, data } = req.body;
        const user = await User.findOne({ email }); //find any user exists with given email
        if (user) //if any user is found
        {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id));
            if (!movieAlreadyLiked) //if movie is not already liked then add it to likedMovies array
            {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data],
                    },
                    { new: true }
                );
            } else return res.json({ msg: "Movie already added to the liked list" }); //else if movie is already in likedMovies array 
        } else { //else if User not found with likedMovies array then create new array and new user with email and data
            return await User.create({ email, likedMovies: [data] });
        }
        return res.json({ msg: "Movie added successfully" });

    } catch (error) {
        return res.json({ msg: "Error adding movies" });
    }
};


//controller function used to get/fetch the liked Movies from database
module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (user) {//if user exists and found
            res.json({ msg: "success", movies: user.likedMovies });
        } else {// else if user not in db
            return res.json({ msg: "User with given email not found in db." });
        }
    } catch (err) {
        return res.json({ msg: "Error in fetching movies from db" });
    }
}

//controller function used to delete the liked Movies from database
module.exports.removeFromLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email }); //find any user exists with given email
        if (user) {//if any user is found
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => (id === movieId));
            //if no such movie exist in db to deletion
            if (!movieIndex) res.status(400).send({ msg: "Movie Not found" });
            
            //else if movie found in db==>delete it and update the array of db again
            likedMovies.splice(movieIndex, 1); //removing element from array with specified index

            await User.findByIdAndUpdate(
                user._id,
                {
                    likedMovies,
                },
                { new: true }
            );
            return res.json({ msg: "Movie deleted", movies: likedMovies });
        }
    } catch (err) {
        console.log(err);
        // return res.json({ msg: "Error in deleting movies from db" });
    }
}