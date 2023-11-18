const pool = require("../db")


getChat = async (request, response) => {
    try{
        console.log("get chat called")
        return response.status(200)
    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }

}


module.exports = {getChat}