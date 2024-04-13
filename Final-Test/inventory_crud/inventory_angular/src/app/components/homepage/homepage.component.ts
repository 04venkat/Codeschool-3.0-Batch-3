import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

    router: Router = inject(Router);

    constructor() {
        if (!localStorage.getItem('token')) {
            this.router.navigate(['']);
        } else{
            this.router.navigate(['home']);
        }
    }

}
