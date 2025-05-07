import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from 'src/app/service/task.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: any[] = [];
  role: string | null;
  searchStatus: string = '';
  searchUser: any = '-1';
  users: any[] = [];

  displayedColumns: string[] = [
    'Title',
    'Description',
    'User',
    'Status',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>(this.tasks);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private taskService: TaskService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.role = this.auth.getUserRole();
  }

  ngOnInit() {
    this.GetUsers();
  }

  async SearchTasks() {
    if (this.role == 'Admin') {
      await this.taskService
        .GetTasks(this.searchUser, this.searchStatus)
        .toPromise()
        .then((data) => {
          this.tasks = data;
          this.dataSource = new MatTableDataSource<any>(this.tasks);
          this.dataSource.paginator = this.paginator;
        });
    } else {
      await this.taskService
        .GetMyTasks()
        .toPromise()
        .then((data) => {
          this.tasks = data;
          this.dataSource = new MatTableDataSource<any>(this.tasks);
          this.dataSource.paginator = this.paginator;
        });
    }
  }

  async updateStatus(taskId: number, newStatus: string) {
    await this.taskService
      .UpdateStatus(taskId, newStatus)
      .toPromise()
      .then((data) => {
        this.SearchTasks();
      });
  }

  openDialog(task?: any) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '800px',
      data: { task },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      debugger;
      if (result) {
        if (task) {
          // Update
          result.id = task.id;
          await this.taskService
            .UpdateTask(task.id, result)
            .toPromise()
            .then((data) => {
              this.snackBar.open('Operation done successful', 'Close', {
                duration: 3000,
              });
              this.SearchTasks();
            })
            .catch((error) => {
              this.snackBar.open(error.error, 'Close', {
                duration: 3000,
              });
            });
        } else {
          // Create
          await this.taskService
            .CreateTask(result)
            .toPromise()
            .then((data) => {
              this.snackBar.open('Operation done successful', 'Close', {
                duration: 3000,
              });
              this.SearchTasks();
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

  DeleteTask(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this task ?',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        // User confirmed
        await this.taskService
          .DeleteTask(id)
          .toPromise()
          .then((data) => {
            this.snackBar.open('Operation done successful', 'Close', {
              duration: 3000,
            });
            this.SearchTasks();
          });
      }
    });
  }

  async GetUsers() {
    await this.userService
      .GetUsers()
      .toPromise()
      .then((data) => {
        this.users = data;
      });
  }
  deleteSelectedUser() {
    if (this.searchUser) {
      this.searchUser = -1;
    }
  }
}
