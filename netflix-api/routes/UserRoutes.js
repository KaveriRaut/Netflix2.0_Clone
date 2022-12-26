//now creating Route  for calling 'addToLikedMovie' path or endpoint

//means we are writing app.get("...") or app.post("...") in main server.js file 
//to just make seperate folder to store those routes we are using the Router by express
//so now from this routes folder we can define different routes like app.get or .post etc
// and using Router can directly import into server.js and use their

const  { addToLikedMovies, getLikedMovies, removeFromLikedMovies } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/delete", removeFromLikedMovies);
module.exports = router;   