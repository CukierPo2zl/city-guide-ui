import { Component } from '@angular/core';
import { AuthenticationService } from './services/auth.service';
import { AuthGuardService } from './services/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'city-guide';
  // constructor(){}
}
