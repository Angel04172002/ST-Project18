const getExcuseReasonsFromParent = `   

select p.id as student_id, p.first_name, p.last_name, p.email, s.grade_id, s.grade_division_id,
a.*, aer.id as excuse_reason_id ,aer.reason_id as excuse_reason, aer.excuse_note from absences_excuse_reasons aers
join absence_excuse_reason aer
on aers.excuse_reason_id = aer.id
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
rs.excuse_reason, 
rs.parent_id,
rs.excuse_note,
pp.first_name as parent_first_name, pp.last_name as parent_last_name, pp.email as parent_email
from (

	select p.id, p.first_name, p.last_name, p.email, s.grade_id, s.grade_division_id,
	a.id as absence_id, a.absence_type_id as type_id, 
	a.absence_subject_id as subject_id,
	a.absence_student_id as student_id,
	a.absence_term_id as term_id,
	aer.excuse_note as excuse_note,
	aer.reason_id as excuse_reason, 
	aer.id as excuse_reason_id,
    par.id as parent_id,
	a.teacher_creator_id as teacher_id
	from absences_excuse_reasons aers
	join absence_excuse_reason aer
	on aers.excuse_reason_id = aer.id
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
rs.grade_division_id, rs.absence_id, rs.type_id, rs.subject_id, rs.student_id, rs.term_id, rs.excuse_reason,
rs.excuse_reason_id, 
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
	aer.reason_id as excuse_reason,
	aer.id as excuse_reason_id,
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
a.absence_term_id,


CASE 
	WHEN tgds.teacher_id IS NULL
	THEN gtgds.grade_teacher_id
ELSE tgds.teacher_id
END AS teacher_creator_id,

pro.first_name as teacher_first_name,
pro.last_name as teacher_last_name,
pro.email as teacher_email


FROM
student s
JOIN grade g ON s.grade_id = g.id
JOIN absence a ON s.id = a.absence_student_id
JOIN subject su ON a.absence_subject_id = su.subject_name
JOIN grades_subjects gs ON su.subject_name = gs.subject_id AND s.grade_id = gs.grade_id
JOIN profile p ON s.id = p.id
LEFT JOIN teachers_grades_divisions_subjects tgds
ON s.grade_id = tgds.teacher_grade_id
AND s.grade_division_id = tgds.teacher_grade_division_id
AND gs.subject_id = tgds.teacher_subject_id
LEFT JOIN grade_teachers_grades_divisions_subjects gtgds ON
s.grade_id = gtgds.grade_teacher_grade_id
AND s.grade_division_id = gtgds.grade_teacher_grade_division_id
AND gs.subject_id = gtgds.grade_teacher_subject_id
JOIN profile pro
ON a.teacher_creator_id = pro.id or a.grade_teacher_creator_id = pro.id
WHERE 
s.id = $1
ORDER BY
gs.grade_id ASC,
s.grade_division_id ASC,
gs.subject_id ASC;

`;

const getAbsencesFromParent = ` 
	

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
a.absence_term_id,


CASE 
	WHEN tgds.teacher_id IS NULL
	THEN gtgds.grade_teacher_id
ELSE tgds.teacher_id
END AS teacher_creator_id,

pro.first_name as teacher_first_name,
pro.last_name as teacher_last_name,
pro.email as teacher_email


FROM
student s
JOIN grade g ON s.grade_id = g.id
JOIN absence a ON s.id = a.absence_student_id
JOIN subject su ON a.absence_subject_id = su.subject_name
JOIN grades_subjects gs ON su.subject_name = gs.subject_id AND s.grade_id = gs.grade_id
JOIN profile p ON s.id = p.id
LEFT JOIN teachers_grades_divisions_subjects tgds
ON s.grade_id = tgds.teacher_grade_id
AND s.grade_division_id = tgds.teacher_grade_division_id
AND gs.subject_id = tgds.teacher_subject_id
LEFT JOIN grade_teachers_grades_divisions_subjects gtgds ON
s.grade_id = gtgds.grade_teacher_grade_id
AND s.grade_division_id = gtgds.grade_teacher_grade_division_id
AND gs.subject_id = gtgds.grade_teacher_subject_id
JOIN profile pro
ON a.teacher_creator_id = pro.id or a.grade_teacher_creator_id = pro.id
WHERE 
s.parent_id = $1
ORDER BY
gs.grade_id ASC,
s.grade_division_id ASC,
gs.subject_id ASC;

`;

const getAbsencesFromTeacher = `   



select a.id, a.absence_type_id, a.absence_subject_id, a.absence_term_id, a.absence_student_id,
p.first_name as student_first_name, p.last_name as student_last_name, p.email as student_email, s.grade_id, s.grade_division_id,
a.teacher_creator_id, pro.first_name as teacher_first_name, pro.last_name as teacher_last_name, pro.email as teacher_email
from absence a
inner join student s
on a.absence_student_id = s.id
inner join profile p
on s.id = p.id
inner join profile pro
on a.teacher_creator_id = pro.id
where a.teacher_creator_id = $1
order by s.grade_id, s.grade_division_id, a.absence_term_id


`;


const getAbsencesFromGradeTeacher = ` 

select a.id, a.absence_type_id, a.absence_subject_id, a.absence_term_id, a.absence_student_id,
p.first_name as student_first_name, p.last_name as student_last_name, p.email as student_email, s.grade_id, s.grade_division_id,
case 
	when a.teacher_creator_id is null
	then a.grade_teacher_creator_id
	else a.teacher_creator_id end as teacher_creator_id,
pro.first_name as teacher_first_name, pro.last_name as teacher_last_name, pro.email as teacher_email
from absence a
inner join student s
on a.absence_student_id = s.id
inner join profile p
on s.id = p.id
inner join grade_teachers_grades_divisions_subjects gtgds
on s.grade_id = gtgds.grade_teacher_grade_id and s.grade_division_id = gtgds.grade_teacher_grade_division_id
left join profile pro
on a.teacher_creator_id = pro.id or a.grade_teacher_creator_id = pro.id
where gtgds.grade_teacher_id  = $1
order by s.grade_id, s.grade_division_id, a.absence_term_id

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