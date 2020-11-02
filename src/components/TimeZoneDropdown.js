/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRef } from "react";

import { Select } from "theme-ui";

export function TimeZoneDropdown() {
  const timeZoneSelectRef = useRef();

  const options = [
    {
      value: -8,
      label: "(GMT-08:00) Pacific Time (US & Canada)",
    },
    {
      value: -7,
      label: "(GMT-07:00) Mountain Time (US & Canada)",
    },
    {
      value: -6,
      label: "(GMT-06:00) Central Time (US & Canada)",
    },
    {
      value: -5,
      label: "(GMT-05:00) Eastern Time (US & Canada)",
    },
  ];

  return (
    <Select
      name="timeZone"
      ref={timeZoneSelectRef}
      onChange={() => console.log(timeZoneSelectRef.current.value)}
      defaultValue={0}
    >
      {options.map((option) => (
        <option value={option.value} id={options.label}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
