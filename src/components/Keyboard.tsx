import React, { useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BackspaceIcon from "@mui/icons-material/Backspace";

import { NumberButton } from "../components/NumberButton";

type KeyboardProps = {
  onOkClick: (value: number) => void;
  initialValue: number;
};

export const Keyboard: React.FC<KeyboardProps> = ({ onOkClick, initialValue }) => {
  const [state, setState] = useState<string[]>(String(initialValue).split(","));

  const addNumHandler = (num: string) => {
    const newState = state.length === 1 && state[0] === "0" ? [num] : [...state, num];
    setState(newState);
  };

  const removeNumHandler = () => {
    setState([]);
  };

  const onOkClickHandler = () => {
    const stateAsNumber = Number(state.join(""));
    onOkClick(stateAsNumber);
  };

  return (
    <Container
      disableGutters
      sx={{
        height: "66.5%",
        paddingTop: "1px",
        paddingBottom: "1px",
        paddingLeft: "1px",
        paddingRight: "1px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#9e9e9e",
          borderRadius: "8px",
          fontSize: "48px",
          fontFamily: "Roboto",
          fontWeight: "700",
          color: "#112131",
          justifyContent: "flex-end",
          display: "flex",
          paddingRight: "10px",
          minHeight: "20%",
        }}
      >
        {state}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr 1fr",
          height: "100%",
          marginTop: "5px",
        }}
      >
        <NumberButton sx={{ gridColumn: "1 / 2", gridRow: "1 / 2" }} onClick={() => addNumHandler("1")}>
          1
        </NumberButton>
        <NumberButton sx={{ gridColumn: "2 / 3", gridRow: "1 / 2" }} onClick={() => addNumHandler("2")}>
          2
        </NumberButton>
        <NumberButton sx={{ gridColumn: "3 / 4", gridRow: "1 / 2" }} onClick={() => addNumHandler("3")}>
          3
        </NumberButton>
        <NumberButton sx={{ gridColumn: "1 / 2", gridRow: "2 / 3" }} onClick={() => addNumHandler("4")}>
          4
        </NumberButton>
        <NumberButton sx={{ gridColumn: "2 / 3", gridRow: "2 / 3" }} onClick={() => addNumHandler("5")}>
          5
        </NumberButton>
        <NumberButton sx={{ gridColumn: "3 / 4", gridRow: "2 / 3" }} onClick={() => addNumHandler("6")}>
          6
        </NumberButton>
        <NumberButton sx={{ gridColumn: "1 / 2", gridRow: "3 / 4" }} onClick={() => addNumHandler("7")}>
          7
        </NumberButton>
        <NumberButton sx={{ gridColumn: "2 / 3", gridRow: "3 / 4" }} onClick={() => addNumHandler("8")}>
          8
        </NumberButton>
        <NumberButton sx={{ gridColumn: "3 / 4", gridRow: "3 / 4" }} onClick={() => addNumHandler("9")}>
          9
        </NumberButton>
        <NumberButton sx={{ gridColumn: "1 /3", gridRow: "4 / 5" }} onClick={() => addNumHandler("0")}>
          0
        </NumberButton>
        <NumberButton sx={{ gridColumn: "4 / 5", gridRow: "1 / 3" }} onClick={() => removeNumHandler()}>
          <BackspaceIcon sx={{ fontSize: "48px" }} />
        </NumberButton>
        <NumberButton sx={{ gridColumn: "4 / 5", gridRow: "3 / 5" }} onClick={() => onOkClickHandler()}>
          OK
        </NumberButton>
        <NumberButton sx={{ gridColumn: "3 / 4", gridRow: "4 / 5" }} onClick={() => addNumHandler(".")}>
          .
        </NumberButton>
      </Box>
    </Container>
  );
};
