/** @jsxRuntime classic */
/** @jsx jsx */
import { useRef } from "react";
import { jsx } from "theme-ui";

import { Box, Button } from "theme-ui";

export function CommandBox({ command }) {
  const codeRef = useRef();

  function handleClick() {
    const el = document.createElement("textarea");
    el.value = command;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  return (
    <Box
      sx={{
        minHeight: 180,
        backgroundColor: "#eee",
        p: 3,
        border: "1px solid #aaa",
        borderRadius: "4px",
        position: "relative",
      }}
    >
      <code ref={codeRef}>{command}</code>
      <Button
        sx={{ position: "absolute", bottom: 2, right: 2 }}
        onClick={handleClick}
      >
        Copy
      </Button>
    </Box>
  );
}
