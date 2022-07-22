import { UserInterface } from '../interfaces/user';
export class User implements UserInterface {
  id: number;
  name: string;
  lastname: string;
  age: number;
  adress: string;
  city: string;
  province: string;
  cap: string;
  phone: string;
  email: string;
  password: string;

  /* inizializziamo l'oggetto default */
  constructor() {
    this.id = 0;
    this.name = '';
    this.lastname = '';
    this.age = 18;
    this.adress = '';
    this.city = '';
    this.province = '';
    this.cap = '';
    this.phone = '';
    this.email = '';
    this.password = '';
  }
}
