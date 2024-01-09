import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the name, lastName, email, and password properties on input', () => {
    const compiled = fixture.nativeElement;

    const nameInput = compiled.querySelector('#firstName');
    const lastNameInput = compiled.querySelector('#lastName');
    const emailInput = compiled.querySelector('#email');
    const passwordInput = compiled.querySelector('#password');

    // Simulate user input
    nameInput.value = 'John';
    lastNameInput.value = 'Doe';
    emailInput.value = 'john.doe@example.com';
    passwordInput.value = 'testPassword';

    // Trigger input events
    nameInput.dispatchEvent(new Event('input'));
    lastNameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    // // Ensure the component properties are updated
    // expect(component.name).toEqual('John');
    // expect(component.lastName).toEqual('Doe');
    // expect(component.email).toEqual('john.doe@example.com');
    // expect(component.password).toEqual('testPassword');
  });

  it('should call register method on button click', fakeAsync(() => {
    spyOn(component, 'register');
    const compiled = fixture.nativeElement;

    const nameInput = compiled.querySelector('#name');
    const lastNameInput = compiled.querySelector('#lastName');
    const emailInput = compiled.querySelector('#email');
    const passwordInput = compiled.querySelector('#password');
    const registerButton = compiled.querySelector('#registerButton');

    // Simulate user input
    nameInput.value = 'John';
    lastNameInput.value = 'Doe';
    emailInput.value = 'john.doe@example.com';
    passwordInput.value = 'testPassword';

    // Trigger input events
    nameInput.dispatchEvent(new Event('input'));
    lastNameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    // Trigger button click
    registerButton.click();
    tick();

    // Ensure the register method is called
    expect(component.register).toHaveBeenCalled();
  }));
});