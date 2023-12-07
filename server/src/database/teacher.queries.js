
const addSubjectsAndGradesQuery = `

    

`

const getTeachersAndGradesQuery = ` 
        select tgds.teacher_id, p.first_name, p.last_name, p.email, p.type,
        tgds.teacher_grade_id, tgds.teacher_grade_division_id,
        tgds.teacher_subject_id
        from teachers_grades_divisions_subjects tgds
        inner join profile p
        on tgds.teacher_id = p.id
        order by tgds.teacher_grade_id ASC, tgds.teacher_grade_division_id ASC
`;


module.exports = {
        addSubjectsAndGradesQuery,
        getTeachersAndGradesQuery
}