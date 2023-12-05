const pool = require("../db")
const utils = require("../utils")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

createProfile = async (request, response) => {

    try {

       

        let creatorId = '890e0f59-1c4f-4552-8a83-b7d1e5e92770';

        const { firstName, lastName, email, password, confirmPassword, type, creator_id } = request.body;
        const salt = await bcrypt.genSalt(10);

        if (firstName == undefined) return response.status(500).send("firstName not provided!")
        if (lastName == undefined) return response.status(500).send("lastName not provided!")
        if (email == undefined) return response.status(500).send("email not provided!")
        if (password == undefined) return response.status(500).send("password not provided!")


        // if(password !== confirmPassword) {
        //     return response.status(500).send('Паролите не съвпадат!');
        // };

        const hashedPassword = await bcrypt.hash(password, salt);

    
        let { rows } = await pool.query("SELECT * FROM PROFILE WHERE email = $1", [email])

        if (rows.length > 0) {
            return response.status(500).send(`Потребител с имейл: ${email} вече съществува!`);
        }

        // ujas ;(
        const id = utils.generateRandomString(40)


        
        if(type == 'Parent' || type == 'Student') {
            creatorId = id;
        }


        await pool.query(
            'INSERT INTO PROFILE (id, creator_id, first_name, last_name, email, password, type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [id, creatorId, firstName, lastName, email, hashedPassword, type]
        )


        if (type == 'Student') {

            await pool.query(
                'INSERT INTO STUDENT (id, grade_id, grade_division_id, parent_id) VALUES ($1, $2, $3, $4)',
                [id, null, null, null]
            )

        } else if (type == 'Parent') {

            await pool.query(
                'INSERT INTO PARENT (id) VALUES ($1)',
                [id]
            )

        } else if (type == 'Teacher') {
            await pool.query(
                'INSERT INTO TEACHER (id) VALUES ($1)',
                [id]
            );
        } else if (type == 'Grade teacher') {
            await pool.query(
                'INSERT INTO GRADE_TEACHER (id) VALUES ($1)',
                [id]
            );
        }

    

        const token = jwt.sign(
            { user_id: id, email: email },
                process.env.TOKENKEY,
            {
                expiresIn: "2h",
            }
        );
        return response.status(201).json({
            id,
            creatorId,
            firstName,
            lastName,
            email,
            password,
            type,
            token,
        })

    }
    catch (err) {
        console.error(err.message)
        return response.status(500).send(err.message)
    }
}


auth = async (request, response) => {

    try {
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

        pool.query("SELECT * FROM PROFILE WHERE email = $1", [email], async (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length < 1) {
                return response.status(500).send(`Потребител с имейл: ${email} не е намерен!`)
            }
            const result = results.rows[0];
            const storedHashedPassword = result.password;
            const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);


            if (isPasswordValid) {

                const token = jwt.sign(
                    { user_id: result.id, email: result.email },
                        process.env.TOKENKEY,
                    {
                        expiresIn: "2h",
                    }
                );
                result["token"] = token
                return response.status(200).json(result);
            }
            else {
                return response.status(401).send("Грешна парола!");
            }
        });

    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getProfileById = async (request, response) => {
    try {
        const id = request.body?.id;
        if (!id) {
            return response.status(500).json({
                message: "profile id should be provided in request body",
            });
        }

        const { rows } = await pool.query("SELECT * FROM PROFILE WHERE id = $1", [id])
        if (rows.length < 1) {
            return response.status(500).send(`User with id: ${id} not found`);
        }

        return response.status(200).json(rows[0])

    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


module.exports = { createProfile, auth, getProfileById }


