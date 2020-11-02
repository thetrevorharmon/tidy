import React, { useState, useRef, useEffect } from "react";
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

const coordinatesRegexMatcher = /https\:\/\/www.google.com\/maps\/.*\/\@([0-9\-\.]+),([0-9\-\.]+).*/;

export function Form() {
  const [fileName, setFileName] = useState();
  const [date, setDate] = useState();
  const [coordinates, setCoordinates] = useState();
  const [command, setCommand] = useState("");

  const fileRef = useRef();
  const dateRef = useRef();
  const mapsLinkRef = useRef();

  useEffect(() => {
    if (fileName != null && date != null && coordinates != null) {
      const coordinatesString = `${coordinates.lat}, ${coordinates.lng}`;

      const timestamp = [
        `"-datetimeoriginal=${date}"`,
        `"-CreationDate=${date}"`,
        `"-CreateDate=${date}"`,
      ];

      const gpsInformation = [
        `"-GPSCoordinates=${coordinatesString}"`,
        `"-GPSCoordinates-und-US=${coordinatesString}"`,
        `"-GPSLatitude=${coordinatesString}"`,
        `"-GPSLongitude=${coordinatesString}"`,
        `"-Keys:GPSCoordinates=${coordinatesString}"`,
        `"-Keys:GPSCoordinates-und-US=${coordinatesString}"`,
      ];

      const bashCommand = [
        "exiftool",
        ...timestamp,
        ...gpsInformation,
        fileName,
      ].join(" ");

      setCommand(bashCommand);
    }
  }, [fileName, date, coordinates, command, setCommand]);

  function handleFileChange() {
    if (fileRef.current != null) {
      const [file] = fileRef.current.files;
      setFileName(file.name);
    }
  }

  function handleDateChange() {
    if (dateRef.current != null) {
      setDate(dateRef.current.value);
    }
  }

  function handleMapsLinkChange() {
    if (mapsLinkRef.current != null) {
      const link = mapsLinkRef.current.value;
      const matches = link.match(coordinatesRegexMatcher);
      if (matches != null && matches.length === 3) {
        const [, lat, lng] = matches;
        setCoordinates({ lat, lng });
      }
    }
  }

  return (
    <div style={{ margin: 30 }}>
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
      <a href="http://maps.google.com" target="_blank">
        Lookup address
      </a>
      <Input
        type="text"
        ref={mapsLinkRef}
        onChange={handleMapsLinkChange}
        placeholder="google maps link here"
      />
      {fileName && date && coordinates && <Textarea value={command} readonly />}
      <p>
        <ul>
          <li>
            <b>Name:</b> {fileName}
          </li>
          <li>
            <b>Date:</b> {date}
          </li>
          <li>
            <b>Coordinates:</b> {coordinates?.lat}, {coordinates?.lng}
          </li>
        </ul>
      </p>
    </div>
  );
}
