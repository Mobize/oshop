import { Product } from './products';

export interface ShoppingCartItem {
    product: Product;
    quantity: number;
}