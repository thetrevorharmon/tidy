/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRef, useState } from "react";

import { Input, Box } from "theme-ui";

export function FileInput({
  acceptedFileTypes = ".mov,.mp4,.jpg,.jpeg,.png",
  onChange,
}) {
  const [mediaSrc, setMediaSrc] = useState(null);
  const fileRef = useRef();

  function handleChange() {
    if (fileRef.current != null && fileRef.current.files.length > 0) {
      const [file] = fileRef.current.files;

      if (file != null && file.name != null) {
        const filePath = file.path != null ? file.path : file.name;
        setMediaSrc(URL.createObjectURL(file));
        onChange(filePath);
      }
    }
  }

  return (
    <Box>
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
      {mediaSrc && (
        <video width="320" height="240" autoPlay loop muted>
          <source src={mediaSrc} type="video/mp4" />
        </video>
      )}
    </Box>
  );
}
