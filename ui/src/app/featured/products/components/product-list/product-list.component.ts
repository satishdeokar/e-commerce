import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http-services/http.service';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/core/data-services/data-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public tableConfig: any = [];
  public isLoading = false;
  public receivedChildEvent: any;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private dataService: DataServiceService
  ) {
    this.getTableData();
  }

  ngOnInit() {
  }
  getEvent(event: object) {
    this.receivedChildEvent = event;
    console.log('this.receivedChildEvent', this.receivedChildEvent);
    this.getActions(event);
  }

  getActions(event) {

    if (event.eventType === 'edit') {
      console.log("event", event.eventType)
    }
    if (event.eventType === 'delete') {
      console.log("event", event.eventType)
    }

  }
 
  getTableData() {
    this.httpService.get('../../../../assets/contents/product.json')
      .subscribe((data: any) => {
        console.log("data", data);
        this.tableConfig = data;
        this.isLoading = true;
        this.dataService.changeData(this.tableConfig)
      });
  }
}
