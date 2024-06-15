import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _dataservice: DataserviceService,
    private router: Router
  ) {}

  logindata: any = { email: '', password: '' };
  succesMessage: boolean = false;
  isLoggedIn: boolean = false;

  ngOnInit(): void {}

  onLogin() {
    // console.log(alert('login'));
    this.succesMessage = false;
    this.logindata = this.getLoginData.value;
    const data = this._dataservice.login(this.logindata);
    this.isLoggedIn = true;
     this.succesMessage = true;
    console.log(data);
    setTimeout(() => {
      this.router.navigate(['/blogdashboard']);
    }, 1500);
  }

  getLoginData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get useremail() {
    return this.getLoginData.get('email');
  }

  get userpassword() {
    return this.getLoginData.get('password');
  }
}
