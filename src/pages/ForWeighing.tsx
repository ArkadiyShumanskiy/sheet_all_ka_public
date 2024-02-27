import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ProductType } from "types/ProductType";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { ClearButton } from "components/ClearButton";

import { MainContext } from "context/MainContext";
import { getProductName, getProductQuantity } from "utils/productUtils";

export const ForWeighing: React.FC = () => {
  const navigate = useNavigate();

  const { clearProductProperties } = useContext(MainContext);

  const queryClient = useQueryClient();

  const dataProducts = queryClient.getQueryData<ProductType[]>(["products"]);

  const goToCategories = () => {
    navigate("/categories");
  };

  const clearProduct = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, productId: string) => {
    event.stopPropagation();

    clearProductProperties(productId);
  };

  const goodsForWeighing = dataProducts?.filter(
    (product) => (product.price ?? 0) > 0 && (product.weight ?? product.quantity ?? product.volume ?? 0) === 0
  );

  const goToHandler = (product: ProductType) => {
    navigate(`/categories/${product.category_id}/${product.id}?redirectedFrom=weighing`);
  };

  const getProductCost = (product: ProductType) => {
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

  return (
    <Container maxWidth="xs">
      <Box height="90%" sx={{ overflowY: "auto" }}>
        <Stack spacing={1}>
          {goodsForWeighing?.map(
            (product) =>
              (product.price ?? 0) > 0 && (
                <Stack key={product.id} sx={{ position: "relative" }}>
                  <Button sx={{ display: "flex", alignItems: "flex-start" }} onClick={() => goToHandler(product)}>
                    <Box sx={{ display: "flex", flexDirection: "column", minWidth: "77%" }}>
                      <List sx={{ fontSize: "28px", color: "white", alignSelf: "center", paddingBottom: "1px" }}>{`${getProductName(
                        product.id
                      )}: `}</List>
                      <List sx={{ fontSize: "24px", color: "white", alignSelf: "center", padding: "0 0 0 0" }}>{`${getProductCost(product).toFixed(
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
              )
          )}
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
