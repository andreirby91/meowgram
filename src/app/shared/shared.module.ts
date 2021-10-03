import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { NbCardModule, NbInputModule, NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { AuthGuard } from '../auth-guard.service';
import { LoginGuard } from '../login-guard.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbSpinnerModule,
    NbToastrModule.forRoot(),
    NbCardModule,
    NbInputModule
  ],
  exports: [
    LoaderComponent,
    NbCardModule,
    NbInputModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    LoginGuard
  ]
})
export class SharedModule { }
