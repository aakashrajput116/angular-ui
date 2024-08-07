import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-feather-icon',
  templateUrl: './feather-icon.component.html',
  styleUrls: ['./feather-icon.component.scss']
})
export class FeatherIconComponent implements OnInit, AfterViewInit {
  @Input('icon') feathericon;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    // Response after angular initialize the component and child component
    feather.replace();
  }

}
