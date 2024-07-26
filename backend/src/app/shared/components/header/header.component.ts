import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  open: boolean = false;
  openNav: boolean = false;

  constructor(public _navService: NavService) { }

  ngOnInit(): void {
  }

  collapseSidebar() {
    // for toggle logo only in header.component.html page ([class.open]="open")
    this.open = !this.open;

    // for toggle whole sidebar in content-layout.component.html ([class.open]="_navService.collapseSidebar")
    this._navService.collapseSidebar = !this._navService.collapseSidebar;
  }

  openMobileNav() {
    // for mobile view
    this.openNav = !this.openNav;
  }

}
