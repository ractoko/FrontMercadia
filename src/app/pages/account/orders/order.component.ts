import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ORDERS, USERS } from 'data';
import { User } from '../users/user.component';
import { Product } from 'src/app/shared/classes/product';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  dataSource: MatTableDataSource<unknown>;
  dataProducts: MatTableDataSource<unknown>;
  displayedColumns = [];
  displayedColumnsProducts = [];
  @ViewChild(MatSort) sort: MatSort;
  
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .filter(params => params.user)
      .subscribe(params => {
        const user = JSON.parse(params.user);
        user.position = USERS.length + 1;
        USERS.push(user);
      }
    );
    this.createTable();
  }

  createTable(data = null) {    
    this.dataSource = new MatTableDataSource( data ?? ORDERS );
    this.dataSource.sort = this.sort;
    this.displayedColumns = ['id', 'user', 'date', 'total', 'products', 'address', 'status'];
  }

  createTableProducts(data: any) {
    this.dataProducts = new MatTableDataSource( data );
    this.dataProducts._updateChangeSubscription();
    this.dataSource.sort = this.sort;
    this.displayedColumnsProducts = ['id', 'title', 'quantity', 'edit', 'remove'];
  }

  tableProducts(position: number){
    const data = ORDERS.find(order => order.id === position)
    console.log(data.products);
    this.createTableProducts(data.products);
  }
  
  edit(productId: number){

  }

  editAddress(address: Address){
    const elem = JSON.stringify( address );
    this.router.navigate(['pages','address'],{
      queryParamsHandling: 'merge',
      queryParams: { elem }
    });
  }

  remove(productId: number){
    const elem = ORDERS.find( element => element.id === 1).products.filter( product => product.product.id !== productId);
    let orders: Order[];
    let order = ORDERS.find(element => element.id === 1);
    order.products.pop();
    order.products.pop();
    order.products = elem;
    orders = [order];
    this.createTable(orders);
    this.createTableProducts( elem );
  }

  getStatus(status: number){
    return Status[status];
  }
}

export interface Address {
  street: string,
  number: number,
  colony: string,
  state: string,
  municipality: string,
  country: string,
  zip: string
}

export enum Status {
  Creado = 1,
  Pagado,
  Procesado,
  Enviado,
  Completado,
  Error
}

export interface ProductOrder {
  product: Product,
  quantity: number
}

export interface Order {
  id: number,
  user: User,
  date: Date,
  total: number,
  products: ProductOrder[],
  address: Address,
  paymentMethod: string,
  isPaid: boolean,
  dateDelivery: Date,
  status?: Status,
  active?: boolean
}