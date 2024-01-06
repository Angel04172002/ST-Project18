const pool = require("../db")
const utils = require("../utils");



addEvent = async (request, response) => {  
    try {
    
        const {
            name, 
            description,
            date,
            place, 
            teacher_creator_id, // can be null 
            grade_teacher_creator_id, // can be null
            admin_creator_id,  // can be null
            isPrivate
        } = request.body;
        
        const id = utils.generateRandomString(40)
        
        if (name == undefined) return response.status(500).send("name not provided!")
        if (description == undefined) return response.status(500).send("description not provided!")
        if (date == undefined) return response.status(500).send("date not provided!")
        if (place == undefined) return response.status(500).send("place == not provided!")
        if (isPrivate == undefined) return response.status(500).send("isPrivate not provided!")


         await pool.query('INSERT INTO event VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
            id, 
            name, 
            description, 
            date,
            place,
            teacher_creator_id,
            grade_teacher_creator_id,
            admin_creator_id, 
            isPrivate
        ])
         
        return response.status(200).json('Event added successfully!')
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getAllEvents = async (request, response) => {
    try {

        let { rows } = await pool.query('SELECT * FROM event')

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getEventsByStudent = async (request, response) => {
    try {

        const studentId = request.query?.studentId;
        let { rows } = await pool.query(`
            select e.*, s.grade_id, s.grade_division_id from event e
            join teachers_grades_divisions_subjects tgds
            on e.teacher_creator_id = tgds.teacher_id
            join student s
            on tgds.teacher_grade_id = s.grade_id and tgds.teacher_grade_division_id = s.grade_division_id
            where s.id = $1
        `, [studentId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getEventsByParent = async (request, response) => {
    try {

        const parentId = request.query?.parentId;
        let { rows } = await pool.query(`
            select e.*, s.grade_id, s.grade_division_id from event e
            join teachers_grades_divisions_subjects tgds
            on e.teacher_creator_id = tgds.teacher_id
            join student s
            on tgds.teacher_grade_id = s.grade_id and tgds.teacher_grade_division_id = s.grade_division_id
            where s.parent_id = $1
        `, [parentId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


module.exports = { 
    addEvent,
    getAllEvents,
    getEventsByStudent,
    getEventsByParent
}
