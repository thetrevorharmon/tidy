import React, { useState, useRef, useEffect } from "react";

import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";

import { Input, Textarea } from "theme-ui";

import { FileInput, DateInput } from "./components";

const coordinatesRegexMatcher = /https\:\/\/www.google.com\/maps\/.*\/\@([0-9\-\.]+),([0-9\-\.]+).*/;

export default function App() {
  const [fileName, setFileName] = useState();
  const [date, setDate] = useState();
  const [coordinates, setCoordinates] = useState();
  const [command, setCommand] = useState("");

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
    <ThemeProvider theme={theme}>
      <div style={{ margin: 30 }}>
        <h1>Tidy 🧹</h1>
        <h2>Choose a file</h2>
        <FileInput onChange={setFileName} />
        <h2>When was this taken?</h2>
        <DateInput onChange={setDate} />
        <h2>Where was this taken?</h2>
        <a href="http://maps.google.com" target="_blank">
          Lookup address
        </a>
        <Input
          type="text"
          ref={mapsLinkRef}
          onChange={handleMapsLinkChange}
          placeholder="google maps link here"
        />
        {fileName && date && coordinates && (
          <Textarea value={command} readonly />
        )}
        <p>
          <ul>
            <li>
              <b>Name:</b> {fileName}
            </li>
            <li>
              <b>Date:</b> {JSON.stringify(date)}
            </li>
            <li>
              <b>Coordinates:</b> {coordinates?.lat}, {coordinates?.lng}
            </li>
          </ul>
        </p>
      </div>
    </ThemeProvider>
  );
}
