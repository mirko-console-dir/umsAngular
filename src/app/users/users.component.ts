import { Component, OnInit, Output, EventEmitter } from '@angular/core';
/* 4 modi per usare un servizio */
import { UserService } from '../services/user.service';

import { User } from '../classes/User';

@Component({
  selector: 'app-users',
  template: `<h2>U M System</h2>`,
  /* TemplateUrl vince su template */
  templateUrl: './users.component.html',
  /* lo style vince su styleUrls */
  styles: ['th {color: green}'],
  styleUrls: ['users.component.css'],
  /* metodo 3possiamo indicare il provider del servizio globalmente in app.modules.ts
  metodo 2 indicando il providers qui nel componente providers: [UserService], */
})
export class UsersComponent implements OnInit {
  title = 'All Users';
  /* bisogna indicare il tipo nel nuovo typescript se non è rilevabile evidentemente, any[] un array di qualsiasi tipo solo any vorrebbe dire qualsiasi valore */
  public users: User[] = [];
  /* <User> per dire parametro in entrata */
  @Output('updateUser') updateUser = new EventEmitter<User>();

  /* modo 1 senza providers con costrutto js*/
  /* constructor() {
    const svs = new UserService();
    this.users = svs.getUsers(); (inserire static davanti al metodo in service altrimenti da errore a this.users)
  } */
  /* modo 2 indicando providers indicati tra le proprietà @Component({ selector: 'app-sex'} ecc...) e Injectable() nel user.service*/
  /* modo 3 indicare il servizio come globale nei providers dei moduli app.modules.ts */
  /* 4 modo indicando direttamente nel servizio senza mettere providers in giro che è globale */
  constructor(private service: UserService) {
    /* istanziamo il servizio */
    /* this.users = service.getUsers(); */
  }
  /* hook a cui ci agganciamo per mostrare il componente quando è pronto */
  ngOnInit() {
    /* this.users = this.service.getUsers(); Dato che ora prendendo i dati dal server ci serve una subscribe*/
    this.service.getUsers().subscribe((res) => [(this.users = res['data'])]);
  }
  onDeleteUser(user: User) {
    this.service.deleteUser(user).subscribe((res) => {
      alert(res.message);
      this.service.getUsers().subscribe((res) => {
        /* fare update della griglia al termine */
        this.users = res['data'];
      });
      /* gestire errore client */
      (err: any) => {
        console.log(err);
      };
    });
  }
  onSelectUser(user: User) {
    /* passare una copia edll'oggetto al form così da modificare ng model solo al save */
    /* proprietà che prende l'oggetto messo come secondo parametro e la cera nel primo parametro */
    const userCopy = Object.assign({}, user);
    this.updateUser.emit(userCopy);
  }
}
