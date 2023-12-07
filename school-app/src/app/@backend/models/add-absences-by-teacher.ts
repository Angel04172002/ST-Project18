export class AddAbsencesByTeacher {
    type!: string; //Teacher or Grade teacher
    subjectId!: string; //Математика
    studentId!: string;
    termId!: string;

    constructor(init?: Partial<AddAbsencesByTeacher>) {
        Object.assign(this, init);
    }
}
