module.exports = app =>{
    const eventController = require('../controller/event.controller')
    var router = require('express').Router();

    //to create the new event
    router.post('/',eventController.createEvent)
    router.post('/updateEvent',eventController.updateEvent)
    router.post('/deleteEvent',eventController.deleteEvent)

    app.use('/api/admin', router);
}