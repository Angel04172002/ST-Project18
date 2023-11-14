const pool = require("../db")


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

module.exports = { getGradesByStudent, getGradesByTeacher, getGradesByParent}