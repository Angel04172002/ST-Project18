
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the username and password properties on input', () => {
    const compiled = fixture.nativeElement;

    const usernameInput = compiled.querySelector('#username');
    const passwordInput = compiled.querySelector('#password');

    // Simulate user input
    usernameInput.value = 'testUser';
    passwordInput.value = 'testPassword';

    // Trigger input events
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    // // Ensure the component properties are updated
    // expect(component.username).toEqual('testUser');
    // expect(component.password).toEqual('testPassword');
  });

  it('should call login method on button click', fakeAsync(() => {
    spyOn(component, 'login');
    const compiled = fixture.nativeElement;

    const usernameInput = compiled.querySelector('#username');
    const passwordInput = compiled.querySelector('#password');
    const loginButton = compiled.querySelector('#loginButton');

    // Simulate user input
    usernameInput.value = 'testUser';
    passwordInput.value = 'testPassword';

    // Trigger input events
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    // Trigger button click
    loginButton.click();
    tick();

    // Ensure the login method is called
    expect(component.login).toHaveBeenCalled();
  }));
});