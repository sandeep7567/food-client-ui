export interface Tenant {
  id: string;
  name: string;
  address: string;
}

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
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
  priceConfiguration: PriceConfiguration;
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
  priceConfiguration: PriceConfiguration;
  attributes: ProductAttribute[];
  category: Category;
  createdAt: string;
};
