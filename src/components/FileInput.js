/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { ReactComponent as DragAndDropIcon } from "../assets/drag-and-drop.svg";

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
    multiple: false,
    ref: fileRef,
    acceptedFileTypes,
  };

  function clearSelection() {
    setMediaSrc(null);
    onChange(null);
  }

  const pendingFileMarkup = (
    <Box
      sx={{
        background: isDragActive ? "white" : "transparent",
        color: isDragActive ? "black" : "inherit",
        boxSizing: "border-box",
        width: "300px",
        p: 4,
        border: "2px white dashed",
        borderRadius: "20px",
        textAlign: "center",
      }}
    >
      <DragAndDropIcon color={isDragActive ? "black" : "white"} />
      <Text sx={{ fontSize: 3, fontWeight: "bold", mt: 3 }}>
        {isDragActive ? "Now drop it! Do it!" : "Drag a video here"}
      </Text>
    </Box>
  );

  const activeFileMarkup = (
    <React.Fragment>
      <video
        style={{ objectFit: "contain" }}
        width="100%"
        height="100%"
        autoPlay
        loop
        // muted
        controls
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
          top: 0,
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
        display: "grid",
        placeItems: "center",
        background: "black",
        color: "white",
        overflow: "hidden",
        position: "relative",
        borderRight: "1px solid black",
        py: mediaSrc != null ? 0 : 5,
      }}
    >
      {mediaSrc == null ? pendingFileMarkup : activeFileMarkup}

      <Input {...inputProps} sx={{ p: 0, mt: 0, mb: 0 }} />
    </Box>
  );
}
