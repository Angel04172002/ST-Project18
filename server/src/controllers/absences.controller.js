const pool = require("../db")
const utils = require("../utils");

const absencesQueries = require('../database/absences.queries');

const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});




getAbsencesByStudent = async (request, response) => {
    try {
        const studentId = request.query?.id;

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
        const parentId = request.query?.id;

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
        const teacherId = request.query?.id;

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
        const gradeTeacherId = request.query?.id;

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
        const parentId = request.query?.id;

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

getExcuseReasonsByStudent = async (request, response) => {
    try {
        const studentId = request.query?.id;

        if (!studentId) {
            return response.status(500).json({
                message: "id should be provided in request body",
            });
        }

        let { rows } = await pool.query(absencesQueries.getExcuseReasonsFromStudent, [studentId])

        return response.status(200).json(rows)
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getExcuseReasonsByTeacher = async (request, response) => {
    try {
        const teacherId = request.query?.id;

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
        const gradeTeacherId = request.query?.id;

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

const addExcuseReasonsByParent = async (request, response) => {
    try {
        let excuseReasons;
        try {
            excuseReasons = JSON.parse(request.body.excuseReasons);
        } catch (parseError) {
            return response.status(400).send('Invalid JSON format for excuse reasons.');
        }

        if (!excuseReasons) {
            return response.status(500).send(`Excuse reasons array not provided`);
        }

        if (!Array.isArray(excuseReasons)) {
            return response.status(500).send(`Excuse reasons data of wrong type`);
        }

        if (excuseReasons.length < 1) {
            return response.status(200).send("Data is empty. No excuse reasons added");
        }

        for (let excuseReason of excuseReasons) {
            let imageUrl = null;

            // Handle file upload and get the image URL
            if (request.file) {
                const uploadResult = await cloudinary.uploader.upload(request.file.path);
                imageUrl = uploadResult.url; // URL from Cloudinary upload
            }

            // Include the imageUrl in your database query
            await pool.query(
                'insert into absence_excuse_reason (creator_id, id, image_url, reason_id) values ($1, $2, $3, $4)',
                [excuseReason.parentId, excuseReason.absenceId, imageUrl, excuseReason.reason]
            );

            //save the absenceId
        }

        return response.status(200).json("Excuse reasons added successfully!");
    }
    catch (err) {
        console.error(err.message);
        response.status(500).send(err.message);
    }
};

addAbsencesByTeacher = async (request, response) => {
    try {
        const absences = request.body?.absences;
        const creator = request.body?.creator;

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

            await pool.query('insert into absence values ($1, $2, $3, $4, $5, $6, $7)',
                [id, absence.type, absence.subjectId, absence.studentId, absence.termId,
                    creator.teacherId, creator.gradeTeacherId]);
        }

        return response.status(200).json("Absences added successfully!")
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}

updateAbsencesByTeacher  = async (request, response) => {
    try {
        const id = request.body?.id;
        const absences = request.body?.absences;
        const creator = request.body?.creator;

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

            await pool.query(`update absence set absence_type_id = $2, absence_subject_id = $3, 
            absence_student_id = $4, absence_term_id = $5, teacher_creator_id = $6, 
            grade_teacher_creator_id = $7 where id = $1`,
                [id, absence.type, absence.subjectId, absence.studentId, absence.termId,
                    creator.teacherId, creator.gradeTeacherId]);
        }

        return response.status(200).json("Absence updated successfully!")
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
    getExcuseReasonsByStudent,
    getExcuseReasonsByGradeTeacher,
    getExcuseReasonsByTeacher,
    addExcuseReasonsByParent,
    addAbsencesByTeacher,
    updateAbsencesByTeacher
};














