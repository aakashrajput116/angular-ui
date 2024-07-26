import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  @Input() tagsFiltersInput: any = [];
  @Output() tagFiltersOutput: EventEmitter<any[]> = new EventEmitter<any[]>();

  checkedTagArray: any = [];

  constructor() { }

  ngOnInit(): void {
    this.tagFiltersOutput.emit(this.checkedTagArray);

    $(".collapse-block-title1").on('click', function (e) {
      e.preventDefault();

      let speed = 300; // millisecond
      let thisItem = $(this).parent();
      let nextLevel = $(this).next(".collection-collapse-block-content1");

      if (thisItem.hasClass('open')) {
        thisItem.removeClass('open');
        nextLevel.slideUp(speed);
      } else {
        thisItem.addClass('open');
        nextLevel.slideDown(speed);
      }
    });
  }

  checkedFilter(event: any) {
    if (event.target.checked) {
      this.checkedTagArray.push(event.target.value); // to add
    } else {
      let index = this.checkedTagArray.indexOf(event.target.value);
      this.checkedTagArray.splice(index, 1); // to remove
    }

    this.tagFiltersOutput.emit(this.checkedTagArray);
  }

}
