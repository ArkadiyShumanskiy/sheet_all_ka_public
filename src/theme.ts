import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        endIcon: {
          "& > *:first-of-type": {
            fontSize: 60,
          },
        },
        root: {
          fontFamily: "Roboto",
          fontWeight: "700",
          backgroundColor: "#9e9e9e",
          color: "#112131",
          fontSize: "28px",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#757575",
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Roboto",
          fontWeight: "700",
          fontSize: "68px",
          color: "#9e9e9e",
          justifyContent: "center",
          marginTop: "15px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#112131",
          height: "100vh",
          paddingTop: "10px",
          paddingBottom: "10px",
        },
      },
    },
  },
});
