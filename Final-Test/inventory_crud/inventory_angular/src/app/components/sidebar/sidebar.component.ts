import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

    router: Router = inject(Router);

    name = localStorage.getItem('name');

    signOut(){
        localStorage.clear();
        this.router.navigate(['']);
    }   
}
