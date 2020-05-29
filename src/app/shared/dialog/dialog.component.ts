import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-tools',
  template: `
    <div class="auth">
    <button [appNavBtn]="color" (click)="openDialog()">sign in</button>
  </div>

  `,
  styleUrls: ['./dialog.component.scss']
})
export class DialogToolsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @Input() color: string;

  ngOnInit(): void { }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}



@Component({
  selector: 'app-dialog',
  template: `
  <h1>Sign in</h1>
  <form [formGroup]="stateForm" (ngSubmit)="onSubmit()">
  <mat-error *ngIf="serverError">Nieprawidłowy email lub hasło</mat-error>
<mat-form-field class="full-width">
  <mat-label>Email</mat-label>
  <input matInput  placeholder="Ex. pat@example.com" formControlName="email">
</mat-form-field>

<mat-form-field class="full-width">
  <mat-label>Enter your password</mat-label>
  <input matInput [type]="hide ? 'password' : 'text'" formControlName="password">
  <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'"
    [attr.aria-pressed]="hide">
    <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
  </button>
</mat-form-field>
<app-button type="submit" btnType="outline full-width">Sign in</app-button>

</form>
  `,
})
export class DialogComponent {

  constructor(
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<DialogComponent>,
    private router: Router
  ) { }

  serverError: boolean;
  stateForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  hide = true;

  onSubmit() {
    this.authService.login(this.stateForm.get('email').value, this.stateForm.get('password').value)
      .subscribe(() => {
        this.dialogRef.close();
        this.router.navigate(['/app']);
      }, error => {
          this.serverError = true;
        }
      );
  }
}
