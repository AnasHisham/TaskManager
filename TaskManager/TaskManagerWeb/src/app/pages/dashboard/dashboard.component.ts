import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  role: string | null;
  username: string | null;

  constructor(private auth: AuthService) {
    this.role = this.auth.getUserRole();
    this.username = this.auth.getUsername();
  }

  logout() {
    this.auth.logout();
  }
}
