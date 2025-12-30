import { ProductCardInterface } from '../interfaces/ProductCardInterface';

export class productCard implements ProductCardInterface {
  productName: string = 'MAN Eau de Toilette Spray';
  price: string = '$37.50';
  model: string = 'CK0010';
  manufacturer: string = 'Calvin Klein';

  constructor(customData?: Partial<ProductCardInterface>) {
    if (customData) Object.assign(this, customData);
  }
  get productDetails(): ProductCardInterface {
    const { productName, price, model, manufacturer } = this;
    return { productName, price, model, manufacturer };
  }
}
