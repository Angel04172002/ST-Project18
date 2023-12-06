const pool = require("../db")
const utils = require("../utils");

const absencesQueries = require('../database/absences.queries');



getAbsencesByStudent = async (request, response) => {
    try {
        const studentId = request.body?.id;

        if (!studentId) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }

        let { rows } = await pool.query(absencesQueries.getAbsencesFromStudent, [studentId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getAbsencesByParent = async (request, response) => {
    try {
        const parentId = request.body?.id;

        if (!parentId) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }

        let { rows } = await pool.query(absencesQueries.getAbsencesFromParent, [parentId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getAbsencesByTeacher = async (request, response) => {
    try {
        const teacherId = request.body?.id;

        if (!teacherId) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }

        let { rows } = await pool.query(absencesQueries.getAbsencesFromTeacher, [teacherId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getAbsencesByGradeTeacher = async (request, response) => {
    try {
        const gradeTeacherId = request.body?.id;

        if (!gradeTeacherId) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }

        let { rows } = await pool.query(absencesQueries.getAbsencesFromGradeTeacher, [gradeTeacherId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getExcuseReasonsByParent = async (request, response) => {
    try {
        const parentId = request.body?.id;

        if (!parentId) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }

        let { rows } = await pool.query(absencesQueries.getExcuseReasonsFromParent, [parentId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getExcuseReasonsByTeacher = async (request, response) => {
    try {
        const teacherId = request.body?.id;

        if (!teacherId) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }

        let { rows } = await pool.query(absencesQueries.getExcuseReasonsFromTeacher, [teacherId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getExcuseReasonsByGradeTeacher = async (request, response) => {
    try {
        const gradeTeacherId = request.body?.id;

        if (!gradeTeacherId) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }

        let { rows } = await pool.query(absencesQueries.getExcuseReasonsFromGradeTeacher, [gradeTeacherId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

addExcuseReasonsByParent = async (request, response) => {
    try {
        const excuseReasons = request.body?.excuseReasons;

        if (!excuseReasons) {
            return response.status(500).send(`Excuse reasons array not provided`);
        }

        if (!Array.isArray(excuseReasons)) {
            return response.status(500).send(`Excuse reasons data of wrong type`);
        }

        if (excuseReasons.length < 1) {
            return response.status(200).send("Data is empty. No excuse reasons  added")
        }


        for (let excuseReason of excuseReasons) {
            await pool.query(
                'insert into absence_excuse_reason values ($1, $2, $3)',
                [excuseReason.reason, excuseReason.parentId, excuseReason.noteId]
            );

            await pool.query(
                'insert into absences_excuse_reasons values ($1, $2)'
                [excuseReason.absenceId, excuseReason.reason]
            );
        }

        return response.status(200).send("Excuse reasons added successfully!")
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

addAbsencesByTeacher = async (request, response) => {
    try {
        const absences = request.body?.absences;

        if (!absences) {
            return response.status(500).send(`Absences array not provided`);
        }

        if (!Array.isArray(absences)) {
            return response.status(500).send(`Absences data of wrong type`);
        }

        if (absences.length < 1) {
            return response.status(200).send("Data is empty. No absences added")
        }


        for (let absence of absences) {

            const id = utils.generateRandomString(40);

            await pool.query('insert into absence values ($1, $2, $3, $4, $5',
                [id, absence.type, absence.subjectId, absence.studentId, absence.termId]);

        


        }

        return response.status(200).send("Excuse reasons added successfully!")
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


module.exports = {
    getAbsencesByStudent,
    getAbsencesByParent,
    getAbsencesByTeacher,
    getAbsencesByGradeTeacher,
    getExcuseReasonsByParent,
    getExcuseReasonsByGradeTeacher,
    getExcuseReasonsByTeacher,
    addExcuseReasonsByParent,
    addAbsencesByTeacher
};














