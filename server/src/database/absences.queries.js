const getExcuseReasonsFromParent = `   

select p.id as student_id, p.first_name, p.last_name, p.email, s.grade_id, s.grade_division_id,
a.*, aer.reason_id as excuse_reason_id, aer.excuse_note from absences_excuse_reasons aers
join absence_excuse_reason aer
on aers.excuse_reason_id = aer.reason_id
join parent par
on aer.creator_id = par.id
join student s
on s.parent_id = par.id
join profile p
on s.id = p.id
join absence a
on aers.absence_id = a.id
where par.id = $1

`;

const getExcuseReasonsFromTeacher = `  
select rs.id as student_id, rs.first_name, rs.last_name, rs.email, rs.grade_id,
rs.grade_division_id, rs.absence_id, rs.type_id, rs.subject_id, rs.student_id, rs.term_id, rs.excuse_reason_id, 
rs.parent_id,
rs.excuse_note,
pp.first_name as parent_first_name, pp.last_name as parent_last_name, pp.email as parent_email
from (

	select p.id, p.first_name, p.last_name, p.email, s.grade_id, s.grade_division_id,
	a.id as absence_id, a.absence_type_id as type_id, 
	a.absence_subject_id as subject_id,
	a.absence_student_id as student_id,
	a.absence_term_id as term_id,
	aer.reason_id as excuse_reason_id, aer.excuse_note as excuse_note,
    par.id as parent_id,
	tgds.teacher_id
	from absences_excuse_reasons aers
	join absence_excuse_reason aer
	on aers.excuse_reason_id = aer.reason_id
	join absence a
	on aers.absence_id = a.id
	join student s
	on a.absence_student_id = s.id
	join parent par
	on s.parent_id = par.id
	join profile p
	on s.id = p.id
	join teachers_grades_divisions_subjects tgds
	on tgds.teacher_grade_division_id = s.grade_division_id and tgds.teacher_grade_id = s.grade_id

) as rs

join profile pp
on rs.parent_id = pp.id
where rs.teacher_id = $1
`;

const getExcuseReasonsFromGradeTeacher = `

select rs.id as student_id, rs.first_name, rs.last_name, rs.email, rs.grade_id,
rs.grade_division_id, rs.absence_id, rs.type_id, rs.subject_id, rs.student_id, rs.term_id, rs.excuse_reason_id, 
rs.parent_id,
rs.excuse_note,
pp.first_name as grade_teacher_first_name, pp.last_name  as grade_teacher_last_name, 
pp.email  as grade_teacher_email 
from (

	select p.id, p.first_name, p.last_name, p.email, s.grade_id, s.grade_division_id,
	a.id as absence_id, a.absence_type_id as type_id, 
	a.absence_subject_id as subject_id,
	a.absence_student_id as student_id,
	a.absence_term_id as term_id,
	aer.reason_id as excuse_reason_id, 
    aer.excuse_note as excuse_note,
    par.id as parent_id,
	gtgds.grade_teacher_id
	from absences_excuse_reasons aers
	join absence_excuse_reason aer
	on aers.excuse_reason_id = aer.reason_id
	join absence a
	on aers.absence_id = a.id
	join student s
	on a.absence_student_id = s.id
	join parent par
	on s.parent_id = par.id
	join profile p
	on s.id = p.id
	join grade_teachers_grades_divisions_subjects gtgds
	on gtgds.grade_teacher_grade_division_id = s.grade_division_id and gtgds.grade_teacher_grade_id = s.grade_id


) as rs

join profile pp
on rs.parent_id = pp.id
where rs.grade_teacher_id = $1

`;


const getAbsencesFromStudent = ` 

SELECT
p.id as student_id,
p.first_name,
p.last_name,
p.email,
gs.grade_id,
s.grade_division_id,
a.id as absence_id,
a.absence_type_id,
a.absence_subject_id,
a.absence_student_id,
tgds.teacher_id as teacher_creator_id,
tgds.teacher_subject_id,
gtgds.grade_teacher_id,
gtgds.grade_teacher_subject_id
FROM
student s
JOIN grade g ON s.grade_id = g.id
JOIN absence a ON s.id = a.absence_student_id
JOIN subject su ON a.absence_subject_id = su.subject_name
JOIN grades_subjects gs ON su.subject_name = gs.subject_id AND s.grade_id = gs.grade_id
JOIN profile p ON s.id = p.id
JOIN teachers_grades_divisions_subjects tgds
ON s.grade_id = tgds.teacher_grade_id
AND s.grade_division_id = tgds.teacher_grade_division_id
AND gs.subject_id = tgds.teacher_subject_id
JOIN grade_teachers_grades_divisions_subjects gtgds ON
s.grade_id = gtgds.grade_teacher_grade_id
AND s.grade_division_id = gtgds.grade_teacher_grade_division_id

WHERE 
p.id = $1
and
tgds.teacher_subject_id = gs.subject_id or gtgds.grade_teacher_subject_id = gs.subject_id
ORDER BY
gs.grade_id ASC,
s.grade_division_id ASC,
gs.subject_id ASC;

`;


