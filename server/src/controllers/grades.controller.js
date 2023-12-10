const pool = require("../db")

const gradesQueries = require('../database/grades.queries')
const studentQueries = require('../database/student.queries');


const mockDataStudent = [
    {
        subjectName: "biologiq",
        subjectId: 1,
        marks: [1, 2, 3, 4, 5]
    },
    {
        subjectName: "matematika",
        subjectId: 2,
        marks: [2, 2, 2, 2, 2, 2, 2, 2]
    },
]


const mockDataTeacher = [
    {
        studentId: 1,
        subjects: [
            {
                subjectName: "biologiq",
                subjectId: 1,
                marks: [1, 2, 3, 4, 5]
            },
            {
                subjectName: "matematika",
                subjectId: 2,
                marks: [2, 2, 2, 2, 2, 2, 2, 2]
            },
        ]
    },
    {
        studentId: 2,
        subjects: [
            {
                subjectName: "biologiq",
                subjectId: 1,
                marks: [1, 2, 3, 4, 5]
            },
            {
                subjectName: "matematika",
                subjectId: 2,
                marks: [2, 2, 2, 2, 2, 2, 2, 2]
            },
        ]
    }

]


getGradesByStudent = async (request, response) => {
    try {
        const id = request.body?.id;

        if (!id) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }

        return response.status(200).json(mockDataStudent)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getGradesByTeacher = async (request, response) => {
    try {
        const id = request.body?.id;

        if (!id) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }


        return response.status(200).json(mockDataTeacher)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }

}

getGradesByParent = async (request, response) => {
    try {
        const id = request.body?.id;

        if (!id) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }


        return response.status(200).json(mockDataTeacher)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }

}




addStudentsToGrade = async (request, response) => {
    try {


        const students = request.body?.students;

        console.log(students);

        if (!students) {
            return response.status(500).send(`Students array not provided`);
        }

        if (!Array.isArray(students)) {
            return response.status(500).send(`Students data of wrong type`);
        }

        if (students.length < 1) {
            return response.status(200).send("Data is empty. No students added")
        }

        for (let student of students) {

            let { rows } = await pool.query(studentQueries.getParentById, [student?.parent_id]);
            let parent = rows[0];

       
            await pool.query(
                'INSERT INTO STUDENT (id, grade_id, grade_division_id, parent_id) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET id = $1, grade_id = $2, grade_division_id = $3, parent_id = $4 WHERE student.id = $1',
                [student?.studentId, Number(student?.grade), student?.gradeDivision, student?.parent_id]
            )

            await pool.query(
                'UPDATE PROFILE SET first_name = $1, last_name = $2, email = $3 WHERE id = $4',
                [student.parent_first_name, student.parent_last_name, student.parent_email, parent.id]
            );

        }

        return response.status(200).json("Added successfully!")
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }

}


addSubjectsToGrade = async (request, response) => {
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

            console.log(subject);

            await pool.query(
                'insert into subject values ($1, $2) ON CONFLICT (subject_name) DO UPDATE SET subject_name = $1 WHERE subject.subject_name = $1',
                [subject.subjectId, '890e0f59-1c4f-4552-8a83-b7d1e5e92770']
            )

            await pool.query(
                'insert into  grades_subjects (grade_id, subject_id) VALUES ($1, $2) ON CONFLICT (grade_id, subject_id) DO UPDATE SET grade_id = $1, subject_id = $2 WHERE grades_subjects.grade_id = $1 and grades_subjects.subject_id = $2',
                [subject.gradeId, subject.subjectId]
            )
        }

        return response.json("Added successfully!")
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }

}


getStudentsWithGradeAndDivison = async (request, response) => {
    try {

        let { rows } = await pool.query(gradesQueries.getStudentsWithGradeAndDivisonAndParentQuery)

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getAllSubjects = async (request, response) => {

    try {
        let { rows } = await pool.query('select * from grades_subjects order by grade_id, subject_id')

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getGradesDivisionsAndSubjectsForTeacher = async (request, response) => {
    try {

        const teacherId = request.body?.teacherId;
        let { rows } = await pool.query(gradesQueries.getTeachersWithGradesDivisionsSubjectsQuery, [teacherId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}




getGradesDivisionsAndSubjectsForGradeTeacher = async (request, response) => {
    try {
        const gradeTeacherId = request.body?.gradeTeacherId;
        let { rows } = await pool.query(gradesQueries.getGradeTeachersWithGradesDivisionsSubjectsQuery, [gradeTeacherId]);

        return response.status(200).json(rows);
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getGradesDivisionsAndSubjectsForStudent = async (request, response) => {
    try {
        const studentId = request.body?.studentid;
        let { rows } = await pool.query(gradesQueries.getStudentsWithGradesDivisionsSubjectsQuery, [studentId]);

        return response.status(200).json(rows);
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getGradesDivisionsAndSubjectsForParent = async (request, response) => {
    try {
        const parentId = request.body?.parentId;
        let { rows } = await pool.query(gradesQueries.getParentsWithGradesDivisionsSubjectsQuery, [parentId]);

        return response.status(200).json(rows);
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getStudentsByGradeAndDivision = async (request, response) => {
    try {
        const gradeId = request.body?.gradeId;
        const gradeDivisionId = request.body?.gradeDivisionId;

        let { rows } = await pool.query(gradesQueries.getStudentsByGradeAndDivision, [gradeId, gradeDivisionId]);

        return response.status(200).json(rows);
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}



module.exports = {
    getGradesByStudent,
    getGradesByTeacher,
    getGradesByParent,
    addStudentsToGrade,
    addSubjectsToGrade,
    getStudentsWithGradeAndDivison,
    getAllSubjects,
    getGradesDivisionsAndSubjectsForTeacher,
    getGradesDivisionsAndSubjectsForGradeTeacher,
    getGradesDivisionsAndSubjectsForStudent,
    getGradesDivisionsAndSubjectsForParent,
    getStudentsByGradeAndDivision
}