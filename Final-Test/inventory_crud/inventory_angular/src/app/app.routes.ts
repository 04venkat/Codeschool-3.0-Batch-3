import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

export const routes: Routes = [
    {
        path: '',
        component: SigninComponent
    },
    {
        path: 'home',
        component: HomepageComponent
    },
    {
        path: 'add',
        component: AddProductComponent
    },
    {
        path: 'update',
        component: UpdateProductComponent
    },
    {
        path: 'view',
        component: ViewProductsComponent
    }
];
