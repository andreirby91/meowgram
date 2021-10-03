import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { AuthGuard } from '../auth-guard.service';
import { LoginGuard } from '../login-guard.service';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    NbSpinnerModule,
    NbToastrModule.forRoot()
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    AuthGuard,
    LoginGuard
  ]
})
export class SharedModule { }
