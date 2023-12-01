export class AddStudentToGrade {
  public studentId!: string;
  public grade!: number;
  public gradeDivision!: string;
  public firstName !: string;
  public lastName !: string;
  public email !: string;

  constructor(init?: Partial<AddStudentToGrade>) {
    Object.assign(this, init);
  }
}
