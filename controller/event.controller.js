const db = require('../models')
const Sequelize = require('sequelize');
const eventModel = db.event;
const userModel = db.user;

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
exports.eventDetails = async (req, res)=>{
    if(req.query.id){       //take event id
        try {
           let eventDetails = await eventModel.findOne({where:{id:req.query.id}})
           if(eventDetails){
            res.send(eventDetails);
           }else{
            res.send('event does not exist!'); 
           }
            
        } catch (error) {
            console.log('error',error)
            res.status(500).send({message: "Internal Server Error!"})
        }
        
    }else{
        res.send('invalid event Id')
    }
}

//reginter User to an event
exports.registrerUserInEvent = async (req,res)=>{
    if (req.body.eventId && req.body.userId && req.body.userName) {     //take eventId, userId and userName
        //to get the event price
        let eventPrice;
        try {
            eventPrice = await eventModel.findOne({attributes:['price'], 
                where:{id:req.body.eventId}})
                console.log('eventPrice',eventPrice.dataValues.price)
        } catch (error) {
            console.log('error',error)
            res.status(500).send({message: "Internal Server Error!"})
        }


        //deducting the event price
        try {
            let wallet = await userModel.findOne({attributes:['wallet'], 
                where:{id:req.body.userId}})
                console.log('wallet',wallet.dataValues.wallet)
                let currentAmount = (wallet.dataValues.wallet) - (eventPrice.dataValues.price)
                console.log('currentAmount', currentAmount)
                if(currentAmount>=0){
                    await userModel.update({'wallet': currentAmount},
                    {'where': {'id': req.body.userId}})

                    //to register in event
                    try {
                        await eventModel.update({'registeredUsers': Sequelize.fn('array_append', Sequelize.col('registeredUsers'), req.body.userName)},
                        {'where': {'id': req.body.eventId}})
                        res.send('registered successfully');
                    } catch (error) {
                        console.log('error',error)
                        res.status(500).send({message: "Internal Server Error!"})
                    }

                }else{
                    res.send('insufficient Balance!')
                }

           
        } catch (error) {
            console.log('error',error)
            res.status(500).send({message: "Internal Server Error!"})
        }
        
    }else{
        res.send('fill the required fields')
    }
}