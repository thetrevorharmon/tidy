/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRef } from "react";

import { Input } from "theme-ui";

export function FileInput({
  acceptedFileTypes = ".mov,.mp4,.jpg,.jpeg,.png",
  onChange,
}) {
  const fileRef = useRef();

  function handleChange() {
    if (fileRef.current != null && fileRef.current.files.length > 0) {
      const [file] = fileRef.current.files;
      if (file != null && file.name != null) {
        onChange(file.name);
      }
    }
  }

  return (
    <Input
      type="file"
      name="file"
      ref={fileRef}
      onChange={handleChange}
      multiple={false}
      accept={acceptedFileTypes}
      sx={{
        py: 5,
        my: 3,
      }}
    />
  );
}
