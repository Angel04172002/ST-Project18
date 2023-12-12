export class AddRemarkModel {
  note!: string;
  teacher_creator_id!: string;
  grade_teacher_creator_id?: string; // This parameter is optional !!
  note_student_id!: string;
  note_subject_id!: string;
  note_term_id?: string;

  constructor(init?: AddRemarkModel) {
    Object.assign(this, init);
  }
}
