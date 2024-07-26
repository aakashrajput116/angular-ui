import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DbOperation } from 'src/app/shared/db-operation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TextFieldValidator, NoWhiteSpaceValidator, NumericFieldValidator } from 'src/app/validations/validations.validator';
import { Global } from 'src/app/shared/global';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  submitted: boolean = false;
  dbops: DbOperation;
  productId: number = 0;
  productForm: FormGroup;
  counter: number = 1;
  objRow: any;
  bigImage = "assets/images/pro3/1.jpg";
  url = [
    { img: "assets/images/user.png" },
    { img: "assets/images/user.png" },
    { img: "assets/images/user.png" },
    { img: "assets/images/user.png" },
    { img: "assets/images/user.png" }
  ];

  @ViewChild('file') elfiles: ElementRef;

  buttonText: string = "";
  fileTobeUpload = [];
  objSizes = [];
  objCategories = [];
  objTags = [];
  objColors = [];


  formErrors = {
    name: '',
    title: '',
    code: '',
    price: '',
    salePrice: '',
    discount: '',
    sizeId: '',
    categoryId: '',
    tagId: '',
    colorId: ''
  };

  validationMessage = {
    name: {
      'required': 'Name is required',
      'minlength': 'Name cannot be less than 3 characters long',
      'maxlength': 'Name cannot be more than 10 characters long',
      'validTextField': 'Name must contains only numbers and latters',
      'noWhiteSpaceValidator': 'Only white space is not allowed'
    },
    title: {
      'required': 'Title is required',
      'minlength': 'Title cannot be less than 3 characters long',
      'maxlength': 'Title cannot be more than 10 characters long',
      'validTextField': 'Title must contains only numbers and latters',
      'noWhiteSpaceValidator': 'Only white space is not allowed'
    },
    code: {
      'required': 'Code is required',
      'minlength': 'Code cannot be less than 3 characters long',
      'maxlength': 'Code cannot be more than 10 characters long',
      'validTextField': 'Code must contains only numbers and latters',
      'noWhiteSpaceValidator': 'Only white space is not allowed'
    },
    price: {
      'required': 'Price is required',
      'minlength': 'Price cannot be less than 1 characters long',
      'maxlength': 'Price cannot be more than 10 characters long',
      'validNumericField': 'Price must contains only numbers',
      'noWhiteSpaceValidator': 'Only white space is not allowed'
    },
    salePrice: {
      'required': 'Sale Price is required',
      'minlength': 'Sale Price cannot be less than 1 characters long',
      'maxlength': 'Sale Price cannot be more than 10 characters long',
      'validNumericField': 'Sale Price must contains only numbers',
      'noWhiteSpaceValidator': 'Only white space is not allowed'
    },
    discount: {
      'required': 'Discount Price is required',
      'minlength': 'Discount Price cannot be less than 1 characters long',
      'maxlength': 'Discount Price cannot be more than 10 characters long',
      'validNumericField': 'Discount Price must contains only numbers',
      'noWhiteSpaceValidator': 'Only white space is not allowed'
    },
    sizeId: {
      'required': 'Size is required',
    },
    categoryId: {
      'required': 'Category is required',
    },
    tagId: {
      'required': 'Tag is required',
    },
    colorId: {
      'required': 'Color is required',
    }
  };


  constructor(private _dataService: DataService, private _fb: FormBuilder, private _toastr: ToastrService,
    private navRoute: Router, private route: ActivatedRoute) {
    // this.route.queryParams.subscribe(params => {
    //   this.productId = params['productId'];
    //   //this.productId =params.productId;
    // });
    this.productId = this.navRoute.getCurrentNavigation().extras.state.productId;
  }

  setFormState() {
    this.dbops = DbOperation.create;
    this.buttonText = "Add";

    this.productForm = this._fb.group({
      Id: [0],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        TextFieldValidator.validTextField,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        TextFieldValidator.validTextField,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
      code: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        TextFieldValidator.validTextField,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
      price: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        NumericFieldValidator.validNumericField,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
      salePrice: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        NumericFieldValidator.validNumericField,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
      discount: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        NumericFieldValidator.validNumericField,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
      sizeId: ['', Validators.required],
      categoryId: ['', Validators.required],
      tagId: ['', Validators.required],
      colorId: ['', Validators.required],
      quantity: [''],
      isSale: [''],
      isNew: [''],
      shortDetails: [''],
      description: ['']
    });

    this.productForm.valueChanges.subscribe(fData => {
      this.onValueChanged();
    });


    this.productForm.controls['quantity'].setValue(1);
  }
  onValueChanged() {
    if (!this.productForm) {
      return;
    }

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = "";
      const control = this.productForm.get(field);
      if (control && control.dirty && !control.valid) {
        const message = this.validationMessage[field];

        for (const key of Object.keys(control.errors)) {
          if (key != 'required') {
            this.formErrors[field] += message[key] + ' ';
          }
        }
      }
    }
  }
  get f() {
    return this.productForm.controls;
  }

  ngOnInit(): void {
    this.setFormState();
    this.getCategories();
    this.getColors();
    this.getSizes();
    this.getTags();

    if (this.productId != null && this.productId > 0) {
      this.dbops = DbOperation.update;
      this.buttonText = "Update";
      this.getProductById();
    }
  }

  increment() {
    //this.counter += 1;
    this.counter = this.counter + 1;
    this.productForm.controls['quantity'].setValue(this.counter);
  }
  decrement() {
    // this.counter -= 1;
    this.counter = this.counter - 1;
    this.productForm.controls['quantity'].setValue(this.counter);
  }

  readUrl(event: any, i: number) {
    if (event.target.files.length === 0) {
      return;
    }

    this.fileTobeUpload[i] = event.target.files[0];
    let type = event.target.files[0].type;
    if (type.match(/image\/*/) == null) {
      this.elfiles.nativeElement.value = "";
      this._toastr.error("Only Images are supported !!", "Product Master");
    }

    // Image Upload
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.url[i].img = reader.result.toString();
    };

  }

  getProductById() {
    this._dataService.get(Global.BASE_API_PATH + "ProductMaster/GetbyId/" + this.productId).subscribe(res => {
      if (res.isSuccess) {
        this.objRow = res.data;
        this.productForm.controls['Id'].setValue(this.objRow.id);
        this.productForm.controls['name'].setValue(this.objRow.name);
        this.productForm.controls['title'].setValue(this.objRow.title);
        this.productForm.controls['code'].setValue(this.objRow.code);
        this.productForm.controls['price'].setValue(this.objRow.price);
        this.productForm.controls['salePrice'].setValue(this.objRow.salePrice);
        this.productForm.controls['discount'].setValue(this.objRow.discount);
        this.productForm.controls['sizeId'].setValue(this.objRow.sizeId);
        this.productForm.controls['categoryId'].setValue(this.objRow.categoryId);
        this.productForm.controls['tagId'].setValue(this.objRow.tagId);
        this.productForm.controls['colorId'].setValue(this.objRow.colorId);
        this.productForm.controls['quantity'].setValue(this.objRow.quantity);
        this.productForm.controls['isSale'].setValue(this.objRow.isSale == 1 ? true : false);
        this.productForm.controls['isNew'].setValue(this.objRow.isNew == 1 ? true : false);
        this.productForm.controls['shortDetails'].setValue(this.objRow.shortDetails);
        this.productForm.controls['description'].setValue(this.objRow.description);

        // /GetProductPicturebyId/
        this._dataService.get(Global.BASE_API_PATH + "ProductMaster/GetProductPicturebyId/" + this.productId).subscribe(res => {
          if (res.isSuccess) {
            if (res.data.length > 0) {
              this.url = [
                { img: res.data[0] != null ? Global.BASE_IMAGES_PATH + res.data[0].name : "assets/images/user.png" },
                { img: res.data[1] != null ? Global.BASE_IMAGES_PATH + res.data[1].name : "assets/images/user.png" },
                { img: res.data[2] != null ? Global.BASE_IMAGES_PATH + res.data[2].name : "assets/images/user.png" },
                { img: res.data[3] != null ? Global.BASE_IMAGES_PATH + res.data[3].name : "assets/images/user.png" },
                { img: res.data[4] != null ? Global.BASE_IMAGES_PATH + res.data[4].name : "assets/images/user.png" }
              ];
            }
          }
        });

      } else {
        this._toastr.error(res.errors[0], "Product Master");
      }
    });
  }

  getSizes() {
    this._dataService.get(Global.BASE_API_PATH + "SizeMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objSizes = res.data;
      } else {
        this._toastr.error(res.errors[0], "Product Master");
      }
    });
  }

  getCategories() {
    this._dataService.get(Global.BASE_API_PATH + "Category/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objCategories = res.data;
      } else {
        this._toastr.error(res.errors[0], "Product Master");
      }
    });
  }

  getTags() {
    this._dataService.get(Global.BASE_API_PATH + "TagMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objTags = res.data;
      } else {
        this._toastr.error(res.errors[0], "Product Master");
      }
    });
  }

  getColors() {
    this._dataService.get(Global.BASE_API_PATH + "ColorMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objColors = res.data;
      } else {
        this._toastr.error(res.errors[0], "Product Master");
      }
    });
  }

  onSubmit() {
    debugger;
    this.submitted = true;

    if ((!this.productId || this.productId === 0) && this.fileTobeUpload.length < 5) {
      this._toastr.error("Please upload 5 images per product !!", "Product Master");
      return;
    }

    const formData = new FormData();
    formData.append('Id', this.productForm.controls['Id'].value);
    formData.append('Name', this.productForm.controls['name'].value);
    formData.append('Title', this.productForm.controls['title'].value);
    formData.append('Code', this.productForm.controls['code'].value);
    formData.append('Price', this.productForm.controls['price'].value);
    formData.append('SalePrice', this.productForm.controls['salePrice'].value);
    formData.append('Discount', this.productForm.controls['discount'].value);
    formData.append('CategoryId', this.productForm.controls['categoryId'].value);
    formData.append('TagId', this.productForm.controls['tagId'].value);
    formData.append('SizeId', this.productForm.controls['sizeId'].value);
    formData.append('ColorId', this.productForm.controls['colorId'].value);
    formData.append('Quantity', this.productForm.controls['quantity'].value);
    formData.append('IsSale', this.productForm.controls['isSale'].value);
    formData.append('IsNew', this.productForm.controls['isNew'].value);
    formData.append('ShortDetails', this.productForm.controls['shortDetails'].value);
    formData.append('Description', this.productForm.controls['description'].value);

    if (this.fileTobeUpload) {
      for (let i = 0; i < this.fileTobeUpload.length; i++) {
        let ToUpload = this.fileTobeUpload[i];
        formData.append('Image', ToUpload, ToUpload.name);
      }
    }

    switch (this.dbops) {
      case DbOperation.create:
        this._dataService.postImages(Global.BASE_API_PATH + "ProductMaster/Save/", formData).subscribe(res => {
          if (res.isSuccess) {
            this._toastr.success("Data saved Successfully !!", "Product Master");
            this.navRoute.navigate(['/products/physical/product-list']);
          } else {
            this._toastr.info(res.errors[0], "Product Master");
          }
        });
        break;
      case DbOperation.update:
        this._dataService.postImages(Global.BASE_API_PATH + "ProductMaster/Update/", formData).subscribe(res => {
          if (res.isSuccess) {
            this._toastr.success("Data updated Successfully !!", "Product Master");
            this.navRoute.navigate(['/products/physical/product-list']);
          } else {
            this._toastr.info(res.errors[0], "Product Master");
          }
        });
        break;
    }
  }

  cancelForm() {
    this.dbops = DbOperation.create;
    this.buttonText = "Add";
    this.productForm.reset({
      Id: 0
    });
  }

  ngOnDestroy() {
    this.objRow = null;
    this.objCategories = null;
    this.objColors = null;
    this.objSizes = null;
    this.objTags = null;
  }

}
