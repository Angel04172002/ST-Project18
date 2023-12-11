const addRemarkQuery = `
insert into note  
(id, note, teacher_creator_id, grade_teacher_creator_id, note_student_id, note_subject_id, note_term_id) 
values
($1, $2, $3, $4, $5, $6, $7)
`;

module.exports = {
    addRemarkQuery,
}