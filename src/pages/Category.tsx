import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ProductType, ProductDTO } from "types/ProductType";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import { MainContext } from "context/MainContext";

import { ClearButton } from "components/ClearButton";

import { getProductName, getProductQuantity, getProductCost } from "utils/productUtils";

export const Category: React.FC = () => {
  const navigate = useNavigate();

  const { clearProductProperties } = useContext(MainContext);

  const { categoryId } = useParams();

  const queryClient = useQueryClient();

  const dataProducts = queryClient.getQueryData<ProductDTO[]>(["products"]);

  const productsInCategory = dataProducts?.filter((product) => product.category_id === Number(categoryId)) as ProductType[];
  const goToProduct = (productId: string) => {
    navigate(`/categories/${categoryId}/${productId}`);
  };

  const goToCategories = () => {
    navigate("/categories");
  };

  const clearProduct = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, productId: string) => {
    event.stopPropagation();
    clearProductProperties(productId);
  };

  return (
    <Container maxWidth="xs">
      <Box height="90%" sx={{ overflowY: "auto" }}>
        <Stack spacing={1}>
          {productsInCategory?.map((product) => {
            const productCost = getProductCost(product);
            return (
              <Box key={product.id}>
                {product.price === 0 || product.price === undefined ? (
                  <Stack>
                    <Button onClick={() => goToProduct(product.id)}>{getProductName(product.id)}</Button>
                  </Stack>
                ) : (
                  <Stack sx={{ position: "relative" }}>
                    <Button sx={{ display: "flex", alignItems: "flex-start" }} onClick={() => goToProduct(product.id)}>
                      <Box sx={{ display: "flex", flexDirection: "column", minWidth: "77%" }}>
                        <List sx={{ fontSize: "28px", color: "white", alignSelf: "center", paddingBottom: "1px" }}>
                          {`${getProductName(product.id)}: `}
                        </List>
                        <List sx={{ fontSize: "24px", color: "white", alignSelf: "center", padding: "0 0 0 0" }}>{`${productCost.toFixed(
                          2
                        )} руб.`}</List>
                        <Stack sx={{ fontSize: "16px", borderRadius: "8px", margin: "0 0 0 5px", maxWidth: "95%" }}>
                          {`цена: ${product.price} руб.`}
                          <Divider />
                          {getProductQuantity(product)}
                        </Stack>
                      </Box>
                    </Button>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", position: "absolute", top: "15px", right: "12px" }}>
                      <ClearButton onClick={(event) => clearProduct(event, product.id)}>Clear</ClearButton>
                    </Box>
                  </Stack>
                )}
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Box sx={{ paddingTop: "5px" }}>
        <Stack>
          <Button onClick={goToCategories}>НАЗАД</Button>
        </Stack>
      </Box>
    </Container>
  );
};
