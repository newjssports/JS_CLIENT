import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterModel } from 'src/app/models/new-user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-user-creation',
  templateUrl: './new-user-creation.component.html',
  styleUrl: './new-user-creation.component.scss'
})
export class NewUserCreationComponent implements OnInit {

  registerForm!: FormGroup;
  roles = [
    { id: 1, name: 'Client' },
    { id: 2, name: 'Admin' }
  ];
  userTypes = ['CLIENT', 'HOST'];

  constructor(private fb: FormBuilder,private userService: UserService,
     private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      RoleId: ['', Validators.required],
      UserName: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      FullName: [{ value: '', disabled: true }],
      Password: ['', Validators.required, Validators.minLength(6)],
      UserType: ['', Validators.required]
    });

    // Listen for changes in FirstName and LastName
    this.registerForm.get('FirstName')?.valueChanges.subscribe(value => {
      this.registerForm.get('FirstName')?.setValue(this.capitalize(value), { emitEvent: false });
      this.updateFullName();
    });

    this.registerForm.get('LastName')?.valueChanges.subscribe(value => {
      this.registerForm.get('LastName')?.setValue(this.capitalize(value), { emitEvent: false });
      this.updateFullName();
    });
  }

  updateFullName(): void {
    const firstName = this.capitalize(this.registerForm.get('FirstName')?.value || '');
    const lastName = this.capitalize(this.registerForm.get('LastName')?.value || '');
    this.registerForm.get('FullName')?.setValue(`${firstName} ${lastName}`);
  }

  capitalize(text: string): string {
    return text ? text.toUpperCase() : '';
  }

 // Submit the form
 onSubmit(): void {
  if (this.registerForm.valid) {
    const registerData: RegisterModel = this.registerForm.getRawValue();
    this.userService.registerUser(registerData).subscribe(
      response => {
        //console.log('User registered successfully', response);
        this._snackBar.open('User registered successfully', 'X', {
          duration: 3000
        });
        // Handle successful registration
      },
      error => {
        console.error('Error registering user', error);
        // Handle error
      }
    );
  }
}
}