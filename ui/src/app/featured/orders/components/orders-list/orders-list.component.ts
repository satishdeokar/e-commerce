import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/utils/order';
import { HttpService } from 'src/app/core/http-services/http.service';
import { Router } from '@angular/router';
import { Filter } from 'src/app/utils/filters';
import { Product } from 'src/app/utils/product';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  isLodding: boolean = true;
  EDofD: boolean = true;
  DofD: boolean = true;
  DATAArray: Order[] = [];
  total: number;
  recordPerPage: number = 1;
  currentPage = 1;
  pageSizeOptions: number[] = [2, 5, 10, 50]
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
  ) {

  }

  ngOnInit() {
    this.getTableData();
  }
  ngAfterViewInit() {

  }
  getTableData() {
    this.httpService.get('../../../../assets/contents/orders.json')
      .subscribe((data: any) => {
        console.log("data", data['records']);
        this.DATAArray = data['records'];
        this.total = data['totalRecords'];
        this.dataSource.data = this.DATAArray;
        this.total = data['totalRecords'];
        console.log(this.total, 'this.total')
        this.isLodding = false;
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.recordPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.getNextRecord(this.recordPerPage, this.currentPage);
  }
  getNextRecord(recordPerPage, currentPage) {
    this.isLodding = true;
    let params = { "recordPerPage": recordPerPage, "currentPage": currentPage }
    this.httpService.get(`../../../../assets/contents/orders2.json`, params)
      .subscribe((data: any) => {
        this.dataSource.data = data['records'];
        this.total = data['totalRecords'];
        console.log(this.total, 'this.total')
        this.isLodding = false;
      });
  }
  onFilterChange(event) {
    console.log(event.value, 'event');
    this.isLodding = true;
    if (event.value == 'pending') {
      this.dataSource.data = this.filterData(false);
    } else if (event.value == 'complete') {
      this.dataSource.data = this.filterData(true);
    }
    else{
      this.dataSource.data=this.DATAArray;
      this.isLodding=false;
    }
  }
  filterData(condition){
    var temparray = [];
    this.DATAArray.map((e) => {
      if (e.isComplete === condition) {
        temparray.push(e)
      }
    })
    this.isLodding=false;
    return temparray
  }
}