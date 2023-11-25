export class AddMarksByTeacher {
  student_id!: string;
  student_mark_id!: number;
  student_subject_id!: string;
  term_id!: string;
  constructor(init?: Partial<AddMarksByTeacher>) {
    Object.assign(this, init);
  }
}
