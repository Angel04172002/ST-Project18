export class AddStudentToGrade {
  public student_id!: string;
  public grade_id!: number;
  public grade_division_id!: string;

  constructor(init?: Partial<AddStudentToGrade>) {
    Object.assign(this, init);
  }
}
