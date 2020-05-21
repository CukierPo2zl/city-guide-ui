import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DialogToolsComponent, DialogComponent } from './shared/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { ButtonComponent } from './shared/button/button.component';
import { CoreComponent } from './core/core.component';
import { ButtonDirective } from './shared/directives/button.directive';
import { NavComponent } from './shared/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FilterComponent } from './core/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { AttractionCardComponent } from './shared/attraction-card/attraction-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DialogComponent,
    ButtonComponent,
    CoreComponent,
    ButtonDirective,
    DialogToolsComponent,
    NavComponent,
    FilterComponent,
    AttractionCardComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
