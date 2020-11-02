import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
} from "theme-ui";

export function Form() {
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const fileRef = useRef();
  const dateRef = useRef();

  function handleFileChange() {
    if (fileRef.current != null) {
      const [file] = fileRef.current.files;
      setName(file.name);
    }
  }

  function handleDateChange() {
    if (dateRef.current != null) {
      setDate(dateRef.current.value);
    }
  }

  return (
    <>
      <h1>File</h1>
      <Input
        type="file"
        name="file"
        ref={fileRef}
        onChange={handleFileChange}
        multiple={false}
        accept=".mov,.mp4,.jpg,.jpeg,.png"
      />
      <Input
        type="datetime-local"
        name="date"
        ref={dateRef}
        onChange={handleDateChange}
      />
      <p>
        {name}, {date}
      </p>
    </>
  );
}
