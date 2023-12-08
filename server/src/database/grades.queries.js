const getStudentsWithGradeAndDivisonAndParentQuery = `
select 
s.id as student_id, ps.first_name as student_first_name, ps.last_name as student_last_name, ps.email as student_email,
s.grade_id, s.grade_division_id,
pp.id as parent_id, pp.first_name as parent_first_name, pp.last_name as parent_last_name, pp.email as parent_email
from student s
inner join profile ps
on s.id = ps.id
inner join parent par
on s.parent_id = par.id
inner join profile pp
on par.id = pp.id
`;


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


const getStudentsByGradeAndDivision = ` 
select * from student s
inner join profile p
on s.id = p.id
where s.grade_id = $1 and s.grade_division_id = $2
`;

module.exports = {
    getStudentsWithGradeAndDivisonAndParentQuery,
    getTeachersWithGradesDivisionsSubjectsQuery,
    getGradeTeachersWithGradesDivisionsSubjectsQuery,
    getStudentsWithGradesDivisionsSubjectsQuery,
    getParentsWithGradesDivisionsSubjectsQuery,
    getStudentsByGradeAndDivision
}