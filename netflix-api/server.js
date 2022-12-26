const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
const app = express();

//CORS stands for Cross-Origin Resource Sharing .It allows us to relax the security applied to an API.
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/netflixFinal",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("netflixFinal DB connected");
});

app.use("/api/user", userRouter);

app.listen(5000,console.log("Server started on port:5000"));