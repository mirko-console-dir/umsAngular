import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './classes/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'ums';
  /* nascondere form se non chiamato */
  showForm: boolean = false;
  /* per la verifica al save bisogna inizilizzare sempre partendo da un nuovo utente come classe attenzione! no interface la interface la teniamo per implementare la classe */
  userSelected: User = new User();
  updateUser(user: User) {
    this.showForm = true;
    this.userSelected = user;
  }
  newUser() {
    this.userSelected = new User();
    this.showForm = true;
  }
  isHomeRoute() {
    return this.router.url === '/';
  }
}
