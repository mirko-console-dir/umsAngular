import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../classes/User';

@Component({
  /* se fosse un div andrebbe bene ma 
  selector: 'app-user', */

  /* per formattarlo correttamente in una tabella come elemento di essa, usare il selettore come attributo e non come elemento*/
  selector: 'tr[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  /* stiamo dicendo che la variabile user può ricevere dati, 'user-data' è l'alias per usare la variabile in modo globale ma nel component usiamo comunque user*/
  /* user lo trasformiamo da tipo any a tipo User .. dobbiamo mettere anche | undifined altrimenti da errore e nel template mettere il ? */
  @Input('user-data') user: User | undefined;
  /* per lasciare il padre in ascolto */
  @Output('onDeleteUser') userDelete = new EventEmitter();
  @Output('onSelectUser') onSelectUser = new EventEmitter();

  /* per prendere il servizio indicarlo come parametro nel costructor */
  /* inseriamo il Router per navigare */
  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {}
  /* deleteUser(user: any): void {
    alert(this.user.name);
  } */
  /* modificato da any a User per l'interface */
  deleteUser() {
    /* INPUT
    this.userService.deleteUser(this.user); INPUT */
    /* OUTPUT */
    this.userDelete.emit(this.user);
  }
  /* carica modifica */
  updateUser() {
    /* utilizziamo il metodo modifica per fare la navigazione del reouter con navigate che cortruisce l'url e mostrarlo nel componente user-detail*/
    this.route.navigate(['users', this.user.id, 'edit']);
    /* emettere */
    this.onSelectUser.emit(this.user);
  }
  showUserDetail() {
    this.route.navigate(['users', this.user.id]);
  }
}