const getAbsencesFromParent = ` 
	
SELECT
s.id as student_id,
p.first_name,
p.last_name,
p.email,
gs.grade_id,
s.grade_division_id,
a.id as absence_id,
a.absence_type_id,
a.absence_subject_id,
a.absence_student_id,
tgds.teacher_id as teacher_creator_id,
tgds.teacher_subject_id,
gtgds.grade_teacher_id,
gtgds.grade_teacher_subject_id
FROM
 parent par
JOIN student s ON s.parent_id = par.id
JOIN grade g ON s.grade_id = g.id
JOIN absence a ON s.id = a.absence_student_id
JOIN subject su ON a.absence_subject_id = su.subject_name
JOIN grades_subjects gs ON su.subject_name = gs.subject_id AND s.grade_id = gs.grade_id
JOIN profile p ON s.id = p.id
JOIN teachers_grades_divisions_subjects tgds
ON s.grade_id = tgds.teacher_grade_id
AND s.grade_division_id = tgds.teacher_grade_division_id
AND gs.subject_id = tgds.teacher_subject_id
JOIN grade_teachers_grades_divisions_subjects gtgds ON
s.grade_id = gtgds.grade_teacher_grade_id
AND s.grade_division_id = gtgds.grade_teacher_grade_division_id

WHERE 
p.id = $1 and
tgds.teacher_subject_id = gs.subject_id or 
gtgds.grade_teacher_subject_id = gs.subject_id
ORDER BY
gs.grade_id ASC,
s.grade_division_id ASC,
gs.subject_id ASC;

`;

const getAbsencesFromTeacher = `   

SELECT
s.id as student_id,
p.first_name,
p.last_name,
p.email,
gs.grade_id,
s.grade_division_id,
a.id as absence_id,
a.absence_type_id,
a.absence_subject_id,
a.absence_student_id,
tgds.teacher_id as teacher_creator_id,
tgds.teacher_subject_id,
gtgds.grade_teacher_id,
gtgds.grade_teacher_subject_id
FROM
 parent par
JOIN student s ON s.parent_id = par.id
JOIN grade g ON s.grade_id = g.id
JOIN absence a ON s.id = a.absence_student_id
JOIN subject su ON a.absence_subject_id = su.subject_name
JOIN grades_subjects gs ON su.subject_name = gs.subject_id AND s.grade_id = gs.grade_id
JOIN profile p ON s.id = p.id
JOIN teachers_grades_divisions_subjects tgds
ON s.grade_id = tgds.teacher_grade_id
AND s.grade_division_id = tgds.teacher_grade_division_id
AND gs.subject_id = tgds.teacher_subject_id
JOIN grade_teachers_grades_divisions_subjects gtgds ON
s.grade_id = gtgds.grade_teacher_grade_id
AND s.grade_division_id = gtgds.grade_teacher_grade_division_id

WHERE 
tgds.teacher_id = $1 and
tgds.teacher_subject_id = gs.subject_id or 
gtgds.grade_teacher_subject_id = gs.subject_id
ORDER BY
gs.grade_id ASC,
s.grade_division_id ASC,
gs.subject_id ASC;

`;

const getAbsencesFromGradeTeacher = ` 

SELECT
s.id as student_id,
p.first_name,
p.last_name,
p.email,
gs.grade_id,
s.grade_division_id,
a.id as absence_id,
a.absence_type_id,
a.absence_subject_id,
a.absence_student_id,
tgds.teacher_id as teacher_creator_id,
tgds.teacher_subject_id,
gtgds.grade_teacher_id,
gtgds.grade_teacher_subject_id
FROM
 parent par
JOIN student s ON s.parent_id = par.id
JOIN grade g ON s.grade_id = g.id
JOIN absence a ON s.id = a.absence_student_id
JOIN subject su ON a.absence_subject_id = su.subject_name
JOIN grades_subjects gs ON su.subject_name = gs.subject_id AND s.grade_id = gs.grade_id
JOIN profile p ON s.id = p.id
JOIN teachers_grades_divisions_subjects tgds
ON s.grade_id = tgds.teacher_grade_id
AND s.grade_division_id = tgds.teacher_grade_division_id
AND gs.subject_id = tgds.teacher_subject_id
JOIN grade_teachers_grades_divisions_subjects gtgds ON
s.grade_id = gtgds.grade_teacher_grade_id
AND s.grade_division_id = gtgds.grade_teacher_grade_division_id

WHERE 
gtgds.grade_teacher_id = $1  and
tgds.teacher_subject_id = gs.subject_id or 
gtgds.grade_teacher_subject_id = gs.subject_id
ORDER BY
gs.grade_id ASC,
s.grade_division_id ASC,
gs.subject_id ASC;

`;


module.exports = {
    getExcuseReasonsFromParent,
    getExcuseReasonsFromTeacher,
    getExcuseReasonsFromGradeTeacher,
    getAbsencesFromStudent,
    getAbsencesFromParent,
    getAbsencesFromTeacher,
    getAbsencesFromGradeTeacher
};