export class AddAbsencesByTeacher {
    type!: string;
    subjectId!: string;
    studentId!: string;
    termId!: string;

    constructor(init?: Partial<AddAbsencesByTeacher>) {
        Object.assign(this, init);
    }
}
