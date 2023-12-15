
const addSubjectsAndGradesQuery = `

    

`

const getTeachersAndGradesQuery = ` 
with cte_get_teachers as (
			
        select t.id, p.first_name, p.last_name, p.email, p.type,
     tgds.teacher_grade_id, tgds.teacher_grade_division_id,
     tgds.teacher_subject_id
     from teacher t
     left join teachers_grades_divisions_subjects tgds
     on t.id = tgds.teacher_id
     left join profile p
     on t.id = p.id
     order by tgds.teacher_grade_id ASC, tgds.teacher_grade_division_id ASC
     ),
     cte_get_grade_teachers as (
              select gt.id, p.first_name, p.last_name, p.email, p.type,
     gtgds.grade_teacher_grade_id as teacher_grade_id, 
             gtgds.grade_teacher_grade_division_id as teacher_grade_division_id,
     gtgds.grade_teacher_subject_id as teacher_subject_id
     from grade_teacher gt
     left join grade_teachers_grades_divisions_subjects gtgds
     on gt.id = gtgds.grade_teacher_id
     left join profile p
     on gt.id = p.id
     order by gtgds.grade_teacher_grade_id ASC, gtgds.grade_teacher_grade_division_id ASC
     )
     select * from cte_get_teachers union all select * from cte_get_grade_teachers
`;


// select * from teacher t
// left join teachers_grades_divisions_subjects tgds
// on t.id = tgds.teacher_id

module.exports = {
        addSubjectsAndGradesQuery,
        getTeachersAndGradesQuery
}