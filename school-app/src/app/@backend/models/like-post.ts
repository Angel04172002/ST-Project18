import { ProfileTypes } from "../enums/profile-types.enum";

export class LikePost {

    postId!: string;
    studentId?: string;
    parentId?: string;
    teacherId?: string;
    gradeTeacherId?: string;
    adminId?: string;
    likesCount !: Number;
    userType !: any;
  
    constructor(init?: Partial<LikePost>) {
      Object.assign(this, init);
    }
  }
  