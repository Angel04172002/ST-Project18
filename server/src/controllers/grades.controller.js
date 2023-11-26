const pool = require("../db")

const gradesQueries = require('../database/grades.queries')


const mockDataStudent = [
    {
        subjectName: "biologiq",
        subjectId: 1,
        marks: [1,2,3,4,5]
    },
    {
        subjectName: "matematika",
        subjectId: 2,
        marks: [2,2,2,2,2,2,2,2]
    },
]


const mockDataTeacher = [
    {
        studentId: 1,
        subjects: [
            {
                subjectName: "biologiq",
                subjectId: 1,
                marks: [1,2,3,4,5]
            },
            {
                subjectName: "matematika",
                subjectId: 2,
                marks: [2,2,2,2,2,2,2,2]
            },
        ]
    },
    {
        studentId: 2,
        subjects: [
            {
                subjectName: "biologiq",
                subjectId: 1,
                marks: [1,2,3,4,5]
            },
            {
                subjectName: "matematika",
                subjectId: 2,
                marks: [2,2,2,2,2,2,2,2]
            },
        ]
    }

]


getGradesByStudent = async (request, response) => {
    try{
        const id = request.body?.id;

        if (!id) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }

        return response.status(200).json(mockDataStudent)
    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getGradesByTeacher = async (request, response) => {
    try{
        const id = request.body?.id;

        if (!id) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }


        return response.status(200).json(mockDataTeacher)
    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }

}

getGradesByParent = async (request, response) => {
    try{
        const id = request.body?.id;

        if (!id) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }


        return response.status(200).json(mockDataTeacher)
    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }

}


addStudentsToGrade = async (request, response) => {
    try{


        const students = request.body?.students;
        if(!students){
            return response.status(500).send(`Students array not provided`);
        }

        if(!Array.isArray(students)){
            return response.status(500).send(`Students data of wrong type`);
        }

        if(students.length < 1){
            return response.status(200).send("Data is empty. No students added")
        }

        for(let student of students){
            await pool.query(
                'insert into student (student_id, grade_id, grade_division_id) VALUES ($1, $2, $3)',
                [student.student_id, student.grade_id, student.grade_division_id]
            )
        }

        return response.status(200).send("Added successfully!")
    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }

}


addSubjectsToGrade = async (request, response) => {
    try{
        const subjects = request.body?.subjects;
        
        if(!subjects){
            return response.status(500).send(`Subjects array not provided`);
        }

        if(!Array.isArray(subjects)){
            return response.status(500).send(`Subjects data of wrong type`);
        }

        if(subjects.length < 1){
            return response.status(200).send("Data is empty. No subjects added")
        }

        for(let subject of subjects){
            await pool.query(
                'insert into  grades_subjects (grade_id, subject_id) VALUES ($1, $2)',
                [subject.grade_id, subject.subject_name]
            )
        }

        return response.status(200).send("Added successfully!")
    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }

}


getStudentsWithGradeAndDivison = async (request, response) => {
    try{
        let { rows } = await pool.query(gradesQueries.getStudentsWithGradeAndDivisonQuery)

        return response.status(200).json(rows)
    }
    catch(err){
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getAllSubjects = async (request, response) => {
    try{
        let { rows } = await pool.query('select * from grades_subjects')

        return response.status(200).json(rows)
    }
    catch(err){
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
    getAllSubjects
}