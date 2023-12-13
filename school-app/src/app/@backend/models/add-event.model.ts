export class AddEventsModel {
  name!: string;
  description!: string;
  date!: any;
  place!: string;
  teacher_creator_id: string | undefined;
  grade_teacher_creator_id: string | undefined;
  admin_creator_id: string | undefined;
  isPrivate!: any;

  constructor(init?: AddEventsModel) {
    Object.assign(this, init);
  }
}
