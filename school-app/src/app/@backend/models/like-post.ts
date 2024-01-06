export class LikePost {

    postId!: string;
    studentId?: string;
    parentId?: string;
    teacherId?: string;
    gradeTeacherId?: string;
    adminId?: string;
    likes !: Number;
  
    constructor(init?: Partial<LikePost>) {
      Object.assign(this, init);
    }
  }
  