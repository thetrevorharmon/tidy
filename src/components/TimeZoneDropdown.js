/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import { Select, Label, Box } from "theme-ui";

export function TimeZoneDropdown({ value, onChange }) {
  const options = [
    {
      value: "-08:00",
      label: "Pacific Time (GMT-08:00) ",
    },
    {
      value: "-07:00",
      label: "Mountain Time (GMT-07:00) ",
    },
    {
      value: "-06:00",
      label: "Central Time (GMT-06:00) ",
    },
    {
      value: "-05:00",
      label: "Eastern Time (GMT-05:00) ",
    },
  ];

  return (
    <Box>
      <Label htmlFor="timeZone">Timezone</Label>
      <Select
        name="timeZone"
        onChange={(event) => onChange(event.target.value)}
        value={value}
        sx={{ mt: 2, mb: 3 }}
      >
        {options.map((option) => (
          <option key={option.label} value={option.value} id={options.label}>
            {option.label}
          </option>
        ))}
      </Select>
    </Box>
  );
}
