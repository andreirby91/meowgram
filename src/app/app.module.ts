import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbListModule, NbUserModule, NbAutocompleteModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { NbAuthModule, NbAuthSimpleToken, NbDummyAuthStrategy } from '@nebular/auth';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsComponent } from './pages/details/details.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbListModule,
    NbUserModule,
    NbSelectModule,
    NbAutocompleteModule,
    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'dummy',

          token: {
            class: NbAuthSimpleToken,
            key: 'my-secret-token',
          },

          delay: 1000
        }),
      ],
      forms: {},
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
