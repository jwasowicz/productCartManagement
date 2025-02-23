import { Component, inject, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order/order.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    HeaderComponent,
    ProductListComponent,
    CartComponent,
    OrderComponent,
  ],
})
export class AppComponent {
  cartService = inject(CartService);
}
