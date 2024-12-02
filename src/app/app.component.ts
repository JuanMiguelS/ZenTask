import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { ItemsComponent } from '../app/components/items/items.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { ItemComponent } from "./components/item/item.component";
import { TotalComponent } from "./components/total/total.component";
import { TranslateModule } from '@ngx-translate/core'; // Asegúrate de que TranslateModule esté importado
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ItemsComponent,
    HeaderComponent,
    ItemComponent,
    TotalComponent,
    TranslateModule // Asegúrate de que TranslateModule está en los imports del componente
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZenTask';
 constructor(private router: Router) {}

  // Métodos para navegar a las páginas de Login y Register
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  }
