/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRef, useState } from "react";

import { Input, Box, Text, Label } from "theme-ui";

export function FileInput({
  acceptedFileTypes = ".mov,.mp4,.jpg,.jpeg,.png",
  onChange,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [mediaSrc, setMediaSrc] = useState(null);
  const fileRef = useRef();

  function handleChange() {
    console.log("dropped");
    if (fileRef.current != null && fileRef.current.files.length > 0) {
      const [file] = fileRef.current.files;

      if (file != null && file.name != null) {
        const filePath = file.path != null ? file.path : file.name;
        setMediaSrc(URL.createObjectURL(file));
        onChange(filePath);
      }
    }
  }

  function dragEnter(event) {
    console.log("dragEnter");
    setIsDragging(true);
  }

  function dragLeave(event) {
    console.log("dragLeave");
    setIsDragging(false);
  }

  return (
    <Label
      htmlFor="file"
      // onDragEnter={dragEnter}
      // onDragLeave={dragLeave}
      sx={{
        display: "block",
        py: 5,
        my: 3,
        position: "relative",
        borderWidth: "1px",
        borderStyle: isDragging ? "dashed" : "solid",
        borderRadius: "4px",
        background: "yellow",
      }}
    >
      <Text
        sx={{
          textAlign: "center",
          fontSize: 3,
          fontWeight: "bold",
          zIndex: 0,
          position: "relative",
          background: "white",
        }}
      >
        Drag a video or image here
      </Text>
      <Input
        id="file"
        type="file"
        name="file"
        ref={fileRef}
        onChange={handleChange}
        multiple={false}
        accept={acceptedFileTypes}
        sx={
          {
            // textIndent: "-9999px",
            // border: "none",
            // background: "blue",
            // position: "absolute",
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 0,
            // margin: 0,
            // padding: 0,
            // borderRadius: 0,
            // visibility: "hidden",
            // zIndex: 0,
          }
        }
      />
      {mediaSrc && (
        <video width="320" height="240" autoPlay loop muted>
          <source src={mediaSrc} type="video/mp4" />
        </video>
      )}
    </Label>
  );
}
