/** @jsxRuntime classic */
/** @jsx jsx */
import { useRef, useState } from "react";
import { jsx } from "theme-ui";

import { Box, Button, Textarea } from "theme-ui";

import { executeCommand, isElectron } from "../utilities";

export function CommandBox({ command }) {
  const codeRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isRunningCommand, setIsRunningCommand] = useState(false);
  const [commandResult, setCommandResult] = useState("");

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

  async function runCommand() {
    setIsRunningCommand(true);

    try {
      const result = await executeCommand(command);
      setCommandResult(result);
    } catch (error) {
      setCommandResult(error.message);
    }

    setIsRunningCommand(false);
  }

  return (
    <Box>
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
          variant={isRunningCommand ? "disabled" : "primary"}
          sx={{ position: "absolute", bottom: 2, right: 2 }}
          onClick={handleClick}
          disabled={isRunningCommand}
        >
          {isClicked ? "Copied!" : "Copy"}
        </Button>
      </Box>
      {isElectron && (
        <Button
          variant={isRunningCommand ? "disabled" : "daring"}
          sx={{
            width: "100%",
            mt: 2,
          }}
          onClick={runCommand}
          disabled={isRunningCommand}
        >
          Run Command
        </Button>
      )}
      {commandResult && (
        <Textarea
          disabled={true}
          sx={{
            mt: 3,
            minHeight: "200px",
            border: 0,
            background: "#eee",
            padding: 3,
          }}
        >
          {commandResult}
        </Textarea>
      )}
    </Box>
  );
}
