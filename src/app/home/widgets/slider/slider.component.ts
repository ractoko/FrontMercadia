import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeSlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  
  @Input() sliders: any[];
  @Input() class: string;
  @Input() textClass: string;
  @Input() category: string;
  @Input() buttonText: string;
  @Input() buttonClass: string;

  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  clickSlider(){
    this.router.navigate(['/shop/collection/left/sidebar'], { queryParams: { category: this.category}});
  }
  public HomeSliderConfig: any = HomeSlider;

}
