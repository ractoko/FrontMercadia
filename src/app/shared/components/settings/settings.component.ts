import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public products: Product[] = [];
  public search: boolean = false;
  
  public clientes = [{
    name: 'Registrar',
    path: 'register'
  },{
    name: 'Listado',
    path: 'users'
  }]

  public pedidos = [{ 
    name: 'Pedidos',
    path: 'orders'
  }];

  public banners = [{
    name: 'Agregar',
    path: 'banners',
  },{
    name: 'Lista',
    path: 'banners-list'
  }];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: ProductService,
    private router: Router) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

  searchToggle(){
    this.search = !this.search;
  }

  changePath(path){
    this.router.navigate(['pages',path]);
  }

  changeLanguage(code){
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

}
