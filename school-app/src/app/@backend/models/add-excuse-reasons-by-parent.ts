export class AddExcuseReasonsByParent {
    reason!: string;
    parentId!: string;
    absenceId!: string;
    noteId!: string;

    constructor(init?: Partial<AddExcuseReasonsByParent>) {
        Object.assign(this, init);
    }
}
