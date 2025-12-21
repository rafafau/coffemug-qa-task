import { ProductCardInterface } from '../interfaces/ProductCardInterface';

export class productCard implements ProductCardInterface {
  keyword!: string;
  sortOption!: string;
  categoryId!: string;
  productName!: string;
  price!: string;

  constructor(customData?: Partial<ProductCardInterface>) {
    const defaultData: ProductCardInterface = {
      keyword: 'perfume',
      sortOption: 'p.price-ASC',
      categoryId: '0,58',
      productName: 'MAN Eau de Toilette Spray',
      price: '$37.50',
    };

    Object.assign(this, { ...defaultData, ...customData });
  }
}
