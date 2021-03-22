import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

// JSON
import usersList from 'src/assets/json/users.json';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  dataLoading: boolean = false;
  users: any = usersList;
  unregistered: boolean = false;
  invalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [ '', [Validators.required, Validators.minLength(3)]],
      password: [ '', [Validators.required, Validators.minLength(6)]]
    })
  }
  async loginUser() {
    if (this.loginForm.invalid) { return }
    // Se integra el servicio login que consume un servicio rest que interactua con una bbdd mongodb
    var userLogin = this.loginForm.value.username;
    var password = this.loginForm.value.password;

    const valido = await this.usersService.login( userLogin, password);
    if (valido) {
      this.router.navigate(['/principal/ships'])
    } else {
      this.unregistered = true;
    }
  }

  get registerFormControl() {
    return this.loginForm.controls;
  }
}

