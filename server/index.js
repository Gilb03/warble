require("dotenv").config();
const express = require("express"),
      bodyParser = require("body-parser"),
      cors = require("cors"),
      authRoutes = require("./routes/auth"),
      messagesRoutes = require("./routes/messages"),
    { loginRequired , ensureCorrectUser } = require("./middleware/auth");
      PORT = 8081,
errorHandler = require("./handlers/error"),
      app = express();









app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages",
 loginRequired, 
 ensureCorrectUser,
  messagesRoutes);

app.get("/api/messages", loginRequired, async function(req,res,next){
    try{
        let messages = await db.Message.find().sort({createdAt: "desc" })
        .populate("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);
    } catch(err){
        return next(err);

    }
})

// Route epicenter 

app.use(function(req, res, next){
    let err = new Error("Not found!")
    err.status = 404;
    next(err);
});
app.use(errorHandler);


app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
});