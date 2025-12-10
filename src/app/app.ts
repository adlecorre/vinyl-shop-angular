import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared-module/navbar/navbar';
import { HeaderComponent } from './components/shared-module/header/header';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestion-vinyle');
}
