import { inject, Injectable, signal } from '@angular/core';
import { CartItem, Data, DataType } from '../models/data.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items = signal<CartItem[]>([]);
  activeItems = signal<CartItem[]>([]);
  productService = inject(ProductService);
  showOrder = signal(false);

  addItem(productName: string) {
    const product = this.productService
      .data()
      .find((item) => item.name === productName);

    if (product) {
      const newValue = {
        productName: product.name,
        quantity: 1,
        price: product.price.toString(),
        active: false,
      };

      this.items.update((oldValue) => {
        return [newValue, ...oldValue];
      });
    }
  }

  changeItemQuantity(data: DataType) {
    const productIndex = this.items().findIndex(
      (item) => item.productName === data.productName
    );

    if (productIndex !== -1) {
      const product = this.items()[productIndex];
      product.quantity =
        data.actionType === 'increment'
          ? product.quantity + 1
          : product.quantity - 1;

      if (product.quantity === 0) {
        this.items.update((oldValue) => {
          return oldValue.filter((_, index) => index !== productIndex);
        });
      } else {
        this.items.update((oldValue) => {
          return [...oldValue];
        });
      }
    }
  }

  getQuantity(productName: string) {
    const item = this.items().find((item) => item.productName === productName);
    return item ? item.quantity : 0;
  }

  removeItem(productName: string) {
    this.items.update((oldValue) => {
      return oldValue.filter((item) => item.productName !== productName);
    });
  }

  totalOrder() {
    return this.items().reduce((acc, item) => {
      return acc + item.quantity * +item.price;
    }, 0);
  }

  findElement(productName: string) {
    return this.productService.data().find((item) => item.name === productName);
  }

  clearCart() {
    this.productService.data().forEach((item) => {
      item.active = false;
    });
    this.items.set([]);
  }
}
