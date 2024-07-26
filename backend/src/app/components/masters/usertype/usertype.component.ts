import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DbOperation } from 'src/app/shared/db-operation';
import { Global } from 'src/app/shared/global';
import { NoWhiteSpaceValidator, TextFieldValidator } from 'src/app/validations/validations.validator';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.scss']
})
export class UsertypeComponent implements OnInit , OnDestroy {
  addForm: FormGroup;
  dbops: DbOperation;
  objRows = [];
  objRow: any;
  buttonText: string;

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

  getData() {
    this._dataService.get(Global.BASE_API_PATH + "UserType/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
      } else {
        this._toastr.error(res.errors[0], "User Type Master");
      }
    });
  }


  ngOnInit(): void {
    this.setFormState();
    this.getData();
  }

  onSubmit() {
    switch (this.dbops) {
      case DbOperation.create:
        this._dataService.post(Global.BASE_API_PATH + "UserType/Save/", this.addForm.value).subscribe(res => {
          if (res.isSuccess) {
            this.getData();
            this._toastr.success("Data Saved Successfully !!", "User Type Master");
            this.elname.select("Viewtab");
            this.setForm();
          } else {
            this._toastr.info(res.errors[0], "User Type Master");
          }
        });
        break;
      case DbOperation.update:
        this._dataService.post(Global.BASE_API_PATH + "UserType/Update/", this.addForm.value).subscribe(res => {
          if (res.isSuccess) {
            this.getData();
            this._toastr.success("Data Updated Successfully !!", "User Type Master");
            this.elname.select("Viewtab");
            this.setForm();
          } else {
            this._toastr.info(res.errors[0], "User Type Master");
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
  }

  Delete(Id: number) {
    let obj = { id: Id };

    this._dataService.post(Global.BASE_API_PATH + "UserType/Delete/", obj).subscribe(res => {
      if (res.isSuccess) {
        this.getData();
        this._toastr.success("Data Deleted successfully !!", "User Type Master");
      } else {
        this._toastr.info(res.errors[0], "User Type Master");
      }
    });
  }

  setForm() {
    this.dbops = DbOperation.create;
    this.buttonText = "Submit";
  }
  cancelForm() {
    this.addForm.reset({
      Id: 0
    });
    this.dbops = DbOperation.create;
    this.buttonText = "Submit";
    this.elname.select('Viewtab');
  }
  ngOnDestroy() {
    this.objRows = null;
    this.objRow = null;
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
