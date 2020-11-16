/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Button } from "theme-ui";
import { useRef, useState } from "react";

export function CodeBox({ code, disabled }) {
  const codeRef = useRef();

  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    // this is basically a quick and dirty way to copy/paste a
    // value without needing an actual DOM element to bind to
    const textarea = document.createElement("textarea");
    textarea.value = code;
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
        backgroundColor: "black",
        color: "white",
        p: 3,
        borderRadius: "4px",
        position: "relative",
      }}
    >
      <code ref={codeRef}>{code}</code>
      <Button
        variant={disabled ? "disabled" : "transparentPrimary"}
        sx={{ position: "absolute", bottom: 2, right: 2 }}
        onClick={handleClick}
        disabled={disabled}
      >
        {isClicked ? "Copied!" : "Copy"}
      </Button>
    </Box>
  );
}
