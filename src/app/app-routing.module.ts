import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { LoginGuard } from './login-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "auth",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard]
  },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'details/:id', canActivate: [AuthGuard], component: DetailsComponent },
  { path: '404', component: DetailsComponent },
  { path: "**", redirectTo: "auth/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
