export type ProductDTO = {
  id: string;
  product_name: string;
  imgurl: string;
  unit_id: number;
  category_id: number;
};

export type ProductType = ProductDTO & {
  price?: number;
  weight?: number;
  quantity?: number;
  volume?: number;
};
