/** @jsxRuntime classic */
/** @jsx jsx */
import { useRef, useState } from "react";
import { jsx } from "theme-ui";

import { Box, Button } from "theme-ui";

export function CommandBox({ command }) {
  const codeRef = useRef();
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    // this is basically a quick and dirty way to copy/paste a value without
    // needing an actual DOM element to bind to
    const textarea = document.createElement("textarea");
    textarea.value = command;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
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
        {isClicked ? "Copied!" : "Copy"}
      </Button>
    </Box>
  );
}
