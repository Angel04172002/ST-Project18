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

            if (subject.type == 'Teacher') {

                await pool.query('insert into teacher values ($1) on conflict(id) do update set id = $1 where teacher.id = $1',
                    [subject.teacherId]
                );

                await pool.query(
                    'insert into teachers_grades_divisions_subjects (teacher_id, teacher_grade_id, teacher_grade_division_id,  teacher_subject_id) VALUES ($1, $2, $3, $4) ON CONFLICT (teacher_id) DO UPDATE SET teacher_id = $1, teacher_grade_id = $2, teacher_grade_division_id = $3, teacher_subject_id = $4 WHERE teachers_grades_divisions_subjects.teacher_id = $1',
                    [subject.teacherId, subject.grade, subject.gradeDivision, subject.teacher_subject_id]
                );
                
                await pool.query(
                    'delete  from grade_teachers_grades_divisions_subjects cascade where grade_teacher_id = $1',
                    [subject.teacherId]
                );


            } else if (subject.type == 'Grade teacher') {

                await pool.query('insert into grade_teacher values ($1) on conflict(id) do update set id = $1 where grade_teacher.id = $1',
                    [subject.teacherId]
                );

                await pool.query(
                    'insert into grade_teachers_grades_divisions_subjects (grade_teacher_id, grade_teacher_grade_id, grade_teacher_grade_division_id,  grade_teacher_subject_id) VALUES ($1, $2, $3, $4) ON CONFLICT (grade_teacher_id) DO UPDATE SET grade_teacher_id = $1, grade_teacher_grade_id = $2, grade_teacher_grade_division_id = $3, grade_teacher_subject_id = $4 WHERE grade_teachers_grades_divisions_subjects.grade_teacher_id  = $1',
                    [subject.teacherId, subject.grade, subject.gradeDivision, subject.teacher_subject_id]
                );


                await pool.query(
                    'delete  from teachers_grades_divisions_subjects cascade where teacher_id = $1',
                    [subject.teacherId]
                );
              

            }


        }

        return response.status(200).json("Added successfully!")
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
            return response.status(500).send("Not provided teachers");
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