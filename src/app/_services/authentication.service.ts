import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
     this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
     this.currentUser = this.currentUserSubject.asObservable();
   }

  public get getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) : Observable<any> {
    return this.http.post<any>(environment.appURL + 'User/authenticate', {username: username, password: password}).
    pipe(map(user => {
           localStorage.setItem('currentUser', JSON.stringify(user));
           this.currentUserSubject.next(user);
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
