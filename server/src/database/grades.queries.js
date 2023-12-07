const getStudentsWithGradeAndDivisonQuery = `
select s.id, p.first_name, p.last_name, p.email, s.grade_id, s.grade_division_id, s.parent_id from student s 
inner join profile p
on s.id = p.id
`


const getTeachersWithGradesDivisionsSubjectsQuery = `
select * from teachers_grades_divisions_subjects where teacher_id = $1
`;


const getGradeTeachersWithGradesDivisionsSubjectsQuery = `
select * from grade_teachers_grades_divisions_subjects where grade_teacher_id = $1
`;


const getStudentsWithGradesDivisionsSubjectsQuery = `
select * from student where id = $1
`;

const getParentsWithGradesDivisionsSubjectsQuery = `
select s.id, s.grade_id, s.grade_division_id, s.parent_id from parent p
inner join student s
on s.parent_id = p.id
where s.parent_id = $1
`;

module.exports = {
    getStudentsWithGradeAndDivisonQuery,
    getTeachersWithGradesDivisionsSubjectsQuery,
    getGradeTeachersWithGradesDivisionsSubjectsQuery,
    getStudentsWithGradesDivisionsSubjectsQuery,
    getParentsWithGradesDivisionsSubjectsQuery
}