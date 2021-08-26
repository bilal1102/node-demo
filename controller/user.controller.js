const db = require('../models')
const userModel = db.user;

//create and save new user
exports.create = (req, res) =>{

    if(req.body.userName){
        try{
            var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{6,}$/;
            let password = req.body.password
            let matched = password.match(pattern)
            console.log(matched)
            if(matched){
                
                userModel.create(req.body)
                res.send('user created successfully'+ matched);
            }else{
                res.send('password should contain 6 digit alphanumeric and one special char')
            }
            
            
        }catch(error){
            console.log('error',error)
            res.status(500).send({message: "Internal Server Error"})
        }
    }else{
        res.send('fill the required fields')
    }

}

//to login 
exports.login = async (req, res) =>{
    if(req.query.userName){
        try{
            const userName = req.query.userName;
            const password = req.query.password;
            let data =await userModel.findOne({ where: { "userName": `${userName}` , "password": `${password}` } })
            if(data){
                res.send(data);
            }else{
                res.send('user does not exist!')
            }
            
            
        }catch(error){
            console.log('error',error)
            res.status(500).send({message: "Internal Server Error" })
        }
    }
}