export interface Tenant {
  id: string;
  name: string;
  address: string;
}

export interface CategoryPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

export interface CategoryAttribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export type Category = {
  _id: string;
  name: string;
  priceConfiguration: CategoryPriceConfiguration;
  attributes: CategoryAttribute[];
};

export interface ProductAttribute {
  name: string;
  value: string | number;
}

export type Product = {
  _id: string;
  name: string;
  description: string;
  isPublish: boolean;
  image: string;
  priceConfiguration: ProductPriceConfiguration;
  attributes: ProductAttribute[];
  category: Category;
  createdAt: string;
};

export type Topping = {
  _id: string;
  name: string;
  price: number;
  image: string;
};
