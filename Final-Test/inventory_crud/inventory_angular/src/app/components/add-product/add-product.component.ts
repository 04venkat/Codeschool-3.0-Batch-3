import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormGroup, FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [FormsModule, SidebarComponent, ReactiveFormsModule],
    templateUrl: './add-product.component.html',
    styleUrl: './add-product.component.css'
})
export class AddProductComponent {

    constructor() {
        if (!localStorage.getItem('token')) {
            this.router.navigate(['']);
        } else{
            this.router.navigate(['home']);
        }
    }

    http: HttpClient = inject(HttpClient);
    router: Router = inject(Router);

    
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

    addProduct(){
        let token = localStorage.getItem('token');
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        let product = {
            'name': this.productName?.value,
            'description': this.productDesc?.value,
            'quantity': this.productQuantity?.value
        }
        this.http.post<any>(`${environment.api_url}/store`, product, {headers})
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
