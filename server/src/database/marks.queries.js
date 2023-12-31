const pool = require("../db")


const getMarksByTeacherQuery = `
SELECT
rs.student_id,
rs.first_name,
rs.last_name,
rs.email,
rs.grade_id,
rs.grade_division_id,
rs.subject_name,
STRING_AGG(CASE WHEN rs.term_id = 'Първи срок' THEN rs.marks::VARCHAR END, ', ') AS term_1_marks,
MAX(CASE WHEN rs.term_id = 'Срочна 1' THEN rs.marks END) AS term_1_final_mark,
STRING_AGG(CASE WHEN rs.term_id = 'Втори срок' THEN rs.marks::VARCHAR END, ', ') AS term_2_marks,
MAX(CASE WHEN rs.term_id = 'Срочна 2' THEN rs.marks END) AS term_2_final_mark,
MAX(CASE WHEN rs.term_id = 'Годишна' THEN rs.marks END) AS term_final,
rs.teacher_id,
pr.first_name AS teacher_first_name,
pr.last_name AS teacher_last_name
FROM
(
    SELECT
         p.id as student_id,
         p.first_name,
         p.last_name,
         p.email,
         g.id as grade_id,
        s.grade_division_id,
        su.subject_name,
        sms.term_id,
        m.mark_id AS marks
    ,tgds.teacher_id
    FROM
        student s
    JOIN grade g ON s.grade_id = g.id
	LEFT JOIN grades_subjects gs ON s.grade_id = gs.grade_id
	LEFT JOIN students_student_marks_subjects sms ON s.id = sms.student_id
  	LEFT JOIN teachers_grades_divisions_subjects tgds ON
        g.id = tgds.teacher_grade_id
        AND s.grade_division_id = tgds.teacher_grade_division_id
        AND gs.subject_id = tgds.teacher_subject_id

    LEFT JOIN marks m ON sms.student_mark_id = m.mark_id
    JOIN profile p ON s.id = p.id
     LEFT JOIN subject su ON tgds.teacher_subject_id = su.subject_name
    
  
) AS rs
LEFT JOIN
profile pr ON rs.teacher_id = pr.id
WHERE
rs.teacher_id = $1
GROUP BY
rs.student_id,
rs.first_name,
rs.last_name,
rs.email,
rs.grade_id,
rs.grade_division_id,
rs.subject_name,
rs.teacher_id,
pr.first_name,
pr.last_name
ORDER BY
rs.grade_id ASC,
rs.grade_division_id ASC,
rs.subject_name ASC;
	
`;


const getMarksByClassTeacherQuery = `

SELECT
rs.student_id,
rs.first_name,
rs.last_name,
rs.email,
rs.grade_id,
rs.grade_division_id,
rs.subject_name,
STRING_AGG(CASE WHEN rs.term_id = 'Първи срок' THEN rs.marks::VARCHAR END, ', ') AS term_1_marks,
MAX(CASE WHEN rs.term_id = 'Срочна 1' THEN rs.marks END) AS term_1_final_mark,
STRING_AGG(CASE WHEN rs.term_id = 'Втори срок' THEN rs.marks::VARCHAR END, ', ') AS term_2_marks,
MAX(CASE WHEN rs.term_id = 'Срочна 2' THEN rs.marks END) AS term_2_final_mark,
MAX(CASE WHEN rs.term_id = 'Годишна' THEN rs.marks END) AS term_final,
rs.grade_teacher_id,
pr.first_name AS teacher_first_name,
pr.last_name AS teacher_last_name
FROM
(
    SELECT
         p.id as student_id,
         p.first_name,
         p.last_name,
         p.email,
         g.id as grade_id,
        s.grade_division_id,
        su.subject_name,
        sms.term_id,
        m.mark_id AS marks
    ,gtgds.grade_teacher_id
    FROM
        student s
    JOIN grade g ON s.grade_id = g.id
	LEFT JOIN grades_subjects gs ON s.grade_id = gs.grade_id
	LEFT JOIN students_student_marks_subjects sms ON s.id = sms.student_id
  	LEFT JOIN grade_teachers_grades_divisions_subjects gtgds ON
        g.id = gtgds.grade_teacher_grade_id
        AND s.grade_division_id = gtgds.grade_teacher_grade_division_id
        AND gs.subject_id = gtgds.grade_teacher_subject_id

    LEFT JOIN marks m ON sms.student_mark_id = m.mark_id
    JOIN profile p ON s.id = p.id
     LEFT JOIN subject su ON tgds.teacher_subject_id = su.subject_name
    
  
) AS rs
LEFT JOIN
profile pr ON rs.grade_teacher_id = pr.id
WHERE
rs.grade_teacher_id = $1
GROUP BY
rs.student_id,
rs.first_name,
rs.last_name,
rs.email,
rs.grade_id,
rs.grade_division_id,
rs.subject_name,
rs.grade_teacher_id,
pr.first_name,
pr.last_name
ORDER BY
rs.grade_id ASC,
rs.grade_division_id ASC,
rs.subject_name ASC;

`


