/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRef } from "react";

import { Input, Label, Box } from "theme-ui";

export function TimeInput({ onChange }) {
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
      <Input type="time" name="time" ref={timeRef} onChange={handleChange} />
    </Box>
  );
}
