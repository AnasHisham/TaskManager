import { Component } from '@angular/core';
import { LoadingService } from './core/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'task-manager-angular';
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
