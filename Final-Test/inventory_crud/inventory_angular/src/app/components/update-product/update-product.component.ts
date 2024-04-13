import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-update-product',
    standalone: true,
    imports: [SidebarComponent, ReactiveFormsModule],
    templateUrl: './update-product.component.html',
    styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {

    http: HttpClient = inject(HttpClient);
    router: Router = inject(Router);
    productId: number

    constructor(private route: ActivatedRoute) {
        const id = this.route.snapshot.queryParamMap.get('id');
        this.productId = id ? + id : 0;
        console.log(this.productId);
    }

    productForm = new FormGroup({
        productName: new FormControl('', [
            Validators.required,
        ]),
        productDesc: new FormControl('', [
            Validators.required,
        ]),
        productQuantity: new FormControl('', [
            Validators.required,
        ]),
    });

    get productName() {
        return this.productForm.get('productName');
    }
    get productDesc() {
        return this.productForm.get('productDesc');
    }
    get productQuantity() {
        return this.productForm.get('productQuantity');
    }

    updateProduct() {
        let token = localStorage.getItem('token');
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        let product = {
            'name': this.productName?.value,
            'description': this.productDesc?.value,
            'quantity': this.productQuantity?.value,
            'id': this.productId
        }
        this.http.put<any>(`${environment.api_url}/update`, product, {headers})
        .subscribe({
            next: (response) => {
                if (response.status) {
                    Swal.fire({
                        icon: "success",
                        title: response.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.router.navigate(['view'])
                } else {
                    Swal.fire({
                        icon: "error",
                        title: response.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            },
            error: (error) => {
                Swal.fire({
                    icon: "error",
                    title: error.error.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            },
        });
    }
}
