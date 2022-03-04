import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SLIDERS } from 'data';
import { saveImg } from 'src/app/shared/services/save-file.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  bannerData!: FormGroup;
  private image: saveImg;
  
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createBannerForm();
  }

  createBannerForm() {
    this.bannerData = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required
      ])],
      subtitle: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  onImageSave($event){
    console.log($event);

    this.image = {
      image: $event.image,
      // image: this.convertB64toBlob(event.src),
      title: this.bannerData.get('title').value,
      subTitle: this.bannerData.get('subtitle').value
    };

    // this.saveImgService.saveFile(this.image);

  }

  onSubmit(){
    SLIDERS.push(this.image);
    this.router.navigate(['home','fashion'],{
      queryParamsHandling: 'merge',
      queryParams: {  }
    });
  }
}
