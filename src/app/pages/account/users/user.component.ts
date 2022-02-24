import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { USERS } from 'data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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
    this.dataSource = new MatTableDataSource( data ?? USERS);
    this.dataSource.sort = this.sort;
    this.displayedColumns = ['position', 'name', 'lastname', 'edit', 'remove'];
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

export interface User {
  position: number,
  name: string,
  lastname: string,
  email: string,
  password: string,
  edit?: boolean,
  remove?: boolean
}