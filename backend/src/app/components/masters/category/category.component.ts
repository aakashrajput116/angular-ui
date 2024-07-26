import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DbOperation } from 'src/app/shared/db-operation';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { TextFieldValidator, NoWhiteSpaceValidator, NumericFieldValidator } from 'src/app/validations/validations.validator';
import { Global } from 'src/app/shared/global';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  dbops: DbOperation;
  objRows = [];
  objRow: any;
  buttonText: string;
  fileToUpload: File;

  formErrors = {
    name: '',
    title: '',
    isSave: '',
    link: ''
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
    isSave: {
      'required': 'Save value is required',
      'minlength': 'Save value cannot be less than 1 characters long',
      'maxlength': 'Save value cannot be more than 2 characters long',
      'validNumericField': 'Save value must contains only numbers',
      'noWhiteSpaceValidator': 'Only white space is not allowed'
    },
    link: {
      'required': 'Link is required',
      'minlength': 'Link cannot be less than 3 characters long',
      'maxlength': 'Link cannot be more than 10 characters long',
      'validTextField': 'Link must contains only numbers and latters',
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
      ])],
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        TextFieldValidator.validTextField,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
      isSave: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
        NumericFieldValidator.validNumericField,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
      link: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
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
      this._toastr.error("Only images are supported !!", "Category Master");
      this.elfiles.nativeElement.value = "";
      return;
    }

    this.fileToUpload = files[0]

  }

  getData() {
    this._dataService.get(Global.BASE_API_PATH + "Category/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
      } else {
        this._toastr.error(res.errors[0], "Category Master");
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
      this._toastr.error("Please upload image !!", "Category Master");
      return;
    }

    const formData = new FormData();
    formData.append('Id', this.addForm.controls['Id'].value);
    formData.append('Name', this.addForm.controls['name'].value);
    formData.append('Title', this.addForm.controls['title'].value);
    formData.append('IsSave', this.addForm.controls['isSave'].value);
    formData.append('link', this.addForm.controls['link'].value);

    if (this.fileToUpload) {
      formData.append('Image', this.fileToUpload, this.fileToUpload.name);
    }


    switch (this.dbops) {
      case DbOperation.create:
        this._dataService.postImages(Global.BASE_API_PATH + "Category/Save/", formData).subscribe(res => {
          if (res.isSuccess) {
            this.getData();
            this._toastr.success("Data Saved Successfully !!", "Category Master");
            this.elname.select("Viewtab");
            this.setForm();
          } else {
            this._toastr.info(res.errors[0], "Category Master");
          }
        });
        break;
      case DbOperation.update:
        this._dataService.postImages(Global.BASE_API_PATH + "Category/Update/", formData).subscribe(res => {
          if (res.isSuccess) {
            this.getData();
            this._toastr.success("Data Updated Successfully !!", "Category Master");
            this.elname.select("Viewtab");
            this.setForm();
          } else {
            this._toastr.info(res.errors[0], "Category Master");
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
    this.addForm.controls['title'].setValue(this.objRow.title);
    this.addForm.controls['isSave'].setValue(this.objRow.isSave);
    this.addForm.controls['link'].setValue(this.objRow.link);
  }

  Delete(Id: number) {
    let obj = { id: Id };

    this._dataService.post(Global.BASE_API_PATH + "Category/Delete/", obj).subscribe(res => {
      if (res.isSuccess) {
        this.getData();
        this._toastr.success("Data Deleted successfully !!", "Category Master");
      } else {
        this._toastr.info(res.errors[0], "Category Master");
      }
    });
  }

  setForm() {
    this.dbops = DbOperation.create;
    this.buttonText = "Submit";
    this.fileToUpload = null;
  }
  cancelForm() {
    this.addForm.reset({
      Id: 0
    });
    this.dbops = DbOperation.create;
    this.buttonText = "Submit";
    this.fileToUpload = null;
    this.elname.select('Viewtab');
  }
  ngOnDestroy() {
    this.objRows = null;
    this.objRow = null;
    this.fileToUpload = null;
  }
  onTabChange(event: any) {
    debugger;
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
