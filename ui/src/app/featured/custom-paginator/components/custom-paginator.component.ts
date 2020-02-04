import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/utils/order';
import { HttpService } from 'src/app/core/http-services/http.service';
import { Router } from '@angular/router';
import { Filter } from 'src/app/utils/filters';
import { PagerService } from 'src/app/core/data-services/pager.service';
@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.scss']
})
export class CustomPaginatorComponent implements OnInit {

  isLodding: boolean = true;
  EDofD: boolean = true;
  DofD: boolean = true;
  DATAArray: Order[] = [];
   
  displayedColumns: string[] = ["orderId", "productName", "quantity", "amount", "deliveryAddress", "deliveryAgentName", "orderDate", "expectedDateofDelivery", "dateofDelivery"];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource = new MatTableDataSource<Order>(this.DATAArray);

  filters: Filter[] = [
    { value: 'all', viewValue: 'All' },
    { value: 'pending', viewValue: 'Pending' },
    { value: 'complete', viewValue: 'Complete' }
  ];
  filterSelected = "all"
  constructor(
    private httpService: HttpService,
    private router: Router,
    private pagerService: PagerService
  ) {

  } 

  // pager object
  pager: any = {};
 
  ngOnInit() {
    this.getTableData();
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.DATAArray.length, page);

    // get current page of Orders
    this.dataSource.data = this.DATAArray.slice(this.pager.startIndex, this.pager.endIndex + 1);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    }, 0);
}
  ngAfterViewInit() {

  }
  getTableData() {
    this.httpService.get('../../../../assets/contents/orders.json')
      .subscribe((data: any) => {
        console.log("data", data['records']);
        this.DATAArray = data['records'];
        this.setPage(1);
        this.isLodding = false;
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
   
   
  onFilterChange(event) {
    console.log(event.value, 'event');
    this.isLodding = true;
    if (event.value == 'pending') {
      this.dataSource.data = this.filterData(false);
    } else if (event.value == 'complete') {
      this.dataSource.data = this.filterData(true);
    }
    else {
      this.dataSource.data = this.DATAArray;
      this.isLodding = false;
    }
  }
  filterData(condition) {
    var temparray = [];
    this.DATAArray.map((e) => {
      if (e.isComplete === condition) {
        temparray.push(e)
      }
    })
    this.isLodding = false;
    return temparray
  }
}