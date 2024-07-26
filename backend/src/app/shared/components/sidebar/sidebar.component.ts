import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Global } from '../../global';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: Menu[];
  fullName: string;
  userType: string;
  imagePath = "assets/images/user.png";

  constructor(public _navService: NavService) {
    this.menuItems = _navService.MENUITEMS;
  }

  ngOnInit(): void {
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));

    this.fullName = `${userDetails.firstName} ${userDetails.lastName}`;
    this.userType = userDetails.userType;
    this.imagePath = Global.BASE_USER_IMAGES_PATH + userDetails.imagePath;
  }

  // for toggle menu link
  toggleNavActive(item: any) {
    item.active = !item.active;
  }

}
