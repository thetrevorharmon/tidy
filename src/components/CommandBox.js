/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from "react";
import { jsx } from "theme-ui";

import { Box, Textarea } from "theme-ui";

import { SplitButton, CodeBox } from "../components";

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
      {isElectron ? (
        <SplitButton
          code={command}
          onClick={runCommand}
          disabled={isRunningCommand || command == null}
        >
          Run Command
        </SplitButton>
      ) : (
        command != null && <CodeBox code={command} />
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
