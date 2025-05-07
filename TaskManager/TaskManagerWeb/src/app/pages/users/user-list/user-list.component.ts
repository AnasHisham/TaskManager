import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: any[] = [];
  username: string | null;
  displayedColumns: string[] = ['Username', 'Role', 'actions'];
  dataSource = new MatTableDataSource<any>(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {
    this.username = this.auth.getUsername();
  }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    await this.userService
      .GetUsers()
      .toPromise()
      .then((data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource<any>(this.users);
        this.dataSource.paginator = this.paginator;
      });
  }

  DeleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this user With All tasks?',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        // User confirmed
        await this.userService
          .DeleteUser(id)
          .toPromise()
          .then((data) => {
            this.snackBar.open('Operation done successful', 'Close', {
              duration: 3000,
            });
            this.loadUsers();
          });
      }
    });
  }
  openDialog(user?: any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '800px',
      data: { user },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        if (user) {
          // Update
          result.id = user.id;
          await this.userService
            .UpdateUser(user.id, result)
            .toPromise()
            .then((data) => {
              this.snackBar.open('Operation done successful', 'Close', {
                duration: 3000,
                panelClass: ['snackbar-success'],
              });
              this.loadUsers();
            })
            .catch((error) => {
              this.snackBar.open(error.error, 'Close', {
                duration: 3000,
              });
            });
        } else {
          // Create
          await this.userService
            .CreateUser(result)
            .toPromise()
            .then((data) => {
              this.snackBar.open('Operation done successful', 'Close', {
                duration: 3000,
              });
              this.loadUsers();
            })
            .catch((error) => {
              this.snackBar.open(error.error, 'Close', {
                duration: 3000,
              });
            });
        }
      }
    });
  }
}
