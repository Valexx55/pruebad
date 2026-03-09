import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //parte js
  protected readonly title = signal('App Prueba Minsait');

  constructor()
  {
    console.log(" en el constructor")
  }

  saluda()
  {
    console.log(" HOla en saluda")
  }
}
