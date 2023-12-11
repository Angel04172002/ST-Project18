const pool = require("../db")

const remarkQueries = require('../database/remarks.queries')


addRemark = async (request, response) => {
    try {
    
        const {note, teacher_creator_id, grade_teacher_creator_id, note_student_id, note_subject_id, note_term_id } = request.body;
        
        const id = utils.generateRandomString(40)
        
        if (note == undefined) return response.status(500).send("Note not provided!")
        if (teacher_creator_id == undefined) return response.status(500).send("teacher_creator_id not provided!")
        if (note_student_id == undefined) return response.status(500).send("note_student_id not provided!")
        if (note_subject_id == undefined) return response.status(500).send("note_subject_id not provided!")
        if (note_term_id == undefined) return response.status(500).send("note_term_id not provided!")


         await pool.query(remarkQueries.addRemarkQuery, [
            id, 
            note, 
            teacher_creator_id, 
            grade_teacher_creator_id,
            note_student_id,
            note_subject_id,
            note_term_id
        ])
         
        return response.status(200).send('Remark added successfully!')
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


module.exports = { addRemark }
