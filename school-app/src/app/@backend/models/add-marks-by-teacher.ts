export class AddMarksByTeacher {
  studentId!: string;
  // student_mark_id!: number;
  subject!: string;
  // term_id!: string;
  constructor(init?: Partial<AddMarksByTeacher>) {
    Object.assign(this, init);
  }
}
