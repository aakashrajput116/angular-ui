import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterOneComponent } from './footer/footer-one/footer-one.component';
import { CategoriesComponent } from './footer/widgets/categories/categories.component';
import { CopyrightsComponent } from './footer/widgets/copyrights/copyrights.component';
import { InformationComponent } from './footer/widgets/information/information.component';
import { SocialComponent } from './footer/widgets/social/social.component';
import { WhyWeChooseComponent } from './footer/widgets/why-we-choose/why-we-choose.component';
import { HeaderOneComponent } from './header/header-one/header-one.component';
import { LeftMenuComponent } from './header/widgets/left-menu/left-menu.component';
import { NavbarComponent } from './header/widgets/navbar/navbar.component';
import { SettingComponent } from './header/widgets/setting/setting.component';
import { TopbarComponent } from './header/widgets/topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [FooterOneComponent, CategoriesComponent, CopyrightsComponent, InformationComponent, SocialComponent, WhyWeChooseComponent, HeaderOneComponent, LeftMenuComponent, NavbarComponent, SettingComponent, TopbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [HeaderOneComponent, FooterOneComponent]
})
export class SharedModule { }
