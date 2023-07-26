import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public data = {} as any;
  constructor(private auth: AuthService) {}
  @ViewChild('password') public textbox!: TextBoxComponent;

  public ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = 'password';
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
  }

  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    loggedin: new FormControl(),
  });

  public login(): void {
    this.loginForm.markAllAsTouched();
    this.data.userName = this.loginForm.value.userName;
    this.data.password = this.loginForm.value.password;
    this.auth.SignIn(this.data);

    console.log(this.loginForm.value);
  }

  public clearForm(): void {
    this.loginForm.reset();
  }
}
