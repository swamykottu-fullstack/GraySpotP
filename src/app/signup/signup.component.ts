import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../_services/signup.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  
  constructor(private route: Router, private signupservice: SignupService) { }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  createAccount() {

    if(this.form.invalid) {
      return;
    }

    let user = {
       firstname: this.f.firstname.value,
       lastname: this.f.lastname.value,
       email: this.f.email.value,
       username: this.f.username.value,
       password: this.f.password.value
    };
    this.signupservice.createUser(user).subscribe(status => {
       this.route.navigate(['login']);
    },
    error => {
      console.log("...." + error);
    });
  }
}
