import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { theme } from "theme";

import { MainContext } from "context/MainContext";
import { CategoryDTO } from "types/CategoryType";
import { ProductType, ProductDTO } from "types/ProductType";
import { UnitDTO } from "types/UnitType";

import { Start } from "./pages/Start";
import { Categories } from "./pages/Categories";
import { Product } from "./pages/Product";
import { PurchasedGoods } from "./pages/PurchasedGoods";
import { ForWeighing } from "./pages/ForWeighing";
import { Category } from "./pages/Category";

const fetchProducts = async () => {
  const res = await fetch("http://127.0.0.1:3005/products");
  return res.json() as Promise<ProductDTO[]>;
};
const fetchCategories = async () => {
  const res = await fetch("http://127.0.0.1:3005/categories");
  return res.json() as Promise<CategoryDTO[]>;
};
const fetchUnits = async () => {
  const res = await fetch("http://127.0.0.1:3005/units");
  return res.json() as Promise<UnitDTO[]>;
};

export function App() {
  const queryClient = useQueryClient();

  const { data: dataProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: dataCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: dataUnits } = useQuery({
    queryKey: ["units"],
    queryFn: fetchUnits,
  });

  const setPrice = (productId: string, price: number) => {
    const targetProduct = dataProducts?.find((product) => product.id === productId) as ProductType;
    if (!targetProduct) return;
    targetProduct.price = price;
    const updatedProducts = dataProducts?.map((product) => {
      return product.id === targetProduct.id ? targetProduct : product;
    });
    if (updatedProducts) queryClient.setQueryData(["products"], updatedProducts);
  };
  const setWeight = (productId: string, weight: number) => {
    const targetProduct = dataProducts?.find((product) => product.id === productId) as ProductType;
    if (!targetProduct) return;
    targetProduct.weight = weight;
    const updatedProducts = dataProducts?.map((product) => {
      return product.id === targetProduct.id ? targetProduct : product;
    });
    if (updatedProducts) queryClient.setQueryData(["products"], updatedProducts);
  };
  const setQuantity = (productId: string, quantity: number) => {
    const targetProduct = dataProducts?.find((product) => product.id === productId) as ProductType;
    if (!targetProduct) return;
    targetProduct.quantity = quantity;

    const updatedProducts = dataProducts?.map((product) => {
      return product.id === targetProduct.id ? targetProduct : product;
    });
    if (updatedProducts) queryClient.setQueryData(["products"], updatedProducts);
  };
  const setVolume = (productId: string, volume: number) => {
    const targetProduct = dataProducts?.find((product) => product.id === productId) as ProductType;
    if (!targetProduct) return;
    targetProduct.volume = volume;

    const updatedProducts = dataProducts?.map((product) => {
      return product.id === targetProduct.id ? targetProduct : product;
    });
    if (updatedProducts) queryClient.setQueryData(["products"], updatedProducts);
  };
  const clearProductProperties = (productId: string) => {
    const targetProduct = dataProducts?.find((product) => product.id === productId) as ProductType;
    if (!targetProduct) return;
    targetProduct.weight = 0;
    targetProduct.price = 0;
    targetProduct.quantity = 0;
    targetProduct.volume = 0;

    const updatedProducts = dataProducts?.map((product) => {
      return product.id === targetProduct.id ? targetProduct : product;
    });
    if (updatedProducts) queryClient.setQueryData(["products"], updatedProducts);
  };

  return (
    <BrowserRouter>
      <MainContext.Provider value={{ setPrice, setWeight, setQuantity, setVolume, clearProductProperties }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StyledEngineProvider injectFirst>
            <Routes>
              <Route path="/">
                <Route index element={<Start />} />
                <Route path="categories">
                  <Route index element={<Categories />} />
                  <Route path=":categoryId">
                    <Route index element={<Category />} />
                    <Route path=":productId" element={<Product />} />
                  </Route>
                </Route>
                <Route path="for-weighing" element={<ForWeighing />} />
                <Route path="purchased-goods" element={<PurchasedGoods />} />
              </Route>
            </Routes>
          </StyledEngineProvider>
        </ThemeProvider>
      </MainContext.Provider>
    </BrowserRouter>
  );
}
