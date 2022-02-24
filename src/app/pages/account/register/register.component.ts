import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerData!: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
    this.route.queryParams
      .filter(params => params.elem)
      .subscribe(params => {
        const elem = JSON.parse(params.elem);
        this.registerData.get('name')?.setValue(elem.name);
        this.registerData.get('lastname')?.setValue(elem.lastname);
        this.registerData.get('email')?.setValue(elem.email);
        this.registerData.get('password')?.setValue(elem.password);
      }
    );
  }

  createRegisterForm() {
    this.registerData = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      lastname: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  onSubmit(){
    const user = JSON.stringify(this.registerData?.value);
    this.router.navigate(['pages','users'],{
      queryParamsHandling: 'merge',
      queryParams: { user }
    });
  }

}
