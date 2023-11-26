export interface Message {
    id: string,
    studentCreatorId: string,
    parentCreatorId: string,
    teacherCreatorId: string,
    gradeTeacherCreatorId: string,
    adminCreatorId: string,
    messageText: string,
    date : Date
}
