const getStudentsWithGradeAndDivisonQuery = `
select s.id, p.first_name, p.last_name, p.email, s.grade_id, s.grade_division_id from student s 
inner join profile p
on s.id = p.id
`


module.exports = {
    getStudentsWithGradeAndDivisonQuery
}