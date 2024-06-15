import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  data: any = { email: '', password: '' };
  succesMessage : boolean = false
  constructor(
    private _dataservice: DataserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getRegisterData() {
    this.succesMessage = false
    console.log(this.registerData.value);

    this.data = this.registerData.value;
    const dataa = this._dataservice.register(this.data);
    this.succesMessage  =true
    console.log(dataa);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  registerData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get userEmail() {
    return this.registerData.get('email');
  }

  get userPassword() {
    return this.registerData.get('password');
  }
}
