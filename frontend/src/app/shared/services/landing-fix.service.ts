import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LandingFixService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  // Add or Remove class
  addNavFix() {
    this.document.getElementById("mySidenav").classList.add("open-side");
  }

  removeNavFix() {
    this.document.getElementById("mySidenav").classList.remove("open-side");
  }

}
