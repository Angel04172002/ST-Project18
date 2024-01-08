const pool = require("../db")

const marksQueries = require('../database/marks.queries')
const utils = require('../utils.js');

addMarksByTeacher = async (request, response) => {

    try {


        for (let entry of request.body.marks) {

            let term1Marks = entry?.term1Marks;
            let term2Marks = entry?.term2Marks;
            const term1Final = entry?.term1Final;
            const term2Final = entry?.term2Final;
            const termFinal = entry?.termFinal;
            const studentId = entry.studentId;
            const subjectId = entry.subject;




            const marksFirstTermQueryRes = await pool.query(
                marksQueries.getCountOfStudentTermSubjectMarks,
                [studentId, subjectId, 'Първи срок']
            )




            const marksSecondTermQueryRes = await pool.query(
                marksQueries.getCountOfStudentTermSubjectMarks,
                [studentId, subjectId, 'Втори срок']
            );


            const marksFirstTermDbArr = marksFirstTermQueryRes.rows;
            const marksSecondTermDbArr = marksSecondTermQueryRes.rows;

            const rowsFirstTerm = Number(marksFirstTermQueryRes.rowCount);
            const rowsSecondTerm = Number(marksSecondTermQueryRes.rowCount);


            // console.log(term1Marks);
            // console.log(rowsFirstTerm);
            // console.log(term2Marks);
            // console.log(rowsSecondTerm);




      

              





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

            // Adding marks for a student
            for (let mark of term1Marks) {

                if (mark == '') continue;

                mark = mark.trim();

                // console.log(mark);
                // console.log('This is a mark');


                console.log(counter);
                console.log('counter');

                console.log('$$$$$$');

                console.log('array count');
                console.log(marksFirstTermDbArr);


                if (marksFirstTermDbArr == undefined || counter > marksFirstTermDbArr.length || marksFirstTermDbArr.length == 0) {

                    await pool.query(
                        'insert into students_student_marks_subjects (student_id, student_subject_id, term_id, student_mark_id) VALUES ($1, $2, $3, $4)',
                        [studentId, subjectId, 'Първи срок', Number(mark)]
                    );

                    console.log('Successfully inserted mark');

                };

                counter++;
            }
        


            counter = 1;

            console.log('***');

            console.log(term2Marks);



            for (let mark of term2Marks) {

                if (mark == '') continue;

                mark = mark.trim();

             

                if (marksSecondTermDbArr == undefined || counter > marksSecondTermDbArr.length || marksSecondTermDbArr.length == 0) {

                    await pool.query(
                        'insert into students_student_marks_subjects (student_id, student_subject_id, term_id, student_mark_id) VALUES ($1, $2, $3, $4)',
                        [studentId, subjectId, 'Втори срок', Number(mark)]
                    );

                    console.log('Successfully inserted mark');

                };

                counter++;
            }

            console.log(term1Final);
            console.log(term2Final);
            console.log(termFinal);





            if (term1Final !== undefined && term1Final !== 0 && term1Final !== '') {

                await pool.query(
                    'insert into students_student_marks_subjects (student_id, student_subject_id,  term_id, student_mark_id) VALUES ($1, $2, $3, $4)',
                    [studentId, subjectId, 'Срочна 1', Number(term1Final)]
                )

            }


            if (term2Final !== undefined && term2Final !== 0 && term2Final !== '') {

                await pool.query(
                    'insert into students_student_marks_subjects (student_id, student_subject_id, term_id, student_mark_id) VALUES ($1, $2, $3, $4)',
                    [studentId, subjectId, 'Срочна 2', Number(term2Final)]
                )

            }


            if (termFinal !== undefined && termFinal !== 0 && termFinal !== '' && termFinal) {

                await pool.query(
                    'insert into students_student_marks_subjects (student_id,  student_subject_id, term_id, student_mark_id) VALUES ($1, $2, $3, $4)',
                    [studentId, subjectId, 'Годишна', Number(termFinal)]
                )

            }

        
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
        const studentId = request.query?.studentId;
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