import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app-root.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Workassistance-Helper');
}
