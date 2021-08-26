module.exports = app =>{
    const userController = require("../controller/user.controller.js")
    const eventController = require("../controller/event.controller.js")
    var router = require("express").Router();

    //to create the new user
    router.post("/",userController.create);

    //to login
    router.get("/login",userController.login);

    //to check the event details
    router.get("/eventDetails",eventController.eventDetails)

    //to registrerUserInEvent
    router.post("/registerUserInEvent",eventController.registrerUserInEvent)


    app.use('/api/user', router);
}