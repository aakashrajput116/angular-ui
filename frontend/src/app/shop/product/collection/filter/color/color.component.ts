import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  @Input() colorFiltersInput: any = [];
  @Output() colorFiltersOutput: EventEmitter<any[]> = new EventEmitter<any[]>();

  activeItem: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  changeColor(varColors: any) {
    debugger;
    this.activeItem = varColors.color;

    if (varColors.color) {
      this.colorFiltersOutput.emit([varColors]);
    } else {
      this.colorFiltersOutput.emit([]);
    }
  }

}
