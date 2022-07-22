import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/User';

/* per tipificare risposta server */
interface UsersResponse {
  data: User[];
  message: string;
}
/* ritorna itente */
interface UserResponse {
  data: User;
  message: string;
  success: boolean;
}

/* serve a dire che è inettabile in metodi o costrutti 
metodo 2 3
@Injectable() */
/* metodo 4 indicando direttamente nell' @Injectable() la prorpietà providedIn */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    /* QUESTI DATI LI ANDIAMO A PRENDERE NEL SERVER
    {
      id: 1,
      name: 'Mirko',
      lastname: 'S',
      age: 23,
      adress: 'via sanzio',
      city: 'vignate',
      province: 'mi',
      cap: '20060',
      phone: '3312321311',
      email: 'mirko@mirko.com',
    },
    {
      id: 2,
      name: 'Mirko',
      lastname: 'S',
      age: 23,
      adress: 'via sanzio',
      city: 'vignate',
      province: 'mi',
      cap: '20060',
      phone: '3312321311',
      email: 'mirko@mirko.com',
    },
    {
      id: 3,
      name: 'Mirko',
      lastname: 'S',
      age: 23,
      adress: 'via sanzio',
      city: 'vignate',
      province: 'mi',
      cap: '20060',
      phone: '3312321311',
      email: 'mirko@mirko.com',
    }, */
  ];
  private apiurl = 'http://127.0.0.1:8000/api/users';
  constructor(private http: HttpClient) {}

  getUsers() {
    /* return this.users; */
    return this.http.get<UsersResponse>(
      this.apiurl
    ); /* ritorna tipo UserResponse */
  }
  /* per il router ActivatedRoute */
  getUser(id: number) /* : User */ {
    /* come in update user andiamo a filtrarci gli elementi per prenderci quello con stesso id (versione con data nel progetto) */
    /* return this.users.find((user) => user.id === id); */
    /* versione con data in laravel altro host 
    return utente */
    return this.http.get<UserResponse>(this.apiurl + '/' + id);
  }

  deleteUser(user: User) {
    /* versione senza laravel
    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
    }
     */
    /* versione con laravel */
    return this.http.delete<UserResponse>(this.apiurl + '/' + user.id);
  }
  updateUser(user: User) {
    /* trovare utente con quel user.id versione dati stesso host*/
    /* const idx = this.users.findIndex((v) => v.id === user.id); */
    /* se id è trovato.. */
    /*  if (idx !== -1) { */
    /* allora quel user con quel id è da modificare */
    /*   this.users[idx] = user;
    } */
    /* versione con laravel per editare l'user id corrispondenet*/
    return this.http.patch<UserResponse>(this.apiurl + '/' + user.id, user);
  }
  createUser(user: User) {
    /* versione senza laravel */
    /* se siamo in creazione non c'è un id dunque per creare un id ..contatore +1 della lunghezza dell'array */
    /* this.users['id'] = this.users.length + 1; */
    /* splice inserisci alla posizione 0 eliminando 0 elem e mettici user */
    /* this.users.splice(0, 0, user); */
    /* versione con laravel */
    return this.http.post<UserResponse>(this.apiurl, user);
  }
}
