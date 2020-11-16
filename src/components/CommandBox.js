/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from "react";
import { jsx } from "theme-ui";

import { Box, Button, Textarea } from "theme-ui";

import { CodeBox } from "./CodeBox";

import { executeCommand, isElectron } from "../utilities";

export function CommandBox({ command }) {
  const [isRunningCommand, setIsRunningCommand] = useState(false);
  const [commandResult, setCommandResult] = useState("");

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
      <CodeBox code={command} />
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
