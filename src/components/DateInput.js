/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRef } from "react";

import { Input, Label, Box } from "theme-ui";

export function DateInput({ value, onChange }) {
  const dateRef = useRef();

  function handleChange() {
    if (dateRef.current != null) {
      console.log(dateRef.current.value);
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
      <Input
        type="date"
        name="date"
        value={value}
        ref={dateRef}
        onChange={(event) => onChange(event.target.value)}
      />
    </Box>
  );
}
