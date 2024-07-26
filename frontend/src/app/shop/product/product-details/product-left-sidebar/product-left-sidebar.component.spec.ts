import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLeftSidebarComponent } from './product-left-sidebar.component';

describe('ProductLeftSidebarComponent', () => {
  let component: ProductLeftSidebarComponent;
  let fixture: ComponentFixture<ProductLeftSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLeftSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
