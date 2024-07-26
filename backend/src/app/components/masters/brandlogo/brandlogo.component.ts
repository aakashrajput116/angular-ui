import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { DbOperation } from 'src/app/shared/db-operation';
import { Global } from 'src/app/shared/global';
import { NoWhiteSpaceValidator, TextFieldValidator } from 'src/app/validations/validations.validator';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brandlogo',
  templateUrl: './brandlogo.component.html',
  styleUrls: ['./brandlogo.component.scss']
})
export class BrandlogoComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  dbops: DbOperation;
  objRows = [];
  objRow: any;
  buttonText: string;
  fileToUpload: File;
  editImagePath = "assets/images/pro3/noimage.png";

  formErrors = {
    name: ''
  };

  validationMessage = {
    name: {
      'required': 'Name is required',
      'minlength': 'Name cannot be less than 3 characters long',
      'maxlength': 'Name cannot be more than 10 characters long',
      'validTextField': 'Name must contains only numbers and latters',
      'noWhiteSpaceValidator': 'Only white space is not allowed'
    }
  };

  @ViewChild('file') elfiles: ElementRef;
  @ViewChild('tabset') elname: any;
  constructor(private _dataService: DataService, private _fb: FormBuilder, private _toastr: ToastrService) { }

  setFormState() {
    this.dbops = DbOperation.create;
    this.buttonText = "Submit";
    this.addForm = this._fb.group({
      Id: [0],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        TextFieldValidator.validTextField,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])]
    });

    this.addForm.valueChanges.subscribe(fData => {
      this.onValueChanged();
    });
  }

  get f() {
    return this.addForm.controls;
  }

  onValueChanged() {
    if (!this.addForm) {
      return;
    }

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = "";
      const control = this.addForm.get(field);
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

  upload(files: any) {
    if (files.Length === 0) {
      return;
    }

    let type = files[0].type;
    if (type.match(/image\/*/) == null) {
      this._toastr.error("Only images are supported !!", "Brand Logo Master");
      this.elfiles.nativeElement.value = "";
      return;
    }

    this.fileToUpload = files[0]

  }

  getData() {
    this._dataService.get(Global.BASE_API_PATH + "BrandLogo/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
      } else {
        this._toastr.error(res.errors[0], "Brand Logo Master");
      }
    });
  }


  ngOnInit(): void {
    this.setFormState();
    this.getData();
  }

  onSubmit() {
    debugger;
    if (this.dbops === DbOperation.create && !this.fileToUpload) {
      this._toastr.error("Please upload image !!", "Brand Logo Master");
      return;
    }

    const formData = new FormData();
    formData.append('Id', this.addForm.controls['Id'].value);
    formData.append('Name', this.addForm.controls['name'].value);

    if (this.fileToUpload) {
      formData.append('Image', this.fileToUpload, this.fileToUpload.name);
    }


    switch (this.dbops) {
      case DbOperation.create:
        this._dataService.postImages(Global.BASE_API_PATH + "BrandLogo/Save/", formData).subscribe(res => {
          if (res.isSuccess) {
            this.getData();
            this._toastr.success("Data Saved Successfully !!", "Brand Logo Master");
            this.elname.select("Viewtab");
            this.setForm();
          } else {
            this._toastr.info(res.errors[0], "Brand Logo Master");
          }
        });
        break;
      case DbOperation.update:
        this._dataService.postImages(Global.BASE_API_PATH + "BrandLogo/Update/", formData).subscribe(res => {
          if (res.isSuccess) {
            this.getData();
            this._toastr.success("Data Updated Successfully !!", "Brand Logo Master");
            this.elname.select("Viewtab");
            this.setForm();
          } else {
            this._toastr.info(res.errors[0], "Brand Logo Master");
          }
        });
    }
  }
  Edit(Id: number) {
    this.dbops = DbOperation.update;
    this.buttonText = "Update";
    this.elname.select('Addtab');
    this.objRow = this.objRows.find(x => x.id === Id);
    this.addForm.controls['Id'].setValue(this.objRow.id);
    this.addForm.controls['name'].setValue(this.objRow.name);
    this.editImagePath = this.objRow.imagePath;
  }

  Delete(Id: number) {
    let obj = { id: Id };

    this._dataService.post(Global.BASE_API_PATH + "BrandLogo/Delete/", obj).subscribe(res => {
      if (res.isSuccess) {
        this.getData();
        this._toastr.success("Data Deleted successfully !!", "Brand Logo Master");
      } else {
        this._toastr.info(res.errors[0], "Brand Logo Master");
      }
    });
  }

  setForm() {
    this.dbops = DbOperation.create;
    this.buttonText = "Submit";
    this.fileToUpload = null;
    this.editImagePath = "assets/images/pro3/noimage.png";
  }
  cancelForm() {
    this.addForm.reset({
      Id: 0
    });
    this.dbops = DbOperation.create;
    this.buttonText = "Submit";
    this.fileToUpload = null;
    this.elname.select('Viewtab');
    this.editImagePath = "assets/images/pro3/noimage.png";
  }
  ngOnDestroy() {
    this.objRows = null;
    this.objRow = null;
    this.fileToUpload = null;
  }
  onTabChange(event: any) {
    this.editImagePath = "assets/images/pro3/noimage.png";
    if (event.activeId == "Addtab") {
      this.addForm.reset({
        Id: 0
      });
      this.dbops = DbOperation.create;
      this.buttonText = "Submit";
    }
  }

  onSort(event) {
    console.log(event);
  }

  setPage(event) {
    console.log(event);
  }
}
