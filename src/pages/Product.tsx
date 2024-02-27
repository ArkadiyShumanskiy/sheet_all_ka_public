import { useContext } from "react";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ProductType } from "types/ProductType";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { MainContext } from "context/MainContext";

import { Keyboard } from "../components/Keyboard";

import { getProductName } from "utils/productUtils";

export const Product: React.FC = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const dataProducts = queryClient.getQueryData<ProductType[]>(["products"]);

  const { productId, categoryId } = useParams();

  const [params] = useSearchParams();

  const { setPrice, setWeight, setQuantity, setVolume } = useContext(MainContext);

  const product = dataProducts?.find((product) => String(product.id) === productId);
  console.log(dataProducts);

  const goodsForWeighing =
    dataProducts?.filter((product) => (product.price ?? 0) > 0 && (product.weight ?? product.quantity ?? product.volume ?? 0) == 0) ?? [];

  const goToCategory = () => {
    navigate(`/categories/${categoryId}`);
  };

  const goToWeighing = () => {
    navigate("/for-weighing");
  };

  const goToPurchasedGoods = () => {
    navigate("/purchased-goods");
  };

  const goBack = () => {
    if (params.get("redirectedFrom") === "weighing") {
      const isGoodsForWeighingEmpty =
        goodsForWeighing.filter((productForWeighing) => product !== undefined && productForWeighing.id !== product.id).length > 0;
      if (isGoodsForWeighingEmpty) {
        goToWeighing();
      } else {
        goToPurchasedGoods();
      }
    } else {
      goToCategory();
    }
  };

  const onSetPrice = (price: number) => {
    if (!productId) return;

    setPrice(productId, price);

    goToCategory();
  };

  const onSetWeight = (weight: number) => {
    if (!productId) return;
    setWeight(productId, weight);
    goBack();
  };

  const onSetQuantity = (quantity: number) => {
    if (!productId) return;
    setQuantity(productId, quantity);
    goBack();
  };

  const onSetVolume = (volume: number) => {
    if (!productId) return;
    setVolume(productId, volume);
    goBack();
  };

  if (product === undefined) {
    return null;
  }

  return (
    <Container maxWidth="xs">
      <Box height="90%" sx={{ overflowY: "auto" }}>
        <Typography sx={{ fontSize: "52px", fontWeight: "500" }}>{getProductName(product.id)}</Typography>
        {product.price === 0 || product.price === undefined ? (
          <>
            <Typography sx={{ fontSize: "48px", fontWeight: "400" }}>{`цена: ${product.price ?? 0} руб.`}</Typography>
            <Keyboard onOkClick={onSetPrice} initialValue={product.price ?? 0} />
          </>
        ) : product.unit_id === 1 ? (
          <>
            <Typography sx={{ fontSize: "48px", fontWeight: "400" }}>{`вес: ${product.weight ?? 0} кг.`}</Typography>
            <Keyboard onOkClick={onSetWeight} initialValue={product.weight ?? 0} />
          </>
        ) : product.unit_id === 2 ? (
          <>
            <Typography sx={{ fontSize: "48px", fontWeight: "400" }}>{`объём: ${product.volume ?? 0} л.`}</Typography>
            <Keyboard onOkClick={onSetVolume} initialValue={product.volume ?? 0} />
          </>
        ) : product.unit_id === 3 ? (
          <>
            <Typography sx={{ fontSize: "48px", fontWeight: "400" }}>{`кол-во: ${product.quantity ?? 0} шт.`}</Typography>
            <Keyboard onOkClick={onSetQuantity} initialValue={product.quantity ?? 0} />
          </>
        ) : null}
      </Box>
      <Box>
        <Stack>
          <Button onClick={goBack}>НАЗАД</Button>
        </Stack>
      </Box>
    </Container>
  );
};
