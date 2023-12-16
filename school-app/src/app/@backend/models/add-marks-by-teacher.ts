export class AddMarksByTeacher {
  studentId!: string;
  firstName!: string;
  lastName!: string;
  email!:string;
  grade!:string;
  gradeDivision!:string;
  teacher_id!:string;
  teacher_first_name!:string;
  teacher_last_name!:string;
  term1Marks!:string[];
  term2Marks!:string[];
  term1Final!:string;
  term2Final!:string;
  termFinal!:string;
  // student_mark_id!: number;
  subject!: string;
  // term_id!: string;
  constructor(init?: Partial<AddMarksByTeacher>) {
    Object.assign(this, init);
  }
}
