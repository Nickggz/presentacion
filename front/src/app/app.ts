import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NotificationComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  //NADA POR AQUI TODAVÍA
}
