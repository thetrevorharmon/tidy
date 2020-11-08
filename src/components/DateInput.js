/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRef } from "react";

import { Input, Label, Box } from "theme-ui";

export function DateInput({ onChange }) {
  const dateRef = useRef();

  function handleChange() {
    if (dateRef.current != null) {
      try {
        onChange(dateRef.current.value);
      } catch {
        // swallow errors
      }
    }
  }

  return (
    <Box>
      <Label htmlFor="date">Date</Label>
      <Input type="date" name="date" ref={dateRef} onChange={handleChange} />
    </Box>
  );
}
