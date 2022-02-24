import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressData!: FormGroup;

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
        this.addressData.get('street')?.setValue(elem.street);
        this.addressData.get('number')?.setValue(elem.number);
        this.addressData.get('colony')?.setValue(elem.colony);
        this.addressData.get('state')?.setValue(elem.state);
        this.addressData.get('municipality')?.setValue(elem.municipality);
        this.addressData.get('country')?.setValue(elem.country);
        this.addressData.get('zip')?.setValue(elem.zip);
      }
    );
  }

  createRegisterForm() {
    this.addressData = this.formBuilder.group({
      street: ['', Validators.compose([
        Validators.required
      ])],
      number: ['', Validators.compose([
        Validators.required
      ])],
      colony: ['', Validators.compose([
        Validators.required
      ])],
      state: ['', Validators.compose([
        Validators.required
      ])],
      municipality: ['', Validators.compose([
        Validators.required
      ])],
      country: ['', Validators.compose([
        Validators.required
      ])],
      zip: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  onSubmit(){
    const address = JSON.stringify(this.addressData?.value);
    this.router.navigate(['pages','orders'],{
      queryParamsHandling: 'merge',
      queryParams: { address }
    });
  }

}
