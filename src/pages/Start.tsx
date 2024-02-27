import { useNavigate } from "react-router-dom";
import { TypographyHeadlines } from "../components/TypographyHeadlines";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Start = () => {
  const navigate = useNavigate();

  const goToCategories = () => {
    navigate("/categories");
  };
  return (
    <>
      <Container maxWidth="xs">
        <Box height="90%">
          <Stack>
            <TypographyHeadlines variant="h2">Считалка</TypographyHeadlines>
          </Stack>
        </Box>
        <Box>
          <Stack>
            <Button endIcon={<ShoppingCartIcon />} onClick={goToCategories}>
              НАЧАТЬ ПОКУПКИ
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
