/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import { Input, Label, Box } from "theme-ui";

export function TimeInput({ value, onChange }) {
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
