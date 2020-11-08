/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useRef, useState, useCallback } from "react";
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
          setMediaSrc({ file: URL.createObjectURL(file), name: file.name });
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
    acceptedFileTypes,
  };

  function clearSelection() {
    setMediaSrc(null);
    onChange(null);
  }

  const pendingFileMarkup = (
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
  );

  const activeFileMarkup = (
    <React.Fragment>
      <video
        style={{ objectFit: "cover" }}
        width="100%"
        height="320"
        autoPlay
        loop
        muted
        sx={{ m: 0, p: 0, mb: -2 }}
      >
        <source src={mediaSrc ? mediaSrc.file : null} type="video/mp4" />
      </video>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
        }}
      >
        <Text
          sx={{ background: "rgba(0,0,0,0.5)", color: "white", py: 2, px: 3 }}
        >
          {mediaSrc ? mediaSrc.name : null}
        </Text>
        <Button onClick={clearSelection}>Clear</Button>
      </Box>
    </React.Fragment>
  );

  return (
    <Box
      {...rootProps}
      sx={{
        overflow: "hidden",
        position: "relative",
        borderWidth: "1px",
        borderRadius: "4px",
        borderStyle: isDragActive ? "dashed" : "solid",
        py: mediaSrc != null ? 0 : 5,
      }}
    >
      {mediaSrc == null ? pendingFileMarkup : activeFileMarkup}

      <Input {...inputProps} sx={{ p: 0, mt: 0, mb: 0 }} />
    </Box>
  );
}
