/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import { Input, Label, Box } from "theme-ui";

export function DateInput({ value, onChange }) {
  return (
    <Box>
      <Label htmlFor="date">Date</Label>
      <Input
        type="date"
        name="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Box>
  );
}
