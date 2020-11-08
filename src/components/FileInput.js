/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Input, Box, Text, Button } from "theme-ui";

export function FileInput({
  acceptedFileTypes = ".mov,.mp4,.jpg,.jpeg,.png",
  onChange,
}) {
  const [mediaSrc, setMediaSrc] = useState(null);
  const fileRef = useRef();

  const onFileChange = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const [file] = acceptedFiles;

        if (file != null && file.name != null) {
          const filePath = file.path != null ? file.path : file.name;
          setMediaSrc(URL.createObjectURL(file));
          onChange(filePath);
        }
      }
    },
    [onChange, setMediaSrc]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileChange,
  });

  const rootProps = { ...getRootProps() };

  const inputProps = {
    ...getInputProps(),
    name: "file",
    id: "file",
    type: "file",
    multiple: "false",
    ref: fileRef,
  };

  function clearSelection() {
    setMediaSrc(null);
    onChange(null);
  }

  return (
    <Box
      {...rootProps}
      sx={{
        borderWidth: "1px",
        borderStyle: isDragActive ? "dashed" : "solid",
        borderRadius: "4px",
        py: mediaSrc != null ? 0 : 5,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {mediaSrc == null ? (
        <Text
          sx={{
            textAlign: "center",
            fontSize: 2,
            fontWeight: "bold",
            zIndex: 0,
            position: "relative",
            background: "white",
          }}
        >
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag a video or image here</p>
          )}
        </Text>
      ) : null}

      <Input {...inputProps} sx={{ p: 0, mt: 0, mb: 0 }} />

      {mediaSrc != null ? (
        <video
          style={{ objectFit: "cover" }}
          width="100%"
          height="320"
          autoPlay
          loop
          muted
          sx={{ m: 0, p: 0, mb: -2 }}
        >
          <source src={mediaSrc} type="video/mp4" />
        </video>
      ) : null}

      {mediaSrc != null ? (
        <Button
          onClick={clearSelection}
          sx={{
            position: "absolute",
            zIndex: 3,
            bottom: 2,
            right: 2,
          }}
        >
          Clear
        </Button>
      ) : null}
    </Box>
  );
}
