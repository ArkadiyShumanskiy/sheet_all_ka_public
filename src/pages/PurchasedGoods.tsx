import { useNavigate } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import { ProductType, ProductDTO } from "types/ProductType";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { TypographyHeadlines } from "../components/TypographyHeadlines";

import { getProductName, getProductCost } from "utils/productUtils";

export const PurchasedGoods: React.FC = () => {
  const queryClient = useQueryClient();

  const dataCategories = queryClient.getQueryData<ProductDTO[]>(["products"]);

  const purchasedGoods = (dataCategories as ProductType[])?.filter((product) => (product.weight ?? product.quantity ?? product.volume ?? 0) > 0);

  const purchasedGoodsSum = purchasedGoods.reduce((sum: number, product) => {
    return sum + (product.price ?? 0) * (product.weight ?? product.quantity ?? product.volume ?? 0);
  }, 0);

  const navigate = useNavigate();

  const goToCategories = () => {
    navigate("/categories");
  };

  return (
    <Container maxWidth="xs">
      <Box height="90%" sx={{ overflowY: "auto" }}>
        <Stack>
          <TypographyHeadlines sx={{ fontSize: "48px", marginTop: 0 }} variant="h2">
            КУПЛЕННЫЕ ПРОДУКТЫ
          </TypographyHeadlines>
          <Divider sx={{ borderColor: "#9e9e9e" }} />
          <Box>
            {purchasedGoods.map((product) => (
              <Typography sx={{ fontSize: "24px", fontWeight: "400" }} key={product.id}>{`${getProductName(product.id)}: ${getProductCost(
                product
              ).toFixed(2)} руб.`}</Typography>
            ))}

            <Divider sx={{ borderColor: "#9e9e9e" }} />
            <Typography sx={{ fontSize: "32px", fontWeight: "400" }}>Итого: {`${purchasedGoodsSum.toFixed(2)} руб.`}</Typography>
          </Box>
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
