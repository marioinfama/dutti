import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

// JSON
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  dataLoading: boolean = false;
  unregistered: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [ '', [Validators.required, Validators.minLength(3)]],
      lastName: [ '', [Validators.required, Validators.minLength(3)]],
      username: [ '', [Validators.required, Validators.minLength(3)]],
      email: [ '', [Validators.required, Validators.minLength(6), Validators.email]],
      password: [ '', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.comprobarPassword('password', 'confirmPassword'),
      }    
    )
  }

  async registerUser() {
    if (this.registerForm.invalid) { return }

    this.dataLoading = true;
    var userLogin = this.registerForm.value;
    console.log(userLogin);
    var valido = await this.usersService.registro(userLogin);
    this.dataLoading = false;
    if(valido){
      this.router.navigate(['/principal/ships'])
    } else {
      this.unregistered = true;
    }

  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  comprobarPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

}
