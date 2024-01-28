import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, empty, of } from "rxjs";
import { AddStudentToGrade } from "../models/add-student-to-grade.model";
import { ProfileTypes } from "../enums/profile-types.enum";
import { AddSubjectsToGrade } from "../models/add-subjects-to-grade.model";
import { AddMarksByTeacher } from "../models/add-marks-by-teacher";
import { AddSubjectsAndGradesToTeacherModel } from "../models/add-subjects-and-grades-to-teacher.model";
import { Injectable } from "@angular/core";
import { AddAbsencesByTeacher } from "../models/add-absences-by-teacher";
import { AddExcuseReasonsByParent } from "../models/add-excuse-reasons-by-parent";
import { AddRemarkModel } from "../models/add-remarks.model";
import { AddEventsModel } from "../models/add-event.model";
import { AddPosts } from "../models/add-posts";
import { LikePost } from "../models/like-post";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private readonly url = "http://localhost:3001";

  public jwtToken: string = "";

  constructor(private httpClient: HttpClient) { }

  private post(endpoint: string, body: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append(
      "x-access-token",
      this.jwtToken ? this.jwtToken : ""
    );
    return this.httpClient.post(`${this.url}${endpoint}`, body, {
      headers: headers,
    });
  }

  private get(endpoint: string, queryParams: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append(
      "x-access-token",
      this.jwtToken ? this.jwtToken : ""
    );
    let params: HttpParams = new HttpParams();
    if (queryParams) {
      for (let key in queryParams) {
        params = params.append(key, queryParams[key]);
      }
    }

    return this.httpClient.get(`${this.url}${endpoint}`, {
      params: queryParams,
      headers: headers,
    });
  }

  /**
   * Тези методи връщат Observable, който ще извика заявката.
   * За да извиката този Observable трябва да изпълните асинхронен метод.
   * Вариант 1: firstValueFrom(yourObservable).then((data) => { console.log(data)... })
   * Можете да напишете await firstValueFrom... за да накарата javascript да изчака заявката
   * Вариант 2: yourObservable.subscribe()....
   * (аз предпомитам първото)...
   * в интърнет има много инфо, chatGPT също помага
   *  */

  // Profile methods

  public getProfile(id: string): Observable<any> {
    return this.get("/profile", {
      id: id,
    });
  }

  public createProfile(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    type: ProfileTypes,
    creatorId?: string
  ): Observable<any> {
    return this.post("/profile/create", {
      creator_id: creatorId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      type: type,
    });
  }


  public updateUser(id: string, email: string, password: string) {
    return this.post("/profile/update", {
      id,
      email,
      password
    })
  }

  public login(email: string, password: string): Observable<any> {
    return this.post("/profile/auth", {
      email: email,
      password: password,
    });
  }

  // Grades methods

  public addStudentsToGrade(students: AddStudentToGrade[]): Observable<any> {

    if (!students || students.length < 1) {
      console.error("Students not provided");
      return of({}); // empty observable so you don't get errors when subsribing to undefined
    }
    return this.post("/grades/add-to-grade", {
      students: students,
    });
  }

  public addSubjectsToGrade(subjects: AddSubjectsToGrade[]): Observable<any> {
    if (!subjects || subjects.length < 1) {
      console.error("Subjects not provided");
      return of({}); // empty observable so you don't get errors when subsribing to undefined
    }
    return this.post("/grades/add-subjects-to-grade", {
      subjects: subjects,
    });
  }

  public getStudentsWithGradeAndDivison(): Observable<any> {
    return this.get("/grades/all", {});
  }

  public getAllSubjects(): Observable<any> {
    return this.get("/grades/subjects/all", {});
  }

  // Marks methods

  public addMarksByTeacher(marks: AddMarksByTeacher[]): Observable<any> {
    if (!marks || marks.length < 1) {
      console.error("Marks not provided");
      return of({}); // empty observable so you don't get errors when subsribing to undefined
    }
    return this.post("/marks/teacher/add", {
      marks: marks,
    });
  }

  public getMarksByTeacher(teacherId: string): Observable<any> {

    console.log(teacherId);

    return this.get("/marks/teacher", {
      teacherId: teacherId,
    });
  }

  public getMarksByClassTeacher(teacherId: string): Observable<any> {
    return this.get("/marks/teacher/class", {
      teacherId: teacherId,
    });
  }

  public getMarksByStudent(studentId: string): Observable<any> {

    console.log(studentId);

    return this.get("/marks/student", {
      studentId: studentId,
    });
  }

  public getMarksByParent(parentId: string): Observable<any> {

    console.log(parentId);

    return this.get("/marks/parent", {
      parentId: parentId,
    });
  }

  public getMarksByClassParent(parentId: string): Observable<any> {
    return this.get("/marks/parent/", {
      parentId: parentId,
    });
  }

  // Teachers methods

  public addSubjectsAndGradesToTeacher(
    subjects: AddSubjectsAndGradesToTeacherModel[]
  ): Observable<any> {
    if (!subjects || subjects.length < 1) {
      console.error("Marks not provided");
      return of({}); // empty observable so you don't get errors when subsribing to undefined
    }
    return this.post("/teacher/add/subjects-and-grades", {
      subjects: subjects,
    });
  }

  public getTeachersWithGradesDivisionsSubjects(): Observable<any> {
    return this.get("/teacher/get/teacher-grades", {});
  }

  //Absences methods

  public addAbsencesByTeacher(
    absences: AddAbsencesByTeacher[],
    creator: any
  ): Observable<any> {
    return this.post("/absences/add/absences", {
      absences: absences,
      creator: creator,
    });

    //creator:
    // {
    //teacherId: ...
    //gradeTeacherId: null

    //or

    //teacherId: null
    //gradeTeacherId: ...
    // }
  }

  public updateAbsencesByTeacher(
    id: string,
    absences: AddAbsencesByTeacher[],
    creator: any
  ): Observable<any> {
    return this.post("/absences/update/absences", {
      id: id,
      absences: absences,
      creator: creator
    });
  }

  //here
  public addExcuseReasonsByParent(formData: FormData): Observable<any> {
    return this.post("/absences/add/excuse-reasons", formData);
  }
  

  public getAbsencesByStudent(studentId: string): Observable<any> {
    return this.get("/absences/get-absences/student", {
      id: studentId,
    });
  }

  public getAbsencesByParent(parentId: string): Observable<any> {
    return this.get("/absences/get-absences/parent", {
      id: parentId,
    });
  }

  public getAbsencesByTeacher(teacherId: string): Observable<any> {
    return this.get("/absences/get-absences/teacher", {
      id: teacherId,
    });
  }

  public getAbsencesByGradeTeacher(gradeTeacherId: string): Observable<any> {
    return this.get("/absences/get-absences/grade-teacher", {
      id: gradeTeacherId,
    });
  }

  public getExcuseReasonsByParent(parentId: string): Observable<any> {
    return this.get("/absences/get-excuse-reasons/parent", {
      id: parentId,
    });
  }

  public getExcuseReasonsByStudent(studentId: string): Observable<any> {
    return this.get("/absences/get-excuse-reasons/student", {
      id: studentId,
    });
  }

  public getExcuseReasonsByTeacher(teacherId: string): Observable<any> {
    return this.get("/absences/get-excuse-reasons/teacher", {
      id: teacherId,
    });
  }

  public getExcuseReasonsByGradeTeacher(
    gradeTeacherId: string
  ): Observable<any> {
    return this.get("/absences/get-excuse-reasons/grade-teacher", {
      id: gradeTeacherId,
    });
  }

  //Helper methods
  public getGradesDivisionsAndSubjectsForTeacher(
    teacherId: string
  ): Observable<any> {
    return this.get("/grades/get/teachers/grades", {
      teacherId: teacherId,
    });
  }

  public getGradesDivisionsAndSubjectsForGradeTeacher(
    gradeTeacherId: string
  ): Observable<any> {
    return this.get("/grades/get/grade-teachers/grades", {
      gradeTeacherId: gradeTeacherId,
    });
  }

  public getGradesDivisionsAndSubjectsForStudent(
    studentId: string
  ): Observable<any> {
    return this.get("/grades/get/students/grades", {
      studentId: studentId,
    });
  }

  public getGradesDivisionsAndSubjectsForParent(
    parentId: string
  ): Observable<any> {
    return this.get("/grades/get/parents/grades", {
      parentId: parentId,
    });
  }

  public getStudentsByGradeAndDivision(
    gradeId: number,
    gradeDivisionId: string
  ) {
    return this.get("/grades/get/students/by-grades", {
      gradeId: gradeId,
      gradeDivisionId: gradeDivisionId,
    });
  }

  // Remarks methods
  // ********************************************

  public addRemark(remark: AddRemarkModel): Observable<any> {
    return this.post("/remark/add/", {
      note: remark.note,
      teacher_creator_id: remark.teacher_creator_id, // This parameter is optional !!
      grade_teacher_creator_id: remark.grade_teacher_creator_id, // This parameter is optional !!
      note_student_id: remark.note_student_id,
      note_subject_id: remark.note_subject_id,
      note_term_id: remark.note_term_id,
    });
  }

  public updateRemark(id: string, remark: AddRemarkModel): Observable<any> {
    return this.post("/remark/update/", {
      id: id,
      note: remark.note,
      teacher_creator_id: remark.teacher_creator_id,
      grade_teacher_creator_id: remark.grade_teacher_creator_id,
      note_student_id: remark.note_student_id,
      note_subject_id: remark.note_subject_id,
      note_term_id: remark.note_term_id,
    });
  }

  public getRemarksByStudent(studentId: string): Observable<any> {
    return this.get("/remark/get/student", {
      studentId: studentId,
    });
  }
  public getRemarksByParent(parentId: string): Observable<any> {
    return this.get("/remark/get/parent", {
      parentId: parentId,
    });
  }
  public getRemarksByTeacher(teacherId: string): Observable<any> {
    return this.get("/remark/get/teacher", {
      teacherId: teacherId,
    });
  }
  public getRemarksByClassTeacher(teacherId: string): Observable<any> {
    return this.get("/remark/get/class-teacher", {
      teacherId: teacherId,
    });
  }

  // Events methods
  // ********************************************

  public addEvent(event: AddEventsModel): Observable<any> {
    return this.post("/events/add", {
      name: event.name,
      description: event.description,
      date: event.date,
      place: event.place,
      teacher_creator_id: event.teacher_creator_id,
      grade_teacher_creator_id: event.grade_teacher_creator_id,
      admin_creator_id: event.admin_creator_id,
      isPrivate: event.isPrivate,
    });
  }

  public getAllEvents(): Observable<any> {
    return this.get("/events/get", {});
  }

  public getEventsByStudent(studentId: string): Observable<any> {
    return this.get("/events/get/student", {
      studentId: studentId,
    });
  }

  public getEventsByParent(parentId: string): Observable<any> {
    return this.get("/events/get/parent", {
      parentId: parentId,
    });
  }


  public addPost(data: AddPosts): Observable<any> {
    return this.post("/posts/post/add", {
      title: data.title,
      content: data.content,
      description: data.description,
      teacher_creator_id: data.teacher_creator_id,
      grade_teacher_creator_id: data.grade_teacher_creator_id,
      admin_creator_id: data.admin_creator_id,
      imageUrl: data.imageUrl,
      likesCount: data.likesCount
    })
  }


  public getAllPosts(): Observable<any> {
    return this.post("/posts/get", {});
  }


  public getPostById(id: string): Observable<any> {
    return this.post("/posts/get/id", {
      id: id
    });
  }


  public likePost(data: LikePost): Observable<any> {
    return this.post("/posts/like", {
      data
    });
  }


  public checkIfLiked(data: LikePost): Observable<any> {
    return this.post("/posts/like/check", {
      data
    });
  }


  public getLikes(data: any): Observable<any> {
    return this.post("/posts/likes/get", {
      data
    });
  }




  public addComment(data: any): Observable<any> {
    return this.post("/posts/comment/add", {
      data: data
    })
  }

  public getComments(data: any): Observable<any> {
    return this.post("/posts/comment/get", { data });
  }

  public deletePost(data: any): Observable<any> {
    return this.post("/posts/post/delete", { data });
  }
}
