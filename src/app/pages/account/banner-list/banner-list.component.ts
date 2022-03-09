import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { SLIDERS } from 'data';
import { User } from '../users/user.component';
import { Product } from 'src/app/shared/classes/product';


@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {

  dataSource: MatTableDataSource<unknown>;
  displayedColumns = [];
  @ViewChild(MatSort) sort: MatSort;
  
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createTable();
  }

  createTable(data = null) {    
    this.dataSource = new MatTableDataSource( data ?? SLIDERS );
    this.dataSource.sort = this.sort;
    this.displayedColumns = ['title', 'subTitle', 'image', 'path', 'edit'];
  }
  
  edit(banner: any){
    console.log(banner);
    const elem = JSON.stringify( banner );
    this.router.navigate(['pages','banners'],{
      queryParamsHandling: 'merge',
      queryParams: { elem }
    });
  }

}
