module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define("user",{
        fullName:{
            type: Sequelize.STRING
        },
        userName:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        wallet:{
            type: Sequelize.INTEGER,
            defaultValue: 5000
        }
    });
    return User
}