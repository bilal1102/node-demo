const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

db.sequelize.sync().then(() => {
    console.log("re-sync db.");
  });

// //route
// app.get("/", (req, res)=>{
//     res.json({message: "Welcom to Ailoitte"});
// });


require("./routes/user.routes.js")(app);
require("./routes/admin.routes.js")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})