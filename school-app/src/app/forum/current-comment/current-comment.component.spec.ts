import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCommentComponent } from './current-comment.component';

describe('CurrentCommentComponent', () => {
  let component: CurrentCommentComponent;
  let fixture: ComponentFixture<CurrentCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentCommentComponent]
    });
    fixture = TestBed.createComponent(CurrentCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
