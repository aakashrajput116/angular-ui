import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private message: string;

  constructor(private router: Router) {
    this.message = "";
  }

  login(objUserDetail: any) {
    if (objUserDetail.UserId == 0) {
      localStorage.removeItem('userDetails');
      this.loggedIn = false;
      this.message = "Please enter valid username & password !";
    } else {
      this.message = "";
      localStorage.setItem('userDetails', JSON.stringify(objUserDetail));
      this.loggedIn = true;
      this.router.navigate(['/home/shop']);
    }
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/pages/login']);
  }

  public getMessage(): string {
    return this.message;
  }

}
