import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { NbCardModule, NbIconModule, NbInputModule, NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { AuthGuard } from '../auth-guard.service';
import { LoginGuard } from '../login-guard.service';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';



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
    NbInputModule,
    NbEvaIconsModule,
    NbIconModule,
  ],
  exports: [
    LoaderComponent,
    NbCardModule,
    NbInputModule,
    FormsModule,
    NbEvaIconsModule,
    NbIconModule
  ],
  providers: [
    AuthGuard,
    LoginGuard
  ]
})
export class SharedModule { }
