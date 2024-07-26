import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classess/products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit {
  products: Product[] = [];
  items: Product[] = [];
  allItems: Product[] = [];
  colorFilters: any = [];
  tagFilters: any = [];
  tags: any = [];
  colors: any = [];
  IsMen: boolean = true;
  finished: boolean = false;
  lastKey: number = 0;

  constructor(private route: ActivatedRoute, private _productsService: ProductsService) {
    this.route.params.subscribe(params => {
      let category = params['category'];
      if (category == 'men') {
        this.IsMen = true;
      } else {
        this.IsMen = false;
      }

      this._productsService.getProductByCategory(category).subscribe(res => {
        this.allItems = res;
        this.products = res.slice(0, 8)// only 8 item
        this.items = this.products;
        this.getTags(res);
        this.getColors(res);
      });
    });
  }

  ngOnInit(): void {
  }

  getTags(products: any) {
    let uniqueBrands = [];
    let itemBrands = [];
    // get unique tags
    products.map((product) => {
      if (product.tags) {
        product.tags.map((tag) => {
          let index = uniqueBrands.indexOf(tag);
          if (index === -1) {
            uniqueBrands.push(tag);
          }
        });
      }
    });

    for (let i = 0; i < uniqueBrands.length; i++) {
      itemBrands.push({ brand: uniqueBrands[i] });
    }
    this.tags = itemBrands;
  }
  getColors(products: any) {
    let uniqueColors = [];
    let itemColors = [];
    // get unique tags
    products.map((product) => {
      if (product.colors) {
        product.colors.map((color) => {
          let index = uniqueColors.indexOf(color);
          if (index === -1) {
            uniqueColors.push(color);
          }
        });
      }
    });

    for (let i = 0; i < uniqueColors.length; i++) {
      itemColors.push({ color: uniqueColors[i] });
    }
    this.colors = itemColors;
  }

// for filter come through @output  dec
  updateTagFilters(tags: any) {
    this.tagFilters = tags;
  }
// for filter come through @output  dec
  updateColorFilters(colors: any) {
    this.colorFilters = colors;
  }
// for filter come through @output  dec
  updatePriceFilters(price: any) {
    let items: any = [];
    this.products.filter((item) => {
      if (item.price >= price[0] && item.price <= price[1]) {
        items.push(item);
      }
    });
    this.items = items;
  }

  // filter prodcut
  filterItems(): Product[] {
    let itemData = this.items.filter((item: Product) => {

      let Colors: boolean = this.colorFilters.reduce((total, curr) => {
        if (item.colors) {
          if (item.colors.includes(curr.color)) {
            return true;
          }
        }
      }, true);

      let Tags: boolean = this.tagFilters.reduce((total, curr) => {
        if (item.tags) {
          if (item.tags.includes(curr)) {
            return true;
          }
        }
      }, true);

      return Colors && Tags;
    });

    return itemData;
  }

  twoCol() {
    $(".product-wrapper-grid").children().children().children().removeClass();
    $(".product-wrapper-grid").children().children().children().addClass("col-lg-6");
  }

  threeCol() {
    $(".product-wrapper-grid").children().children().children().removeClass();
    $(".product-wrapper-grid").children().children().children().addClass("col-lg-4");
  }

  fourCol() {
    $(".product-wrapper-grid").children().children().children().removeClass();
    $(".product-wrapper-grid").children().children().children().addClass("col-lg-3");
  }

  sixCol() {
    $(".product-wrapper-grid").children().children().children().removeClass();
    $(".product-wrapper-grid").children().children().children().addClass("col-lg-2");
  }
// for lazy loading implementation
  onScroll() {
    this.lastKey = this.allItems[this.allItems.length - 1]['id']; // get last record id value
    let currentKey = this.products[this.products.length - 1]['id']; // get current till record id value
    if (this.lastKey != currentKey) {
      this.finished = false;
    } else {
      this.finished = true;
    }

    if (this.products.length < this.allItems.length) {
      let len = this.products.length;
      for (let i = len; i < len + 4; i++) { // only 4 item add on every on scroll event
        if (this.allItems[i] == undefined) {
          return true;
        } 
        this.products.push(this.allItems[i]);
      }
    }
  }
}
