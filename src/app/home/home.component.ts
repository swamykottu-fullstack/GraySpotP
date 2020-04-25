import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router ,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
