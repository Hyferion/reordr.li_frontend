import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reordro';

  constructor(private router: Router) {}


  loggedIn() {
    return localStorage.getItem('access_token') !== null;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('home');
  }
}
