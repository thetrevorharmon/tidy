/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRef } from "react";

import { Input, Label, Box } from "theme-ui";

export function TimeInput({ value, onChange }) {
  const timeRef = useRef();

  function handleChange() {
    if (timeRef.current != null) {
      try {
        onChange(timeRef.current.value);
      } catch {
        // swallow errors
      }
    }
  }

  return (
    <Box>
      <Label htmlFor="date">Time</Label>
      <Input
        type="time"
        name="time"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Box>
  );
}
