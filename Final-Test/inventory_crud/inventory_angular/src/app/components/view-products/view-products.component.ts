import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from '../update-product/update-product.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-view-products',
    standalone: true,
    imports: [FormsModule, UpdateProductComponent, ReactiveFormsModule, SidebarComponent, RouterLink],
    templateUrl: './view-products.component.html',
    styleUrl: './view-products.component.css'
})
export class ViewProductsComponent {

    constructor() {
        if (!localStorage.getItem('token')) {
            this.router.navigate(['']);
        } else{
            this.router.navigate(['home']);
        }
        this.fetchMyProducts()
    }

    http: HttpClient = inject(HttpClient);
    router: Router = inject(Router);


    productData: [] = []

    fetchMyProducts() {
        let token = localStorage.getItem('token');
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        this.http.get<any>(`${environment.api_url}/fetch`, { headers })
            .subscribe({
                next: (data) => {
                    this.productData = data['product'];
                    console.log(this.productData);
                }
            });
    }

    deleteProduct(product_id: number) {
        let token = localStorage.getItem('token');
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        this.http.delete<any>(`${environment.api_url}/delete/${product_id}`, { headers })
            .subscribe({
                next: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Product Deleted Successfully!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setTimeout(() => {
                        location.reload()
                    }, 3000);
                },
            });
    }

}
