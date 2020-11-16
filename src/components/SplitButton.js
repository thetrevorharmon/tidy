/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Button, Flex, Box } from "theme-ui";
import React, { useState } from "react";

import { CodeBox } from "./CodeBox";

import { ReactComponent as CaretDownIcon } from "../assets/caret-down.svg";

export function SplitButton({ children, color = "black", onClick, command }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Flex>
        <Button
          sx={{
            backgroundColor: color,
            flex: "1 1 auto",
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            borderRight: "2px solid white",
          }}
          onClick={onClick}
        >
          {children}
        </Button>
        <Button
          sx={{
            backgroundColor: color,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Box
            sx={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all 100ms linear",
            }}
          >
            <CaretDownIcon color="white" />
          </Box>
        </Button>
      </Flex>
      {isOpen && (
        <Box sx={{ mt: 1 }}>
          <CodeBox code={command} />
        </Box>
      )}
    </React.Fragment>
  );
}
