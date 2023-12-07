
import { AbsenceExcuseReason } from "./AbsenceExcuseReason";
import { AbsenceReasons } from "./AbsenceReasons";
import { AbsenceTypes } from "./AbsenceTypes";
import { Subject } from "./Subject";

export interface Absence {
    id: string,
    teacherCreatorId: string,
    gradeTeacherCreatorId: string,
    absenceTypeId: AbsenceTypes,
    absenceReasonId: AbsenceExcuseReason,
    absenceSubjectId : Subject
}