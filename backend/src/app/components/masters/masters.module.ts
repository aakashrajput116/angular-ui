import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';

import { CategoryComponent } from './category/category.component';
import { ColorComponent } from './color/color.component';
import { SizeComponent } from './size/size.component';
import { TagComponent } from './tag/tag.component';
import { UsertypeComponent } from './usertype/usertype.component';
import { BrandlogoComponent } from './brandlogo/brandlogo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [BrandlogoComponent, CategoryComponent, ColorComponent, SizeComponent, TagComponent, UsertypeComponent],
  imports: [
    CommonModule,
    MastersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    NgxDatatableModule
  ]
})
export class MastersModule { }