const getMarksByStudentQuery = `
  
SELECT
rs.id,
rs.first_name,
rs.last_name,
rs.email,
rs.grade_id,
rs.grade_division_id,
rs.subject_name,
STRING_AGG(CASE WHEN rs.term_id = 'Първи срок' THEN rs.marks::VARCHAR END, ', ') AS term_1_marks,
MAX(CASE WHEN rs.term_id = 'Срочна 1' THEN rs.marks END) AS term_1_final_mark,
STRING_AGG(CASE WHEN rs.term_id = 'Втори срок' THEN rs.marks::VARCHAR END, ', ') AS term_2_marks,
MAX(CASE WHEN rs.term_id = 'Срочна 2' THEN rs.marks END) AS term_2_final_mark,
MAX(CASE WHEN rs.term_id = 'Годишна' THEN rs.marks END) AS term_final,


    
CASE 
WHEN teacher_id IS NULL THEN ''
ELSE rs.teacher_id
END AS teacher_id,

CASE 
WHEN teacher_id IS NULL THEN ''
ELSE pro.first_name
END AS teacher_first_name,

CASE 
WHEN teacher_id IS NULL THEN ''
ELSE pro.last_name
END AS teacher_last_name,

CASE 
WHEN teacher_id IS NULL THEN ''
ELSE rs.teacher_subject_id
END AS teacher_subject_id,



CASE 
WHEN grade_teacher_id IS NULL THEN ''
ELSE rs.grade_teacher_id
END AS grade_teacher_id,

CASE 
WHEN grade_teacher_id IS NULL THEN ''
ELSE  pr.first_name
END AS grade_teacher_first_name,

CASE 
WHEN grade_teacher_id IS NULL THEN ''
ELSE pr.last_name
END AS grade_teacher_last_name,

CASE 
WHEN grade_teacher_id IS NULL THEN ''
ELSE rs.grade_teacher_subject_id
END AS grade_teacher_subject_id


FROM
(
    SELECT
        p.id,
        p.first_name,
        p.last_name,
        p.email,
        gs.grade_id,
        s.grade_division_id,
        s.parent_id,
        su.subject_name,
        sms.term_id,
        m.mark_id AS marks,
        tgds.teacher_id,
        tgds.teacher_subject_id,
        gtgds.grade_teacher_id,
        gtgds.grade_teacher_subject_id
    FROM
        student s
    JOIN grade g ON s.grade_id = g.id
    JOIN students_student_marks_subjects sms ON s.id = sms.student_id
    JOIN subject su ON sms.student_subject_id = su.subject_name
    JOIN grades_subjects gs ON su.subject_name = gs.subject_id AND s.grade_id = gs.grade_id
    JOIN marks m ON sms.student_mark_id = m.mark_id
    JOIN profile p ON s.id = p.id
    LEFT JOIN teachers_grades_divisions_subjects tgds
    ON s.grade_id = tgds.teacher_grade_id
    AND s.grade_division_id = tgds.teacher_grade_division_id
    AND gs.subject_id = tgds.teacher_subject_id
    LEFT JOIN grade_teachers_grades_divisions_subjects gtgds ON
        s.grade_id = gtgds.grade_teacher_grade_id
        AND s.grade_division_id = gtgds.grade_teacher_grade_division_id
        AND gs.subject_id = gtgds.grade_teacher_subject_id
    WHERE 

        tgds.teacher_subject_id = gs.subject_id or gtgds.grade_teacher_subject_id = gs.subject_id
) AS rs
LEFT JOIN
profile pr ON rs.grade_teacher_id = pr.id 
LEFT JOIN
profile pro on rs.teacher_id = pro.id
WHERE rs.id = $1
GROUP BY
rs.id,
rs.first_name,
rs.last_name,
rs.email,
rs.grade_id,
rs.grade_division_id,
rs.subject_name,
rs.teacher_id,
rs.teacher_subject_id,
rs.grade_teacher_id,
rs.grade_teacher_subject_id,
pr.first_name,
pr.last_name,
pro.first_name,
pro.last_name
ORDER BY
rs.grade_id ASC,
rs.grade_division_id ASC,
rs.subject_name ASC;

`;


