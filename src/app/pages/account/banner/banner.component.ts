import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createBannerForm();
    this.route.queryParams
      .filter(params => params.elem)
      .subscribe(params => {
        const elem = JSON.parse(params.elem);
        this.bannerData.get('title')?.setValue(elem.title);
        this.bannerData.get('subtitle')?.setValue(elem.subTitle);
        this.bannerData.get('path')?.setValue(elem.path);
        this.bannerData.get('image')?.setValue(elem.image);
      }
    );
  }

  createBannerForm() {
    this.bannerData = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required
      ])],
      subtitle: ['', Validators.compose([
        Validators.required
      ])],
      path: ['', Validators.compose([
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
      subTitle: this.bannerData.get('subtitle').value,
      path: this.bannerData.get('path').value
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
