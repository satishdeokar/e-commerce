import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomePaginatorRoutingModule } from './custom-paginator-routing.module';
import { CustomPaginatorComponent } from './components/custom-paginator.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CustomPaginatorComponent],
  imports: [
    CommonModule,
    CustomePaginatorRoutingModule,
    SharedModule
  ]
})
export class CustomePaginatorModule { }
