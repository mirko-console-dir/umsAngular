import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  public title = 'User';
  /* ascoltiamo la vaiabile in input user che quando cambia mi popola il valore lella mia userCopy per il reset del form in contesto edit in modo da non resettare tutti i valori come in contesto new user*/
  private userCopy: User;
  /* USIAMO SETTER AND GETTER  */
  private __user: User;
  @Input() set user(user: User) {
    this.__user = user;
    /* mappiamo userCopy */
    this.userCopy = Object.assign({}, user);
  }
  get user() {
    /* ritorno la copia */
    return this.__user;
  }

  //riceviamo in imput user andare nel tag html principale del componente e indicare l'input, direttiva ng-model nel template del component
  /* @Input() user: User;  */
  /* inizializzare l'user service per utilizzarlo dichiarando e inizializzando direttamente con la private variable nel cotructor*/
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private form: FormsModule
  ) {}
  /* inizializzare un nuovo oggetto user vuoto con id = 0, nel caso carichiamo il componente dell'activateroute*/
  ngOnInit(): void {
    this.user = new User();
    /* abboniamoci al servizio, non appena viene attivata la rotta avremmo accesso a una variable avendo accesso all'id che viene passato alla rotta, inizializzando utente a quel id user.service getUser(), cast a number */
    this.route.params.subscribe((params) => {
      /* userdetail sia per indserimento che modifica duqnue se non c'è id è inutile vedere i riferimenti perchè siamo in creazione e non modifica */
      if (!params['id']) {
        return;
      }
      /* this.user = this.userService.getUser(+params['id']); non essendo un observable ma un array ci serve la subscribe */
      this.userService.getUser(+params['id']).subscribe((res) => {
        this.user = res.data;
      });
    });
  }
  isHomeRoute() {
    return this.router.url === '/users/new';
  }
  backTousers() {
    this.router.navigate(['users']);
  }
  resetForm(form) {
    /* in contesto new user */
    if (this.user.id === 0) {
      this.user = new User();
    } else {
      /* in contesto edit form */
      this.user = this.userCopy;
    }
  }
  updateUser() {
    /* quando la chiamata è ritornata parte di subscribe */
    this.userService.updateUser(this.user).subscribe((res) => {
      if (res.success) {
        alert(res.message);
        this.router.navigate(['users']);
      } else {
        /* andare nell'user controller per inserire i messaaggi */
        alert(res.message);
      }
    });
  }
  createUser() {
    this.userService.createUser(this.user).subscribe((res) => {
      if (res.success) {
        alert(res.message);
        this.router.navigate(['users']);
      } else {
        /* andare nell'user controller per inserire i messaaggi */
        alert(res.message);
      }
    });
  }
  saveUser() {
    if (this.user.id > 0) {
      this.updateUser();
    } else {
      this.createUser();
    }
    /* una volta salvato sopra lo mandiamo all'elenco utenti */
    //this.router.navigate(['users']) inserito in res success sopra;
  }
}
