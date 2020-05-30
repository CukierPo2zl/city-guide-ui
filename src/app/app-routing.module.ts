import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CoreComponent } from './core/core.component';
import { AuthGuardService } from './services/auth.guard';
import { ProfileComponent } from './core/pages/profile/profile.component';
import { ExploreComponent } from './core/pages/explore/explore.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'app', component: CoreComponent, children: [
    {path: '', component: ExploreComponent},
    { path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService] },
  ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
