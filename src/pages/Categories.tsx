import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryDTO } from "types/CategoryType";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { getCategoryName } from "utils/productUtils";

export const Categories = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const dataCategories = queryClient.getQueryData<CategoryDTO[]>(["categories"]);

  const goToStart = () => {
    navigate("/");
  };

  const goToCategory = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  const goToForWeighing = () => {
    navigate("/for-weighing");
  };

  const goToPurchasedGoods = () => {
    navigate("/purchased-goods");
  };

  return (
    <>
      <Container maxWidth="xs">
        <Box height="90%">
          <Stack spacing={1}>
            {dataCategories?.map((category: CategoryDTO) => {
              return (
                <Button onClick={() => goToCategory(category.id)} key={category.id}>
                  {getCategoryName(category.id)}
                </Button>
              );
            })}
            <Button onClick={goToForWeighing}>ВЗВЕШИВАНИЕ</Button>
            <Button onClick={goToPurchasedGoods}>КУПЛЕННЫЕ ПРОДУКТЫ</Button>
          </Stack>
        </Box>
        <Box>
          <Stack>
            <Button onClick={goToStart}>НАЗАД</Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
