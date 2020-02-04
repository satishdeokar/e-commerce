import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPaginatorComponent } from './components/custom-paginator.component';


const routes: Routes = [
  {
    path: '',
    component: CustomPaginatorComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomePaginatorRoutingModule { }
