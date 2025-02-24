import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MainComponent} from './components/main/main.component';
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'},
];
