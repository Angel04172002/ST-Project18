import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeTeacherComponent } from './grade-teacher.component';

describe('GradeTeacherComponent', () => {
  let component: GradeTeacherComponent;
  let fixture: ComponentFixture<GradeTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradeTeacherComponent]
    });
    fixture = TestBed.createComponent(GradeTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