const getMarksByParentQuery = `
  
SELECT
rs.id,
rs.first_name,
rs.last_name,
rs.email,
rs.grade_id,
rs.grade_division_id,
rs.subject_name,
STRING_AGG(CASE WHEN rs.term_id = 'Първи срок' THEN rs.marks::VARCHAR END, ', ') AS term_1_marks,
MAX(CASE WHEN rs.term_id = 'Срочна 1' THEN rs.marks END) AS term_1_final_mark,
STRING_AGG(CASE WHEN rs.term_id = 'Втори срок' THEN rs.marks::VARCHAR END, ', ') AS term_2_marks,
MAX(CASE WHEN rs.term_id = 'Срочна 2' THEN rs.marks END) AS term_2_final_mark,
MAX(CASE WHEN rs.term_id = 'Годишна' THEN rs.marks END) AS term_final,


    
CASE 
WHEN teacher_id IS NULL THEN ''
ELSE rs.teacher_id
END AS teacher_id,

CASE 
WHEN teacher_id IS NULL THEN ''
ELSE pro.first_name
END AS teacher_first_name,

CASE 
WHEN teacher_id IS NULL THEN ''
ELSE pro.last_name
END AS teacher_last_name,

CASE 
WHEN teacher_id IS NULL THEN ''
ELSE rs.teacher_subject_id
END AS teacher_subject_id,



CASE 
WHEN grade_teacher_id IS NULL THEN ''
ELSE rs.grade_teacher_id
END AS grade_teacher_id,

CASE 
WHEN grade_teacher_id IS NULL THEN ''
ELSE  pr.first_name
END AS grade_teacher_first_name,

CASE 
WHEN grade_teacher_id IS NULL THEN ''
ELSE pr.last_name
END AS grade_teacher_last_name,

CASE 
WHEN grade_teacher_id IS NULL THEN ''
ELSE rs.grade_teacher_subject_id
END AS grade_teacher_subject_id


FROM
(
    SELECT
        p.id,
        p.first_name,
        p.last_name,
        p.email,
        gs.grade_id,
        s.grade_division_id,
        s.parent_id,
        su.subject_name,
        sms.term_id,
        m.mark_id AS marks,
        tgds.teacher_id,
        tgds.teacher_subject_id,
        gtgds.grade_teacher_id,
        gtgds.grade_teacher_subject_id
    FROM
        student s
    JOIN grade g ON s.grade_id = g.id
    JOIN students_student_marks_subjects sms ON s.id = sms.student_id
    JOIN subject su ON sms.student_subject_id = su.subject_name
    JOIN grades_subjects gs ON su.subject_name = gs.subject_id AND s.grade_id = gs.grade_id
    JOIN marks m ON sms.student_mark_id = m.mark_id
    JOIN profile p ON s.id = p.id
    LEFT JOIN teachers_grades_divisions_subjects tgds
    ON s.grade_id = tgds.teacher_grade_id
    AND s.grade_division_id = tgds.teacher_grade_division_id
    AND gs.subject_id = tgds.teacher_subject_id
    LEFT JOIN grade_teachers_grades_divisions_subjects gtgds ON
        s.grade_id = gtgds.grade_teacher_grade_id
        AND s.grade_division_id = gtgds.grade_teacher_grade_division_id
        AND gs.subject_id = gtgds.grade_teacher_subject_id
    WHERE 

        tgds.teacher_subject_id = gs.subject_id or gtgds.grade_teacher_subject_id = gs.subject_id
) AS rs
LEFT JOIN
profile pr ON rs.grade_teacher_id = pr.id 
LEFT JOIN
profile pro on rs.teacher_id = pro.id
WHERE rs.parent_id = $1
GROUP BY
rs.id,
rs.first_name,
rs.last_name,
rs.email,
rs.grade_id,
rs.grade_division_id,
rs.subject_name,
rs.teacher_id,
rs.teacher_subject_id,
rs.grade_teacher_id,
rs.grade_teacher_subject_id,
pr.first_name,
pr.last_name,
pro.first_name,
pro.last_name
ORDER BY
rs.grade_id ASC,
rs.grade_division_id ASC,
rs.subject_name ASC;

`;




const getCountOfStudentTermSubjectMarks = `    
select COUNT(student_mark_id), student_mark_id from students_student_marks_subjects
where student_id = $1 and student_subject_id = $2
and term_id = $3
group by student_mark_id
`;






const getStudentMarksToDelete = `   

select sms.*, row_number() over (order by student_id)
from students_student_marks_subjects sms
where student_id = $1
and student_subject_id = $2
and term_id = $3

`;


const getCountOfStudentMarksRows = ` 
select count(*) from students_student_marks_subjects   
`;


const resetIdentity = ` 
ALTER SEQUENCE students_student_marks_subjects_identity_count_seq RESTART WITH 1;
`;

const deleteNStudentMarks = `
    DELETE FROM students_student_marks_subjects sms 
    WHERE sms.identity_count IN (
      select identity_count
      from students_student_marks_subjects
      where identity_count = $1
   )
`;


const getFinalFirstTermMark = ` 
select * from students_student_marks_subjects
where term_id = 'Срочна 1'  and student_id = $1
and student_subject_id = $2
`;

const getFinalSecondTermMark = ` 
select * from students_student_marks_subjects
where term_id = 'Срочна 2'  and student_id = $1
and student_subject_id = $2
`;

const getFinalMark = ` 
select * from students_student_marks_subjects
where term_id = 'Годишна'  and student_id = $1
and student_subject_id = $2
`;





module.exports = {
    getMarksByTeacherQuery,
    getMarksByClassTeacherQuery,
    getMarksByStudentQuery,
    getMarksByParentQuery,
    getCountOfStudentTermSubjectMarks,
    getStudentMarksToDelete,
    deleteNStudentMarks,
    getCountOfStudentMarksRows,
    resetIdentity,
    getFinalFirstTermMark,
    getFinalSecondTermMark,
    getFinalMark
}