import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatchValidator } from 'src/app/validations/validations.validator';
import { Global } from 'src/app/shared/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  strMsg: string;

  @ViewChild('tabset') elname: any;
  constructor(private _authService: AuthService, private _dataService: DataService, private _fb: FormBuilder,
    private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.strMsg = "";
    this._authService.logout();
    this.createLoginForm();
    this.createRegistrationForm();
  }

  createLoginForm() {
    this.loginForm = this._fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createRegistrationForm() {
    this.registrationForm = this._fb.group({
      Id: [0],
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(3)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      userTypeId: [1],
      password: ['', Validators.compose([Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])],
      confirmPassword: ['', Validators.required],
    },
      {
        validators: MustMatchValidator('password', 'confirmPassword')
      }
    );
  }

  get f() {
    return this.registrationForm.controls;
  }

  onLogin() {
    if (this.loginForm.get('userName').value == "") {
      this._toastr.error("UserName is required !!", "Login");
      return;
    } else if (this.loginForm.get('password').value == "") {
      this._toastr.error("Password is required !!", "Login");
      return;
    }

    if (this.loginForm.valid) {
      this._dataService.post(Global.BASE_API_PATH + "UserMaster/Login/", this.loginForm.value).subscribe(res => {
        if (res.isSuccess) {
          this._authService.login(res.data);
          this.strMsg = this._authService.getMessage();
          if (this.strMsg != "") {
            this._toastr.error(this.strMsg, "Login");
          }
          this.reset();
        } else {
          this._toastr.error("Invalid username and password !!", "Login")
          this.reset();
        }
      });
    } else {
      this._toastr.error("Invalid username and password !!", "Login")
    }

  }

  reset() {
    this.loginForm.controls['userName'].setValue('');
    this.loginForm.controls['password'].setValue('');
  }

  onRegistration(formData: any) {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    this._dataService.post(Global.BASE_API_PATH + "UserMaster/Save/", formData.value).subscribe(res => {
      if (res.isSuccess) {
        this._toastr.success("Acccount has been created successfully !!", "User Master");
        this.elname.select('logintab');
      } else {
        this._toastr.error(res.errors[0], "USer Master");
      }
    });
  }
}
