import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CoreComponent } from './core/core.component';
import { AuthGuardService } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'app', component: CoreComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
