import { AbsenceExcuseReason } from "./AbsenceExcuseReason";
import { AbsenceReasons } from "./AbsenceReasons";
import { AbsenceTypes } from "./AbsenceTypes";

export interface Absence {
    id: string,
    creatorId: string,
    absenceTypeId: AbsenceTypes,
    absenceReasonId: AbsenceExcuseReason
}