import { Product } from './products';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(public key: string, public itemsMap: { [productId: string]: ShoppingCartItem }) {
    // tslint:disable-next-line: forin
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    if(this.items != null) {
      return this.items
      .map(shopItem => shopItem.totalPrice)
      .reduce((price1, price2) => price1 + price2);
    }
  }

    get totalItemsCount(){
        let count = 0;
        // tslint:disable-next-line: forin
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}
