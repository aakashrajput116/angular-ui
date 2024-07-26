import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null); // token User
  private loggedIn = new BehaviorSubject<any>(null);
  private message: string;

  getMessage(): string {
    return this.message;
  }

  get currentUser() {
    return this.currentUserSubject.asObservable();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) {
    this.message = "";
  }

  login(objUserDetails: any) {
    if (objUserDetails.id == 0) {
      localStorage.removeItem("UserDetails");
      this.loggedIn.next(false);
      this.currentUserSubject.next(null);
      this.message = "Please enter valid user name and password !!";
    } else {
      this.currentUserSubject.next(objUserDetails); // for token use
      this.message = "";
      localStorage.setItem("UserDetails", JSON.stringify(objUserDetails));
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard/default']);
    }
  }

  logout() {
    localStorage.clear();
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

}
