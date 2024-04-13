import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.development';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.css'
})
export class SigninComponent {

    constructor() {
        if (!localStorage.getItem('token')) {
            this.router.navigate(['']);
        } else {
            this.router.navigate(['add']);
        }
    }

    http: HttpClient = inject(HttpClient);
    router: Router = inject(Router);

    signInForm = new FormGroup({
        signInEmail: new FormControl('', [
            Validators.required,
        ]),
        signInPassword: new FormControl('', [
            Validators.required,
        ])
    });

    signUpForm = new FormGroup({
        signUpName: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
        ]),
        signUpEmail: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
        ]),
        signUpPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
    });


    get signInEmail() {
        return this.signInForm.get('signInEmail');
    }

    get signInPassword() {
        return this.signInForm.get('signInPassword');
    }

    signIn() {
        let signInUser = {
            'email': this.signInEmail?.value,
            'password': this.signInPassword?.value
        }
        console.log(signInUser);

        this.http.post<any>(`${environment.api_url}/sign-in`, signInUser)
            .subscribe({
                next: (response) => {
                    if (response.status) {
                        this.router.navigate(['home'])
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("name", response.data.user.name);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: 'Invalid Credentials',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        this.router.navigate(['']);
                    }
                },
                error: (error) => {
                    Swal.fire({
                        icon: "error",
                        title: 'Invalid Credentials',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.router.navigate(['']);
                },
            });
    }

    get signUpName() {
        return this.signUpForm.get('signUpName');
    }

    get signUpEmail() {
        return this.signUpForm.get('signUpEmail');
    }

    get signUpPassword() {
        return this.signUpForm.get('signUpPassword');
    }

    signUp() {
        let signUpUser = {
            name: this.signUpName?.value,
            email: this.signUpEmail?.value,
            password: this.signUpPassword?.value,
        };
        console.log(signUpUser)

        this.http.post<any>(`${environment.api_url}/sign-up`, signUpUser)
            .subscribe({
                next: (response) => {
                    console.log(response)
                    if (response.status) {
                        Swal.fire({
                            icon: "success",
                            title: JSON.stringify(response.message),
                            showConfirmButton: false,
                            timer: 2000
                        })
                        this.router.navigate(['']);
                    } else {
                    console.log(response)
                        Swal.fire({
                            icon: "error",
                            title: JSON.stringify(response.message),
                            showConfirmButton: false,
                            timer: 2000
                        })
                        this.router.navigate(['']);
                    }
                },
                error: (error) => {
                    console.log(error.error)
                    Swal.fire({
                        icon: "error",
                        title: JSON.stringify(error.message),
                        showConfirmButton: false,
                        timer: 2000,
                    })
                    this.router.navigate(['/']);
                },
            });
    }
}
