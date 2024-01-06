export class AddPosts {
  title!: string;
  content!: string;
  description!: string;
  teacher_creator_id?: string;
  grade_teacher_creator_id?: string;
  admin_creator_id?: string;
  imageUrl!: string;
  likesCount!: Number;

  constructor(init?: Partial<AddPosts>) {
    Object.assign(this, init);
  }
}
