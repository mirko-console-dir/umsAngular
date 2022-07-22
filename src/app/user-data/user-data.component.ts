import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/User';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  public title = 'Show User Detail';

  public user: User;
  /*   per attivare e catturare l'id dell'ho show usiamo l'activated route*/
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* inizializziamo un user nuovo in modo tale da aspettare la risposta asincrona della subscribe per this.user = res.data */
    this.user = new User();
    /* ci abboniamo al servizio */
    this.route.params.subscribe((params) => {
      /* prendiamo dal db in lostro user */
      this.userService.getUser(+params['id']).subscribe((res) => {
        this.user = res.data;
      });
    });
  }
  backTousers() {
    this.router.navigate(['users']);
  }
}
