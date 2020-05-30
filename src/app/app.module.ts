import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AuthDialogToolsComponent, AuthDialogComponent } from './shared/auth-dialog/auth-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { ButtonComponent } from './shared/button/button.component';
import { CoreComponent } from './core/core.component';
import { ButtonDirective } from './shared/directives/button.directive';
import { NavComponent } from './shared/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FilterComponent } from './core/pages/explore/filter/filter.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AttractionCardComponent } from './shared/attraction-card/attraction-card.component';
import { CollectionComponent } from './shared/collection/collection.component';
import { CollectionDialogComponent } from './shared/collection/collection-dialog/collection-dialog.component';
import { TokenInterceptor } from './helpers/token.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ProfileComponent } from './core/pages/profile/profile.component';
import { ExploreComponent } from './core/pages/explore/explore.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AuthDialogComponent,
    ButtonComponent,
    CoreComponent,
    ButtonDirective,
    AuthDialogToolsComponent,
    NavComponent,
    FilterComponent,
    AttractionCardComponent,
    CollectionComponent,
    CollectionDialogComponent,
    ProfileComponent,
    ExploreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
