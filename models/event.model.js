module.exports = (sequelize, Sequelize) =>{
    const Event = sequelize.define("event",{
        name:{
            type: Sequelize.STRING
        },
        startDate:{
            type: Sequelize.DATE
        },
        endDate:{
            type: Sequelize.DATE 
        },
        status:{
            type: Sequelize.BOOLEAN
        },
        price:{
            type: Sequelize.INTEGER
        }
    });
    return Event
}