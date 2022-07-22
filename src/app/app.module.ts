import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* import modulo per ngmodel form */
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* modo 3 import { UserService } from './user.service'; */
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NavComponent } from './nav/nav.component';
import { UserDataComponent } from './user-data/user-data.component';

/* per far comunicare la nostra parte user con url diverso da db/api */
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';

/* definiamo elenco le rotte, ogni oggetto sarà un url
 */ const routes: Routes = [
  {
    path: 'users',
    /* cosa voglio renderizzare */
    component: UsersComponent,
  },
  {
    path: ' ',
    /* ridirezionare osa voglio renderizzare */
    redirectTo: 'users',
    pathMatch: 'full' /* corrispondenza esatta */,
  },
  {
    path: 'users/new',
    /* cosa voglio renderizzare */
    component: UserDetailComponent,
  },
  {
    /* il :id cattura qualsiasi parametro tra /users/ .. / edit, catturiamo con servizio del router module activateroute per leggere il parametro e inizializzare la var User nel user detail componet */
    path: 'users/:id/edit',
    /* cosa voglio renderizzare */
    component: UserDetailComponent,
  },
  {
    path: 'users/:id',
    /* cosa voglio renderizzare */
    component: UserDataComponent,
  },
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    UserDetailComponent,
    NavComponent,
    UserDataComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    /* passiamo il modulo router, e indicare per quale rotta passandogli le rotte*/
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  /* 3 modo */
  /* providers: [UserService], */
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
