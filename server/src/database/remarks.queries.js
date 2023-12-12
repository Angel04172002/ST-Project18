const addRemarkQuery = `
    insert into note  
    (id, note, teacher_creator_id, grade_teacher_creator_id, note_student_id, note_subject_id, note_term_id) 
    values
    ($1, $2, $3, $4, $5, $6, $7)
`;


const getRemarkByStudentQuery = `
    SELECT
    p.id as student_id,
    p.first_name,
    p.last_name,
    p.email,
    gs.grade_id,
    s.grade_division_id,
    n.id as note_id,
    n.note,
    n.note_term_id,
    n.note_subject_id,


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
    JOIN note n ON s.id = n.note_student_id
    JOIN subject su ON n.note_subject_id = su.subject_name
    JOIN grades_subjects gs ON su.subject_name = gs.subject_id AND s.grade_id = gs.grade_id
    JOIN profile p ON s.id = p.id
    LEFT JOIN teachers_grades_divisions_subjects 
    ON s.grade_id = tgds.teacher_grade_id
    AND s.grade_division_id = tgds.teacher_grade_division_id
    AND gs.subject_id = tgds.teacher_subject_id
    LEFT JOIN grade_teachers_grades_divisions_subjects ON
    s.grade_id = gtgds.grade_teacher_grade_id
    AND s.grade_division_id = gtgds.grade_teacher_grade_divsion_id
    AND gs.subject_id = gtgds.grade_teacher_subject_id
    JOIN profile pro
    ON tgds.teacher_id = pro.id or gtgds.grade_teacher_id = pro.id
    WHERE 
    s.id = $1
    ORDER BY
    gs.grade_id ASC,
    s.grade_division_id ASC,
    gs.subject_id ASC;

`


const getRemarkByParentQuery = `
    SELECT
    p.id as student_id,
    p.first_name,
    p.last_name,
    p.email,
    gs.grade_id,
    s.grade_division_id,
    n.id as note_id,
    n.note,
    n.note_term_id,
    n.note_subject_id,


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
    JOIN note n ON s.id = n.note_student_id
    JOIN subject su ON n.note_subject_id = su.subject_name
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
    ON tgds.teacher_id = pro.id or gtgds.grade_teacher_id = pro.id
    WHERE 
    s.parent_id = $1
    ORDER BY
    gs.grade_id ASC,
    s.grade_division_id ASC,
    gs.subject_id ASC;

`

const getRemarkByTeacherQuery = `
    select n.id, n.note, n.note_student_id, n.note_subject_id, n.note_term_id,
    p.first_name as student_first_name, p.last_name as student_last_name, p.email as student_email, s.grade_id, s.grade_division_id,
    n.teacher_creator_id, pro.first_name as teacher_first_name, pro.last_name as teacher_last_name, pro.email as teacher_email
    from note n
    inner join student s
    on n.note_student_id = s.id
    inner join profile p
    on s.id = p.id
    inner join profile pro
    on n.teacher_creator_id = pro.id
    where n.teacher_creator_id = $1
    order by s.grade_id, s.grade_division_id, n.note_term_id

`

const getRemarkByClassTeacherQuery = `
    select n.id, n.note, n.note_student_id, n.note_subject_id, n.note_term_id,
    p.first_name as student_first_name, p.last_name as student_last_name, p.email as student_email, s.grade_id, s.grade_division_id,
    n.grade_teacher_creator_id, pro.first_name as teacher_first_name, pro.last_name as teacher_last_name, pro.email as teacher_email
    from note n
    inner join student s
    on n.note_student_id = s.id
    inner join profile p
    on s.id = p.id
    inner join profile pro
    on n.grade_teacher_creator_id = pro.id
    where n.grade_teacher_creator_id = $1
    order by s.grade_id, s.grade_division_id, n.note_term_id

`

module.exports = {
    addRemarkQuery,
    getRemarkByStudentQuery,
    getRemarkByParentQuery,
    getRemarkByTeacherQuery,
    getRemarkByClassTeacherQuery
}