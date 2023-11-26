export class AddSubjectsAndGradesToTeacherModel {
  teacher_id!: string;
  grade_id!: number;
  grade_division_id!: string;
  subject_name!: string;

  constructor(init?: Partial<AddSubjectsAndGradesToTeacherModel>) {
    Object.assign(this, init);
  }
}
