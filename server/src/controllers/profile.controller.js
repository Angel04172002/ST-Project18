const pool = require("../db")
const utils = require("../utils")

createProfile = async (request, response) => {
    try{
        const { creatorId, firstName, lastName, email,password } = request.body;

        if(firstName == undefined)return response.status(500).send("firstName not provided!")
        if(lastName == undefined)return response.status(500).send("lastName not provided!")
        if(email == undefined)return response.status(500).send("email not provided!")
        if(password == undefined)return response.status(500).send("password not provided!")


        const { rows } = await pool.query("SELECT * FROM PROFILE WHERE email = $1", [email])
        if(rows.length > 0){
            return response.status(500).send(`User with email: ${email} already exists!`);
        }
    

        // ujas ;(
        const id = utils.generateRandomString(40)

        await pool.query(
            'INSERT INTO PROFILE (id, creator_id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id, creatorId, firstName, lastName, email, password]
        )

         return response.status(201).send(`User added with ID: ${id}`);
    }
    catch(err){
        console.error(err.message)
        return response.status(500).send(err.message)
    }
}


auth = async (request, response) => {
    try{
        const email = request.body?.email;
        const password = request.body?.password;
        if (!email) {
            return response.status(500).json({
                message: "email should be provided in request body",
            });
        }
        if (!password) {
            return response.status(500).json({
                message: "password should be provided in request body",
            });
        }

        pool.query("SELECT * FROM PROFILE WHERE email = $1", [email], (error, results) => {
            if (error) {
                throw error;
            }
            if(results.rows.length < 1){
                return   response.status(500).send(`User with email: ${email} not found!`)
            }
            const result = results.rows[0];
            if(result.password == password){
                return response.status(200).json(result);
            }
            else{
                return response.status(401).send("Wrong password!");
            }
        });

    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getProfileById = async (request, response) => {
    try{
        const id = request.body?.id;
        if (!id) {
            return response.status(500).json({
                message: "profile id should be provided in request body",
            });
        }

        const { rows } = await pool.query("SELECT * FROM PROFILE WHERE id = $1", [id])
        if(rows.length < 1){
            return response.status(500).send(`User with id: ${id} not found`);
        }
      
        return response.status(200).json(rows[0])

    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


module.exports = {createProfile, auth, getProfileById}