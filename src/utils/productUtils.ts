import { ProductType } from "types/ProductType";

export const getProductName = (productId: string) => {
  switch (productId) {
    case "1":
      return "КАРТОФЕЛЬ";
    case "2":
      return "ПОМИДОРЫ";
    case "3":
      return "ОГУРЦЫ";
    case "4":
      return "КАПУСТА";
    case "5":
      return "РЕПЧАТЫЙ ЛУК";
    case "6":
      return "МОРКОВЬ";
    case "7":
      return "СВЁКЛА";
    case "8":
      return "БОЛГАРСКИЙ ПЕРЕЦ";
    case "9":
      return "ЧЕСНОК";
    case "10":
      return "ЯБЛОКИ";
    case "11":
      return "БАНАНЫ";
    case "12":
      return "ГРУШИ";
    case "13":
      return "АПЕЛЬСИНЫ";
    case "14":
      return "ЛИМОНЫ вес.";
    case "15":
      return "ЛИМОНЫ шт.";
    default:
      return "НЕИЗВЕСТНАЯ КАТЕГОРИЯ";
  }
};

export const getProductQuantity = (product: ProductType) => {
  switch (product.unit_id) {
    case 1:
      return `вес: ${product.weight ?? 0} кг.`;
    case 2:
      return `объём: ${product.volume ?? 0} л.`;
    case 3:
      return `кол-во: ${product.quantity ?? 0} шт.`;
    default:
      return 0;
  }
};

export const getCategoryName = (categoryId: string) => {
  switch (categoryId) {
    case "1":
      return "ОВОЩИ";
    case "2":
      return "ФРУКТЫ";
    case "3":
      return "ПРОЧЕЕ";
    default:
      return "НЕИЗВЕСТНАЯ КАТЕГОРИЯ";
  }
};

export const getProductCost = (product: ProductType) => {
  switch (product.unit_id) {
    case 1:
      return (product.price ?? 0) * (product.weight ?? 0);
    case 2:
      return (product.price ?? 0) * (product.volume ?? 0);
    case 3:
      return (product.price ?? 0) * (product.quantity ?? 0);
    default:
      return 0;
  }
};
