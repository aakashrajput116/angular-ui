import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/classess/products';
import * as $ from 'jquery';

@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.scss']
})
export class ProductTabComponent implements OnInit {
  @Input() products: Product[];

  constructor() { }

  ngOnInit(): void {
    $(".default").css("display", "block");
    $(".tabs li a").on('click', function () {
      event.preventDefault();
      $(this).parent().parent().find("li").removeClass("current"); // find all li of ul (Parent of anchor tag and remove class )
      $(this).parent().addClass("current"); // add class in current li on which you have clicked

      let current_href = $(this).attr("href"); // get href attr value of current anchot tag
      $('#' + current_href).show();

      //hide section which is not match with current href attr value
      //$(this).parent().parent().parent().find(".tab-content").not('#' + current_href).hide(); 
      $(this).parent().parent().parent().find(".tab-content").not('#' + current_href).css("display", "none");

    });
  }

}
