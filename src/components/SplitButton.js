/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Button, Flex, Box } from "theme-ui";
import React, { useState } from "react";

import { CodeBox } from "./CodeBox";

import { ReactComponent as CaretDownIcon } from "../assets/caret-down.svg";

export function SplitButton({
  color = "black",
  disabled = false,
  code,
  children,
  onClick,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Flex>
        <Button
          sx={{
            backgroundColor: disabled ? "gray" : color,
            flex: "1 1 auto",
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            borderRight: "2px solid white",
          }}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </Button>
        <Button
          sx={{
            backgroundColor: disabled ? "gray" : color,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
          }}
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
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
          <CodeBox disabled={disabled} code={code} />
        </Box>
      )}
    </React.Fragment>
  );
}
