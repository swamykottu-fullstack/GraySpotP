import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
