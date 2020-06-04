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
import { GeneratePlanComponent } from './core/pages/generate-plan/generate-plan.component';
import { CollectionMapDialogComponent } from './shared/collection/collection-map-dialog/collection-map-dialog.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DialogConfirmComponent } from './landing/dialog-confirm/dialog-confirm.component';
import { AttractionDetailComponent } from './shared/attraction-card/attraction-detail/attraction-detail.component';
import { MyPlansComponent } from './core/pages/myplans/myplans.component';
import { ExamplesComponent } from './core/pages/examples/examples.component';
import { PlanCardComponent } from './shared/plan-card/plan-card.component';
import { PlanCardDialogComponent } from './shared/plan-card/plan-card-dialog/plan-card-dialog.component';

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
    ExploreComponent,
    GeneratePlanComponent,
    CollectionMapDialogComponent,
    DialogConfirmComponent,
    AttractionDetailComponent,
    MyPlansComponent,
    ExamplesComponent,
    PlanCardComponent,
    PlanCardDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    HttpClientModule,
    GoogleMapsModule
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
