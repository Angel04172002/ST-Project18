export class AddSubjectsToGrade {
  public grade_id!: number;
  public subject_name!: string;

  constructor(init?: Partial<AddSubjectsToGrade>) {
    Object.assign(this, init);
  }
}
