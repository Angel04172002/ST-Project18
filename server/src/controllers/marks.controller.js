const pool = require("../db")

const marksQueries = require('../database/marks.queries')

addMarksByTeacher = async (request, response) => {
    try{
        const marks = request.body?.marks;

        if(!marks){
            return response.status(500).send(`Marks array not provided`);
        }

        if(!Array.isArray(marks)){
            return response.status(500).send(`Marks data of wrong type`);
        }

        if(marks.length < 1){
            return response.status(200).send("Data is empty. No grades added")
        }

  
        for(let mark of marks){
            await pool.query(
                'insert into students_student_marks_subjects (student_id, student_mark_id, student_subject_id, term_id) VALUES ($1, $2, $3, $4)',
                [mark.student_id, mark.student_mark_id, mark.student_subject_id, mark.term_id]
            )
        }

        return response.status(200).send("Marks added successfully!")
    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }

}


getMarksByTeacher = async (request, response) => {
    try{
        const teacherId = request.body?.teacherId;
        if (!teacherId) {
            return response.status(500).json({
                message: "teacher id should be provided in request body",
            });
        }

        let { rows } = await pool.query(marksQueries.getMarksByTeacherQuery, [teacherId])

        return response.status(200).json(rows)
    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }

}



getMarksByClassTeacher = async (request, response) => {
    try{
        const teacherId = request.body?.teacherId;
        if (!teacherId) {
            return response.status(500).json({
                message: "teacher id should be provided in request body",
            });
        }

        console.log(teacherId);
        console.log(marksQueries.getMarksByClassTeacherQuery)

        let { rows } = await pool.query(marksQueries.getMarksByClassTeacherQuery, [teacherId])

        rows = "kur"
        return response.status(200).json(rows)
    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }

}




module.exports = { 
    addMarksByTeacher,
    getMarksByTeacher,
    getMarksByClassTeacher
}