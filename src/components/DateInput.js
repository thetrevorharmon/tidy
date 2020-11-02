/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRef } from "react";

import { Input } from "theme-ui";

export function DateInput({ onChange }) {
  const dateRef = useRef();

  function handleChange() {
    if (dateRef.current != null) {
      try {
        const date = new Date(dateRef.current.value);
        onChange(date);
      } catch {
        // swallow errors
      }
    }
  }

  return (
    <Input
      type="datetime-local"
      name="date"
      ref={dateRef}
      onChange={handleChange}
      sx={{ my: 3 }}
    />
  );
}
