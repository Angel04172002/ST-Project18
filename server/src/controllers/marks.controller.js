const pool = require("../db")

const marksQueries = require('../database/marks.queries')

addMarksByTeacher = async (request, response) => {

    try {

        for (let entry of request.body.marks) {


            const term1Marks = entry?.term1Marks;
            const term2Marks = entry?.term2Marks;
            const term1Final = Number(entry.term1Final);
            const term2Final = Number(entry.term2Final);
            const termFinal = Number(entry.termFinal);
            const studentId = entry.studentId;
            const subjectId = entry.subject;


            console.log(term1Marks);
            


            const marksFirstTermQueryRes = await pool.query(
                marksQueries.getCountOfStudentTermSubjectMarks,
                [studentId, subjectId, 'Първи срок']
            );

            const marksSecondTermQueryRes = await pool.query(
                marksQueries.getCountOfStudentTermSubjectMarks,
                [studentId, subjectId, 'Втори срок']
            );


            const countMarksFirstTerm = marksFirstTermQueryRes.rows[0].count;
            const countMarksSecondTerm = marksSecondTermQueryRes.rows[0].count;

            //No marks to add
            if (term1Marks.length == countMarksFirstTerm || term2Marks.length == countMarksSecondTerm) {
                return response.status(200).json("Nothing to add!")
            }



            //Removing marks for first or second term
            if (term1Marks.length < countMarksFirstTerm) {
                let removalCountFirstTerm = countMarksFirstTerm - term1Marks.length;
                await pool.query(marksQueries.deleteNStudentMarks, [studentId, removalCountFirstTerm]);

                return response.status(200).json("Successfully removed marks for first term!")
            }

            if (term2Marks.length < countMarksSecondTerm) {
                let removalCountSecondTerm = countMarksSecondTerm - term2Marks.length;
                await pool.query(marksQueries.deleteNStudentMarks, [studentId, removalCountSecondTerm]);

                return response.status(200).json("Successfully removed marks for second term!")
            }


            // if(!marks){
            //     return response.status(500).send(`Marks array not provided`);
            // }

            // if(!Array.isArray(marks)){
            //     return response.status(500).send(`Marks data of wrong type`);
            // }

            // if(marks.length < 1){
            //     return response.status(200).send("Data is empty. No grades added")
            // }

            let index = term1Marks.length;
            let counter = 1;

            //Adding marks for a student
console.log(term1Marks.length);

            for (let mark of term1Marks) {

                console.log(counter);

                if (counter >= term1Marks.length) {

                    await pool.query(
                        'insert into students_student_marks_subjects (student_id, student_subject_id, term_id, student_mark_id) VALUES ($1, $2, $3, $4)',
                        [studentId, subjectId, 'Първи срок', Number(mark)]
                    );
                };

                counter++;
            }

            counter = 0;

            for (let mark of term2Marks) {

                if (counter >= term2Marks.length) {

                    await pool.query(
                        'insert into students_student_marks_subjects (student_id, student_subject_id, term_id, student_mark_id) VALUES ($1, $2, $3, $4)',
                        [studentId, subjectId, 'Втори срок', Number(mark)]
                    );
                };

                counter++;
            }





            // await pool.query(
            //     'insert into students_student_marks_subjects (student_id, student_subject_id,  term_id, student_mark_id) VALUES ($1, $2, $3, $4)',
            //     [studentId, subjectId, 'Срочна 1', term1Final]
            // )

            // await pool.query(
            //     'insert into students_student_marks_subjects (student_id, student_subject_id, term_id, student_mark_id) VALUES ($1, $2, $3, $4)',
            //     [studentId, subjectId, 'Срочна 2', term2Final]
            // )

            // await pool.query(
            //     'insert into students_student_marks_subjects (student_id,  student_subject_id, term_id, student_mark_id) VALUES ($1, $2, $3, $4)',
            //     [studentId, subjectId, 'Годишна', termFinal]
            // )

        }


        return response.status(200).json("Marks added successfully!")
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }

}



getMarksByTeacher = async (request, response) => {
    try {
        const teacherId = request.body?.teacherId;
        if (!teacherId) {
            return response.status(500).json({
                message: "teacher id should be provided in request body",
            });
        }

        let { rows } = await pool.query(marksQueries.getMarksByTeacherQuery, [teacherId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }

}


getMarksByClassTeacher = async (request, response) => {
    try {
        const teacherId = request.body?.teacherId;
        if (!teacherId) {
            return response.status(500).json({
                message: "teacher id should be provided in request body",
            });
        }

        let { rows } = await pool.query(marksQueries.getMarksByClassTeacherQuery, [teacherId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }

}


getMarksByStudent = async (request, response) => {
    try {
        const studentId = request.body?.studentId;
        if (!studentId) {
            return response.status(500).json({
                message: "student id should be provided in request body",
            });
        }

        let { rows } = await pool.query(marksQueries.getMarksByStudentQuery, [studentId])

        console.log(rows);

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

getMarksByParent = async (request, response) => {
    try {
        const parentId = request.body?.parentId;
        if (!parentId) {
            return response.status(500).json({
                message: "parent id should be provided in request body",
            });
        }

        let { rows } = await pool.query(marksQueries.getMarksByParentQuery, [parentId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}





module.exports = {
    addMarksByTeacher,
    getMarksByTeacher,
    getMarksByClassTeacher,
    getMarksByStudent,
    getMarksByParent
}