
const addSubjectsAndGradesQuery = `

    

`

const getTeachersAndGradesQuery = ` 
        select t.id, p.first_name, p.last_name, p.email, p.type,
        tgds.teacher_grade_id, tgds.teacher_grade_division_id,
        tgds.teacher_subject_id
        from teacher t
        left join teachers_grades_divisions_subjects tgds
        on t.id = tgds.teacher_id
        left join profile p
        on t.id = p.id
        order by tgds.teacher_grade_id ASC, tgds.teacher_grade_division_id ASC
`;


// select * from teacher t
// left join teachers_grades_divisions_subjects tgds
// on t.id = tgds.teacher_id

module.exports = {
        addSubjectsAndGradesQuery,
        getTeachersAndGradesQuery
}