import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, empty, of } from "rxjs";
import { AddStudentToGrade } from "../models/add-student-to-grade.model";
import { ProfileTypes } from "../enums/profile-types.enum";
import { AddSubjectsToGrade } from "../models/add-subjects-to-grade.model";
import { AddMarksByTeacher } from "../models/add-marks-by-teacher";
import { AddSubjectsAndGradesToTeacherModel } from "../models/add-subjects-and-grades-to-teacher.model";
import { Injectable } from "@angular/core";
import { AddAbsencesByTeacher } from "../models/add-absences-by-teacher";
import { AddExcuseReasonsByParent } from "../models/add-excuse-reasons-by-parent";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private readonly url = "http://localhost:3000";


  public jwtToken: string = "";

  constructor(private httpClient: HttpClient) { }




  private post(endpoint: string, body: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append("x-access-token", this.jwtToken ? this.jwtToken : "");
    return this.httpClient.post(`${this.url}${endpoint}`, body, {
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
    return this.post("/profile", {
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

  public login(email: string, password: string): Observable<any> {
    return this.post("/profile/auth", {
      email: email,
      password: password,
    });
  }

  // Grades methods

  public addStudentsToGrade(students: AddStudentToGrade[]): Observable<any> {

    console.log(this);
    console.log(students);

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
    return this.post("/grades/all", {});
  }

  public getAllSubjects(): Observable<any> {
    return this.post("/subjects/all", {});
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
    return this.post("/marks/teacher", {
      teacherId: teacherId,
    });
  }

  public getMarksByClassTeacher(teacherId: string): Observable<any> {
    return this.post("/marks/teacher/class", {
      teacherId: teacherId,
    });
  }

  public getMarksByStudent(studentId: string): Observable<any> {
    return this.post("/marks/student", {
      studentId: studentId,
    });
  }

  public getMarksByClassParent(parentId: string): Observable<any> {
    return this.post("/marks/parent/", {
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
    return this.post("/teacher/get/teacher-grades", {})
  }



  //Absences methods

  public addAbsencesByTeacher(absences: AddAbsencesByTeacher[], creator: any): Observable<any> {
    return this.post("/absences/add/absences", {
      absences: absences,
      creator: creator
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

  public addExcuseReasonsByParent(excuseReasons: AddExcuseReasonsByParent[]): Observable<any> {
    return this.post("/absences/add/excuse-reasons", {
      excuseReasons: excuseReasons
    });
  }

  public getAbsencesByStudent(studentId: string): Observable<any> {
    return this.post("/absences/get-absences/student", {
      id: studentId
    });
  }

  public getAbsencesByParent(parentId: string): Observable<any> {
    return this.post("/absences/get-absences/parent", {
      id: parentId
    });
  }

  public getAbsencesByTeacher(teacherId: string): Observable<any> {
    return this.post("/absences/get-absences/teacher", {
      id: teacherId
    });
  }

  public getAbsencesByGradeTeacher(gradeTeacherId: string): Observable<any> {
    return this.post("/absences/get-absences/grade-teacher", {
      id: gradeTeacherId
    });
  }

  public getExcuseReasonsByParent(parentId: string): Observable<any> {
    return this.post("/absences/get-excuse-reasons/parent", {
      id: parentId
    });
  }


  public getExcuseReasonsByGradeTeacher(gradeTeacherId: string): Observable<any> {
    return this.post("/absences/get-excuse-reasons/grade-teacher", {
      id: gradeTeacherId
    });
  }



  //Helper methods
  public getGradesDivisionsAndSubjectsForTeacher(teacherId: string): Observable<any> {
    return this.post("/grades/get/teachers/grades", {
      teacherId: teacherId
    })
  }

  public getGradesDivisionsAndSubjectsForGradeTeacher(gradeTeacherId: string): Observable<any> {
    return this.post("/grades/get/grade-teachers/grades", {
      gradeTeacherId: gradeTeacherId
    })
  }

  public getGradesDivisionsAndSubjectsForStudent(studentId: string): Observable<any> {
    return this.post("/grades/get/students/grades", {
      studentId: studentId
    })
  }

  public getGradesDivisionsAndSubjectsForParent(parentId: string): Observable<any> {
    return this.post("/get/parents/grades", {
      parentId: parentId
    })
  }


}
