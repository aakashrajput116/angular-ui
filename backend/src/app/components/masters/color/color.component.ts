import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DbOperation } from 'src/app/shared/db-operation';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { TextFieldValidator, NoWhiteSpaceValidator } from 'src/app/validations/validations.validator';
import { Global } from 'src/app/shared/global';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  dbops: DbOperation;
  objRows = [];
  objRow: any;
  buttonText: string;

  formErrors = {
    name: '',
    code: ''
  };

  validationMessage = {
    name: {
      'required': 'Name is required',
      'minlength': 'Name cannot be less than 3 characters long',
      'maxlength': 'Name cannot be more than 10 characters long',
      'validTextField': 'Name must contains only numbers and latters',
      'noWhiteSpaceValidator': 'Only white space is not allowed'
    },
    code: {
      'required': 'Code is required',
      'minlength': 'Code cannot be less than 3 characters long',
      'maxlength': 'Code cannot be more than 10 characters long',
      'validTextField': 'Code must contains only numbers and latters',
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
      ])],
      code: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        TextFieldValidator.validTextField,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
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
    debugger;
    this._dataService.get(Global.BASE_API_PATH + "ColorMaster/GetAll").subscribe(res => {
      debugger;
      if (res.isSuccess) {
        this.objRows = res.data;
      } else {
        this._toastr.error(res.errors[0], "Color Master");
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
        this._dataService.post(Global.BASE_API_PATH + "ColorMaster/Save/", this.addForm.value).subscribe(res => {
          if (res.isSuccess) {
            this.getData();
            this._toastr.success("Data Saved Successfully !!", "Color Master");
            this.elname.select("Viewtab");
            this.setForm();
          } else {
            this._toastr.info(res.errors[0], "Color Master");
          }
        });
        break;
      case DbOperation.update:
        this._dataService.post(Global.BASE_API_PATH + "ColorMaster/Update/", this.addForm.value).subscribe(res => {
          if (res.isSuccess) {
            this.getData();
            this._toastr.success("Data Updated Successfully !!", "Color Master");
            this.elname.select("Viewtab");
            this.setForm();
          } else {
            this._toastr.info(res.errors[0], "Color Master");
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
    this.addForm.controls['code'].setValue(this.objRow.code);
  }

  Delete(Id: number) {
    let obj = { id: Id };

    this._dataService.post(Global.BASE_API_PATH + "ColorMaster/Delete/", obj).subscribe(res => {
      if (res.isSuccess) {
        this.getData();
        this._toastr.success("Data Deleted successfully !!", "Color Master");
      } else {
        this._toastr.info(res.errors[0], "Color Master");
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
