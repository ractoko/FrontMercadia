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

  dataSource;
  displayedColumns = [];
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
    this.dataSource = new MatTableDataSource( data ?? ORDERS);
    this.dataSource.sort = this.sort;
    this.displayedColumns = ['id', 'user', 'date', 'total', 'products','address'];
  }

  
  edit(position: number){
    const elem = JSON.stringify( USERS.find( element => element.position === position) );
    this.router.navigate(['pages','register'],{
      queryParamsHandling: 'merge',
      queryParams: { elem }
    });
  }

  remove(position: number){
    const elem = JSON.stringify( USERS.find( element => element.position === position) );
    this.createTable(USERS.filter(user => user.position !== position));
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
  create = 1,
  paySuccess,
  payError,
  proccess,
  delivery,
  complete,
  error
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