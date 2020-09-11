import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './student/home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentgaurdService } from './studentgaurd.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'student-home', component: HomeComponent, 
    canActivate: [StudentgaurdService], 
    data: { 
      expectedRole: 'student'
    }
  },
  {
    path: '*',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
