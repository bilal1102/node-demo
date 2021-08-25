const db = require('../models')
const eventModel = db.event;

//create and save new event 
exports.createEvent = (req, res)=>{
    if(req.body.name){
        try {
            eventModel.create(req.body)
            res.send('event created successfully');
        } catch (error) {
            console.log('error',error)
            res.status(500).send({message: "Internal Server Error!"})
        }
        
    }else{
        res.send('fill the required fields')
    }
}

//update event
exports.updateEvent = (req, res)=>{
    if(req.body){
        try {
            let info = {
                "name": req.body.name,
                "startDate": req.body.startDate,
                "endDate": req.body.endDate,
                "status": req.body.status,
                "price": req.body.price
            }
            eventModel.update(info,{where:{id: req.body.id}})
            res.send('event updated successfully');
        } catch (error) {
            console.log('error',error)
            res.status(500).send({message: "Internal Server Error!"})
        }
        
    }else{
        res.send('fill the required fields')
    }
}

//delete event
exports.deleteEvent = (req, res) =>{
    if(req.query.id){
        try {
            eventModel.destroy({where:{id:req.query.id}})
            res.send('event deleted successfully');
        } catch (error) {
            console.log('error',error)
            res.status(500).send({message: "Internal Server Error!"})
        }
    }else{
        res.send('enter valid id')
    }
}

//get EventDetails 
exports.eventDetails = (req, res)=>{
    if(req.query.id){
        try {
            eventModel.create(req.body)
            res.send('event created successfully');
        } catch (error) {
            console.log('error',error)
            res.status(500).send({message: "Internal Server Error!"})
        }
        
    }else{
        res.send('fill the required fields')
    }
}