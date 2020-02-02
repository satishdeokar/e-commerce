import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'landing',
        loadChildren: () => import('./featured/landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./featured/user-management/user-management.module').then(m => m.UserManagementModule)
      },
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./featured/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./featured/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./featured/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('./featured/inventory/inventory.module').then(m => m.InventoryModule)
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./featured/error/error.module').then(m => m.ErrorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
