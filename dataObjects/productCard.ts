import { ProductCardInterface } from '../interfaces/ProductCardInterface';

export class productCard implements ProductCardInterface {
  productName!: string;
  price!: string;
  model!: string;
  manufacturer!: string;

  constructor(customData?: Partial<ProductCardInterface>) {
    const defaultData: ProductCardInterface = {
      productName: 'MAN Eau de Toilette Spray',
      price: '$37.50',
      model: 'CK0010',
      manufacturer: 'Calvin Klein',
    };

    Object.assign(this, { ...defaultData, ...customData });
  }
  get productDetails() {
    return {
      productName: this.productName,
      price: this.price,
      model: this.model,
      manufacturer: this.manufacturer,
    };
  }
}
