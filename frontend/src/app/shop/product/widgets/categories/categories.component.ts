import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(".collapse-block-title2").on('click', function (e) {
      e.preventDefault();

      let speed = 300;
      let thisItem = $(this).parent();
      let nextLevel = $(this).next(".collection-collapse-block-content2");

      if (thisItem.hasClass('open')) {
        thisItem.removeClass('open');
        nextLevel.slideUp(speed);
      } else {
        thisItem.addClass('open');
        nextLevel.slideDown(speed);
      }

    });
  }

}
