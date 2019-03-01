import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import AboutComponent from './about.component';
import AnimatedInputComponent from './animated-input.component';
import AppComponent from './app.component';
import LogInComponent from './login.component';
import NavComponent from './nav.component';
import SessionComponent from './session.component';
import SignUpComponent from './signup.component';
import StoreComponent from './store.component';

import InputErrorDirective from './input-error.directive';

import ToInputClassPipe from './to-input-class.pipe';
import ReduceWhitespacePipe from './reduce-whitespace.pipe';

import UserService from './user.service';
import RoutingService from './routing.service';

import {
  formData,
  formDataToken,
  navigationData,
  navigationDataToken,
  sessionDataToken,
  sessionData,
} from './providers';

import { reducers, metaReducers } from './reducers/index';

import UserEffects from './effects/user.effects';

import { routing } from './app.routing';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    EffectsModule.forRoot([UserEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument(),
  ],
  declarations: [
    AboutComponent,
    AnimatedInputComponent,
    AppComponent,
    InputErrorDirective,
    LogInComponent,
    NavComponent,
    ReduceWhitespacePipe,
    SessionComponent,
    SignUpComponent,
    StoreComponent,
    ToInputClassPipe,
  ],
  providers: [
    RoutingService,
    UserService,
    { provide: formDataToken, useValue: formData },
    { provide: navigationDataToken, useValue: navigationData },
    { provide: sessionDataToken, useValue: sessionData },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
