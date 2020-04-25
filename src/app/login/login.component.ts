import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private authentication: AuthenticationService, private authenticationService: AuthenticationService,
    private router: Router, public dialog: MatDialog) {
    // redirect to home if already logged in
    if (this.authenticationService.getCurrentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  loginsubmit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    this.authentication.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(
      data => {
        if (this.authenticationService.getCurrentUser) {
          this.router.navigate(['/']);
        }
      },
      error => {
        // console.log('message' + error);
        this.openDialog();
      }
    )
  }

  signup() {
    this.router.navigate(['signup']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '300px',
      data: {title: "Message", message: "Username or password is incorrect"}
    })
    dialogRef.afterClosed().subscribe(result => {
       console.log("Dialog is closed");
    });
  }
}
