const pool = require("../db")
const utils = require("../utils");

const remarkQueries = require('../database/remarks.queries')


addRemark = async (request, response) => {
    try {

        const { note, teacher_creator_id, grade_teacher_creator_id, note_student_id, note_subject_id, note_term_id } = request.body;

        const id = utils.generateRandomString(40)

        if (note == undefined) return response.status(500).send("Note not provided!")
        if (note_student_id == undefined) return response.status(500).send("note_student_id not provided!")
        if (note_subject_id == undefined) return response.status(500).send("note_subject_id not provided!")
        if (note_term_id == undefined) return response.status(500).send("note_term_id not provided!")


        await pool.query(remarkQueries.addRemarkQuery, [
            id,
            note,
            teacher_creator_id,
            grade_teacher_creator_id,
            note_subject_id,
            note_term_id
        ])


        await pool.query('insert into students_notes values ($1, $2)', [note_student_id, id]);

        return response.status(200).json('Remark added successfully!')
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

updateRemark = async (request, response) => {
    try {
        const { id, note, teacher_creator_id, grade_teacher_creator_id, note_student_id, note_subject_id, note_term_id } = request.body;

        if (note == undefined) return response.status(500).send("Note not provided!")
        if (note_student_id == undefined) return response.status(500).send("note_student_id not provided!")
        if (note_subject_id == undefined) return response.status(500).send("note_subject_id not provided!")
        if (note_term_id == undefined) return response.status(500).send("note_term_id not provided!")

        await pool.query(`update note set note = $2, teacher_creator_id = $3, 
        grade_teacher_creator_id = $4, note_subject_id = $5, note_term_id = $6 where id = $1`,
        [id, note, teacher_creator_id, grade_teacher_creator_id, note_subject_id, note_term_id]);


        return response.status(200).json('Remark updated successfully!')
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}



getRemarksByStudent = async (request, response) => {
    try {

        const studentId = request.query?.studentId;
        let { rows } = await pool.query(remarkQueries.getRemarkByStudentQuery, [studentId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getRemarksByParent = async (request, response) => {
    try {

        const parentId = request.query?.parentId;
        let { rows } = await pool.query(remarkQueries.getRemarkByParentQuery, [parentId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}



getRemarksByTeacher = async (request, response) => {
    try {

        const teacherId = request.query?.teacherId;
        let { rows } = await pool.query(remarkQueries.getRemarkByTeacherQuery, [teacherId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}



getRemarksByClassTeacher = async (request, response) => {
    try {

        const teacherId = request.query?.teacherId;
        let { rows } = await pool.query(remarkQueries.getRemarkByClassTeacherQuery, [teacherId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}






module.exports = {
    addRemark,
    updateRemark,
    getRemarksByStudent,
    getRemarksByParent,
    getRemarksByTeacher,
    getRemarksByClassTeacher
}
