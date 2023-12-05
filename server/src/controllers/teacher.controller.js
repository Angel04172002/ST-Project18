const pool = require("../db")

const teacherQueries = require('../database/teacher.queries')


addSubjectsAndGradesToTeacher = async (request, response) => {
    try {
        const subjects = request.body?.subjects;

        if (!subjects) {
            return response.status(500).send(`Subjects array not provided`);
        }

        if (!Array.isArray(subjects)) {
            return response.status(500).send(`Subjects data of wrong type`);
        }

        if (subjects.length < 1) {
            return response.status(200).send("Data is empty. No subjects added")
        }

        for (let subject of subjects) {
            await pool.query(
                'insert into teachers_grades_divisions_subjects (teacher_id, teacher_grade_id, teacher_grade_division_id,  teacher_subject_id) VALUES ($1, $2, $3, $4)',
                [subject.teacher_id, subject.grade_id, subject.grade_division_id, subject.subject_name]
            )
        }

        return response.status(200).send("Added successfully!")
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }

}


getSubjectsAndGradesForTeacher = async (request, response) => {
    try {

        let { rows } = await pool.query(teacherQueries.getTeachersAndGradesQuery);

        if (rows.length == 0) {
            return response.json({ message: "Not provided teachers" });
        }

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

module.exports = {
    addSubjectsAndGradesToTeacher,
    getSubjectsAndGradesForTeacher
}