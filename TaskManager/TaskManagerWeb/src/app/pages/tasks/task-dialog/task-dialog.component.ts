import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  form: FormGroup;
  isEditMode: boolean = false;
  users: any[] = [];
  role: string | null;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private auth: AuthService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.role = this.auth.getUserRole();

    this.GetUsers();
    this.isEditMode = !!data?.task;
    this.form = this.fb.group({
      title: [data?.task?.title || '', Validators.required],
      description: [data?.task?.description || '', Validators.required],
      userId: [data?.task?.userId || '', Validators.required],
      status: [data?.task?.status || 'Pending', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      let data = {
        Title: this.form.get('title')?.value,
        Description: this.form.get('description')?.value,
        Status: this.form.get('status')?.value,
        UserId: this.form.get('userId')?.value,
      };
      this.dialogRef.close(data);
    } else {
      this.snackBar.open('Fill Required !', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
    }
  }

  async GetUsers() {
    await this.userService
      .GetUsers()
      .toPromise()
      .then((data) => {
        this.users = data;
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
