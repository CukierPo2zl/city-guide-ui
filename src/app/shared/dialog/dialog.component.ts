import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-tools',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogToolsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @Input() color: string;

  ngOnInit(): void {  }
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
 <form class="example-form">

<mat-form-field class="full-width">
  <mat-label>Email</mat-label>
  <input matInput [formControl]="emailFormControl" placeholder="Ex. pat@example.com">
  <mat-error *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
    Please enter a valid email address
  </mat-error>
  <mat-error *ngIf="emailFormControl.hasError('required')">
    Email is <strong>required</strong>
  </mat-error>
</mat-form-field>

<mat-form-field class="full-width">
  <mat-label>Enter your password</mat-label>
  <input matInput [type]="hide ? 'password' : 'text'">
  <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'"
    [attr.aria-pressed]="hide">
    <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
  </button>
</mat-form-field>
<app-button type="outline full-width">Sign in</app-button>

</form>
  `,
})
export class DialogComponent {

  constructor() { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hide = true;

}
